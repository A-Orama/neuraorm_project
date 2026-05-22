export function Chip({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 500,
        background: "rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.4)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {label}
    </span>
  );
}
