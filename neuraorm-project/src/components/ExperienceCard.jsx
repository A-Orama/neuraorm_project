import { useState } from 'react';
import { useIntersect } from '../hooks/useIntersect.js';
import { Logo } from './Logo.jsx';
import { Chip } from './Chip.jsx';

function ExpandIcon({ open }) {
  return (
    <svg
      className={`experience-card-expand-icon${open ? " experience-card-expand-icon--open" : ""}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ExperienceCard({ exp, index }) {
  const [ref, vis] = useIntersect(0.04);
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      className="experience-card-outer"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`,
      }}
    >
      <div
        className={`experience-card${open ? " experience-card--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        <div className="experience-card-header">
          <div className="experience-card-logo">
            <Logo company={exp.company} />
          </div>

          <div className="experience-card-meta">
            <span className="experience-card-role">{exp.role}</span>
            <span className="experience-card-company">{exp.company}</span>
            <span className="experience-card-dates">
              {exp.start} – {exp.end} · {exp.location}
            </span>
          </div>

          <span className="experience-card-expand" aria-hidden>
            <ExpandIcon open={open} />
          </span>
        </div>

        {!open && <p className="experience-summary">{exp.summary}</p>}

        {open && (
          <div className="experience-card-details">
            <ul className="experience-bullets">
              {exp.bullets.map((b, i) => (
                <li key={i} className="experience-bullet">
                  <span className="experience-bullet-marker">▸</span>
                  <span className="experience-bullet-text">{b}</span>
                </li>
              ))}
            </ul>

            <div className="experience-tech">
              {exp.technologies.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>

            <div className="experience-impact">
              <span className="experience-impact-label">Impact</span>
              <span className="experience-impact-text">
                {exp.impact}
                {exp.paperLink && (
                  <a
                    href={exp.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="experience-impact-link"
                  >
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
