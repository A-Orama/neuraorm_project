import { useState } from 'react';

export function NavLink({ label, id }) {
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
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}
