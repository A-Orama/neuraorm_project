import { useState, useEffect } from 'react';

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(129,199,132,0.045) 0%, transparent 70%)`,
        transition: "background 0.1s ease",
      }}
    />
  );
}
