import RegularLayout from '@/components/layouts/RegularLayout'
import Hero from '@/components/organisms/Hero'
import Projects from '@/components/organisms/Projects'
import Contact from '@/components/organisms/Contact'
import Engineering from '@/components/organisms/Engineering'
import Profiles from '@/components/organisms/Profiles'
import UpcomingProjects from '@/components/organisms/UpcomingProjects'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Page() {
  return (
    <RegularLayout>
      <Hero />
      <Projects />
      <Engineering />
      <Profiles />
      <UpcomingProjects />
      <Contact />
    </RegularLayout>
  )
}
