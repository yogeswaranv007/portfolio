# Yogeswaran V - Software Engineer Portfolio

![Portfolio Preview](./src/assets/hero.png) *(Note: Replace with actual screenshot after deployment)*

A modern, high-performance Software Engineer portfolio designed like a premium SaaS dashboard. Built to showcase full-stack engineering capabilities, system design architectures, and professional achievements.

## 🚀 Live Demo
**[View Live Portfolio](https://your-deployment-url-here.vercel.app)**

## 🛠️ Tech Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React & React Icons
- **Deployment**: Vercel

## ✨ Key Features
- **SaaS Dashboard UI**: Clean, developer-focused interface inspired by Linear and Vercel.
- **Dynamic Data Layer**: Content driven entirely by JSON (projects, skills, achievements) for easy maintenance.
- **System Architecture Visualizations**: Custom built CSS/Framer Motion node diagrams to explain engineering decisions.
- **Performance Optimized**: Achieves near-perfect Lighthouse scores through route-level code splitting (`React.lazy`) and optimized rendering.
- **Fully Responsive**: Adapts seamlessly from mobile to ultra-wide desktop monitors.

## 📁 Folder Structure
```
src/
 ├── assets/        # Static images and icons
 ├── components/    # Reusable React components
 │    ├── common/   # Global components (Footer, etc)
 │    ├── dashboard/# Dashboard-specific widgets (TechRadar, Timeline)
 │    ├── layouts/  # Structural wrappers (Sidebar, DashboardLayout)
 │    ├── projects/ # Project-specific components (ArchitectureDiagram)
 │    └── ui/       # Small UI elements (Typewriter, LoadingSpinner)
 ├── data/          # JSON data layer (profile.json, projects.json)
 ├── pages/         # Top-level route views (DashboardView, ProjectDetailView)
 └── main.jsx       # Application entry point
```

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogeswaranv007/portfolio.git
   cd portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment (Vercel)
This project is configured for seamless deployment on Vercel.
1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
4. Vercel will automatically detect Vite and configure the routing using the included `vercel.json` file.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
