'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/molecules/SectionHeading'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Input'
import { submitContact } from '@/services/contact'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited: 'too many requests — wait a moment and try again',
  validation: 'invalid submission — check your details',
  server: 'something went wrong — try again',
  network: "can't reach the server — it may be offline, please try again shortly",
}

const Contact = () => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    try {
      await submitContact({
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        message: (form.elements.namedItem('msg') as HTMLTextAreaElement).value,
      })
      setSent(true)
    } catch (err) {
      const rawKey = err instanceof Error ? err.message : 'server'
      const key =
        rawKey === 'Failed to fetch' || rawKey.includes('NetworkError') ? 'network' : rawKey
      setError(ERROR_MESSAGES[key] ?? ERROR_MESSAGES.server)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20" id="contact">
      <SectionHeading
        num="03"
        label="GET IN TOUCH"
        title="Let's build something."
        aside={
          <>
            ~/contact
            <br />
            <span className="text-[var(--accent)]">● replies in &lt; 24h</span>
          </>
        }
      />
      <div className="grid grid-cols-[1fr_1.1fr] gap-8 max-[940px]:grid-cols-1">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col">
            {[
              { key: 'location', val: 'India · IST' },
              { key: 'status', val: 'open to software opportunities', accent: true },
              { key: 'stack', val: 'Java / Spring Boot / SQL / React' },
              { key: 'github', val: '@zeeshanverse' },
              { key: 'linkedin', val: 'zeeshanmohd' },
            ].map(({ key, val, accent }) => (
              <div
                key={key}
                className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-dim)]"
              >
                <span className="text-[var(--text-faint)] mr-2.5">{key}</span>
                <span className={accent ? 'text-[var(--accent)]' : 'text-[var(--text-bright)]'}>
                  {val}
                </span>
              </div>
            ))}
          </div>
          {calendlyUrl && (
            <div className="flex flex-col gap-1.5">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-faint)] tracking-[0.04em]">
                prefer a call?
              </span>
              <Button
                as={Link}
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                className="self-start"
              >
                schedule a 30-min call
              </Button>
            </div>
          )}
        </div>

        <form
          className="border border-[var(--border)] bg-[var(--surface)] rounded-[14px] p-6"
          onSubmit={handleSubmit}
        >
          <Input.Field>
            <Input.Label htmlFor="name" required>
              NAME
            </Input.Label>
            <Input.Text id="name" name="name" required disabled={sent} />
          </Input.Field>
          <Input.Field>
            <Input.Label htmlFor="email" required>
              EMAIL
            </Input.Label>
            <Input.Text id="email" name="email" type="email" required disabled={sent} />
          </Input.Field>
          <Input.Field>
            <Input.Label htmlFor="msg" required>
              MESSAGE
            </Input.Label>
            <Input.Textarea
              id="msg"
              name="msg"
              required
              minLength={10}
              maxLength={2000}
              placeholder="What are you building?"
              disabled={sent}
            />
          </Input.Field>
          <div className="flex items-center justify-between pt-1.5">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-faint)]">
              protected · rate-limited
            </span>
            <Button as="button" type="submit" variant="primary" disabled={sent || loading}>
              {loading ? 'sending…' : 'send message'}
            </Button>
          </div>
          {sent && (
            <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--accent)] mt-3 flex items-center gap-1.5">
              ✓ Thank you for reaching out through Mohammed Zeeshan&apos;s portfolio. Your message has been received, and we will be looking forward to helping you.
            </p>
          )}
          {error && (
            <p className="font-[family-name:var(--font-mono)] text-[12px] text-red-400 mt-3 flex items-center gap-1.5">
              ✕ {error}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
