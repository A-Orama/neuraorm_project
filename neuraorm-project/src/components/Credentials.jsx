import { useIntersect } from '../hooks/useIntersect.js';

function CredentialIcon({ kind }) {
  if (kind === "sdet") {
    return (
      <svg viewBox="0 0 44 44" width="38" height="38">
        <rect x="3" y="3" width="10" height="10" rx="1.5" fill="#2a2a2a" />
        <rect x="3" y="27" width="13" height="13" rx="2" fill="#2e6db4" />
        <rect x="13" y="10" width="22" height="22" rx="3" fill="#c75b2a" />
        <text x="24" y="25" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif" textAnchor="middle" letterSpacing="0.5">
          SDET
        </text>
      </svg>
    );
  }

  const school = kind === "upr" ? { bg: "#0d5c2e", fg: "#fff", label: "UPRM" } : { bg: "#4A9BDA", fg: "#F2C94C", label: "UPM" };

  return (
    <svg viewBox="0 0 44 44" width="38" height="38">
      <rect x="4" y="4" width="36" height="36" rx="8" fill={school.bg} />
      <text x="22" y="27.5" fontSize="10" fontWeight="700" fill={school.fg} fontFamily="Arial, sans-serif" textAnchor="middle" letterSpacing="0.06em">
        {school.label}
      </text>
    </svg>
  );
}

function CredentialCard({ name, detail, status, expected, iconKind }) {
  const done = status === "Completed";

  return (
    <div className={`credential-card ${done ? "credential-card--completed" : "credential-card--in-progress"}`}>
      <div className="credential-card-logo">
        <div className="credential-card-icon">
          <CredentialIcon kind={iconKind} />
        </div>
      </div>

      <div className="credential-card-meta">
        <span className="credential-card-name">{name}</span>
        <span className="credential-card-org">{detail}</span>
        <span className="credential-card-dates">{done ? `Completed ${expected}` : `Expected ${expected}`}</span>
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

        <h2 style={{ margin: 0, fontSize: 28, color: "#fff", letterSpacing: "-0.04em" }}>{title}</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>{children}</div>
    </section>
  );
}

export function Education() {
  const [ref, vis] = useIntersect(0.05);

  const edus = [
    { name: "MSc Artificial Intelligence", university: "Technical University of Madrid", status: "In Progress", expected: "2027", org: "UPM" },
    { name: "BSc Software Engineering", university: "University of Puerto Rico, Mayagüez", status: "Completed", expected: "2018", org: "UPR" },
  ];

  return (
    <CredentialSection r={ref} vis={vis} eyebrow="Academic" title="Education">
      {edus.map((edu, i) => (
        <CredentialCard key={i} name={edu.name} detail={edu.university} status={edu.status} expected={edu.expected} iconKind={edu.org === "UPR" ? "upr" : "upm"} />
      ))}
    </CredentialSection>
  );
}

export function Certifications() {
  const [ref, vis] = useIntersect(0.05);

  const certs = [{ name: "A4Q Software Development Engineer in Test (SDET)", level: "Foundational Level", status: "In Progress", expected: "2026", org: "A4Q", iconKind: "sdet" }];

  return (
    <CredentialSection r={ref} vis={vis} eyebrow="Professional" title="Certifications">
      {certs.map((cert, i) => (
        <CredentialCard key={i} name={cert.name} detail={cert.level} status={cert.status} expected={cert.expected} iconKind="sdet" />
      ))}
    </CredentialSection>
  );
}
