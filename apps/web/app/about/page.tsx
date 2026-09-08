import { pageMeta } from '@/lib/site'
import AboutHero from '@/components/organisms/AboutHero'
import AboutBio from '@/components/organisms/AboutBio'
import AboutTimeline from '@/components/organisms/AboutTimeline'
import AboutCurrently from '@/components/organisms/AboutCurrently'
import AboutSocials from '@/components/organisms/AboutSocials'

export const revalidate = 86400

export const metadata = pageMeta(
  'about — zeeshan.dev',
  'Java Full-Stack Software Engineer focused on Java, Spring Boot, REST APIs, SQL and practical software development.',
)

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutTimeline />
      <AboutCurrently />
      <AboutSocials />
    </>
  )
}
