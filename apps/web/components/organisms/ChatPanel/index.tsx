'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import CornerDecorations from '@/components/atoms/CornerDecorations'
import ChatHeader from '@/components/molecules/ChatHeader'
import ChatBody from '@/components/molecules/ChatBody'
import Button from '@/components/atoms/Button'
import Chip from '@/components/atoms/Chip'
import Input from '@/components/molecules/Input'
import { prepareAskRequest } from './utils'
import { BASE_URL } from '@/lib/api'

const SUGGESTIONS = [
  'what is your stack?',
  'tell me about your projects',
  'explain REST APIs simply',
  'give me a Java interview question',
]

const SEED_MESSAGES = [
  {
    id: 'seed',
    role: 'system' as const,
    parts: [{ type: 'text' as const, text: 'connected to zeeshan.dev — portfolio + general AI assistant ready.' }],
  },
]

// must match chatSchema messages .max() in ask.controller.ts
const MAX_MESSAGES = 50

const ChatPanel = () => {
  const [errorMsg, setErrorMsg] = useState<string>()
  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: `${BASE_URL}/ask`,
      prepareSendMessagesRequest: prepareAskRequest,
    }),
    messages: SEED_MESSAGES,
    onError: (err) => {
      const unreachable = err.message === 'Failed to fetch' || err.message.includes('NetworkError')
      setErrorMsg(
        unreachable
          ? "can't reach the assistant right now — the server may be down. try again in a moment."
          : err.message,
      )
    },
  })
  const [input, setInput] = useState('')
  const busy = status === 'submitted' || status === 'streaming'
  const reachedLimit = messages.filter((m) => m.role !== 'system').length >= MAX_MESSAGES

  const submitText = (text: string) => {
    const q = text.trim()
    if (!q || busy || reachedLimit) return
    setErrorMsg(undefined)
    sendMessage({ text: q })
  }

  const submit = () => {
    const q = input.trim()
    if (!q || busy || reachedLimit) return
    setInput('')
    submitText(q)
  }

  return (
    <div
      className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-[18px] flex flex-col min-h-[460px] shadow-[var(--shadow-card)]"
      id="chat"
    >
      <CornerDecorations />

      <ChatHeader />

      <ChatBody messages={messages} busy={busy} errorMsg={errorMsg} limitReached={reachedLimit} />

      <div className="flex flex-wrap gap-1.5 pt-2.5 pb-3 border-t border-dashed border-[var(--border)]">
        {SUGGESTIONS.map((s) => (
          <Button
            key={s}
            as={Chip}
            variant="bare"
            label={s}
            onClick={() => submitText(s)}
            disabled={busy || reachedLimit}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <Input.Text
          variant="chat"
          prompt
          right={
            <Button type="submit" variant="ghost" disabled={busy || reachedLimit || !input.trim()}>
              <span className="hidden sm:inline">send&nbsp;</span>↵
            </Button>
          }
          aria-label="Ask the portfolio assistant"
          placeholder={reachedLimit ? 'conversation limit reached' : 'ask Zeeshan or ask anything…'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy || reachedLimit}
        />
      </form>
    </div>
  )
}

export default ChatPanel
