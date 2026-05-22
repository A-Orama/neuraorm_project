import { EXPERIENCES } from '../data/experiences.js';
import { ExperienceCard } from './ExperienceCard.jsx';

export function ExperienceSection() {
  return (
    <>
      <section
        id="experience"
        style={{
          scrollMarginTop: 90,
          padding: "56px 28px 24px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginBottom: 10,
            }}
          >
            Professional
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: 28,
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            Experience
          </h2>
        </div>
      </section>

      <div className="experience-grid">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </>
  );
}
