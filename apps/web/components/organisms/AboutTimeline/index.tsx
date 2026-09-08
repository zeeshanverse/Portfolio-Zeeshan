import SectionHeading from '@/components/molecules/SectionHeading'
import TimelineRow from '@/components/molecules/TimelineRow'

const TIMELINE = [
  { when: 'NOW', title: 'Building & sharpening', body: 'Deepening Java and Spring Boot, building portfolio projects, solving DSA problems, and preparing for software engineering opportunities.' },
  { when: '2026', title: 'Backend-first development', body: 'Building practical applications around REST APIs, databases, authentication, business logic and clean backend architecture.' },
  { when: 'NEXT', title: 'Expanding full-stack depth', body: 'Growing further into React, Docker, microservices, Spring Security and production-oriented system design.' },
]

const AboutTimeline = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="03" label="HOW I GOT HERE" title="The short timeline" />
    <div>{TIMELINE.map((t) => <TimelineRow key={t.when} {...t} />)}</div>
  </section>
)
export default AboutTimeline
