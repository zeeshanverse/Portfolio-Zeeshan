# Mohammed Zeeshan — Developer Portfolio

A terminal-inspired personal portfolio for **Mohammed Zeeshan**, focused on Java full-stack development, Spring Boot, REST APIs, SQL and practical software engineering.

## Included

- Terminal-style portfolio UI based on the original portfolio template
- Java / Spring Boot / REST / SQL skills and learning roadmap
- Featured projects with GitHub and live-demo links
- Upcoming-projects roadmap clearly marked as planned
- Resume PDF served from `/MohammedZeeshan__Resume.pdf`
- GitHub, LinkedIn, LeetCode, GeeksForGeeks, Code360, HackerRank, CodeChef and Codolio links
- About, timeline, currently-building and recommendations sections from the template
- Contact form and direct email contact
- Portfolio AI assistant with Zeeshan-specific context **and general-purpose Q&A**
- PostgreSQL + Prisma-backed project/content data

## Projects

### Smart Attendance System
Python, Flask, OpenCV, face_recognition, SQLite

- GitHub: https://github.com/zeeshanverse/smart-attendance-system
- Live demo: https://smart-attendance-system-tvmk.onrender.com/api/auth/demo

### MyMeal
Flask, JavaScript, HTML, CSS

- GitHub: https://github.com/zeeshanverse/project-E-commerce-Website-MyMeal-
- Live demo: https://mymeal.onrender.com

### Banking System
Java, Spring Boot, PostgreSQL, JPA, JDBC, JWT

- GitHub: https://github.com/zeeshanverse/banking-system-springboot

## Local development

From the repository root:

```powershell
pnpm db:migrate
pnpm db:generate
pnpm dev
```

Then open `http://localhost:3000`.

The root `.env` must contain a valid PostgreSQL connection and the API's LLM configuration. Never commit `.env` or real credentials.

## Local development

From the `portfolio-main` directory:

```powershell
pnpm install
Copy-Item .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The web app runs on `http://localhost:3000` and the API runs on `http://localhost:3001` in local development.

### AI assistant

The assistant supports both portfolio questions and general-purpose questions. It uses any OpenAI-compatible endpoint configured through `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL`. If `OPENAI_API_KEY` is supplied instead, it uses OpenAI automatically. A local OpenAI-compatible LLM can be used through the `LLAMA_*` variables.

### Contact notifications

The contact form stores submissions in PostgreSQL and can email the site owner plus an acknowledgement to the visitor. For Gmail, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_TO` in `.env`. Use a Gmail App Password for `SMTP_PASS`; never commit `.env`.
