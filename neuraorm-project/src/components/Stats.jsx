import { useState } from 'react';
import { useIntersect } from '../hooks/useIntersect.js';
import { useCountUp } from '../hooks/useCountUp.js';

export function StatCell({ item, i, started }) {
  const raw = parseFloat(item.value);
  const suffix = isNaN(raw) ? "" : item.value.replace(String(raw), "");
  const counted = useCountUp(isNaN(raw) ? 0 : raw, 1100, started);
  const display = isNaN(raw) ? item.value : `${counted}${suffix}`;
  const [hov, setHov] = useState(false);

  return (
    <div
      className="stat-cell"
      style={{
        background: "#0d0d0d",
        padding: "26px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textDecoration: "none",
        cursor: item.link ? "pointer" : "default",
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(8px)",
        transition: `opacity 0.38s ease ${i * 0.07}s, transform 0.38s ease ${i * 0.07}s`,
        position: "relative",
      }}
      onMouseEnter={() => item.tooltip && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{display}</div>
          <div className="stat-label stat-label--link">
            {item.label}
            <span className="stat-label-icon" aria-hidden>↗</span>
          </div>
        </a>
      ) : (
        <>
          <div style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{display}</div>
          <div className="stat-label">
            {item.label}
            {item.tooltip && <span className="stat-label-icon" aria-hidden>ⓘ</span>}
          </div>
        </>
      )}

      {item.tooltip && hov && (
        <div
          style={{
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
          }}
        >
          {item.tooltip}
        </div>
      )}
    </div>
  );
}

export function Stats() {
  const [ref, vis] = useIntersect(0.05);

  const items = [
    { label: "Years Experience", value: "2+", link: null },
    { label: "Papers Published", value: "1", link: "https://doi.org/10.1109/WNYISPW60588.2023.10349588" },
    { label: "FAANG Internships", value: "2", tooltip: "Microsoft · Apple", link: null },
    { label: "Native Languages", value: "2", tooltip: "English · Spanish", link: null },
  ];

  return (
    <div
      ref={ref}
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 1,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      {items.map((it, i) => (
        <StatCell key={it.label} item={it} i={i} started={vis} />
      ))}
    </div>
  );
}
