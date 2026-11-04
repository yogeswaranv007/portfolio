import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaJava, FaReact } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql } from 'react-icons/si';
import { portfolioService } from '../../services/portfolioService';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import resumeMeta from '../../data/resume.json';

const FloatingBadge = ({ icon: Icon, delay, className, label, colorClass }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 4.5, delay, ease: 'easeInOut' }}
    className={`absolute z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md bg-cards/90 border border-borders/80 shadow-[0_8px_20px_rgba(0,0,0,0.15)] text-xs font-mono font-semibold transition-transform hover:scale-110 cursor-default select-none ${className}`}
    title={label}
  >
    <Icon className={`w-4 h-4 ${colorClass}`} />
    <span className="hidden sm:inline text-text">{label}</span>
  </motion.div>
);

export function Hero() {
  const [profileData, setProfileData] = useState(() => portfolioService.getLocalProfile());

  useEffect(() => {
    let isMounted = true;
    portfolioService.getProfile().then((data) => {
      if (isMounted && data) setProfileData(data);
    }).catch(() => { });
    return () => { isMounted = false; };
  }, []);

  const headline = profileData.headline || "Final-year B.Tech IT student | Java, Spring Boot, React | AI/GenAI integrations";
  const resumePath = resumeMeta.path || "/resume/PLACEHOLDER_RESUME_FILENAME.pdf";

  return (
    <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-12 md:py-20 relative overflow-visible" id="home">
      {/* Left Column: Hero Text & CTAs (Slides in from Left) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-6 z-10 text-center lg:text-left transform-gpu"
      >
        {/* Status / Role pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Available for Fresher &amp; Intern Opportunities</span>
        </div>

        {/* Primary Name */}
        <div className="space-y-2">
          <p className="text-sm font-mono text-primary font-semibold tracking-wider uppercase">
            Hi, my name is
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text">
            {profileData.name}
          </h1>
        </div>

        {/* Headline */}
        <p className="text-lg sm:text-xl font-medium text-text-muted max-w-2xl leading-relaxed">
          {headline}
        </p>

        {/* Brief summary */}
        <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl font-normal">
          {profileData.summary || profileData.about}
        </p>

        {/* 2 Primary CTAs + Resume + Socials */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
          {/* CTA 1: View Projects */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-primary/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* CTA 2: Contact */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cards hover:bg-cards-hover border border-borders text-text text-sm font-semibold rounded-xl transition-all shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>Contact Me</span>
          </a>

          {/* Resume Download with clearly marked placeholder */}
          <a
            href={resumePath}
            download={resumeMeta.name || "Yogeswaran_V_Resume.pdf"}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-cards hover:bg-cards-hover border border-borders text-text-muted hover:text-text text-sm font-medium rounded-xl transition-all hover:-translate-y-0.5"
            title="Download Resume PDF (Placeholder file path configured)"
          >
            <FileDown className="w-4 h-4 text-primary" />
            <span>Resume</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-2 pl-2">
            <a
              href="https://github.com/yogeswaranv007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-text hover:-translate-y-0.5 transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/yogeswaranv"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-borders bg-cards hover:border-primary/50 text-text-muted hover:text-primary hover:-translate-y-0.5 transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Interactive 3D Golden-Ratio Portrait (Slides in from Right) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-5/12 max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] relative mx-auto flex items-center justify-center transform-gpu"
      >
        {/* Dynamic Dual Ambient Glow Backlight */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-amber-500/20 to-primary/30 dark:from-primary/40 dark:via-cyan-400/20 dark:to-indigo-500/30 rounded-[2.5rem] blur-2xl -z-10 opacity-70 animate-pulse duration-1000" />

        {/* Floating Interactive Tech Badges */}
        <FloatingBadge icon={FaJava} delay={0} label="Java" colorClass="text-[#ED8B00]" className="top-8 -left-3 sm:-left-6" />
        <FloatingBadge icon={SiSpringboot} delay={1.2} label="Spring Boot" colorClass="text-[#6DB33F]" className="top-24 -right-3 sm:-right-6" />
        <FloatingBadge icon={FaReact} delay={2.4} label="React" colorClass="text-[#61DAFB]" className="bottom-28 -left-3 sm:-left-6" />
        <FloatingBadge icon={SiPostgresql} delay={1.8} label="PostgreSQL" colorClass="text-[#4169E1]" className="bottom-8 -right-3 sm:-right-6" />

        {/* Interactive 3D Perspective Tilt Card */}
        <Tilt3DCard
          maxTilt={7}
          scale={1.02}
          glare={true}
          className="w-full rounded-[2rem] overflow-hidden ring-1 ring-white/20 dark:ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] group cursor-pointer"
        >
          {/* Optimal 4:5 Golden Portrait Ratio with center-top focus (eliminating empty ceiling while preserving suit & face) */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-primary/10 to-transparent">
            <img
              src={profileData.imageBase64 || "/yoges_profile.jpeg"}
              alt="Yogeswaran V"
              width="720"
              height="1280"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-[center_22%] grayscale-[5%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 select-none block"
            />
            {/* Subtle bottom vignette to blend suit with card base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </Tilt3DCard>
      </motion.div>
    </section>
  );
}
