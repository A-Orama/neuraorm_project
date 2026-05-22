import { useState } from 'react';

export function SkillChip({ skill, green }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.02em",
        background:
          hovered && green
            ? "rgba(129,199,132,0.22)"
            : green
              ? "rgba(129,199,132,0.1)"
              : hovered
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.05)",
        color: green ? "#81c784" : "rgba(255,255,255,0.4)",
        border: green ? "1px solid rgba(129,199,132,0.2)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered && green ? "0 0 10px rgba(129,199,132,0.25)" : "none",
        transition: "background 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
    >
      {typeof skill === "string" ? skill : skill.label}
      {hovered && skill.note && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 7px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(18,18,18,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 11,
            color: "rgba(255,255,255,0.78)",
            whiteSpace: "nowrap",
            zIndex: 50,
            pointerEvents: "none",
            fontWeight: 400,
            letterSpacing: 0,
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {skill.note}
        </span>
      )}
    </span>
  );
}
