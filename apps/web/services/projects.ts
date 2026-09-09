import type { ProjectDetailResponse, ProjectListResponse } from '@portfolio/shared'
import { Api } from '@/lib/api'

export type { ProjectDetailResponse }

const FALLBACK_PROJECT_DETAILS: Record<string, ProjectDetailResponse> = {
  'smart-attendance-system': {
    id: 'fallback-smart-attendance-system',
    slug: 'smart-attendance-system',
    title: 'ATTEND AI (Smart Attendance System)',

    descriptionMd: `## ATTEND AI (Smart Attendance System)

**Final Year Project** — ATTEND AI is a facial-recognition attendance management system developed to automate the process of identifying registered users and recording attendance without manual entry.

Led a team of four as Project Lead, overseeing task allocation, feature integration, debugging, and final project delivery. Contributed to the core computer-vision pipeline and made key technical decisions while coordinating the integration of face recognition, Flask-based application logic, and SQLite data persistence.

### What it does

- Detects faces from a live camera feed using OpenCV.
- Recognizes registered faces using facial embeddings with face_recognition.
- Records attendance with the person's identity and timestamp.
- Stores attendance records in SQLite.
- Provides a Flask-based web layer for authentication and attendance operations.

### Technical implementation

The application combines Python, Flask, OpenCV, face_recognition and SQLite. The computer-vision pipeline handles face detection and recognition, Flask exposes the application functionality, and SQLite stores attendance records for management and review.

### Project outcome

The project demonstrates a practical use of computer vision to reduce repetitive manual attendance work while keeping an organized record of attendance events.`,

    shortDescription:
      'A final-year facial-recognition attendance system that detects and recognizes faces in real time, records timestamped attendance and keeps attendance data organized for management.',

    tagline: 'Final Year Project',
    role: 'Final Year Project · Python / Flask / Computer Vision',

    startedAt: '2025-01-01T00:00:00.000Z',
    endedAt: '2025-05-31T00:00:00.000Z',

    liveUrl:
      'https://smart-attendance-system-tvmk.onrender.com/api/auth/demo',
    repoUrl:
      'https://github.com/zeeshanverse/smart-attendance-system',

    featured: true,
    published: true,
    displayOrder: 0,

    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-09-09T00:00:00.000Z',

    tags: [
      {
        id: 'python',
        slug: 'python',
        label: 'Python',
        color: null,
      },
      {
        id: 'flask',
        slug: 'flask',
        label: 'Flask',
        color: null,
      },
      {
        id: 'opencv',
        slug: 'opencv',
        label: 'OpenCV',
        color: null,
      },
      {
        id: 'sqlite',
        slug: 'sqlite',
        label: 'SQLite',
        color: null,
      },
    ],

    images: [],
  },

  mymeal: {
    id: 'fallback-mymeal',
    slug: 'mymeal',
    title: 'MyMeal',

    descriptionMd: `## MyMeal

MyMeal is a food-ordering web application designed around a simple end-to-end ordering flow. Users can browse the available menu, manage items in a cart and place orders through a browser-based interface.

### What it does

- Displays food items through a browsable menu.
- Lets users add and manage items in a shopping cart.
- Supports the order-placement flow through the web application.
- Uses Flask for server-side application logic.
- Uses JavaScript, HTML and CSS for the interactive frontend.

### Project outcome

MyMeal provided practical experience connecting frontend interactions with backend functionality and building a complete e-commerce-style application flow.`,

    shortDescription:
      'A food-ordering web application with menu browsing, cart management and order placement, built with Flask and JavaScript.',

    tagline: null,
    role: 'Web Application · Flask / JavaScript',

    startedAt: '2024-01-01T00:00:00.000Z',
    endedAt: '2024-12-31T00:00:00.000Z',

    liveUrl: 'https://mymeal.onrender.com',
    repoUrl:
      'https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-',

    featured: true,
    published: true,
    displayOrder: 1,

    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2026-09-09T00:00:00.000Z',

    tags: [
      {
        id: 'flask',
        slug: 'flask',
        label: 'Flask',
        color: null,
      },
      {
        id: 'javascript',
        slug: 'javascript',
        label: 'JavaScript',
        color: null,
      },
    ],

    images: [],
  },

  'banking-system': {
    id: 'fallback-banking-system',
    slug: 'banking-system',
    title: 'Banking System',

    descriptionMd: `## Banking System

A backend-focused banking application built with Java and Spring Boot, designed around secure account operations and transaction management.

### Core features

- JWT-based authentication for protected API access.
- Account creation and account management.
- Deposits and withdrawals with transaction handling.
- Money transfers between accounts.
- Transaction history and reporting.
- PostgreSQL persistence using JPA and JDBC.

### Technical implementation

The backend is structured around Spring Boot REST APIs, JWT authentication and relational persistence. The project focuses on validation, secure request handling, database interaction and reliable transaction workflows.`,

    shortDescription:
      'A Java and Spring Boot backend banking application with JWT authentication, account management, transactions and PostgreSQL persistence.',

    tagline: null,
    role: 'Java / Spring Boot · REST API',

    startedAt: '2026-01-01T00:00:00.000Z',
    endedAt: '2026-08-31T00:00:00.000Z',

    liveUrl: null,
    repoUrl:
      'https://github.com/zeeshanverse/banking-system-springboot',

    featured: true,
    published: true,
    displayOrder: 2,

    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-09T00:00:00.000Z',

    tags: [
      {
        id: 'java',
        slug: 'java',
        label: 'Java',
        color: null,
      },
      {
        id: 'spring-boot',
        slug: 'spring-boot',
        label: 'Spring Boot',
        color: null,
      },
      {
        id: 'rest-api',
        slug: 'rest-api',
        label: 'REST API',
        color: null,
      },
      {
        id: 'sql',
        slug: 'sql',
        label: 'SQL',
        color: null,
      },
    ],

    images: [],
  },

  jobtrack: {
    id: 'fallback-jobtrack',
    slug: 'jobtrack',
    title: 'JobTrack',

    descriptionMd: `## JobTrack

JobTrack is an in-progress job application tracker built to make an active job search easier to organize. Instead of keeping application details across notes or spreadsheets, the application brings company, role, status and job-link information into one place.

### Current features

- Add and record job applications.
- Track the company and role for each application.
- Track application status throughout the hiring process.
- Store the original job URL for quick access.
- View basic application statistics.

### Current implementation

The current version uses HTML, CSS and JavaScript. The first iteration focuses on a lightweight application workflow before expanding into a larger full-stack implementation.

### Planned improvements

The roadmap includes local storage, filtering, editing and deleting applications, followed by a React frontend and Spring Boot backend for a more scalable full-stack implementation.

### Repository

[GitHub](https://github.com/zeeshanverse/job-tracker)`,

    shortDescription:
      'An in-progress job application tracker for recording companies, roles, application status, job URLs and application statistics.',

    tagline: 'Upcoming project · actively in progress',
    role: 'HTML / CSS / JavaScript',

    startedAt: '2026-01-01T00:00:00.000Z',
    endedAt: null,

    liveUrl: null,
    repoUrl: 'https://github.com/zeeshanverse/job-tracker',

    featured: false,
    published: true,
    displayOrder: 3,

    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-09T00:00:00.000Z',

    tags: [
      {
        id: 'html',
        slug: 'html',
        label: 'HTML',
        color: null,
      },
      {
        id: 'css',
        slug: 'css',
        label: 'CSS',
        color: null,
      },
      {
        id: 'javascript',
        slug: 'javascript',
        label: 'JavaScript',
        color: null,
      },
    ],

    images: [],
  },
}

const api = new Api()

export async function getProjects(): Promise<ProjectDetailResponse[]> {
  try {
    const res = await api.get('/projects?limit=100', {
      cache: 'no-store',
    })

    if (!res.ok) return []

    const data = (await res.json()) as ProjectListResponse

    return data.items
  } catch {
    return []
  }
}

export async function getProject(
  slug: string
): Promise<ProjectDetailResponse | null> {
  try {
    // IMPORTANT:
    // Do not cache project details.
    // This ensures updated project data is fetched immediately.
    const res = await api.get(`/projects/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return FALLBACK_PROJECT_DETAILS[slug] ?? null
    }

    return (await res.json()) as ProjectDetailResponse
  } catch {
    return FALLBACK_PROJECT_DETAILS[slug] ?? null
  }
}

export async function getFeaturedProjects(): Promise<ProjectDetailResponse[]> {
  try {
    const res = await api.get('/projects/featured', {
      cache: 'no-store',
    })

    if (!res.ok) return []

    return (await res.json()) as ProjectDetailResponse[]
  } catch {
    return []
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects()

  return projects.length
    ? projects.map((p) => p.slug)
    : Object.keys(FALLBACK_PROJECT_DETAILS)
}

export function getAllProjectTags(
  projects: ProjectDetailResponse[]
): [string, number][] {
  const counts = new Map<string, number>()

  for (const p of projects) {
    for (const t of p.tags) {
      counts.set(t.label, (counts.get(t.label) ?? 0) + 1)
    }
  }

  return [
    ['all', projects.length] as [string, number],
    ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1]),
  ]
}

export function formatProjectDate(iso: string | null): string {
  if (!iso) return ''

  const d = new Date(iso)

  return d.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}