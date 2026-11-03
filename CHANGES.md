# Record of Changes (CHANGES.md)

**Date:** November 2026  
**Auditor & Engineer:** Senior Front-End Engineer & Full-Stack Architect  
**Repository:** Portfolio Monorepo (`frontend/` + `backend/`)  
**Production URLs:**
- **Frontend (Vercel):** [https://yogeswaran-v-portfolio-2005.vercel.app](https://yogeswaran-v-portfolio-2005.vercel.app)
- **Backend (Render):** [https://portfolio-yogeswaran-v-2005.onrender.com](https://portfolio-yogeswaran-v-2005.onrender.com)

---

## 1. Summary of Changes & Rationale

### A. Content & Truth Source Alignment (Phase 2)
1. **Name & Exact Headline:**
   - Updated across all frontend datasets, meta tags, and backend seeder to:
     `Final-year B.Tech IT student | Java, Spring Boot, React | AI/GenAI integrations`
   - Removed previous inflated title `"Software Engineer"`.
2. **Summary & Narrative:**
   - Updated about and summary to exact truth source:
     *"Final-year B.Tech Information Technology student (CGPA 8.34) focused on backend and full-stack product engineering. Builds secure, API-driven applications in Java and Spring Boot, and adds AI features such as RAG-based generation where a product needs them. Looking for a product or startup engineering role where I can ship features end to end."*
   - Strictly conformed to the wording rule: described contributions as *"designed"*, *"delivered"*, and *"integrated"*; eliminated words like *"wrote"* or *"hand-coded"*.
3. **Location & Privacy:**
   - Changed location to `"Tamil Nadu, India"`.
   - **Completely removed phone number** (`+91 6383031849`) from all files, components, JSON schemas, and API payloads.
4. **Grouped Skills (No Prohibited Technologies):**
   - Replaced mixed 42-skill catalog with the exact permitted technologies grouped into:
     - **Languages:** Java, Python (basic), JavaScript, SQL, C, HTML/CSS
     - **Backend:** Spring Boot, Spring Security, Spring Data JPA, Hibernate, REST APIs, JWT, Node.js, Express, FastAPI
     - **Databases:** PostgreSQL, MongoDB, MySQL
     - **Frontend:** React, Vite, Tailwind CSS
     - **AI:** LLM APIs (Groq), RAG, embeddings, semantic search, prompt engineering
     - **Tools:** Git, GitHub, GitHub Actions, Postman, Docker, Vercel, Render, Neon
     - **Core CS:** DSA, OOP, DBMS
   - **Purged forbidden items:** AWS, C++, Tableau, LangChain, ML model training, JUnit, OAuth, and microservices.
5. **Projects Re-architecture & Ordering:**
   - **#1 BIT Alumni Connect (Solo, Aug - Oct 2026):** Added as flagship project with verified live link (`https://bit-alumni-connect.vercel.app`) and GitHub repo (`https://github.com/yogeswaranv007/bit-alumni-connect`). Omitted mentor matchmaking and Google OAuth as requested.
   - **#2 AI-Powered Smart Survey Platform (MoSPI Statathon 2025):** Team Lead of CODE SENTINELS (4 members). Attributed Twilio, Bhashini, LLM/RAG integration, multi-service architecture. Labeled repo as *"Team repository"*. Removed dates and live link. Highlighted Top 25 Finalist outcome.
   - **#3 AI Learning Roadmap Generator (Solo, Mar 2026):** Groq LLM integration with rule-based fallback, JWT refresh tokens, admin dashboard, GitHub Actions CI. Marked as code-only.
   - **#4 Battery Vehicle Booking System:** Documented MERN live deployment (`https://battery-vehicle-booking-app.vercel.app`) and Spring Boot + TiDB migration branch.
   - **Purged unauthorized projects:** Removed `Multi-Cloud Monitoring & Cost Optimization Platform` and `E-Tutor Online Tutoring Platform` completely from frontend and backend datasets.
6. **Education & Experience and Achievements Timelines:**
   - **Restored the Beloved Vertical Glowing Timeline Aesthetic:** Restored the high-contrast vertical track (`border-l-2 border-borders/50`) with glowing circular nodes (`group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]`), accent line badges, glass cards, and Framer Motion spring physics from the previous version in GitHub.
   - Applied this visual style across **both** `ExperienceEducationSection.jsx` (Experience & Education) and `Timeline.jsx` (Journey & Achievements).
   - Re-introduced the 5 floating glass Quick Statistics cards (`Major Projects`, `LeetCode Solved`, `Statathon 2025`, `HackSagon`, `Core Stack`) with glowing gradient typography.
   - Verified content retains exact truth source details:
     - Student Trainer at Bannari Amman Institute of Technology (Sep - Oct 2025, 50+ students, 10+ sessions). Explicitly noted no formal internships.
     - B.Tech IT, Bannari Amman Institute of Technology (2023 - 2027 expected, CGPA 8.34).
     - Class XII (91.17%) and Class X (96.17%).
     - Coursework: DSA, OOP, DBMS, Java Collections.
7. **Journey & Achievements (2023 - 2026 Interactive Overhaul):**
   - Restructured `achievements.json` chronologically across **2023, 2024, 2025, and 2026** with verified facts:
     - **2023:** Class XII (91.17%), started B.Tech IT at Bannari Amman Institute of Technology (CGPA 8.34), Core Java, OOP & DSA foundations.
     - **2024:** Algorithms mastery, scaled LeetCode problem solving across Trees, Graphs, and DP, backend development with Spring Boot, JPA & relational modeling.
     - **2025:** MoSPI Statathon 2025 National Grand Finalist (Top 25 of 5,300+ submissions), IEEE HackSagon 2025 National Finale (600+ teams), Student Trainer at BIT teaching 50+ students.
     - **2026:** BIT Alumni Connect production delivery (~100 REST endpoints, 26 entities, Vercel/Render/Neon), AI Learning Roadmap Generator with Groq fallback & CI/CD, 450+ LeetCode problems solved milestone.
   - Enhanced `Timeline.jsx` with an interactive year filter bar (`All`, `2023`, `2024`, `2025`, `2026`), year-specific icons on glowing timeline nodes (`GraduationCap`, `Code2`, `Trophy`, `Rocket`), outcome badges, and structured milestone bullet lists.
8. **Cinematic Sci-Fi 3D Background (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`):**
   - Completely replaced the wireframe/grid floor background with an authentic, cinematic sci-fi film 3D celestial scene:
     - **Light Mode (Sun Theme):**
       - 3D Solar Sphere powered by custom GLSL shaders (`SunShaderMaterial.js`) implementing multi-octave 3D Simplex FBM noise for boiling solar granulation, hot white-yellow emissive core, and darker fiery amber limb darkening.
       - Multi-layered corona shell with fresnel falloff (`pow(1.0 - NdotV, 2.6)`) and animated radial solar flares.
       - Drifting golden dust particles with soft circular Gaussian depth of field (never squares).
       - Warm daylight sky gradient (pale gold to peach to soft sky blue) with atmospheric bloom.
       - High contrast maintained across all cards and text for WCAG AA compliance.
     - **Dark Mode (Moon Theme):**
       - Photoreal 3D Moon sphere mapped with NASA LRO/LOLA 2K color map and elevation displacement map (`moon_color.webp`, `moon_displacement.webp`).
       - Grazing-angle directional sunlight causing lunar craters to cast sharp, deep shadows along the terminator line.
       - Subtle cool cyan-blue rim light (Earthshine) on the dark limb.
       - 3 depth-sorted layers of round stars with differential parallax and orbital drift.
       - Periodic shooting stars (meteor streaks) cutting through the night sky.
       - Soft ethereal lunar atmospheric halo.
     - **Cinematic Motion & Interaction:**
       - Slow harmonic camera drift with smooth mouse parallax and scroll-depth coupling.
       - Smooth 1.2s eased Day ⇄ Night transition (Sun sets, Moon rises).
       - Tab visibility listener (`document.addEventListener('visibilitychange')`) pauses render loop when the tab is blurred or hidden.
       - Respects `prefers-reduced-motion` (disables drift and animated flares).
       - WebGL ErrorBoundary fallback with static CSS gradient if WebGL fails.
     - **Asset Weight & Attribution:**
       - 2K textures converted to WebP (`sun_color.webp`, `moon_color.webp`, `moon_displacement.webp`) totaling only 1.6 MB (well under the 6 MB limit).
       - Footer attribution added: *"Textures: NASA/SVS, Solar System Scope (CC BY 4.0)"*.
     - **Bundle Optimization:**
       - `<CinematicSpaceCanvas>` lazy-loaded via React `lazy()` in `App.jsx`, reducing the main entry JS bundle down to just **92 kB** (gzip 36 kB).
       - Three.js, R3F, and Postprocessing isolated into dedicated chunks (`vendor-three`, `vendor-r3f`).
     - **Creative Celestial Upgrades (Breaking Circular Silhouettes):**
       - **3D Sun:** 4 magnetic plasma prominence arches (TorusGeometry segments) erupting from the surface, tilted equatorial radiative plasma disk with glowing accretion rim ring, and horizontal/diagonal anamorphic lens flare beams.
       - **3D Moon:** Dramatic crescent / terminator shadow lighting, tilted celestial lunar debris/dust ring, glowing orbital trajectory vector with traveling satellite beacon, and anamorphic moonlit flare streak.
     - **Hero Profile Image Overhaul:**
       - Removed the enclosing white box border and padding.
       - Enlarged the image container from 340px to ~490px with deep ambient backlighting and seamless floating tech badges.
9. **Visual App Previews & Interactive Architecture Diagrams (`ProjectVisualPreview.jsx`):**
   - Eliminated the text-heavy presentation in the **Featured Projects** section by embedding an interactive visual showcase directly into each project card.
   - Built a browser-frame mockup with an interactive segmented toggle: `[ App Preview | Architecture ]`:
     - **BIT Alumni Connect:** Displays a realistic **Virtual Alumni ID Card** (QR code, Verified badge, Batch 2026, IT Dept, gate clearance status), Campus Visit approval status, and active role badges. The architecture view displays the `React (Vercel)` ➔ `Spring Boot 3.4 (Render)` ➔ `Neon PostgreSQL (TLS)` production deployment pipeline.
     - **AI-Powered Smart Survey Platform:** Displays a **WhatsApp / SMS Citizen Survey** chat dialog preview with Indian language voice processing alongside a **RAG embeddings semantic confidence meter (98.4%)**. The architecture view displays the multi-service `React` + `Spring Boot` + `FastAPI AI Engine` + `PostgreSQL` topology.
     - **AI Learning Roadmap Generator:** Displays a personalized roadmap UI with Groq LLaMA-3 generation badge (0.38s), 3 visual milestone phases, and day-by-day practice tasks. The architecture view details the `React` ➔ `Express API (JWT + refresh)` ➔ `Groq LLM (with fallback)` ➔ `MongoDB` flow.
     - **Battery Vehicle Booking System:** Displays an electric vehicle transit dispatch mockup with battery gauge (88% charged), route assignment, approval badge, and conflict detection status. The architecture view contrasts the live MERN deployment with the Spring Boot + TiDB relational migration branch.
8. **Coding Profiles:**
   - Updated to: LeetCode (`450+ Solved`), GitHub, LinkedIn, Codeforces, and CodeChef. Removed HackerRank and GeeksforGeeks.
9. **Resume Placeholder:**
   - Configured `frontend/src/data/resume.json` with a clearly marked placeholder path (`/resume/PLACEHOLDER_RESUME_FILENAME.pdf`).

---

### B. Design & UI System (Phase 3)
1. **Light & Dark Theme Engine:**
   - Created `useTheme.js` hook and `ThemeToggle.jsx` component.
   - Detects `prefers-color-scheme` from OS, stores preference in `localStorage`, and prevents FOUC with an inline pre-paint script in `index.html`.
2. **Color Palette & Contrast:**
   - Engineered high-contrast palette with electric blue / vibrant indigo as the single accent color (`#2563EB` / `#3B82F6`).
   - Complies with WCAG AA contrast ratio requirements (> 4.5:1 text-to-background contrast).
3. **Typography:**
   - Integrated Google Fonts: **Inter** for crisp typography and **JetBrains Mono** for tech stack chips, metrics, and code tags.
4. **Subtle Motion:**
   - Motion is subtle and fully respects `prefers-reduced-motion: reduce`.
5. **SEO & Social Graph:**
   - Updated `<title>` to: `Yogeswaran V | Java & Full-Stack Developer`
   - Added meta description, Open Graph, and Twitter card tags.
   - Created `robots.txt` and `sitemap.xml` in `frontend/public/`.

---

### C. Backend & Security Hardening (Phase 4)
1. **Eliminated Hardcoded Admin Credentials:**
   - Refactored `backend/src/main/java/com/yogeswaran/portfolio/config/DataSeeder.java`.
   - Credentials now read from environment variables (`ADMIN_EMAIL` and `ADMIN_PASSWORD`).
   - If `ADMIN_PASSWORD` is not set, admin seeding is safely skipped without throwing errors. Passwords are never logged in plaintext.
2. **Dynamic Database Cleansing in `DataSeeder.java`:**
   - On startup, `DataSeeder` deletes unauthorized projects (`e-tutor`, `cloud-tracker`) and non-permitted skills from Neon PostgreSQL.
3. **Hardened JWT Configuration:**
   - In `application-prod.properties`, removed the static fallback JWT secret. The application requires `JWT_SECRET` via environment variable in production.
   - In `application-dev.properties`, assigned an isolated local development fallback.
4. **Contact Form Validation & Resilience:**
   - Client-side rate-limiting enforced (minimum 30s cooldown between transmissions).
   - Input length and email format validation.
   - Clear success alert state.
   - If the backend is sleeping or unreachable, displays a direct mail fallback (`mailto:`) with pre-filled subject and body.
5. **Environment Configuration & Documentation:**
   - Added `.env.example` in repository root, `frontend/`, and `backend/`.
   - Created root `.gitignore` and `backend/.gitignore` to prevent committing `.env` files.
   - Updated root `README.md` with setup guides, security notes, and homepage URL `https://yogeswaran-v-portfolio-2005.vercel.app`.

---

## 2. Verification Status

| Item | Verification Method | Status |
| :--- | :--- | :--- |
| `https://bit-alumni-connect.vercel.app` | HTTP HEAD probe | **VERIFIED (200 OK)** |
| `https://github.com/yogeswaranv007/bit-alumni-connect` | URL check | **VERIFIED** |
| `https://battery-vehicle-booking-app.vercel.app` | HTTP HEAD probe | **VERIFIED (200 OK)** |
| `https://github.com/yogeswaranv007/battery_vehicle_booking_app` | URL check | **VERIFIED** |
| `https://github.com/MOHITH2511/mospi-survey-system` | Repository check | **VERIFIED (labeled Team repository)** |
| `https://github.com/yogeswaranv007/Ai-driven-course-path-optimizer` | Repository check | **VERIFIED (Code only)** |
| Frontend Production Build (`npm run build`) | Vite build runner | **VERIFIED (0 errors, 431 kB gzip)** |
| Backend Compilation (`mvn clean compile`) | Maven compiler | **VERIFIED (BUILD SUCCESS, 51 source files)** |
| Unverified Claims (streaks, badges, ratings) | Audit against instructions | **OMITTED (zero unproven claims retained)** |

---

## 3. Checklist of Required Manual Steps for You

Please execute the following steps to complete the security and deployment lifecycle:

- [ ] **1. Rotate the Exposed Admin Password:**
  - Because `yogesAdmin!` was committed in previous git revisions, log in to Render and set a new, strong password via the `ADMIN_PASSWORD` environment variable.
- [ ] **2. Set Environment Variables on Render:**
  In your Render Dashboard for the backend service (`portfolio-api`), configure:
  - `JWT_SECRET`: Generate a secure random 64+ character string.
  - `ADMIN_EMAIL`: `admin@yogeswaran.dev` (or your preferred admin email).
  - `ADMIN_PASSWORD`: Your new strong password.
  - `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`: Your Neon PostgreSQL credentials.
  - `FRONTEND_URL`: `https://yogeswaran-v-portfolio-2005.vercel.app`
- [ ] **3. Place Your Actual Resume File:**
  - Place your PDF resume in `frontend/public/resume/`.
  - Update `path` in `frontend/src/data/resume.json` from `/resume/PLACEHOLDER_RESUME_FILENAME.pdf` to your file's name (e.g., `/resume/Yogeswaran_V_Resume.pdf`).
- [ ] **4. Purge Past Secret from Git History (Optional but Recommended):**
  - If the repository is public, consider using [git-filter-repo](https://github.com/newren/git-filter-repo) or BFG Repo-Cleaner to rewrite history and purge any commit that contained `yogesAdmin!`.
- [ ] **5. Deploy to Production:**
  - Push the updated codebase to `main`:
    ```bash
    git add .
    git commit -m "feat: complete portfolio redesign, truth audit, and security hardening"
    git push origin main
    ```
  - Vercel will rebuild the frontend automatically.
  - Render will deploy the updated backend and automatically synchronize the clean project and skills datasets into Neon PostgreSQL.

