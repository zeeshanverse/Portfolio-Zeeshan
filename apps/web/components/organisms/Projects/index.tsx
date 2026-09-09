import Link from 'next/link'
import ProjectCard, { type ProjectData } from '@/components/organisms/ProjectCard'
import SectionHeading from '@/components/molecules/SectionHeading'
import Button from '@/components/atoms/Button'
import { getFeaturedProjects, type ProjectDetailResponse } from '@/services/projects'

function toProjectData(project: ProjectDetailResponse, index: number): ProjectData {
  const year = project.startedAt
    ? new Date(project.startedAt).getFullYear().toString()
    : new Date(project.createdAt).getFullYear().toString()

  const links: { label: string; href: string }[] = []
  if (project.liveUrl) links.push({ label: 'live', href: project.liveUrl })
  if (project.repoUrl) links.push({ label: 'repo', href: project.repoUrl })

  return {
    num: String(index + 1).padStart(2, '0'),
    slug: project.slug,
    title: project.title,
    year,
    role: project.role ?? '',
    desc: project.shortDescription,
    tags: project.tags.map((t) => t.label),
    links,
    litTags: [0],
  }
}

const FALLBACK_PROJECTS: ProjectData[] = [
  { num: '01', slug: 'smart-attendance-system', title: 'ATTEND AI (Smart Attendance System)', year: '2025', role: 'Final Year Project · Python / Flask / Computer Vision', desc: 'A final-year facial-recognition attendance system that detects and recognizes faces in real time, records timestamped attendance and keeps attendance data organized for management.', tags: ['Python', 'Flask', 'OpenCV', 'face_recognition', 'SQLite'], links: [{ label: 'live', href: 'https://smart-attendance-system-tvmk.onrender.com/api/auth/demo' }, { label: 'repo', href: 'https://github.com/zeeshanverse/smart-attendance-system' }], litTags: [0,1] },
  { num: '02', slug: 'mymeal', title: 'MyMeal', year: '2024', role: 'Web Application', desc: 'A food-ordering web application with menu browsing, cart management and order placement, built with Flask and JavaScript.', tags: ['Flask', 'JavaScript', 'HTML', 'CSS'], links: [{ label: 'live', href: 'https://mymeal.onrender.com' }, { label: 'repo', href: 'https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-' }], litTags: [0] },
  { num: '03', slug: 'banking-system', title: 'Banking System', year: '2026', role: 'Java / Spring Boot', desc: 'A backend banking system with JWT authentication, account management, deposits, withdrawals, money transfers and transaction reporting using PostgreSQL, JPA and JDBC.', tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA', 'JDBC', 'JWT'], links: [{ label: 'repo', href: 'https://github.com/zeeshanverse/banking-system-springboot' }], litTags: [0,1] },
  { num: '04', slug: 'jobtrack', title: 'JobTrack', year: '2026', role: 'Upcoming · In progress', desc: 'A job application tracker for recording companies, roles, application status, job URLs and application statistics.', tags: ['HTML', 'CSS', 'JavaScript'], links: [{ label: 'repo', href: 'https://github.com/zeeshanverse/job-tracker' }], litTags: [0] },

]

const Projects = async () => {
  const featured = await getFeaturedProjects()
  const displayProjects = featured.length ? featured : FALLBACK_PROJECTS

  return (
    <section className="relative py-20" id="projects">
      <SectionHeading
        num="02"
        label="FEATURED WORK"
        title="Selected projects"
        aside={
          <>
            ~/projects/featured
            <br />
            <span style={{ color: 'var(--text-faint)' }}>{displayProjects.length} featured</span>
          </>
        }
      />
      <div className="grid grid-cols-3 gap-[18px] max-[940px]:grid-cols-1">
        {displayProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={'id' in p ? toProjectData(p as ProjectDetailResponse, i) : p} />
        ))}
      </div>

      <div className="mt-10 pt-7 border-t border-dashed border-[var(--border)] flex items-center justify-between gap-6 flex-wrap">
        <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-dim)]">
          <span className="text-[var(--text-faint)]">$ </span>ls -al /projects
          <span className="text-[var(--text-faint)] ml-3 text-[11.5px]">// list all projects</span>
        </span>
        <Button as={Link} href="/projects">
          view all
        </Button>
      </div>
    </section>
  )
}

export default Projects
