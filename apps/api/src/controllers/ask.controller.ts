import type { NextFunction, Request, Response } from 'express'
import { streamText } from 'ai'
import { z } from 'zod'
import type { LlmChatService } from '@api/services/llm-chat.service'
import { AI_API_KEY, GREETING_RESPONSES, getOfflineAssistantResponse, llama, LLM_MODEL, OFFLINE_MSG, SYSTEM_PROMPT } from '@api/constants/ai'
import {
  dropConsecutiveDuplicateRolesStartingWithUser,
  keepLastNMessagesStartingWithUser,
  appendConcisenessReminderToLastUserMessage,
} from '@api/utils/ask.utils'

const normalizeGreeting = (text: string) => text.toLowerCase().trim().replace(/[!?.,]+$/g, '')

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(2000),
      }),
    )
    .max(50),
  id: z.string().optional(),
})

export class AskController {
  constructor(private readonly service: LlmChatService) {}

  ask = async (
    req: Request<Record<string, string>, void, unknown>,
    res: Response<void>,
    next: NextFunction,
  ) => {
    try {
      const parse = chatSchema.safeParse(req.body)
      if (!parse.success) {
        console.error('[ask] validation failed:', JSON.stringify(parse.error.flatten(), null, 2))
        res
          .status(400)
          .json({ error: 'Invalid request', details: parse.error.flatten() } as unknown as void)
        return
      }

      const { messages: rawMessages, id: sessionId = crypto.randomUUID() } = parse.data

      const alternating = dropConsecutiveDuplicateRolesStartingWithUser(rawMessages)
      const windowed = keepLastNMessagesStartingWithUser(alternating)
      const messagesForModel = appendConcisenessReminderToLastUserMessage(windowed)

      const lastUser = [...windowed].reverse().find((m) => m.role === 'user')
      const prompt = lastUser?.content ?? ''
      const start = Date.now()

      try {
        const greeting = GREETING_RESPONSES[normalizeGreeting(prompt)]
        if (greeting) {
          void this.service.log({
            sessionId,
            prompt,
            responseText: greeting,
            durationMs: Date.now() - start,
            model: 'rule-based-greeting',
            ip: req.ip,
          })
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.write(greeting)
          res.end()
          return
        }

        // Keep common portfolio/help prompts useful even when no external/local
        // model is configured. This also gives the UI a real assistant response
        // instead of an empty assistant bubble when the model is unavailable.
        const offlineAnswer = getOfflineAssistantResponse(prompt)
        if (offlineAnswer) {
          void this.service.log({
            sessionId,
            prompt,
            responseText: offlineAnswer,
            durationMs: Date.now() - start,
            model: 'rule-based-fallback',
            ip: req.ip,
          })
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.write(offlineAnswer)
          res.end()
          return
        }

        if (!AI_API_KEY) {
          const noModelAnswer =
            "I can answer portfolio and common technical questions here. For broader general-AI questions, the hosted AI model needs to be configured."
          void this.service.log({
            sessionId,
            prompt,
            responseText: noModelAnswer,
            durationMs: Date.now() - start,
            model: 'no-ai-provider-configured',
            ip: req.ip,
          })
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.write(noModelAnswer)
          res.end()
          return
        }

        const result = streamText({
          model: llama(LLM_MODEL),
          system: SYSTEM_PROMPT,
          messages: messagesForModel,
          maxOutputTokens: 600,
          onFinish: ({ text }) => {
            if (prompt) {
              void this.service.log({
                sessionId,
                prompt,
                responseText: text,
                durationMs: Date.now() - start,
                model: LLM_MODEL,
                ip: req.ip,
              })
            }
          },
        })

        await result.pipeTextStreamToResponse(res)
      } catch (error) {
        console.error('[ask] model error:', error)
        if (prompt) {
          void this.service.log({
            sessionId,
            prompt,
            responseText: OFFLINE_MSG,
            durationMs: Date.now() - start,
            model: 'none',
            ip: req.ip,
          })
        }
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.write(OFFLINE_MSG)
        res.end()
      }
    } catch (err) {
      next(err)
    }
  }
}
