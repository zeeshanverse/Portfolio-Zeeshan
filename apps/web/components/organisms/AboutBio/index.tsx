import SectionHeading from '@/components/molecules/SectionHeading'

const AboutBio = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="01" label="THE LONGER VERSION" title="A bit about me" />
    <div className="columns-2 gap-10 max-[760px]:columns-1">
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mb-[1.1em] break-inside-avoid">
        I&apos;m a developer focused on the <strong className="text-[var(--text-bright)] font-semibold">Java ecosystem</strong> and full-stack software engineering. I enjoy taking an idea from requirements to working code, especially when it involves backend logic, APIs, databases and clean application structure.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mb-[1.1em] break-inside-avoid">
        My current development path centers on Java, Spring Boot, REST APIs, SQL and Spring Security, while I continue expanding my frontend skills with JavaScript and React. I&apos;m also learning Docker, microservices and system design to understand how applications scale beyond a single service.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mb-[1.1em] break-inside-avoid">
        I learn best by building. Projects such as AttendAI, a Spring Boot banking system, MyMeal and Smart Attendance give me opportunities to apply concepts, debug real problems and improve the quality of what I build.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mb-0 break-inside-avoid">
        Alongside project work, I&apos;m strengthening Data Structures and Algorithms and preparing for software engineering opportunities where I can contribute, learn from experienced engineers and grow into a production-ready full-stack developer.
      </p>
    </div>
  </section>
)
export default AboutBio
