import { useState, useEffect } from 'react';
import sketch from '../assets/sketch_2.png';
import { PROFILE } from '../data/profile.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { SkillChip } from './SkillChip.jsx';

export function Hero() {
  const typedRole = useTypewriter(PROFILE.roles);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : "translateY(14px)",
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  });

  return (
    <div
      className="hero-shell"
      style={{
        padding: "28px 0 24px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-layout" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div className="hero-image-wrap" style={fade(0)}>
            <img
              src={sketch}
              alt="Andrea AI Sketch"
              className="hero-image"
              style={{
                height: 360,
                width: 360,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>

          <div className="hero-text" style={{ maxWidth: 600, textAlign: "left" }}>
            <div style={fade(80)}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {PROFILE.name}
              </h1>
            </div>

            <div
              style={{
                ...fade(180),
                marginTop: 8,
                fontSize: "clamp(13px, 1.5vw, 17px)",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 400,
                minHeight: "1.4em",
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
            >
              <span style={{ color: "#81c784", fontWeight: 600 }}>{typedRole}</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: "#81c784",
                  marginLeft: 2,
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "middle",
                }}
              />
            </div>

            <div style={{ ...fade(300), margin: "14px 0 0" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.65,
                  maxWidth: 560,
                  textAlign: "justify",
                }}
              >
                {PROFILE.tagline}
              </p>
            </div>

            <div className="hero-cta-row" style={{ ...fade(420), marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={PROFILE.cvUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 11px",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255, 255, 255, 0.79)",
                  borderRadius: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  letterSpacing: "0.04em",
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.79)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                CV
              </a>
            </div>
          </div>
        </div>

        <div className="skills-row" style={{ ...fade(520), display: "flex", flexWrap: "wrap", gap: 5, marginTop: 20, justifyContent: "center" }}>
          {PROFILE.skills.map((s) => (
            <SkillChip key={s.label} skill={s} green />
          ))}
        </div>
      </div>
    </div>
  );
}
