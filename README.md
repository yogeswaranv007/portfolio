# Yogeswaran V — Software Engineering Portfolio Monorepo

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-Vercel-black?style=flat&logo=vercel)](https://yogeswaran-v-portfolio-2005.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend_API-Render-46E3B7?style=flat&logo=render)](https://portfolio-yogeswaran-v-2005.onrender.com)
[![Database](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-00E699?style=flat&logo=postgresql)](https://neon.tech)

**Homepage & Production URL:** [https://yogeswaran-v-portfolio-2005.vercel.app](https://yogeswaran-v-portfolio-2005.vercel.app)

---

## 👨‍💻 About Yogeswaran V

**Final-year B.Tech IT student | Java, Spring Boot, React | AI/GenAI integrations**  
Bannari Amman Institute of Technology (2023 - 2027, CGPA 8.34)  
Tamil Nadu, India

Focuses on backend and full-stack product engineering. Builds secure, API-driven applications in Java and Spring Boot, and adds AI features such as RAG-based generation where a product needs them. Open to fresher and intern roles in software development and AI at product and startup companies, as well as freelance work.

- **Email:** [yogeswaranv599@gmail.com](mailto:yogeswaranv599@gmail.com)
- **GitHub:** [https://github.com/yogeswaranv007](https://github.com/yogeswaranv007)
- **LinkedIn:** [https://www.linkedin.com/in/yogeswaranv](https://www.linkedin.com/in/yogeswaranv)
- **LeetCode:** [https://leetcode.com/u/Yogeswaran_v/](https://leetcode.com/u/Yogeswaran_v/) (450+ Solved)
- **GeeksforGeeks:** [https://www.geeksforgeeks.org/profile/yogeswaranv](https://www.geeksforgeeks.org/profile/yogeswaranv)
- **CodeChef:** [https://www.codechef.com/users/yogeswaran_v](https://www.codechef.com/users/yogeswaran_v)
- **HackerRank:** [https://www.hackerrank.com/profile/yogeswaranv599](https://www.hackerrank.com/profile/yogeswaranv599)

---

## 🚀 Projects Overview

1. **BIT Alumni Connect** *(Solo Project, Aug - Oct 2026)*  
   Alumni management platform for Bannari Amman Institute of Technology.  
   - **Stack:** Java, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, JWT, React, Docker.  
   - **Features:** Role-based access (Alumni, Students, Staff, Watchmen, Admins), directory, events, community posts, campus visit requests with approval, virtual ID with QR verification, gate-entry validation, profile-change approval. ~100 REST endpoints, 26 database entities, 15 feature modules.  
   - **Live Platform:** [https://bit-alumni-connect.vercel.app](https://bit-alumni-connect.vercel.app)  
   - **Code:** [https://github.com/yogeswaranv007/bit-alumni-connect](https://github.com/yogeswaranv007/bit-alumni-connect)

2. **AI-Powered Smart Survey Platform** *(Statathon 2025, MoSPI)*  
   Team Lead of team **CODE SENTINELS** (4 members).  
   - **Role:** Designed multi-service architecture, integrated Twilio WhatsApp/SMS distribution, Bhashini speech & translation APIs, and open-source LLM pipeline with RAG/embeddings in FastAPI.  
   - **Team Stack:** React, Spring Boot, FastAPI AI service, PostgreSQL, open-source LLM.  
   - **Outcome:** National Grand Finalist — Top 25 among 5,300+ submissions across India.  
   - **Team Repository:** [https://github.com/MOHITH2511/mospi-survey-system](https://github.com/MOHITH2511/mospi-survey-system)

3. **AI Learning Roadmap Generator** *(Solo Project, Mar 2026)*  
   Personalised learning roadmaps from rule-based skill-gap analysis enriched by Groq LLM with resilient API fallbacks.  
   - **Stack:** React, Node.js, Express, MongoDB, Groq API, JWT with refresh tokens, GitHub Actions CI.  
   - **Features:** Skill gap evaluator, Groq generation with fallback, ~40 REST endpoints.  
   - **Code:** [https://github.com/yogeswaranv007/Ai-driven-course-path-optimizer](https://github.com/yogeswaranv007/Ai-driven-course-path-optimizer)

4. **Battery Vehicle Booking System** *(Full-Stack Project, 2025 - 2026)*  
   Campus electric vehicle booking platform for students, security watchmen, and transportation admins.  
   - **Stack:** React, Node.js, Express, MongoDB, Tailwind CSS (Live MERN); Spring Boot + TiDB relational migration branch.  
   - **Live Platform:** [https://battery-vehicle-booking-app.vercel.app](https://battery-vehicle-booking-app.vercel.app)  
   - **Code:** [https://github.com/yogeswaranv007/battery_vehicle_booking_app](https://github.com/yogeswaranv007/battery_vehicle_booking_app)

---

## 🛠️ Monorepo Structure

```
portfolio/
├── frontend/                     # React 19 + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/           # UI components (Hero, About, TechRadar, Timeline)
│   │   ├── data/                 # Static JSON data layer
│   │   ├── hooks/                # Custom React hooks (useTheme)
│   │   ├── pages/                # Route views (DashboardView, ProjectDetailView, ContactView)
│   │   └── services/             # API client & local-first fallback service
│   ├── public/                   # Favicon, robots.txt, sitemap.xml, resume placeholder
│   └── package.json
├── backend/                      # Java 21 + Spring Boot 3 API
│   ├── src/main/java/com/yogeswaran/portfolio/
│   │   ├── config/               # DataSeeder, CorsConfig, SecurityConfig
│   │   ├── controller/           # REST endpoints (Portfolio, Contact, Auth)
│   │   ├── entity/               # JPA database entities
│   │   ├── repository/           # Spring Data JPA repositories
│   │   └── security/             # JWT authentication filter & tokens
│   └── pom.xml
├── .env.example                  # Environment variables template
├── AUDIT.md                      # Claims & security audit report
├── CHANGES.md                    # Record of changes and verification
├── vercel.json                   # Vercel deployment configuration
└── README.md
```

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18+)
- Java Development Kit (JDK 21)
- Maven 3.8+
- PostgreSQL (or Neon cloud connection string)

### 1. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Fill in your database and JWT secret in .env
mvn clean compile
mvn spring-boot:run
```
The backend API will start at `http://localhost:8080`. Swagger documentation is available at `http://localhost:8080/api/docs`.

---

## 🔒 Security & Environment Variables

All sensitive values must be provided through environment variables. Never commit `.env` files into source control.

| Variable | Description | Where to Set |
| :--- | :--- | :--- |
| `DB_URL` | PostgreSQL JDBC connection URL | Render / Backend `.env` |
| `DB_USERNAME` | Database username | Render / Backend `.env` |
| `DB_PASSWORD` | Database password | Render / Backend `.env` |
| `JWT_SECRET` | 64+ char secret key for HMAC-SHA512 token signing | Render / Backend `.env` |
| `ADMIN_EMAIL` | Administrator login email | Render / Backend `.env` |
| `ADMIN_PASSWORD` | Administrator login password (used by DataSeeder) | Render / Backend `.env` |
| `FRONTEND_URL` | Whitelisted frontend origin for CORS | Render / Backend `.env` |
| `BREVO_API_KEY` | Optional Brevo SMTP API key for contact email forwarding | Render / Backend `.env` |
| `VITE_API_BASE_URL` | Backend API URL (`https://.../api`) | Vercel / Frontend `.env` |

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).

