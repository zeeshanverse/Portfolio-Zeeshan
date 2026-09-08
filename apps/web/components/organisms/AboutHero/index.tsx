import type { ReactNode } from 'react'
import Link from 'next/link'
import Blip from '@/components/atoms/Blip'
import { AVAILABILITY } from '@/lib/site'

const FACTS: { k: string; v: ReactNode }[] = [
  { k: 'name', v: 'Mohammed Zeeshan' },
  { k: 'role', v: 'Java Full-Stack Software Engineer' },
  { k: 'based in', v: <>India <span className="text-[var(--accent)]">// IST</span></> },
  { k: 'focus', v: 'Java · Spring Boot · REST APIs · SQL' },
  {
    k: 'status',
    v: AVAILABILITY.open ? (
      <span className="inline-flex items-center gap-1.5"><Blip size={7} />{AVAILABILITY.label}</span>
    ) : <span className="text-[var(--text-dim)]">{AVAILABILITY.closedLabel}</span>,
  },
]

const AboutHero = () => (
  <section className="pt-[88px] pb-18 grid grid-cols-[1.1fr_0.9fr] gap-14 items-center max-[940px]:grid-cols-1 max-[940px]:gap-9 max-[940px]:pt-14 max-[940px]:pb-12">
    <div>
      <div className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] mb-[22px] flex items-center gap-2">
        <Link href="/" className="transition-colors duration-150 hover:text-[var(--accent)]">
          ~
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-bright)]">about</span>
      </div>

      <h1 className="font-[family-name:var(--font-mono)] font-medium text-[clamp(38px,5.2vw,62px)] leading-[1.02] tracking-[-0.04em] mb-2.5 mt-0 text-[var(--text-bright)]">
        <span className="text-[var(--text-faint)] font-light">$ </span>whoami
      </h1>

      <p className="font-[family-name:var(--font-mono)] text-[14px] text-[var(--text-dim)] mb-6 mt-0">
        Mohammed Zeeshan <span className="text-[var(--accent)]">· @zeeshanverse</span>
      </p>

      <p className="text-[19px] leading-[1.55] text-[var(--text)] max-w-[46ch] mb-[30px] mt-0 text-pretty">
        <em className="text-[var(--accent)] not-italic">Java full-stack developer</em> focused on turning concepts into practical software and continuously improving through projects, problem solving and hands-on engineering.
      </p>

      <div className="border-t border-[var(--border)]">
        {FACTS.map(({ k, v }) => (
          <div
            key={k}
            className="grid grid-cols-[120px_1fr] gap-4 py-[11px] border-b border-[var(--border)] items-baseline"
          >
            <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] tracking-[0.02em] before:content-['→_'] before:text-[var(--text-faint)]">
              {k}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[13.5px] text-[var(--text-bright)]">
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>

  </section>
)

export default AboutHero
