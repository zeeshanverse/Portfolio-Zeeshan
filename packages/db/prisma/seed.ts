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
      title: 'ATTEND AI (Smart Attendance System)',
      role: 'Final Year Project · Python / Flask / Computer Vision',
      shortDescription: 'A final-year facial-recognition attendance system that detects and recognizes faces in real time, records timestamped attendance and keeps attendance data organized for management.',
      descriptionMd: '## ATTEND AI (Smart Attendance System)\n\n**Final Year Project** — ATTEND AI is a facial-recognition attendance management system developed to automate the process of identifying registered users and recording attendance without manual entry.\n\n### What it does\n- Detects faces from a live camera feed using OpenCV.\n- Recognizes registered faces using facial embeddings with `face_recognition`.\n- Records attendance with the person\'s identity and timestamp.\n- Stores attendance records in SQLite for simple and reliable local persistence.\n- Provides a Flask-based web layer for authentication and attendance-related operations.\n\n### Technical implementation\nThe application combines Python, Flask, OpenCV, `face_recognition` and SQLite. The computer-vision pipeline handles face detection and recognition, while Flask exposes the application functionality and SQLite keeps the attendance data available for management and review.\n\n### Project outcome\nThe project demonstrates how computer vision can be applied to a practical administrative workflow, reducing repetitive manual attendance work while keeping a searchable record of attendance events.\n\n### Links\n- [GitHub](https://github.com/zeeshanverse/smart-attendance-system)\n- [Live demo](https://smart-attendance-system-tvmk.onrender.com/api/auth/demo)',
      startedAt: new Date('2025-01-01'),
      endedAt: new Date('2025-05-31'),
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
      role: 'Web Application · Flask / JavaScript',
      shortDescription: 'A food-ordering web application with menu browsing, cart management and order placement, built with Flask and JavaScript.',
      descriptionMd: '## MyMeal\n\nMyMeal is a food-ordering web application designed around a simple end-to-end ordering flow. Users can browse the available menu, manage items in a cart and place orders through a browser-based interface.\n\n### What it does\n- Displays food items through a browsable menu.\n- Lets users add and manage items in a shopping cart.\n- Calculates the order flow from selected cart items.\n- Supports order placement through the web application.\n- Uses a Flask backend to handle application logic and JavaScript for client-side interaction.\n\n### Technical implementation\nThe project uses Flask for the backend and JavaScript, HTML and CSS for the web interface. The frontend handles user interaction such as menu browsing and cart management, while Flask provides the server-side application layer.\n\n### Project outcome\nMyMeal provided practical experience building a complete web application flow, connecting frontend interactions with backend functionality and designing an application around a real-world e-commerce-style use case.\n\n### Links\n- [GitHub](https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-)\n- [Live demo](https://mymeal.onrender.com)',
      startedAt: new Date('2024-01-01'),
      endedAt: new Date('2024-12-31'),
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
      role: 'Java / Spring Boot · REST API',
      shortDescription: 'A Java and Spring Boot backend banking application with JWT authentication, account management, transactions and PostgreSQL persistence.',
      descriptionMd: '## Banking System\n\nA backend-focused banking application built with Java and Spring Boot, designed around secure account operations and transaction management.\n\n### Core features\n- JWT-based authentication for protected API access.\n- Account creation and account management.\n- Deposits and withdrawals with transaction handling.\n- Money transfers between accounts.\n- Transaction history and reporting.\n- PostgreSQL persistence using JPA and JDBC.\n\n### Technical implementation\nThe backend is structured around Spring Boot REST APIs, with JWT used for authentication and authorization. PostgreSQL provides persistent storage, while JPA and JDBC handle database interaction. The project focuses on clean backend responsibilities, validation, secure request handling and reliable transaction workflows.\n\n### Project outcome\nThis project strengthened practical experience with Java backend development, REST API design, Spring Boot, authentication, relational databases and transaction-oriented application logic.\n\n### Repository\n- [GitHub](https://github.com/zeeshanverse/banking-system-springboot)',
      startedAt: new Date('2026-01-01'),
      endedAt: new Date('2026-08-31'),
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
      descriptionMd: '## JobTrack\n\nJobTrack is an in-progress job application tracker built to make an active job search easier to organize. Instead of keeping application details across notes or spreadsheets, the application brings company, role, status and job-link information into one place.\n\n### Current features\n- Add and record job applications.\n- Track the company and role for each application.\n- Track application status throughout the hiring process.\n- Store the original job URL for quick access.\n- View basic application statistics.\n\n### Current implementation\nThe current version uses HTML, CSS and JavaScript, keeping the first iteration lightweight and easy to use. The project is intentionally being developed incrementally, with the core application workflow being established before the larger stack upgrade.\n\n### Planned improvements\nThe roadmap includes local storage, filtering, editing and deleting applications, followed by a React frontend and a Spring Boot backend for a more scalable full-stack implementation.\n\n### Repository\n- [GitHub](https://github.com/zeeshanverse/job-tracker)',
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
          startedAt: item.startedAt,
          endedAt: item.endedAt ?? null,
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
