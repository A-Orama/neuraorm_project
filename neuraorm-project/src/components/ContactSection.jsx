import { useState } from 'react';
import { PROFILE } from '../data/profile.js';
import { useIntersect } from '../hooks/useIntersect.js';

export function ContactSection() {
  const [ref, visible] = useIntersect(0.15);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      id="contact"
      ref={ref}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 5vw 100px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Get in touch
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Let's work
          <br />
          together.
        </h2>

        <p
          style={{
            margin: "0 auto 32px",
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: 420,
          }}
        >
          Whether you have a role that might be a good fit, a research collaboration in mind, or just want to connect — I'd love to hear from you.
        </p>

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Email directly
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <a
              href={`mailto:${PROFILE.email}`}
              style={{
                fontSize: 14,
                color: "#81c784",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {PROFILE.email}
            </a>

            <button
              onClick={copyEmail}
              title="Copy email"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 5,
                padding: "3px 8px",
                cursor: "pointer",
                color: copied ? "#81c784" : "rgba(255,255,255,0.35)",
                fontSize: 11,
                fontFamily: "inherit",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            LinkedIn
          </div>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "#64b5f6",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 500,
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
