import Link from 'next/link'
import SectionHeading from '@/components/molecules/SectionHeading'
import Button from '@/components/atoms/Button'

const UPCOMING = [
  {
    title: 'JobTrack',
    detail: 'An in-progress job application tracker for companies, roles, application status, job URLs and application statistics.',
    tags: 'HTML · CSS · JavaScript · in progress',
    repo: 'https://github.com/zeeshanverse/job-tracker',
  },
  { title: 'Spring Security Application', detail: 'Authentication, authorization, JWT and protected REST APIs.', tags: 'Spring Security · JWT · REST' },
  { title: 'Microservices Project', detail: 'Exploring service-to-service communication, API design and containerized services.', tags: 'Spring Boot · Docker · Microservices' },
  { title: 'Spring AI Project', detail: 'Building a practical AI-powered feature while learning Spring AI and LLM integration.', tags: 'Spring AI · Java · LLMs' },
]

const UpcomingProjects = () => (
  <section className="relative py-20" id="upcoming">
    <SectionHeading num="05" label="ON THE ROADMAP" title="What’s next." aside={<>~/projects/upcoming<br /><span className="text-[var(--text-faint)]">planned · not shipped yet</span></>} />
    <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
      {UPCOMING.map((project, i) => (
        <article key={project.title} className="border border-dashed border-[var(--border-strong)] rounded-xl p-6 bg-[var(--surface)] flex flex-col">
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]">[0{i + 1}] IN PROGRESS</div>
          <h3 className="font-[family-name:var(--font-mono)] text-[18px] text-[var(--text-bright)] mt-5 mb-2">{project.title}</h3>
          <p className="text-[13px] text-[var(--text-dim)] leading-[1.6]">{project.detail}</p>
          <div className="mt-auto pt-5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-faint)]">{project.tags}</div>
          {project.repo && (
            <Button as={Link} href={project.repo} target="_blank" rel="noopener noreferrer" variant="plain" className="mt-4 self-start">
              ↗ repository
            </Button>
          )}
        </article>
      ))}
    </div>
  </section>
)

export default UpcomingProjects
