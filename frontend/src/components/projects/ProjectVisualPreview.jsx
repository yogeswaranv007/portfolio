import React, { useState } from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  QrCode, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  BatteryCharging,
  Clock,
  UserCheck
} from 'lucide-react';
import { FaJava, FaReact, FaPython, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMongodb, SiFastapi } from 'react-icons/si';

export function ProjectVisualPreview({ project }) {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'architecture'

  const id = project.id;

  return (
    <div className="rounded-xl overflow-hidden border border-borders bg-background/80 shadow-md">
      {/* Top Browser Bar / Tab Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-cards border-b border-borders text-xs">
        {/* macOS style window buttons */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] text-text-muted hidden sm:inline truncate max-w-[200px]">
            {project.liveUrl || project.githubUrl || project.title}
          </span>
        </div>

        {/* Tab Toggle: App Preview vs Architecture Diagram */}
        <div className="flex items-center gap-1 bg-background p-0.5 rounded-lg border border-borders">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-0.5 text-[11px] font-medium rounded-md transition-all ${
              activeTab === 'preview'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            App Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-0.5 text-[11px] font-medium rounded-md transition-all ${
              activeTab === 'architecture'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* Main Visual Content Body */}
      <div className="p-4 sm:p-5 min-h-[220px] flex items-center justify-center">
        {activeTab === 'preview' ? (
          <div className="w-full">
            {id === 'bit-alumni-connect' && <BitAlumniPreview />}
            {id === 'mospi-survey' && <MospiSurveyPreview />}
            {id === 'course-optimizer' && <CourseOptimizerPreview />}
            {id === 'battery-vehicle' && <BatteryVehiclePreview />}
          </div>
        ) : (
          <div className="w-full">
            {id === 'bit-alumni-connect' && <BitAlumniArch />}
            {id === 'mospi-survey' && <MospiSurveyArch />}
            {id === 'course-optimizer' && <CourseOptimizerArch />}
            {id === 'battery-vehicle' && <BatteryVehicleArch />}
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 1. BIT Alumni Connect Previews
// =========================================================================
function BitAlumniPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      {/* Virtual ID Card Mockup */}
      <div className="sm:col-span-5 p-3 rounded-xl bg-gradient-to-br from-primary/15 via-cards to-cards border border-primary/30 flex flex-col justify-between space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
            BIT Virtual Alumni ID
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-background border border-borders flex items-center justify-center p-1">
            <QrCode className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-text">Alumni Member</p>
            <p className="text-[10px] font-mono text-text-muted">Batch 2026 &bull; IT Dept</p>
            <span className="inline-block px-1.5 py-0.2 text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded">
              Gate Clearance Active
            </span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-borders/60 text-[9px] font-mono text-text-muted flex justify-between">
          <span>QR Verification: Valid</span>
          <span>Security Pin: #8821</span>
        </div>
      </div>

      {/* Engagement & Events Portal Mockup */}
      <div className="sm:col-span-7 space-y-2">
        <div className="p-2.5 rounded-lg bg-cards border border-borders flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-text">Campus Visit Request</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
            Approved
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-cards border border-borders space-y-1.5">
          <div className="flex items-center justify-between text-xs text-text font-medium">
            <span>Alumni Directory Search</span>
            <span className="text-[10px] font-mono text-primary font-bold">15 Feature Modules</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['Alumni', 'Students', 'Faculty', 'Watchman', 'Admin'].map((role) => (
              <span key={role} className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-background border border-borders text-text-muted">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BitAlumniArch() {
  return (
    <div className="space-y-2.5 text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-cards border border-borders">
        <div className="flex items-center gap-2">
          <FaReact className="w-5 h-5 text-[#61DAFB]" />
          <div>
            <p className="font-bold text-text">Vercel (Edge)</p>
            <p className="text-[10px] text-text-muted">React 18 + Vite SPA</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          HTTPS / REST &rarr;
        </span>

        <div className="flex items-center gap-2">
          <SiSpringboot className="w-5 h-5 text-[#6DB33F]" />
          <div>
            <p className="font-bold text-text">Render (Docker)</p>
            <p className="text-[10px] text-text-muted">Spring Boot 3.4 (Java 21)</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          TLS JDBC &rarr;
        </span>

        <div className="flex items-center gap-2">
          <SiPostgresql className="w-5 h-5 text-[#4169E1]" />
          <div>
            <p className="font-bold text-text">Neon PostgreSQL</p>
            <p className="text-[10px] text-text-muted">26 Relational Entities</p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-text-muted font-sans font-light">
        ~100 REST endpoints secured with Spring Security RBAC and stateless JWT auth.
      </p>
    </div>
  );
}

// =========================================================================
// 2. AI Smart Survey Platform Previews
// =========================================================================
function MospiSurveyPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      {/* WhatsApp Delivery Mockup */}
      <div className="sm:col-span-6 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> Twilio WhatsApp / SMS Delivery
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 rounded-lg bg-cards border border-borders text-text-muted text-[10px] leading-tight">
            <p className="font-semibold text-text mb-0.5">MoSPI Citizen Survey Bot:</p>
            "Namaste! How accessible are public transport facilities in your district? Reply 1 for English, 2 for தமிழ், 3 for हिन्दी"
          </div>
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-text ml-4 text-[10px]">
            "Bhashini Speech-to-Text: Verified audio response processed."
          </div>
        </div>
      </div>

      {/* RAG & Analytics Mockup */}
      <div className="sm:col-span-6 p-3 rounded-xl bg-cards border border-borders space-y-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-text flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Semantic Analysis
            </span>
            <span className="text-[10px] font-mono text-primary font-bold">Top 25 Finalist</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            FastAPI engine running SentenceTransformers BGE-M3 embeddings &amp; RAG over unstructured citizen responses.
          </p>
        </div>

        <div className="space-y-1 pt-1 border-t border-borders/60 text-[10px] font-mono">
          <div className="flex justify-between text-text-muted">
            <span>Semantic Confidence:</span>
            <span className="text-emerald-500 font-bold">98.4%</span>
          </div>
          <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[98%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MospiSurveyArch() {
  return (
    <div className="space-y-2.5 text-xs font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-cards border border-borders flex items-center gap-2">
          <FaReact className="w-5 h-5 text-[#61DAFB]" />
          <div>
            <p className="font-bold text-text">React Frontend</p>
            <p className="text-[10px] text-text-muted">Survey Builder UI</p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-cards border border-borders flex items-center gap-2">
          <SiSpringboot className="w-5 h-5 text-[#6DB33F]" />
          <div>
            <p className="font-bold text-text">Spring Boot Core</p>
            <p className="text-[10px] text-text-muted">Twilio &amp; Distribution</p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-cards border border-borders flex items-center gap-2">
          <SiFastapi className="w-5 h-5 text-[#009688]" />
          <div>
            <p className="font-bold text-text">FastAPI AI Engine</p>
            <p className="text-[10px] text-text-muted">RAG + Bhashini Speech</p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-text-muted font-sans font-light">
        National Grand Finalist architecture evaluated among 5,300+ submissions across India.
      </p>
    </div>
  );
}

// =========================================================================
// 3. AI Learning Roadmap Generator Previews
// =========================================================================
function CourseOptimizerPreview() {
  return (
    <div className="p-3.5 rounded-xl bg-cards border border-borders space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-text">Target: Backend Product Engineer</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
          Groq LLaMA-3 (0.38s)
        </span>
      </div>

      {/* Dynamic Roadmap Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-0.5">
          <p className="font-bold flex items-center justify-between">
            <span>Phase 1: Core DSA</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </p>
          <p className="text-text-muted">Mastery in Java Collections &amp; Trees</p>
        </div>

        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-primary space-y-0.5">
          <p className="font-bold flex items-center justify-between">
            <span>Phase 2: Spring Boot</span>
            <span className="animate-pulse">&bull; Active</span>
          </p>
          <p className="text-text-muted">REST APIs, JPA &amp; JWT Tokens</p>
        </div>

        <div className="p-2 rounded-lg bg-background border border-borders text-text-muted space-y-0.5">
          <p className="font-bold text-text">Phase 3: AI &amp; Cloud</p>
          <p>RAG pipelines &amp; Containerization</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-text-muted border-t border-borders/50 pt-2 font-mono">
        <span>Defensive Fallback: Active</span>
        <span>CI/CD: GitHub Actions</span>
      </div>
    </div>
  );
}

function CourseOptimizerArch() {
  return (
    <div className="space-y-2.5 text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-cards border border-borders">
        <div className="flex items-center gap-2">
          <FaReact className="w-5 h-5 text-[#61DAFB]" />
          <div>
            <p className="font-bold text-text">React UI</p>
            <p className="text-[10px] text-text-muted">Interactive Form</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          JWT + Refresh &rarr;
        </span>

        <div className="flex items-center gap-2">
          <FaNodeJs className="w-5 h-5 text-[#339933]" />
          <div>
            <p className="font-bold text-text">Express API</p>
            <p className="text-[10px] text-text-muted">~40 REST Endpoints</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          Fallback AI &rarr;
        </span>

        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-500" />
          <div>
            <p className="font-bold text-text">Groq LLM / Algorithmic</p>
            <p className="text-[10px] text-text-muted">Curriculum Generator</p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-text-muted font-sans font-light">
        Rule-based skill-gap analysis enriched by Groq LLM with deterministic algorithmic fallback resilience.
      </p>
    </div>
  );
}

// =========================================================================
// 4. Battery Vehicle Booking Previews
// =========================================================================
function BatteryVehiclePreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      {/* Vehicle Status & Route Mockup */}
      <div className="sm:col-span-6 p-3 rounded-xl bg-cards border border-borders space-y-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-text flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" /> Vehicle Shuttle #04
          </span>
          <span className="text-[10px] font-mono font-bold text-emerald-500">88% Battery</span>
        </div>

        <div className="space-y-1 text-[11px]">
          <p className="font-semibold text-text">Route Assignment:</p>
          <p className="text-text-muted font-mono text-[10px]">
            Pickup: <span className="text-text">IT Block Main Gate</span> &rarr; Dest: <span className="text-text">Hostel Block C</span>
          </p>
        </div>

        <div className="pt-1.5 border-t border-borders/50 flex items-center justify-between text-[10px] font-mono">
          <span className="text-emerald-500 font-bold">Approved for Transit</span>
          <span className="text-text-muted">Conflicts: 0</span>
        </div>
      </div>

      {/* Role Workflows Mockup */}
      <div className="sm:col-span-6 p-3 rounded-xl bg-cards border border-borders space-y-2 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-text flex items-center gap-1.5 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-primary" /> Role-Based Transit Flow
          </span>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Multi-tier dashboard for student booking, admin route authorization, and watchman departure clearance.
          </p>
        </div>

        <div className="p-2 rounded-lg bg-background border border-borders text-[10px] font-mono flex items-center justify-between">
          <span>Active Backend: MERN Live</span>
          <span className="text-primary font-bold">Spring Boot Branch</span>
        </div>
      </div>
    </div>
  );
}

function BatteryVehicleArch() {
  return (
    <div className="space-y-2.5 text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-cards border border-borders">
        <div className="flex items-center gap-2">
          <FaReact className="w-5 h-5 text-[#61DAFB]" />
          <div>
            <p className="font-bold text-text">React Frontend</p>
            <p className="text-[10px] text-text-muted">Student &amp; Watchman Portal</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          REST API &rarr;
        </span>

        <div className="flex items-center gap-2">
          <FaNodeJs className="w-5 h-5 text-[#339933]" />
          <div>
            <p className="font-bold text-text">Node.js Live / Spring Boot Branch</p>
            <p className="text-[10px] text-text-muted">Express / Spring Data JPA</p>
          </div>
        </div>

        <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
          Database &rarr;
        </span>

        <div className="flex items-center gap-2">
          <SiMongodb className="w-5 h-5 text-[#47A248]" />
          <div>
            <p className="font-bold text-text">MongoDB / TiDB Cloud</p>
            <p className="text-[10px] text-text-muted">Relational Migration</p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-text-muted font-sans font-light">
        Production MERN deployed on Vercel with complete Spring Boot + TiDB relational migration branch.
      </p>
    </div>
  );
}

