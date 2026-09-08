import SectionHeading from '@/components/molecules/SectionHeading'
import NowCard from '@/components/molecules/NowCard'

const CURRENTLY = [
  { verb: 'BUILDING', what: 'Java + Spring Boot projects', detail: 'Turning backend concepts into practical, portfolio-ready applications.' },
  { verb: 'LEARNING', what: 'Spring Security · Docker · Microservices', detail: 'Expanding from standalone applications toward production-oriented systems.' },
  { verb: 'SOLVING', what: 'Data Structures & Algorithms', detail: 'Strengthening problem-solving fundamentals through regular practice.' },
]

const AboutCurrently = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="05" label="RIGHT NOW" title="Currently" />
    <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">{CURRENTLY.map((c) => <NowCard key={c.verb} {...c} />)}</div>
  </section>
)
export default AboutCurrently
