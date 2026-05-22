import { LOGOS } from '../data/logos.jsx';

export function Logo({ company }) {
  const d = LOGOS[company];
  if (!d) return null;

  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 9,
        flexShrink: 0,
        background: d.bg,
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {d.svg || (
        <span
          style={{
            fontSize: d.small ? 9 : 11,
            fontWeight: 700,
            color: d.color,
            letterSpacing: "-0.02em",
          }}
        >
          {d.initials}
        </span>
      )}
    </div>
  );
}
