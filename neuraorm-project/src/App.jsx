import { useState, useEffect, useRef, useCallback } from "react";
import sketch from "./assets/sketch_2.png";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Andrea Orama Cedó",
  roles: ["Software Engineer", "QA Automation Engineer", "Product Support Engineer"],
  tagline:
    "I'm a software engineer with hands-on AI experience and a strong focus on product support, quality, and real-world problem solving. I enjoy working close to users, debugging complex issues, improving product reliability, and making advanced technology easier to use.",
  location: "Spain",
  availability: "Open to new opportunities",
  email: "neuraorm@gmail.com",
  linkedin: "https://www.linkedin.com/in/andrea-orama/",
  cvUrl: "/neuraorm_project/cv_aorama.pdf",
  lastUpdated: "May 2026",
  skills: [
    // Programming
    { label: "Python",        note: "Primary language for debugging, automation, and backend workflows" },
    { label: "Java",          note: "Core language throughout BSc Software Engineering" },
    { label: "SQL",           note: "Data querying and analysis across multiple roles" },
    { label: "JavaScript",    note: "Used for web-based tools and interfaces" },
    { label: "Swift",         note: "Apple — iOS test automation" },
    { label: "Objective-C",   note: "Apple — legacy iOS test suites" },
  
    // QA & Testing (this is your edge — highlight it)
    { label: "API Testing",       note: "Postman, production API validation, integration debugging" },
    { label: "Test Automation",   note: "Automated critical test flows at Apple (50% coverage)" },
    { label: "Debugging",         note: "Reproducing and isolating production issues in API/LLM systems" },
    { label: "Defect Analysis",   note: "Root cause identification and issue tracking (GitLab Issues)" },
    { label: "Test Planning",     note: "Designed test plans and validation workflows" },
  
    // AI / Systems (keep but not overhyped)
    { label: "LLMs",              note: "Evaluation and production support (Multiverse, Microsoft)" },
    { label: "NLP",               note: "MSc research — code-switching ASR" },
    { label: "Prompt Engineering",note: "Applied across Microsoft and production AI systems" },
    { label: "Model Evaluation",  note: "Performance, accuracy, and output quality analysis" },
  
    // Systems & Support (VERY important for your profile)
    { label: "Production Support", note: "Troubleshooting API and AI systems in live environments" },
    { label: "API Integration",    note: "REST APIs and system-level debugging" },
    { label: "Performance Analysis", note: "Benchmarking and regression detection" },
  
    // Tools
    { label: "Git",           note: "Version control across all projects" },
    { label: "Postman",       note: "API testing and debugging workflows" },
    { label: "GitLab",        note: "Issue tracking and QA workflows" },
    { label: "CI/CD",         note: "Basic pipeline usage and validation" },
    { label: "PyTorch",       note: "Deep learning experimentation (MSc)" },
    { label: "TensorFlow",    note: "Academic ML workflows" },
  ]
};

const LOGOS = {
  "Multiverse Computing": { bg: "#200a0d", initials: "MC", color: "#eb2828" },
  "Technical University of Madrid (UPM)": { bg: "#0d1a2e", initials: "UPM", color: "#60a5fa", small: true },
  "Microsoft": {
    bg: "#0f1824",
    svg: (
      <svg width="20" height="20" viewBox="0 0 21 21">
        <rect x="1"  y="1"  width="9" height="9" fill="#f25022" />
        <rect x="11" y="1"  width="9" height="9" fill="#7fba00" />
        <rect x="1"  y="11" width="9" height="9" fill="#00a4ef" />
        <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
      </svg>
    ),
  },
  "Apple": {
    bg: "#181818",
    svg: (
      <svg width="17" height="21" viewBox="-2 -3 22 27" fill="rgba(255,255,255,0.82)">
        <path d="M14.769 10.552c-.027-3.018 2.47-4.48 2.581-4.55-1.41-2.056-3.601-2.337-4.372-2.366-1.857-.188-3.63 1.094-4.573 1.094-.944 0-2.393-1.067-3.933-1.04-2.02.03-3.888 1.174-4.925 2.973-2.1 3.64-.537 9.028 1.506 11.984 1.002 1.449 2.193 3.074 3.757 3.016 1.51-.061 2.08-.972 3.906-.972 1.826 0 2.34.972 3.934.942 1.623-.028 2.652-1.476 3.645-2.93 1.152-1.68 1.625-3.308 1.651-3.393-.036-.015-3.162-1.21-3.177-4.758zM11.53 2.02C12.356 1.02 12.908-.346 12.748-1c-1.24.048-2.74.826-3.627 1.82-.796.888-1.49 2.3-1.303 3.656 1.382.108 2.795-.698 3.712-1.456z" />
      </svg>
    ),
  },
  "Google": {
    bg: "#0f1824",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  "GM Sectec": { bg: "#0d1f0d", initials: "GMS", color: "#4ade80", small: true },
  "Rochester Institute of Technology": { bg: "#1f0d0d", initials: "RIT", color: "#ef682a", small: true },
};

const EXPERIENCES = [
  {
    id: 1,
    role: "Product Support Engineer",
    company: "Multiverse Computing",
    type: "Full-time",
    location: "Madrid, Spain",
    start: "Nov 2025", end: "Present",
    summary: "Supporting API and LLM-based systems in production, focusing on debugging client integrations and resolving performance issues.",
    bullets: [
      "Debugged client integration issues across API and LLM systems, isolating root causes in production environments.",
      "Reproduced defects using Python and Postman, providing actionable diagnostics to engineering teams.",
      "Analyzed model performance and benchmarks to detect regressions and system-level issues.",
      "Created onboarding documentation and trained new team members on debugging and support workflows.",
      "Worked across QA and engineering teams to validate mobile features and improve release quality."
    ],
    technologies: ["Python", "Postman", "LLMs", "BrowserStack", "PostHog", "GitLab", "Gitlab Issues"],
    impact: "Introduced structured debugging workflows, reducing time-to-resolution for client issues and improving consistency in support operations.",
    highlight: true,
  },
/*   {
    id: 2,
    role: "Master's Thesis Researcher",
    company: "Technical University of Madrid (UPM)",
    type: "Research",
    location: "Madrid, Spain",
    start: "Jan 2025", end: "Present",
    summary: "State-of-the-art literature review evaluating ASR techniques for code-switching, focused on Puerto Rican Spanglish.",
    bullets: [
      "Mapping what code-switching ASR methods exist, where they succeed and fail.",
      "Evaluating deep learning architectures for mixed-language speech recognition.",
      "Identifying research gaps to define a concrete thesis contribution.",
    ],
    technologies: ["Python", "Hugging Face", "PyTorch", "Transformers", "ASR"],
    impact: "Building the research foundation for an underexplored low-resource domain.",
    highlight: true,
  }, */
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "Microsoft",
    type: "Internship · Capstone",
    location: "San Juan, Puerto Rico",
    start: "Jan 2024", end: "May 2024",
    summary: "Built Planning Copilot, an AI project-planning tool using Semantic Kernel AI and LLMs. Automated Azure DevOps compliance checks.",
    bullets: [
      "Built Planning Copilot using Semantic Kernel and LLMs to support AI-driven project planning.",
      "Automated Azure DevOps compliance checks, reducing manual effort by 30%.",
      "Designed prompt engineering workflows to improve decision-support quality.",
      "Evaluated GPT models for performance, accuracy, and output consistency."
    ],
    technologies: ["Semantic Kernel AI", "LLMs", "Azure DevOps", "GPT", "Python"],
    impact: "30% reduction in manual compliance effort. Tool shipped to project teams.",
    highlight: true,
  },
  {
    id: 4,
    role: "QA & Tools Automation Engineer Intern",
    company: "Apple",
    type: "Internship",
    location: "San Diego, CA",
    start: "May 2023", end: "Sep 2023",
    summary: "Led test planning for 30% of the Journal app. Automated critical test cases and shipped a new internal Swift testing feature.",
    bullets: [
      "Owned test plan design as DRI for 30% of the Journal app feature set.",
      "Automated 50% of critical test cases using Swift and Objective-C, improving efficiency by 25%.",
      "Developed internal testing tools to support targeted validation workflows."
    ],
    technologies: ["Swift", "Objective-C", "XCTest", "iOS", "Test Automation"],
    impact: "50% of critical test cases automated. New Swift feature shipped to internal tooling.",
    highlight: true,
  },
  {
    id: 5,
    role: "Google Tech Exchange Scholar",
    company: "Google",
    type: "Scholarship Program",
    location: "Remote",
    start: "Jan 2023", end: "May 2023",
    summary: "Competitive Google program for underrepresented CS students. Advanced SWE curriculum by Google engineers.",
    bullets: [
      "Selected for the Google Tech Exchange from a national pool.", 
      "Completed advanced data structures and software development training led by Google engineers.",
      "Participated in workshops and technical interview preparation.",
    ],
    technologies: ["Python", "Advanced Data Structures", "Software Development Studio", "Technical Interviews"],
    impact: "Strengthened advanced data structures and software engineering fundamentals through a competitive Google-led program.",
    highlight: false,
  },
  {
    id: 6,
    role: "Cyber Security R&D Intern",
    company: "GM Sectec",
    type: "Internship",
    location: "San Juan, Puerto Rico",
    start: "Jan 2022", end: "Jun 2022",
    summary: "Built API test suites and user acceptance tests from scratch across multiple product teams at a cybersecurity firm.",
    bullets: [
      "Performed API testing using Postman and developed user acceptance tests (UAT).",
      "Built UAT workflows from scratch across multiple product teams.",
      "Researched approaches for integrating automated and manual testing pipelines."
    ],
    technologies: ["Postman", "API Testing", "QA", "Test Automation", "Java"],
    impact: "Delivered UAT frameworks from scratch across multiple concurrent teams.",
    highlight: false,
  },
  {
    id: 7,
    role: "Undergraduate Researcher",
    company: "Rochester Institute of Technology",
    type: "Research",
    location: "Remote",
    start: "Jun 2021", end: "Aug 2021",
    summary: "IRB-approved study on reader perception of AI-generated vs. human-written news. Led 30-subject experiment; co-authored IEEE paper.",
    bullets: [
      "Designed GPT-3 prompts to generate English and Spanish news content for evaluation.",
      "Conducted a 30-participant study using iMotions and Qualtrics.",
      "Identified patterns in how users detect AI-generated content based on reading habits."
    ],
    technologies: ["Python", "GPT-3", "NLP", "iMotions", "Qualtrics"],
    impact: "Published at IEEE WNYISPW 2023.",
    paperLink: "https://doi.org/10.1109/WNYISPW60588.2023.10349588",
    highlight: false,
  },
];

const leftExperiences = EXPERIENCES.filter((_, i) => i % 2 === 0);
const rightExperiences = EXPERIENCES.filter((_, i) => i % 2 !== 0);

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useIntersect(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Animated count-up
function useCountUp(target, duration = 1200, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const isFloat = String(target).includes(".");
    const num = parseFloat(target);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(isFloat ? (num * ease).toFixed(1) : Math.round(num * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return val;
}

// Typewriter cycling through roles
function useTypewriter(words, typingSpeed = 80, pause = 1800, deleteSpeed = 40) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting
  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(t => t.slice(0, -1)), deleteSpeed);
      } else {
        setWordIdx(i => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, wordIdx, words, typingSpeed, pause, deleteSpeed]);
  return text;
}

// Scroll progress
function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

// Cursor glow
function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(129,199,132,0.045) 0%, transparent 70%)`,
      transition: "background 0.1s ease",
    }} />
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ company }) {
  const d = LOGOS[company];
  if (!d) return null;
  return (
    <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: d.bg, border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {d.svg || <span style={{ fontSize: d.small ? 9 : 11, fontWeight: 700, color: d.color, letterSpacing: "-0.02em" }}>{d.initials}</span>}
    </div>
  );
}

// ─── SKILL CHIP with tooltip ──────────────────────────────────────────────────
function SkillChip({ skill, green }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", display: "inline-block",
        padding: "3px 8px", borderRadius: 4,
        fontSize: 10, fontWeight: 500, letterSpacing: "0.02em",
        background: hovered && green ? "rgba(129,199,132,0.22)" : green ? "rgba(129,199,132,0.1)" : hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
        color: green ? "#81c784" : "rgba(255,255,255,0.4)",
        border: green ? "1px solid rgba(129,199,132,0.2)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered && green ? "0 0 10px rgba(129,199,132,0.25)" : "none",
        transition: "background 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
    >
      {typeof skill === "string" ? skill : skill.label}
      {hovered && skill.note && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 7px)", left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(18,18,18,0.97)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 6, padding: "6px 10px", fontSize: 11,
          color: "rgba(255,255,255,0.78)", whiteSpace: "nowrap",
          zIndex: 50, pointerEvents: "none", fontWeight: 400, letterSpacing: 0,
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}>
          {skill.note}
        </span>
      )}
    </span>
  );
}

// Simple chip (no tooltip)
function Chip({ label }) {
  return (
    <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 500, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {label}
    </span>
  );
}

// ─── EXPERIENCE CARD ─────────────────────────────────────────────────────────
function Card({ exp, index }) {
  const [ref, vis] = useIntersect(0.04);
  const [open, setOpen] = useState(false);
  const hl = exp.highlight;

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s` }}>
      <div
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.032)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.018)"; }}
        style={{ background: open ? "rgba(255,255,255,0.042)" : "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: hl ? `2px solid ${open ? "#81c784" : "rgba(129,199,132,0.38)"}` : "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 18px", cursor: "pointer", transition: "background 0.16s, border-color 0.16s", userSelect: "none", textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
          <Logo company={exp.company} />
          <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", textAlign: "left" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2, textAlign: "left" }}>{exp.role}</span>
              {hl && <span style={{ fontSize: 9, padding: "1px 5px", background: "rgba(129,199,132,0.1)", color: "#81c784", borderRadius: 3, border: "1px solid rgba(129,199,132,0.2)", fontWeight: 700, letterSpacing: "0.07em" }}>KEY</span>}
              <span style={{ fontSize: 9, padding: "1px 5px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.07)" }}>{exp.type}</span>
            </div>

            <div style={{ marginTop: 2, fontSize: 11, color: "rgba(255,255,255,0.38)", display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", textAlign: "left" }}>
              <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>{exp.company}</span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span>{exp.start} – {exp.end}</span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span>{exp.location}</span>
            </div>
          </div>

          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.18s", flexShrink: 0 }}>▾</span>
        </div>

        {!open && (
          <p style={{ textAlign: "left", margin: "9px 0 0 50px", fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.55, fontWeight: 400 }}>
            {exp.summary}
          </p>
        )}

        {open && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.055)", textAlign: "left" }}>
            <ul style={{ margin: "0 0 13px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, textAlign: "left" }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", textAlign: "left", width: "100%" }}>
                  <span style={{ color: hl ? "rgba(129,199,132,0.45)" : "rgba(255,255,255,0.18)", flexShrink: 0, fontSize: 10, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, flex: 1, minWidth: 0, textAlign: "left", display: "block" }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 13, textAlign: "left" }}>
              {exp.technologies.map(t => <Chip key={t} label={t} />)}
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "9px 11px", background: "rgba(129,199,132,0.055)", border: "1px solid rgba(129,199,132,0.1)", borderRadius: 6, textAlign: "left" }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(129,199,132,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, lineHeight: "18px",}}>
                Impact
              </span>

              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.58)", lineHeight: 1.5, flex: 1, minWidth: 0, textAlign: "left", display: "block" }}>
                {exp.impact}
                {exp.paperLink && (
                  <a href={exp.paperLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ marginLeft: 8, color: "#81c784", textDecoration: "none", fontSize: 11 }}>
                    View paper ↗
                  </a>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typedRole = useTypewriter(PROFILE.roles);
  // Staggered entrance
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : "translateY(14px)",
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  });

  return (
    <div style={{ padding: "28px 0 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
      {/* Dot-grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={fade(0)}>
            <img src={sketch} alt="Andrea AI Sketch" style={{ height: 360, width: 360, objectFit: "contain", flexShrink: 0 }} />
          </div>

          <div style={{ maxWidth: 600, textAlign: "left" }}>
            <div style={fade(80)}>
              <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {PROFILE.name}
              </h1>
            </div>

            {/* Typewriter role */}
            <div style={{ ...fade(180), marginTop: 8, fontSize: "clamp(13px, 1.5vw, 17px)", color: "rgba(255,255,255,0.5)", fontWeight: 400, minHeight: "1.4em", display: "flex", alignItems: "center", gap: 0 }}>
              <span style={{ color: "#81c784", fontWeight: 600 }}>{typedRole}</span>
              <span style={{ display: "inline-block", width: 2, height: "1em", background: "#81c784", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
            </div>

            <div style={{ ...fade(300), margin: "14px 0 0" }}>
              <p style={{ margin: 0, fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.65, maxWidth: 560, textAlign: "justify" }}>
                {PROFILE.tagline}
              </p>
            </div>

            {/* CTA row */}
            <div style={{ ...fade(420), marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={PROFILE.cvUrl} download style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px", background: "rgba(255,255,255,0.05)", color: "rgba(255, 255, 255, 0.79)", borderRadius: 5, fontSize: 10, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "0.04em", transition: "background 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.79)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                CV
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ ...fade(520), display: "flex", flexWrap: "wrap", gap: 5, marginTop: 20, justifyContent: "center" }}>
          {PROFILE.skills.map(s => <SkillChip key={s.label} skill={s} green />)}
        </div>
      </div>
    </div>
  );
}

// ─── STATS with count-up ──────────────────────────────────────────────────────
function StatCell({ item, i, started }) {
  const raw = parseFloat(item.value);
  const suffix = isNaN(raw) ? "" : item.value.replace(String(raw), "");
  const counted = useCountUp(isNaN(raw) ? 0 : raw, 1100, started);
  const display = isNaN(raw) ? item.value : `${counted}${suffix}`;
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ background: "#0d0d0d", padding: "26px 5vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", textDecoration: "none", cursor: item.link ? "pointer" : "default", opacity: started ? 1 : 0, transform: started ? "none" : "translateY(8px)", transition: `opacity 0.38s ease ${i * 0.07}s, transform 0.38s ease ${i * 0.07}s`, position: "relative" }}
      onMouseEnter={() => item.tooltip && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{display}</div>
          <div style={{ marginTop: 6, fontSize: 10, color: "#81c784", letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>{item.label}<span style={{ fontSize: 9 }}>↗</span></div>
        </a>
      ) : (
        <>
          <div style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{display}</div>
          <div style={{ marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
            {item.label}
            {item.tooltip && <span style={{ fontSize: 9, opacity: 0.45 }}>ⓘ</span>}
          </div>
        </>
      )}
      {item.tooltip && hov && (
      <div style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(18,18,18,0.97)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: "6px 10px",
        fontSize: 11,
        color: "rgba(255,255,255,0.8)",
        whiteSpace: "nowrap",
        zIndex: 20,
        pointerEvents: "none",
      }}>
        {item.tooltip}
      </div>
    )}
    </div>
  );
}

function Stats() {
  const [ref, vis] = useIntersect(0.05);
  const items = [
    { label: "Years Experience",  value: "2+",  link: null },
    { label: "Roles Held",        value: "6",   link: null },
    { label: "Papers Published",  value: "1",   link: "https://doi.org/10.1109/WNYISPW60588.2023.10349588" },
    { label: "FAANG Internships", value: "2",   tooltip: "Microsoft · Apple", link: null },
    { label: "Native Languages",  value: "2",   tooltip: "English · Spanish", link: null },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "rgba(255,255,255,0.04)" }}>
      {items.map((it, i) => <StatCell key={it.label} item={it} i={i} started={vis} />)}
    </div>
  );
}

function credentialPalette(done) {
  return done
    ? { accent: "rgba(129,199,132,0.55)", badgeBg: "rgba(129,199,132,0.1)", badgeColor: "#81c784", badgeBorder: "rgba(129,199,132,0.26)" }
    : { accent: "rgba(100,181,246,0.65)", badgeBg: "rgba(100,181,246,0.12)", badgeColor: "#64b5f6", badgeBorder: "rgba(100,181,246,0.35)" };
}
function CredentialIcon({ kind }) {
  if (kind === "sdet") {
    return (
      <svg viewBox="0 0 44 44" width="38" height="38">
        <rect x="3" y="3" width="10" height="10" rx="1.5" fill="#2a2a2a" />
        <rect x="3" y="27" width="13" height="13" rx="2" fill="#2e6db4" />
        <rect x="13" y="10" width="22" height="22" rx="3" fill="#c75b2a" />
        <text x="24" y="25" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif" textAnchor="middle" letterSpacing="0.5">SDET</text>
      </svg>
    );
  }
  const school = kind === "upr"
    ? { bg: "#0d5c2e", fg: "#fff", label: "UPRM" }
    : { bg: "#4A9BDA", fg: "#F2C94C", label: "UPM" };
  return (
    <svg viewBox="0 0 44 44" width="38" height="38">
      <rect x="4" y="4" width="36" height="36" rx="8" fill={school.bg} />
      <text x="22" y="27.5" fontSize="10" fontWeight="700" fill={school.fg} fontFamily="Arial, sans-serif" textAnchor="middle" letterSpacing="0.06em">{school.label}</text>
    </svg>
  );
}

function CredentialCard({ name, detail, status, expected, iconKind }) {
  const done = status === "Completed";
  const p = credentialPalette(done);
  return (
    <div style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `2px solid ${p.accent}`, borderRadius: 10, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CredentialIcon kind={iconKind} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{name}</span>
          <span style={{ fontSize: 9, padding: "1px 5px", background: p.badgeBg, color: p.badgeColor, borderRadius: 3, border: `1px solid ${p.badgeBorder}`, fontWeight: 700, letterSpacing: "0.07em" }}>{status.toUpperCase()}</span>
        </div>
        <div style={{ marginTop: 3, fontSize: 11, color: "rgba(255,255,255,0.38)", display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>{detail}</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <span>{done ? `Completed ${expected}` : `Expected ${expected}`}</span>
        </div>
      </div>
    </div>
  );
}

function CredentialSection({ r, vis, eyebrow, title, children }) {
  return (
    <section
      ref={r}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        padding: "56px 28px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 28,
            color: "#fff",
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Education() {
  const [ref, vis] = useIntersect(0.05);

  const edus = [
    { name: "MSc Artificial Intelligence", university: "Technical University of Madrid", status: "In Progress", expected: "2027", org: "UPM" },
    { name: "BSc Software Engineering", university: "University of Puerto Rico, Mayagüez", status: "Completed", expected: "2018", org: "UPR" },
  ];

  return (
    <CredentialSection r={ref} vis={vis} eyebrow="Academic" title="Education">
      {edus.map((edu, i) => (
        <CredentialCard
          key={i}
          name={edu.name}
          detail={edu.university}
          status={edu.status}
          expected={edu.expected}
          iconKind={edu.org === "UPR" ? "upr" : "upm"}
        />
      ))}
    </CredentialSection>
  );
}

function Certifications() {
  const [ref, vis] = useIntersect(0.05);

  const certs = [
    { name: "A4Q Software Development Engineer in Test (SDET)", level: "Foundational Level", status: "In Progress", expected: "2026", org: "A4Q", iconKind: "sdet" },
  ];

  return (
    <CredentialSection r={ref} vis={vis} eyebrow="Professional" title="Certifications">
      {certs.map((cert, i) => (
        <CredentialCard
          key={i}
          name={cert.name}
          detail={cert.level}
          status={cert.status}
          expected={cert.expected}
          iconKind="sdet"
        />
      ))}
    </CredentialSection>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [ref, visible] = useIntersect(0.15);
  const [formState, setFormState] = useState({ name: "", email: "", type: "recruiter", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    if (!formState.name || !formState.email || !formState.message) return;
    const subject = encodeURIComponent(formState.type === "recruiter" ? `Opportunity for ${PROFILE.name}` : `Collaboration inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Hi Andrea,\n\nMy name is ${formState.name}.\n\n${formState.message}\n\nBest,\n${formState.name}\n${formState.email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#fff", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s", boxSizing: "border-box" };
  const isComplete = formState.name && formState.email && formState.message;

  return (
      <div
        id="contact"
        ref={ref}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "80px 5vw 100px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Get in touch
          </div>

          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Let's work
            <br />
            together.
          </h2>

          <p
            style={{
              margin: "0 auto 32px",
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            Whether you have a role that might be a good fit, a research collaboration
            in mind, or just want to connect — I'd love to hear from you.
          </p>

          {/* Email */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Email directly
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <a
                href={`mailto:${PROFILE.email}`}
                style={{
                  fontSize: 14,
                  color: "#81c784",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 500,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {PROFILE.email}
              </a>

              <button
                onClick={copyEmail}
                title="Copy email"
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 5,
                  padding: "3px 8px",
                  cursor: "pointer",
                  color: copied
                    ? "#81c784"
                    : "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontFamily: "inherit",
                  transition: "all 0.18s",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {copied ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

                  {/* LinkedIn */}
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            LinkedIn
          </div>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "#64b5f6",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 500,
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function NavLink({ label, id, key: shortcut }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`#${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 11,
        color: hovered ? "#fff" : "rgba(255,255,255,0.36)",
        textDecoration: "none",
        letterSpacing: "0.05em",
        transition: "color 0.18s",
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {label}
    </a>
  );
}


export default function App() {
  const scrollPct = useScrollProgress();

  // Keyboard shortcuts E / C
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      // macOS: Command = metaKey
      if (!e.metaKey) return;
      const k = (e.key || "").toLowerCase();
      if (k === "e") { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); }
      if (k === "d") { e.preventDefault(); document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }); }
      if (k === "r") { e.preventDefault(); document.getElementById("certification")?.scrollIntoView({ behavior: "smooth" }); }
      if (k === "c") { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; background: #0d0d0d; overflow-x: hidden; }
        #root { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.16); }
      `}</style>

      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, height: 2, width: `${scrollPct}%`, background: "linear-gradient(90deg, #81c784, #a5d6a7)", transition: "width 0.1s linear", pointerEvents: "none" }} />

      {/* Cursor glow */}
      <CursorGlow />

      <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif", width: "100%", overflowX: "hidden", position: "relative", zIndex: 1 }}>

        {/* Nav */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100, width: "100%",
          background: "rgba(13,13,13,0.92)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          height: 50, padding: "0 5vw",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", background: "#81c784",
              boxShadow: "0 0 7px rgba(129,199,132,0.65)", animation: "pulse 2.5s infinite",
            }} />
            <span style={{ fontSize: 12, color: "#81c784", letterSpacing: "0.07em", fontWeight: 500 }}>
              {PROFILE.availability}
            </span>
          </div>
          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            {[
              { label: "Experience",    id: "experience",    key: "⌘E" },
              { label: "Education",     id: "education",     key: "⌘D" },
              { label: "Certifications", id: "certification", key: "⌘R" },
              { label: "Contact",       id: "contact",       key: "⌘C" },
            ].map(l => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>
        </nav>

        {/* Hero */}
        <div style={{ padding: "0 5vw" }}><Hero /></div>

        {/* Stats */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}><Stats /></div>

        {/* Timeline */}
        <div
          style={{
            display: "flex",
            gap: "3vw",
            alignItems: "flex-start",
            padding: "0 28px 32px 28px",
            paddingBottom: 32,
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {leftExperiences.map((exp, i) => (
              <Card key={exp.id} exp={exp} index={i} />
            ))}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {rightExperiences.map((exp, i) => (
              <Card key={exp.id} exp={exp} index={i + leftExperiences.length} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div
          id="education"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Education />
        </div>

        {/* Certifications */}
        <div
          id="certification"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Certifications />
        </div>

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <div style={{ padding: "20px 5vw", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>neuraorm</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#81c784", display: "inline-block", boxShadow: "0 0 5px rgba(129,199,132,0.5)" }} />
              Last updated: {PROFILE.lastUpdated}
            </span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.13)" }}>Spain · {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
