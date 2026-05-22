"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiMail,
  FiPhone,
  FiDownload,
  FiExternalLink,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiSend,
} from "react-icons/fi";
import {
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiFlutter,
  SiCanva,
} from "react-icons/si";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TECH_STACK = [
  { icon: FaHtml5, label: "HTML5", color: "#e34f26" },
  { icon: FaCss3Alt, label: "CSS3", color: "#264de4" },
  { icon: FaJs, label: "JavaScript", color: "#f7df1e" },
  { icon: FaReact, label: "React.js", color: "#61dafb" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: FaNodeJs, label: "Node.js", color: "#68a063" },
  { icon: SiExpress, label: "Express.js", color: "#cccccc" },
  { icon: SiMongodb, label: "MongoDB", color: "#4db33d" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
  { icon: SiFlutter, label: "Flutter", color: "#54c5f8" },
  { icon: SiCanva, label: "Canva", color: "#00c4cc" },
];

const SKILLS = [
  { label: "MERN Stack Development", pct: 80, cat: "Development" },
  { label: "React / Next.js", pct: 78, cat: "Development" },
  { label: "JavaScript (ES6+)", pct: 75, cat: "Development" },
  { label: "Flutter (Learning)", pct: 40, cat: "Development" },
  { label: "Adobe Photoshop", pct: 85, cat: "Design" },
  { label: "Adobe Illustrator", pct: 75, cat: "Design" },
  { label: "Canva", pct: 90, cat: "Design" },
  { label: "Premiere Pro", pct: 70, cat: "Design" },
  { label: "Leadership", pct: 90, cat: "Soft Skills" },
  { label: "Public Speaking (English)", pct: 85, cat: "Soft Skills" },
  { label: "Team Collaboration", pct: 92, cat: "Soft Skills" },
];

const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    inst: "Daffodil International University",
    period: "2022 – Present",
    detail: "3rd year student, pursuing full-stack development & research",
    icon: "🎓",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    inst: "BEPZA Public School and College",
    period: "– 2022",
    detail: "Science group",
    icon: "📘",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    inst: "Radio Colony Model School and College",
    period: "– 2020",
    detail: "Science group — National scholarship recipient",
    icon: "🏫",
  },
];

const EXPERIENCE = [
  {
    role: "Assistant General Secretary",
    org: "Embedded Systems Research Center",
    period: "July 2026 – Present",
    points: [
      "Coordinate meetings, events, and communication between faculty, students, and external partners.",
      "Maintain digital records and ensure smooth internal operations for ongoing research projects.",
    ],
  },
  {
    role: "Senior Graphic Designer & Content Creator",
    org: "IEEE DIU SB SIGHT GROUP",
    period: "Feb 2026 – Feb 2027",
    points: [
      "Create professional visual content for IEEE events and campaigns.",
      "Manage social media creatives and branding for the group.",
    ],
  },
];

const PROJECTS = [
  {
    title: "MERN E-Commerce Platform",
    desc: "A full-stack e-commerce app with user authentication, product management, cart, and payment integration built with the MERN stack.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: null,
    demo: "#",
    github: "https://github.com/sayed-sr",
    challenges:
      "Handling JWT refresh tokens securely and building a real-time inventory system.",
    future: "Add AI-based product recommendations and mobile app with Flutter.",
  },
  {
    title: "IEEE INDcon Project — Champion 2025",
    desc: "Team project that won the IEEE INDcon 2025 competition in Bangladesh. Involved embedded systems design and real-world problem solving.",
    tech: ["Embedded Systems", "C++", "IEEE Standards"],
    image: null,
    demo: "#",
    github: "https://github.com/sayed-sr",
    challenges:
      "Coordinating a multidisciplinary team under competition pressure and tight deadlines.",
    future: "Publish findings as a research paper and expand the prototype.",
  },
  {
    title: "Portfolio Website",
    desc: "This very portfolio — a single-page Next.js application featuring smooth animations, dark/light mode, and responsive design.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: null,
    demo: "#",
    github: "https://github.com/sayed-sr",
    challenges:
      "Achieving pixel-perfect responsiveness across all devices with complex animations.",
    future:
      "Add a blog section and integrate a CMS for dynamic project updates.",
  },
];

const ACHIEVEMENTS = [
  {
    title: "IEEE INDcon 2025 Champion 🏆",
    desc: "Led team to championship victory in Bangladesh's IEEE INDcon 2025 competition.",
  },
  {
    title: "Microsoft AI & Copilot Certified",
    desc: "Completed 3 learning paths and 7 modules on AI & Microsoft 365 Copilot (June 2025).",
  },
  {
    title: "Government Scholarship (Class 1–10)",
    desc: "Awarded yearly national-level scholarships for outstanding academic performance.",
  },
  {
    title: "Research Seminar Certificate",
    desc: "Completed 'Way of Research' seminar organized by Md. Hasan Bijoy.",
  },
];

/* ─────────────────────────────── HELPERS ─────────────────────────────── */

function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────── COMPONENTS ─────────────────────────────── */

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s",
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-space)",
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          SR<span style={{ color: "var(--accent2)" }}>.</span>
        </button>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background:
                  active === l.href
                    ? "rgba(124,58,237,0.12)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0.875rem",
                borderRadius: 8,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: active === l.href ? "var(--accent2)" : "var(--muted)",
                fontFamily: "var(--font-space)",
                transition: "all 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.5rem",
              cursor: "pointer",
              color: "var(--accent2)",
              marginLeft: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={toggleTheme}
            className="show-mobile"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.5rem",
              cursor: "pointer",
              color: "var(--accent2)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: "var(--bg2)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background:
                    active === l.href
                      ? "rgba(124,58,237,0.12)"
                      : "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                  borderRadius: 8,
                  textAlign: "left",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color:
                    active === l.href ? "var(--accent2)" : "var(--muted)",
                  fontFamily: "var(--font-space)",
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-image-col {
            display: none !important;
          }
          #hero > div {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          #hero > div {
            padding: 0 1rem !important;
          }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  const roles = [
    "MERN Stack Developer",
    "CSE Student @ DIU",
    "IEEE Champion 🏆",
    "Graphic Designer",
    "Flutter Learner",
  ];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: 700,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: 99,
                padding: "0.375rem 1rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "var(--accent2)",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              👋 Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "var(--text)",
            }}
          >
            Md.
            
            <span className="gradient-text"> Sayed</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 600,
              color: "var(--muted)",
              minHeight: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "var(--accent2)" }}>{">"}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              color: "var(--muted)",
              lineHeight: 1.7,
              fontSize: "1.05rem",
              maxWidth: 540,
            }}
          >
            3rd-year CSE student at DIU building full-stack web apps with the
            MERN stack. IEEE INDcon 2025 Champion & passionate about blending
            code with creative design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            {/* FIX: was missing the opening <a tag — was just attributes floating in JSX */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--accent)",
                color: "#fff",
                padding: "0.875rem 1.75rem",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 0 30px rgba(124,58,237,0.3)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FiSend size={16} /> Hire Me
            </a>
            {/* FIX: was missing the opening <a tag */}
            <a
              href="/cv.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "var(--text)",
                padding: "0.875rem 1.75rem",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent2)";
                e.currentTarget.style.color = "var(--accent2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FiDownload size={16} /> Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            {[
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/sayed-sr",
                color: "#0077b5",
                label: "LinkedIn",
              },
              {
                icon: FaGithub,
                href: "https://github.com/sayed-sr",
                color: "#6e5494",
                label: "GitHub",
              },
              {
                icon: FaWhatsapp,
                href: "https://wa.me/8801771788176",
                color: "#25d366",
                label: "WhatsApp",
              },
              {
                icon: FaTelegram,
                href: "https://t.me/md_sayed_islam",
                color: "#229ed9",
                label: "Telegram",
              },
              {
                icon: FiMail,
                href: "mailto:sr.sayedislamrifat@gmail.com",
                color: "#ea4335",
                label: "Email",
              },
            ].map(({ icon: Icon, href, color, label }) => (
              // FIX: was missing the opening <a tag inside .map()
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: color,
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Profile picture — right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-image-col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: "3px solid var(--accent)",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(124,58,237,0.3)",
              flexShrink: 0,
            }}
          >
            <img
              src="/me.png"
              alt="Md. Sayed Islam Rifat"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // who I am
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            About <span>Me</span>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          <FadeIn delay={0.1}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "2rem", height: "100%" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💻</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                  color: "var(--text)",
                }}
              >
                My Journey
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                I started coding with curiosity and quickly fell in love with
                building things on the web. As a 3rd-year CSE student at
                Daffodil International University, I've grown from writing my
                first HTML page to shipping full-stack MERN applications. Every
                project teaches me something new.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "2rem", height: "100%" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                  color: "var(--text)",
                }}
              >
                What I Do
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                I specialize in MERN stack development, creating scalable web
                applications from database to UI. I'm also a Senior Graphic
                Designer at IEEE DIU SB and an active researcher — I led my
                team to the IEEE INDcon 2025 Championship in Bangladesh.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "2rem", height: "100%" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎨</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                  color: "var(--text)",
                }}
              >
                Beyond Code
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                Outside programming, I enjoy graphic design (Photoshop,
                Illustrator, Premiere Pro), public speaking in English, and
                team leadership. I believe great products need both solid
                engineering AND great design — and I love doing both.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Achievements */}
        <FadeIn delay={0.2} className="mt-12">
          <div style={{ marginTop: "3rem" }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: "1.5rem",
                color: "var(--text)",
              }}
            >
              Achievements & Certifications
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {ACHIEVEMENTS.map((a, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: "1.25rem",
                      borderLeft: "3px solid var(--accent)",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--text)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {a.title}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                      {a.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  const categories = ["Development", "Design", "Soft Skills"];

  return (
    <section
      id="skills"
      style={{ padding: "6rem 1.5rem", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // what I know
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            Tech Stack & <span>Skills</span>
          </h2>
        </FadeIn>

        {/* Icon grid */}
        <FadeIn delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
              gap: "1rem",
              marginBottom: "4rem",
            }}
          >
            {TECH_STACK.map(({ icon: Icon, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ y: -6, scale: 1.05 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1.25rem 0.75rem",
                  borderRadius: 14,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  cursor: "default",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = color)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                <Icon size={32} color={color} />
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Skill bars */}
        {categories.map((cat) => (
          <FadeIn key={cat} delay={0.1}>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--accent2)",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {cat}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1rem",
                }}
              >
                {SKILLS.filter((s) => s.cat === cat).map((s) => (
                  <SkillBar key={s.label} skill={s} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SkillBar({ skill }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ marginBottom: "0.25rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "var(--text)" }}>
          {skill.label}
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--accent2)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {skill.pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "var(--border)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, var(--accent), var(--accent3))",
          }}
        />
      </div>
    </div>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // where I studied
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            <span>Education</span>
          </h2>
        </FadeIn>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--border)",
            }}
          />

          {EDUCATION.map((e, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  marginBottom: "2rem",
                  position: "relative",
                }}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--card)",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {e.icon}
                </div>

                <div
                  className="glass"
                  style={{
                    borderRadius: 16,
                    padding: "1.5rem",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "var(--text)",
                      }}
                    >
                      {e.degree}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--accent2)",
                        fontFamily: "var(--font-mono)",
                        background: "rgba(124,58,237,0.12)",
                        padding: "0.2rem 0.75rem",
                        borderRadius: 99,
                      }}
                    >
                      {e.period}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--accent3)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {e.inst}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                    {e.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "6rem 1.5rem", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // where I've worked
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            Work <span>Experience</span>
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {EXPERIENCE.map((ex, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                className="glass"
                style={{ borderRadius: 18, padding: "2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                    }}
                  >
                    {ex.role}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--accent2)",
                      fontFamily: "var(--font-mono)",
                      background: "rgba(124,58,237,0.12)",
                      padding: "0.2rem 0.75rem",
                      borderRadius: 99,
                    }}
                  >
                    {ex.period}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--accent3)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {ex.org}
                </p>
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                  {ex.points.map((pt, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        color: "var(--muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--accent2)", marginTop: 2 }}>
                        ▸
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // what I've built
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            My <span>Projects</span>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "border-color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                {/* Project image placeholder */}
                <div
                  style={{
                    height: 180,
                    background: `linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {i === 0 ? "🛒" : i === 1 ? "🏆" : "🌐"}
                </div>

                <div
                  style={{
                    padding: "1.5rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>

                  {/* Tech tags */}
                  <div
                    style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.2rem 0.6rem",
                          borderRadius: 99,
                          background: "rgba(124,58,237,0.1)",
                          border: "1px solid rgba(124,58,237,0.25)",
                          color: "var(--accent2)",
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelected(p)}
                    style={{
                      marginTop: "0.5rem",
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      borderRadius: 10,
                      padding: "0.625rem 1rem",
                      color: "var(--accent2)",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-space)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(124,58,237,0.22)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(124,58,237,0.12)")
                    }
                  >
                    View Details →
                  </button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 24,
                padding: "2.5rem",
                maxWidth: 620,
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "var(--text)",
                  }}
                >
                  {selected.title}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "0.4rem",
                    cursor: "pointer",
                    color: "var(--muted)",
                    display: "flex",
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem",
                }}
              >
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: 99,
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: "var(--accent2)",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {[
                { label: "Description", content: selected.desc },
                { label: "Challenges", content: selected.challenges },
                { label: "Future Plans", content: selected.future },
              ].map(({ label, content }) => (
                <div key={label} style={{ marginBottom: "1.25rem" }}>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      color: "var(--accent2)",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {label}
                  </h4>
                  <p
                    style={{
                      color: "var(--muted)",
                      lineHeight: 1.75,
                      fontSize: "0.9rem",
                    }}
                  >
                    {content}
                  </p>
                </div>
              ))}

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                {/* FIX: was missing the opening <a tag in modal */}
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "0.75rem 1.25rem",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  <FiExternalLink size={15} /> Live Demo
                </a>
                {/* FIX: was missing the opening <a tag in modal */}
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "transparent",
                    color: "var(--text)",
                    padding: "0.75rem 1.25rem",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    border: "1px solid var(--border)",
                  }}
                >
                  <FaGithub size={15} /> GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%",
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "0.875rem 1rem",
    color: "var(--text)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-space)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 1.5rem", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // get in touch
          </p>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            Contact <span>Me</span>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Contact info */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "1rem" }}>
                I'm open to freelance projects, collaboration, and full-time
                opportunities. Feel free to reach out via any channel below or
                fill in the form!
              </p>

              {[
                {
                  icon: FiMail,
                  label: "Email",
                  value: "sr.sayedislamrifat@gmail.com",
                  href: "mailto:sr.sayedislamrifat@gmail.com",
                },
                {
                  icon: FiPhone,
                  label: "Phone / WhatsApp",
                  value: "+880 1771-788176",
                  href: "https://wa.me/8801771788176",
                },
                {
                  icon: FaTelegram,
                  label: "Telegram",
                  value: "@md_sayed_islam",
                  href: "https://t.me/md_sayed_islam",
                },
                {
                  icon: FaLinkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/sayed-sr",
                  href: "https://www.linkedin.com/in/sayed-sr",
                },
                {
                  icon: FaGithub,
                  label: "GitHub",
                  value: "github.com/sayed-sr",
                  href: "https://github.com/sayed-sr",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                // FIX: was missing the opening <a tag inside .map()
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    padding: "1rem",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent2)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(124,58,237,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent2)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: "0.1rem",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        fontWeight: 600,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "2rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  style={inputStyle}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
                <textarea
                  style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />

                <button
                  onClick={handleSubmit}
                  disabled={sending || sent}
                  style={{
                    background: sent
                      ? "rgba(34,197,94,0.2)"
                      : "var(--accent)",
                    color: sent ? "#22c55e" : "#fff",
                    border: sent ? "1px solid #22c55e" : "none",
                    borderRadius: 12,
                    padding: "0.875rem",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: sending ? "wait" : "pointer",
                    fontFamily: "var(--font-space)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s",
                    opacity: sending ? 0.8 : 1,
                  }}
                >
                  {sent ? "✓ Message Sent!" : sending ? "Sending..." : (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "2.5rem 1.5rem",
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          SR<span style={{ color: "var(--accent2)" }}>.</span>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: FaLinkedin, href: "https://www.linkedin.com/in/sayed-sr", color: "#0077b5" },
            { icon: FaGithub, href: "https://github.com/sayed-sr", color: "#6e5494" },
            { icon: FaWhatsapp, href: "https://wa.me/8801771788176", color: "#25d366" },
            { icon: FaTelegram, href: "https://t.me/md_sayed_islam", color: "#229ed9" },
            { icon: FiMail, href: "mailto:sr.sayedislamrifat@gmail.com", color: "#ea4335" },
          ].map(({ icon: Icon, href, color }, i) => (
            // FIX: was missing the opening <a tag inside .map()
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--card)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} Md. Sayed Islam Rifat. Crafted with Next.js & ❤️
        </p>
      </div>
    </footer>
  );
}

/* Fixed LinkedIn Badge */
function LinkedInBadge() {
  return (
    <motion.a
      href="https://www.linkedin.com/in/sayed-sr"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "#0077b5",
        color: "#fff",
        padding: "0.75rem 1rem",
        borderRadius: 12,
        fontWeight: 700,
        fontSize: "0.8rem",
        textDecoration: "none",
        boxShadow: "0 8px 30px rgba(0,119,181,0.4)",
        fontFamily: "var(--font-space)",
      }}
    >
      <FaLinkedin size={18} />
      <span>Connect</span>
    </motion.a>
  );
}

/* ─────────────────────────────── PAGE ─────────────────────────────── */

export default function Page() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="noise-bg" style={{ minHeight: "100vh" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <LinkedInBadge />
    </div>
  );
}
