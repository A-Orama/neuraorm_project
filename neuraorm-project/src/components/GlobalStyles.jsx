export function GlobalStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          background: #0d0d0d;
          overflow-x: hidden;
        }

        #root {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        ::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.07);
          border-radius: 3px;
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(255,255,255,0.16);
        }

        .site-shell {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .stat-label {
          margin-top: 6px;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.28);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex-wrap: nowrap;
          white-space: nowrap;
          max-width: 100%;
        }

        .stat-label--link {
          color: #81c784;
        }

        .stat-label-icon {
          font-size: 9px;
          flex-shrink: 0;
          opacity: 0.45;
        }

        .stat-label--link .stat-label-icon {
          opacity: 1;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          align-items: stretch;
          padding: 0 28px 32px;
          box-sizing: border-box;
        }

        .experience-card-outer {
          display: flex;
          min-height: 0;
        }

        .experience-card {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.018);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-left: 2px solid transparent;
          border-radius: 10px;
          padding: 16px 18px;
          cursor: pointer;
          transition: border-left-color 0.16s;
          user-select: none;
          text-align: left;
          box-sizing: border-box;
        }

        .experience-card:not(.experience-card--open) {
          min-height: 172px;
        }

        .experience-card:hover {
          border-left-color: #81c784;
        }

        .experience-card-header {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr) auto;
          column-gap: 18px;
          align-items: flex-start;
          text-align: left;
        }

        .experience-card-logo {
          grid-column: 1;
          grid-row: 1;
          padding-top: 1px;
        }

        .experience-card-meta {
          grid-column: 2;
          grid-row: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .experience-card-expand {
          grid-column: 3;
          grid-row: 1;
        }

        .experience-card-role {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .experience-card-company {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.4;
        }

        .experience-card-dates {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.4;
        }

        .experience-card-expand {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.35);
          transition: color 0.16s, border-color 0.16s, background 0.16s;
        }

        .experience-card-expand-icon {
          transition: transform 0.18s ease;
        }

        .experience-card-expand-icon--open {
          transform: rotate(180deg);
        }

        .experience-card:hover .experience-card-expand {
          color: rgba(129, 199, 132, 0.85);
          border-color: rgba(129, 199, 132, 0.28);
          background: rgba(129, 199, 132, 0.06);
        }

        .experience-summary {
          margin: 12px 0 0;
          padding-left: calc(38px + 18px);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.55;
          flex: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-align: left;
        }

        .experience-card-details {
          margin-top: 14px;
          padding-top: 14px;
          padding-left: calc(38px + 18px);
          border-top: 1px solid rgba(255, 255, 255, 0.055);
          text-align: left;
        }

        .experience-bullets {
          margin: 0 0 13px;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6;
        }

        .experience-bullet {
          display: flex;
          gap: 9px;
          align-items: flex-start;
          width: 100%;
        }

        .experience-bullet-marker {
          color: rgba(255, 255, 255, 0.18);
          flex-shrink: 0;
          font-size: 10px;
          margin-top: 2px;
        }

        .experience-bullet-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          flex: 1;
          min-width: 0;
        }

        .experience-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 13px;
        }

        .experience-impact {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 9px 11px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 6px;
        }

        .experience-impact-label {
          font-size: 8px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          flex-shrink: 0;
          line-height: 18px;
        }

        .experience-impact-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.5;
          flex: 1;
          min-width: 0;
        }

        .experience-impact-link {
          margin-left: 8px;
          color: #81c784;
          text-decoration: none;
          font-size: 11px;
        }

        .credential-card {
          background: rgba(255, 255, 255, 0.018);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-left: 2px solid transparent;
          border-radius: 10px;
          padding: 16px 18px;
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          column-gap: 18px;
          align-items: flex-start;
          text-align: left;
          transition: border-left-color 0.16s;
          box-sizing: border-box;
        }

        .credential-card--completed:hover {
          border-left-color: #81c784;
        }

        .credential-card--in-progress:hover {
          border-left-color: #64b5f6;
        }

        .credential-card-logo {
          grid-column: 1;
          grid-row: 1;
          padding-top: 1px;
        }

        .credential-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          flex-shrink: 0;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .credential-card-meta {
          grid-column: 2;
          grid-row: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .credential-card-name {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .credential-card-org {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.4;
        }

        .credential-card-dates {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.4;
        }

        @media (min-width: 1200px) {
          .site-shell {
            max-width: 1120px;
            padding-left: 7vw;
            padding-right: 7vw;
            box-sizing: border-box;
          }

          .site-shell .site-nav {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .site-shell > .hero-wrap {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .site-footer {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        @media (max-width: 760px) {
          .site-nav {
            height: auto !important;
            min-height: 56px !important;
            padding: 12px 18px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }

          .availability-row {
            width: 100% !important;
          }

          .nav-links {
            width: 100% !important;
            display: flex !important;
            overflow-x: auto !important;
            gap: 18px !important;
            padding-bottom: 4px !important;
            -webkit-overflow-scrolling: touch;
          }

          .nav-links::-webkit-scrollbar {
            display: none;
          }

          .hero-shell {
            padding: 22px 0 24px !important;
          }

          .hero-layout {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 18px !important;
          }

          .hero-image-wrap {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
          }

          .hero-image {
            width: min(82vw, 320px) !important;
            height: auto !important;
            max-height: 320px !important;
          }

          .hero-text {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
          }

          .hero-text h1 {
            text-align: center !important;
            font-size: 34px !important;
          }

          .hero-text p {
            text-align: left !important;
            max-width: 100% !important;
          }

          .hero-cta-row {
            justify-content: center !important;
          }

          .skills-row {
            margin-top: 22px !important;
            gap: 6px !important;
          }

          .skills-row span {
            font-size: 11px !important;
            padding: 6px 10px !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .stat-cell {
            padding: 22px 8px !important;
            min-height: 105px !important;
          }

          .stat-label {
            white-space: normal;
            flex-wrap: wrap;
            line-height: 1.35;
          }

          .experience-grid {
            grid-template-columns: 1fr !important;
            padding: 28px 18px 32px !important;
            gap: 10px !important;
          }

          .experience-grid {
            align-items: start !important;
          }

          .experience-card-outer {
            display: block !important;
          }

          .experience-card:not(.experience-card--open) {
            min-height: 0 !important;
          }

          .experience-card {
            padding: 14px !important;
          }

          .experience-card-header {
            column-gap: 14px !important;
          }

          .experience-summary,
          .experience-card-details {
            padding-left: 0 !important;
          }
        }
      `}</style>
  );
}
