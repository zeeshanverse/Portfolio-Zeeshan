import SectionHeading from '@/components/molecules/SectionHeading'

const PROFILES = [
  ['LeetCode', 'LeetZeeshan', 'https://leetcode.com/u/LeetZeeshan/'],
  ['GeeksForGeeks', '2k22csaie17', 'https://www.geeksforgeeks.org/profile/2k22csaie17t'],
  ['Code360', 'c_zeeshan', 'https://www.naukri.com/code360/profile/c_zeeshan'],
  ['HackerRank', 'CSAI_1520107', 'https://www.hackerrank.com/profile/CSAI_1520107'],
  ['CodeChef', 'zeeshanverse', 'https://www.codechef.com/users/zeeshanverse'],
  ['Codolio DSA', 'learningzeeshan', 'https://codolio.com/profile/learningzeeshan'],
] as const

const Profiles = () => (
  <section className="relative py-20" id="profiles">
    <SectionHeading num="04" label="PROOF OF PRACTICE" title="Code, solve, repeat." />
    <div className="grid grid-cols-3 border border-[var(--border)] max-[760px]:grid-cols-2 max-[560px]:grid-cols-1">
      {PROFILES.map(([name, handle, href]) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group p-5 border-r border-b border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--accent)] transition-colors">
          <span className="block font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-faint)] mb-2">{name}</span>
          <strong className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-bright)] group-hover:text-[var(--accent)]">{handle} ↗</strong>
        </a>
      ))}
    </div>
  </section>
)

export default Profiles
