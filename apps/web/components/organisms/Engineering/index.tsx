import SectionHeading from '@/components/molecules/SectionHeading'

const GROUPS = [
  ['01', 'Languages', 'Java · Python · C++ · SQL · JavaScript'],
  ['02', 'Backend', 'Java · Spring Boot · Spring Security · Flask · REST APIs'],
  ['03', 'Frontend', 'HTML5 · CSS3 · JavaScript · React'],
  ['04', 'Data', 'PostgreSQL · MySQL · SQLite · JPA/Hibernate · JDBC'],
  ['05', 'Tools', 'Git · GitHub · VS Code · IntelliJ IDEA · Maven · Postman'],
  ['06', 'Learning', 'Docker · Microservices · System Design · Spring AI · DSA'],
] as const

const Engineering = () => (
  <section className="relative py-20" id="engineering">
    <SectionHeading
      num="03"
      label="ENGINEERING"
      title="What I work with."
      aside={<>~/stack<br /><span className="text-[var(--text-faint)]">current strengths + active learning</span></>}
    />
    <div className="grid grid-cols-3 border border-[var(--border)] max-[940px]:grid-cols-2 max-[620px]:grid-cols-1">
      {GROUPS.map(([num, title, skills]) => (
        <div key={num} className="min-h-[155px] p-6 border-r border-b border-[var(--border)] last:border-r-0">
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]">[{num}]</div>
          <h3 className="font-[family-name:var(--font-mono)] text-[18px] text-[var(--text-bright)] mt-5 mb-2">{title}</h3>
          <p className="text-[13px] leading-[1.6] text-[var(--text-dim)] m-0">{skills}</p>
        </div>
      ))}
    </div>
    <div className="mt-5 border border-[var(--border)] rounded-xl p-5 bg-[var(--surface)] font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)]">
      <span className="text-[var(--accent)]">$</span> roadmap → Java → Spring Boot → Security → React → Docker → Microservices
    </div>
  </section>
)

export default Engineering
