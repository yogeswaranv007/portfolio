# Portfolio Audit Report (AUDIT.md)

**Generated:** November 2026  
**Auditor:** Senior Front-End Engineer & Full-Stack Architect  
**Scope:** Frontend (`/frontend`), Backend (`/backend`), Data Schemas, Config, Meta Tags, and Security.

---

## 1. Executive Summary

This audit assesses every public statement, project specification, skill entry, metadata tag, and configuration setting in the portfolio against the verified **Truth Source**. Every claim is marked as **CORRECT**, **OUTDATED**, or **FALSE**. 

Critical findings include:
- **Unauthorized Projects:** Legacy projects (`E-Tutor Online Tutoring Platform` and `Multi-Cloud Monitoring & Cost Optimization Platform`) were present in the codebase and data files despite not being the author's work.
- **Missing Flagship Project:** The flagship solo project **BIT Alumni Connect** (hosted on Vercel, Render, Neon) was completely missing from the portfolio data and UI.
- **Job Title & Credentials:** The site previously declared "Software Engineer" as a job title and had unverified coding streak badges (LeetCode 100-day streak) and unapproved platforms (HackerRank, GeeksforGeeks).
- **Severe Security Vulnerabilities:** Hardcoded admin credentials (`admin@yogeswaran.dev` / `yogesAdmin!`) in `DataSeeder.java`, a committed JWT secret default across environments, and a publicly displayed private phone number (`+91 6383031849`).

---

## 2. Line-by-Line Claim Audit vs. Truth Source

| Category | Claimed on Site / In Code | Status | Truth Source / Verified Reality | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **Name** | "Yogeswaran V" | **CORRECT** | Yogeswaran V | Retain consistently across all components and meta tags. |
| **Headline / Roles** | "Software Engineer" / "Java Backend Developer", "Full Stack Developer", "Problem Solver" | **FALSE / OUTDATED** | "Final-year B.Tech IT student \| Java, Spring Boot, React \| AI/GenAI integrations" | Never claim a job title not held. Replace with the exact verified headline. |
| **Summary / About** | "Final-year Information Technology student passionate about building scalable backend systems, modern web applications, and AI-powered solutions..." | **OUTDATED** | "Final-year B.Tech Information Technology student (CGPA 8.34) focused on backend and full-stack product engineering. Builds secure, API-driven applications in Java and Spring Boot, and adds AI features such as RAG-based generation where a product needs them. Looking for a product or startup engineering role where I can ship features end to end." | Update summary text exactly. Adhere to wording rule ("designed", "delivered", "integrated"; avoid "wrote", "hand-coded"). |
| **Location** | "India" | **OUTDATED** | "Tamil Nadu, India" | Update in profile data, contact section, and schema. |
| **Phone Number** | `+91 6383031849` in `profile.json` & `ContactView.jsx` | **FALSE / PROHIBITED** | "Do NOT show my phone number publicly. Use the contact form and email." | Remove phone number completely from all UI, JSON, and markup. |
| **Current Focus** | "Spring Boot Microservices", "AWS Cloud Practitioner", "Docker & Redis" | **FALSE / PROHIBITED** | Prohibited to list AWS and microservices. | Remove disallowed items; align focus with verified skills. |
| **Education: College** | B.Tech IT (generic mention) | **OUTDATED** | B.Tech Information Technology, Bannari Amman Institute of Technology, 2023-2027 (expected), CGPA 8.34. Coursework: DSA, OOP, DBMS, Java Collections. | Add dedicated Education section / timeline entry with verified details. |
| **Education: Schooling** | Not displayed | **OUTDATED** | Class XII: Tamil Nadu State Board, 2021-2023, 91.17%; Class X: ICSE, 2020-2021, 96.17%. | Include in Education timeline. |
| **Experience** | Not displayed / generic | **OUTDATED** | Student Trainer, Bannari Amman Institute of Technology, Sep-Oct 2025. Taught Core Java, OOP, Collections, DSA (50+ students, 10+ sessions). No formal internships. | Create Experience timeline item. Do NOT invent or add internships. |
| **Project 1** | None (BIT Alumni Connect missing) | **FALSE / MISSING** | BIT Alumni Connect (solo, Aug-Oct 2026). Platform for BIT. Stack: Java, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, JWT, React, Docker. Role-based access, directory, events, posts, campus visits, virtual ID with QR, gate entry. ~100 REST endpoints, 26 entities, 15 modules. Hosted on Vercel, Render, Neon. Live: https://bit-alumni-connect.vercel.app, Code: https://github.com/yogeswaranv007/bit-alumni-connect. (No mentor matchmaking or Google sign-in). | Add as #1 project with verified links, architecture, and feature sets. |
| **Project 2** | AI-Powered Smart Survey Platform (listed first, outdated info) | **OUTDATED** | Team Lead of CODE SENTINELS (4 members), Statathon 2025 (MoSPI). Twilio WhatsApp/SMS, Bhashini translation/voice, LLM integration, multi-service architecture. Team stack: React, Spring Boot, FastAPI (embeddings, semantic search, RAG), PostgreSQL, open-source LLM. Outcome: National Grand Finalist, Top 25 of 5,300+ submissions. NO dates. NO live link. Code: https://github.com/MOHITH2511/mospi-survey-system (label "Team repository"). | Reorder to #2, update role, team context, remove dates, remove live link, label repo as Team repository. |
| **Project 3** | AI Learning Roadmap Generator (listed last as "AI-Driven Learning Path Optimizer") | **OUTDATED** | AI Learning Roadmap Generator (solo, Mar 2026): personalised learning roadmaps from rule-based skill-gap analysis enriched by LLM (Groq) with fallback; JWT with refresh tokens; admin dashboard; GitHub Actions lint & build. React, Node.js, Express, MongoDB. ~40 REST endpoints. Code only: https://github.com/yogeswaranv007/Ai-driven-course-path-optimizer. | Reorder to #3, update title, stack, features, and remove live link. |
| **Project 4** | Battery Vehicle Booking System | **OUTDATED** | Battery Vehicle Booking System: student, watchman, admin booking platform. Live version is MERN; Spring Boot + TiDB migration exists on separate branch. Live: https://battery-vehicle-booking-app.vercel.app, Code: https://github.com/yogeswaranv007/battery_vehicle_booking_app. | Reorder to #4, clarify MERN live vs Spring Boot + TiDB branch. |
| **Project 5 (Forbidden)** | Multi-Cloud Monitoring & Cost Optimization Platform | **FALSE** | Not author's work ("Remove any other project, especially E-Tutor, Multi-Cloud Tracker and mospi-survey-platform. They are not my work.") | Purge entirely from frontend and backend datasets and references. |
| **Project 6 (Forbidden)** | E-Tutor Online Tutoring Platform | **FALSE** | Not author's work. | Purge entirely from frontend and backend datasets and references. |
| **Skills: Permitted List** | 42 mixed skills including AWS, Azure, Scikit-learn, OAuth, etc. | **FALSE / OUTDATED** | Permitted ONLY: Languages (Java, Python (basic), JavaScript, SQL, C, HTML/CSS); Backend (Spring Boot, Spring Security, Spring Data JPA, Hibernate, REST APIs, JWT, Node.js, Express, FastAPI); Databases (PostgreSQL, MongoDB, MySQL); Frontend (React, Vite, Tailwind CSS); AI (LLM APIs (Groq), RAG, embeddings, semantic search, prompt engineering); Tools (Git, GitHub, GitHub Actions, Postman, Docker, Vercel, Render, Neon); Core CS (DSA, OOP, DBMS). Prohibited: AWS, C++, Tableau, LangChain, ML model training, JUnit, OAuth, microservices. | Replace skill list strictly with the grouped permitted skills; purge all forbidden items. |
| **Achievements** | Included E-Tutor mention and "100+ Days Coding streak" | **FALSE / OUTDATED** | Statathon 2025 (MoSPI): Top 25 / 5,300+; HackSagon 2025 (IEEE): Finale from 600+ teams; LeetCode: 450+ problems solved. NO badges without proof. | Replace achievements list with the 3 verified milestones. |
| **Coding Profiles** | HackerRank, GeeksforGeeks, LeetCode | **OUTDATED** | LeetCode, GitHub, LinkedIn, Codeforces, CodeChef. | Remove HackerRank and GeeksforGeeks; add Codeforces and CodeChef. |
| **Stats Numbers** | "5+ Major Projects", "400+ LeetCode" | **OUTDATED** | 4 Major Projects; 450+ LeetCode problems solved. | Update stats cards to accurate figures. |
| **Resume URL** | Hardcoded `/resume.pdf` or `/resume/Yogeswaran_V_SE_Resume.pdf` | **OUTDATED** | Must have clearly marked placeholder file path for user to fill in. | Standardize to clearly marked placeholder path `RESUME_FILE_PATH`. |
| **Meta Title** | `<title>Yogeswaran V \| Software Engineer</title>` | **FALSE** | `<title>Yogeswaran V \| Java & Full-Stack Developer</title>` | Update `<title>` in `index.html`. |
| **Meta Description** | "Software Engineer specializing in Java Backend..." | **FALSE** | "Portfolio of Yogeswaran V, Final-year B.Tech IT student specializing in Java, Spring Boot, React, and AI/GenAI integrations." | Update meta description, Open Graph, and Twitter tags. |
| **README Homepage** | Outdated or placeholder URL | **OUTDATED** | `https://yogeswaran-v-portfolio-2005.vercel.app` | Update README and links. |

---

## 3. Security & Vulnerability Findings

### 1. Hardcoded Administrator Credentials in Source Code
- **Location:** `backend/src/main/java/com/yogeswaran/portfolio/config/DataSeeder.java` (lines 54-71)
- **Exposure:** `admin@yogeswaran.dev` and plaintext password `yogesAdmin!` were hardcoded in Java methods and logged to console output.
- **Risk:** High. Anyone with repository access or viewing logs can authenticate as administrator and alter/delete records.
- **Remediation:** Read `ADMIN_EMAIL` and `ADMIN_PASSWORD` from environment variables with non-sensitive fallbacks in dev only. Do not log passwords. Advise user to rotate credentials.

### 2. Hardcoded Default JWT Secret in Properties and Git
- **Location:** `backend/src/main/resources/application-dev.properties`, `application-prod.properties`, and `backend/.env`
- **Exposure:** `8f2f84090b4d45548682057d62055627eb18d6a8f152d5b62b19280d908d0c2e36466f27b9c922a6bbec4b4c7317e08929e71e9a3b6f001f3724c08479e390c5`
- **Risk:** High. In production, if `JWT_SECRET` is omitted, tokens can be forged by third parties using this static secret.
- **Remediation:** Remove static fallback from production configuration; require `JWT_SECRET` via environment variable or fail-secure derivation. Add to `.env.example`.

### 3. Public Exposure of Personal Phone Number
- **Location:** `frontend/src/data/profile.json`, `backend/src/main/resources/data/profile.json`, and `frontend/src/pages/ContactView.jsx`
- **Exposure:** Private phone number `+91 6383031849` was publicly viewable and callable.
- **Risk:** Privacy violation and spam risk.
- **Remediation:** Completely removed phone number from all data models, UI components, and API DTOs.

### 4. Committed `.env` File in Backend
- **Location:** `backend/.env`
- **Exposure:** Contains local database credentials and JWT secret.
- **Remediation:** Ensure `.env` is ignored by Git, provide `.env.example` with documented environment variable keys.

---

## 4. Phase 2-4 Action Plan

1. **Cleanse Data Layer:** Update `profile.json`, `projects.json`, `skills.json`, `achievements.json`, `codingProfiles.json` (in both `frontend` and `backend`).
2. **Implement Design & UI Polish:**
   - Dark/Light mode theme system with persistence and system preference detection.
   - High-contrast, WCAG AA compliant palette with single blue/indigo accent.
   - Restructured sections: Hero (Name, Headline, View Projects & Contact CTAs, Resume download placeholder), About, Grouped Skills, Projects with Live/Code buttons, Experience & Education timeline, Achievements, Contact Form with fallback to `mailto:`.
   - SEO tags, Favicon, `robots.txt`, `sitemap.xml`.
3. **Backend & Security Hardening:**
   - Externalize admin credentials and JWT configuration into environment variables.
   - Update contact endpoint validation and graceful client fallback.
   - Hide broken/unconfigured GitHub API dashboard views so no incomplete feature is surfaced.
   - Create root `.env.example`, `backend/.env.example`, `frontend/.env.example`, and comprehensive `README.md`.

