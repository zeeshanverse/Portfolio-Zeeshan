import { config } from 'dotenv'
import { resolve } from 'node:path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/src/generated/prisma/index.js'

// prisma db seed runs from packages/db, so explicitly load the monorepo root .env.
config({ path: resolve(import.meta.dirname, '../../.env') })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
})

const prisma = new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV === 'production') {
  throw new Error('Seed must not run in production')
}

async function main() {
  // Tags
  const tags = await Promise.all(
    [
      { slug: 'java', label: 'Java', color: '#ED8B00' },
      { slug: 'spring-boot', label: 'Spring Boot', color: '#6DB33F' },
      { slug: 'rest-api', label: 'REST API', color: '#7DD3FC' },
      { slug: 'sql', label: 'SQL', color: '#4479A1' },
      { slug: 'javascript', label: 'JavaScript', color: '#F7DF1E' },
      { slug: 'react', label: 'React', color: '#61DAFB' },
      { slug: 'python', label: 'Python', color: '#3776AB' },
      { slug: 'fastapi', label: 'FastAPI', color: '#009688' },
      { slug: 'flask', label: 'Flask', color: '#ffffff' },
      { slug: 'opencv', label: 'OpenCV', color: '#5c8dbc' },
      { slug: 'sqlite', label: 'SQLite', color: '#003B57' },
      { slug: 'html', label: 'HTML', color: '#E34F26' },
      { slug: 'css', label: 'CSS', color: '#1572B6' },
    ].map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      }),
    ),
  )

  console.log(`Seeded ${tags.length} tags`)

  // Remove the old template project name when reseeding an adapted portfolio.
  await prisma.project.deleteMany({ where: { slug: 'attendai' } })

  // Admin user (optional in local development)
  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  let adminId: string | undefined

  if (!adminEmail || !adminPassword) {
    console.warn('SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set — skipping admin user and demo post')
  } else {
    const bcrypt = await import('bcryptjs')
    const passwordHash = await bcrypt.hash(adminPassword, 12)

    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, passwordHash },
    })

    adminId = admin.id
    console.log(`Seeded admin user: ${admin.email}`)
  }

  // Projects are seeded independently of the optional admin account.
  const projects = [
    {
      slug: 'smart-attendance-system',
      title: 'Smart Attendance System',
      shortDescription: 'A facial-recognition attendance system that detects and recognizes faces in real time, records attendance with timestamps and stores attendance data for management.',
      descriptionMd: '## Smart Attendance System\n\nA practical facial-recognition attendance management system built with Python and Flask. It uses OpenCV and face_recognition for face detection/recognition and SQLite for attendance records.\n\n### Links\n- [GitHub](https://github.com/zeeshanverse/smart-attendance-system)\n- [Live demo](https://smart-attendance-system-tvmk.onrender.com/api/auth/demo)',
      featured: true, published: true, displayOrder: 0,
      liveUrl: 'https://smart-attendance-system-tvmk.onrender.com/api/auth/demo',
      repoUrl: 'https://github.com/zeeshanverse/smart-attendance-system',
      projectTags: { create: [
        { tag: { connect: { slug: 'python' } } },
        { tag: { connect: { slug: 'flask' } } },
        { tag: { connect: { slug: 'opencv' } } },
        { tag: { connect: { slug: 'sqlite' } } },
      ]},
    },
    {
      slug: 'mymeal',
      title: 'MyMeal',
      shortDescription: 'A food-ordering web application with menu browsing, cart management and order placement, built with Flask and JavaScript.',
      descriptionMd: '## MyMeal\n\nA practical food-ordering web application with menu browsing, cart management and order placement.\n\n### Links\n- [GitHub](https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-)\n- [Live demo](https://mymeal.onrender.com)',
      featured: true, published: true, displayOrder: 1,
      liveUrl: 'https://mymeal.onrender.com',
      repoUrl: 'https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-',
      projectTags: { create: [
        { tag: { connect: { slug: 'flask' } } },
        { tag: { connect: { slug: 'javascript' } } },
      ]},
    },
    {
      slug: 'banking-system',
      title: 'Banking System',
      shortDescription: 'A Java and Spring Boot backend banking application with JWT authentication, account management, transactions and PostgreSQL persistence.',
      descriptionMd: '## Banking System\n\nA backend-focused banking system built with Java and Spring Boot. It includes JWT authentication, account management, deposits, withdrawals, money transfers and transaction reporting using PostgreSQL, JPA and JDBC.\n\n### Links\n- [GitHub](https://github.com/zeeshanverse/banking-system-springboot)',
      featured: true, published: true, displayOrder: 2,
      repoUrl: 'https://github.com/zeeshanverse/banking-system-springboot',
      projectTags: { create: [
        { tag: { connect: { slug: 'java' } } },
        { tag: { connect: { slug: 'spring-boot' } } },
        { tag: { connect: { slug: 'rest-api' } } },
        { tag: { connect: { slug: 'sql' } } },
      ]},
    },
    {
      slug: 'jobtrack',
      title: 'JobTrack',
      shortDescription: 'An in-progress job application tracker for recording companies, roles, application status, job URLs and application statistics.',
      tagline: 'Upcoming project · actively in progress',
      role: 'HTML / CSS / JavaScript',
      descriptionMd: '## JobTrack\n\nJobTrack is an upcoming job application tracker currently in progress. The current version is built with HTML, CSS and JavaScript. It supports adding job applications, tracking companies and roles, tracking application status, storing job URLs and viewing application statistics.\n\nPlanned improvements include local storage, filtering, editing and deleting applications, followed by a React frontend and Spring Boot backend.\n\n### Repository\n- [GitHub](https://github.com/zeeshanverse/job-tracker)',
      featured: false, published: true, displayOrder: 3,
      repoUrl: 'https://github.com/zeeshanverse/job-tracker',
      projectTags: { create: [
        { tag: { connect: { slug: 'html' } } },
        { tag: { connect: { slug: 'css' } } },
        { tag: { connect: { slug: 'javascript' } } },
      ]},
    },
  ]

  for (const item of projects) {
    const existingProject = await prisma.project.findUnique({
      where: { slug: item.slug },
    })

    if (existingProject) {
      await prisma.projectTag.deleteMany({
        where: { projectId: existingProject.id },
      })

      const project = await prisma.project.update({
        where: { slug: item.slug },
        data: {
          title: item.title,
          shortDescription: item.shortDescription,
          descriptionMd: item.descriptionMd,
          tagline: item.tagline ?? null,
          role: item.role ?? null,
          featured: item.featured,
          published: item.published,
          displayOrder: item.displayOrder,
          liveUrl: item.liveUrl ?? null,
          repoUrl: item.repoUrl ?? null,
          projectTags: {
            create: item.projectTags.create,
          },
        },
      })

      console.log(`Updated project: ${project.title}`)
    } else {
      const project = await prisma.project.create({
        data: item,
      })

      console.log(`Seeded project: ${project.title}`)
    }
  }

  // Example post only exists when an admin account is available.
  if (adminId) {
    const post = await prisma.post.upsert({
      where: { slug: 'hello-world' },
      update: {},
      create: {
        slug: 'hello-world',
        title: 'Hello World',
        excerpt: 'The first post on the blog.',
        contentMd: '## Hello\n\nThis is a seed post.',
        readingMinutes: 1,
        publishedAt: new Date(),
        authorId: adminId,
      },
    })

    console.log(`Seeded post: ${post.title}`)
  }

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
