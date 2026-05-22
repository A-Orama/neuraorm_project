import { useEffect } from "react";
import { PROFILE } from "./data/profile.js";
import { useScrollProgress } from "./hooks/useScrollProgress.js";
import { CursorGlow } from "./components/CursorGlow.jsx";
import { GlobalStyles } from "./components/GlobalStyles.jsx";
import { NavLink } from "./components/NavLink.jsx";
import { Hero } from "./components/Hero.jsx";
import { Stats } from "./components/Stats.jsx";
import { ExperienceSection } from "./components/ExperienceSection.jsx";
import { Education, Certifications } from "./components/Credentials.jsx";
import { ContactSection } from "./components/ContactSection.jsx";

const NAV_LINKS = [
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certification" },
  { label: "Contact", id: "contact" },
];

export default function App() {
  const scrollPct = useScrollProgress();

  useEffect(() => {
    const handler = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      if (!e.metaKey) return;

      const k = (e.key || "").toLowerCase();

      if (k === "e") {
        e.preventDefault();
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      }

      if (k === "d") {
        e.preventDefault();
        document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
      }

      if (k === "r") {
        e.preventDefault();
        document.getElementById("certification")?.scrollIntoView({ behavior: "smooth" });
      }

      if (k === "c") {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <GlobalStyles />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          height: 2,
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #81c784, #a5d6a7)",
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
      />

      <CursorGlow />

      <div
        style={{
          background: "#0d0d0d",
          minHeight: "100vh",
          color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          width: "100%",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="site-shell">
        <nav
          className="site-nav"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            width: "100%",
            background: "rgba(13,13,13,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            padding: "0 5vw",
          }}
        >
          <div className="availability-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#81c784",
                boxShadow: "0 0 7px rgba(129,199,132,0.65)",
                animation: "pulse 2.5s infinite",
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontSize: 12,
                color: "#81c784",
                letterSpacing: "0.07em",
                fontWeight: 500,
              }}
            >
              {PROFILE.availability}
            </span>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: 22, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>
        </nav>

        <div className="hero-wrap" style={{ padding: "0 5vw" }}>
          <Hero />
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Stats />
        </div>

        <ExperienceSection />

        <div
          id="education"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Education />
        </div>

        <div
          id="certification"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Certifications />
        </div>

        <ContactSection />

        <div
          className="site-footer"
          style={{
            padding: "20px 5vw",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>neuraorm</span>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#81c784",
                  display: "inline-block",
                  boxShadow: "0 0 5px rgba(129,199,132,0.5)",
                }}
              />
              Last updated: {PROFILE.lastUpdated}
            </span>

            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.13)" }}>Spain</span>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
