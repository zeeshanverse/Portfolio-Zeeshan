import Link from 'next/link'
import Blip from '@/components/atoms/Blip'
import Button from '@/components/atoms/Button'
import IconButtonLink from '@/components/atoms/IconButtonLink'
import GithubIcon from '@/components/atoms/GithubIcon'
import LinkedinIcon from '@/components/atoms/LinkedinIcon'
import MailIcon from '@/components/atoms/MailIcon'
import PageHeading from '@/components/organisms/PageHeading'
import { countYearsUntilToday } from '@/utils/dateUtils'
import { SITE_AUTHOR, AVAILABILITY } from '@/lib/site'

const HeroIntro = () => (
  <div>
    {AVAILABILITY.open && (
      <div className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.04em] text-[var(--text-dim)] py-1.5 px-3 border border-[var(--border)] rounded-full bg-[var(--surface)] mb-7 whitespace-nowrap">
        <Blip />
        <span>AVAILABLE · {AVAILABILITY.label}</span>
      </div>
    )}
    <PageHeading
      leadingDollar
      title={
        <>
          hi, I&apos;m <span className="text-[var(--accent)]">Zeeshan</span>
        </>
      }
      middle="Java Full-Stack Software Engineer | Spring Boot | Open to Opportunities"
      description={
        <>
          I build practical{' '}
          <em className="text-[var(--accent)] not-italic">Java and Spring Boot applications</em>,
          REST APIs, database-driven systems and full-stack projects. I&apos;m currently focused on
          strengthening my <em className="text-[var(--accent)] not-italic">DSA and backend engineering</em>{' '}
          skills while expanding into React, Docker and microservices.
        </>
      }
    />
    <div className="flex flex-wrap gap-3 items-center">
      <Button as={Link} href="#contact" variant="primary">
        get in touch
      </Button>
      <Button as={Link} href="#projects">
        ls projects/
      </Button>
      <Button as={Link} href="/MohammedZeeshan__Resume.pdf" target="_blank">
        resume ↗
      </Button>
      <div className="ml-auto flex gap-2">
        <IconButtonLink href={SITE_AUTHOR.github} icon={<GithubIcon />} label="GitHub" external />
        <IconButtonLink
          href={SITE_AUTHOR.linkedin}
          icon={<LinkedinIcon />}
          label="LinkedIn"
          external
        />
        <IconButtonLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_AUTHOR.email)}`} icon={<MailIcon />} label="Email" external />
      </div>
    </div>
  </div>
)

export default HeroIntro
