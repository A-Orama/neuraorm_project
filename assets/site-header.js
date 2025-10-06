// <!-- /assets/site-header.js -->
// <script type="module">
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const links = [
      { href: "index.html", label: "Home", key: "home" },
      { href: "journey.html", label: "Engineer Journey", key: "journey" },
      { href: "#", label: "Blog (soon)", key: "blog" },
      { href: "#", label: "Now (soon)", key: "now" },
    ];

    const shadow = this.attachShadow({ mode: "open" });

    // Determine current page from URL
    const currentFile = location.pathname.split("/").pop() || "index.html";
    const currentLink = links.find(link => link.href.toLowerCase() === currentFile.toLowerCase());
    const currentKey = currentLink?.key || "home";

    shadow.innerHTML = `
      <style>
        :host { --bg:#0b0c0f; --fg:#e8eaee; --muted:#9aa3ad; --card:#12141a; --stroke:#3a7cf7; --line:#2c3340; }
        @media (prefers-color-scheme: light){
          :host { --bg:#fbfbfd; --fg:#0f1115; --muted:#556070; --card:#ffffff; --stroke:#2563eb; --line:#e6e8ee; }
        }
        *,*::before,*::after{box-sizing:border-box}
        .bar{
          position:fixed; inset:auto 0 auto 0; top:0; z-index:1000;
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 18px; background:rgba(11,12,15,.7); backdrop-filter: blur(10px);
          border-bottom:1px solid var(--line);
        }
        .crumb{margin:0; font:600 1.05rem/1.2 system-ui,-apple-system,Segoe UI,Inter,Roboto,sans-serif; letter-spacing:.02em}
        .crumb a{color:var(--fg); text-decoration:none}
        .crumb a:hover{color:var(--stroke)}
        .crumb span{color:var(--muted)}
        .menuBtn{
          margin-left:auto; appearance:none; cursor:pointer;
          background:var(--card); color:var(--fg);
          border:1px solid rgba(255,255,255,.12); border-radius:10px;
          padding:10px 12px; display:flex; align-items:center; gap:10px;
          transition:border .2s ease, box-shadow .2s ease, color .2s ease;
        }
        .menuBtn:focus-visible{outline:none; border-color:var(--stroke); box-shadow:0 0 0 3px rgba(58,124,247,.35)}
        .bars{width:20px; height:2px; background:var(--fg); border-radius:2px; position:relative}
        .bars::before,.bars::after{content:""; position:absolute; left:0; right:0; height:2px; background:var(--fg); border-radius:2px}
        .bars::before{top:-6px} .bars::after{top:6px}

        .backdrop{
          position:fixed; inset:0; background:rgba(0,0,0,.45); backdrop-filter:saturate(120%) blur(2px);
          opacity:0; pointer-events:none; transition:opacity .18s ease; z-index:999;
        }
        .backdrop.show{opacity:1; pointer-events:auto}

        .drawer{
          position:fixed; top:0; right:-340px; height:100%; width:min(340px,84vw);
          background:var(--card); border-left:2px solid var(--stroke);
          box-shadow:-24px 0 60px rgba(0,0,0,.35);
          transition:right .22s cubic-bezier(.22,.8,.2,1);
          z-index:1000; display:flex; flex-direction:column; padding:18px 14px;
          font:16px/1.5 system-ui,-apple-system,Segoe UI,Inter,Roboto,sans-serif;
        }
        .drawer.open{ right:0 }
        .drawer header{display:flex; align-items:center; justify-content:space-between; padding:4px 2px 12px; border-bottom:1px solid rgba(255,255,255,.08)}
        .closeBtn{appearance:none; background:transparent; color:var(--fg); border:1px solid rgba(255,255,255,.12); border-radius:10px; padding:6px 10px; cursor:pointer}
        .closeBtn:focus-visible{outline:none; border-color:var(--stroke); box-shadow:0 0 0 3px rgba(58,124,247,.35)}
        .small{font-size:12px; color:var(--muted); margin:12px 6px 6px; text-transform:uppercase; letter-spacing:.05em}
        .nav{list-style:none; margin:0; padding:6px}
        .nav a{
          display:block; padding:12px 12px; border-radius:12px; text-decoration:none; color:var(--fg); font-weight:600;
          border:1px solid transparent; transition:background .15s ease,border .15s ease,color .15s ease, transform .15s ease;
        }
        .nav a:hover{ background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.1); transform:translateX(2px) }
        .nav a.active{ color:var(--stroke); border-color:rgba(58,124,247,.35); background:rgba(58,124,247,.08) }

        :host(.with-spacer) + .page-spacer, .spacer { height:56px; }
      </style>

      <div class="bar" role="navigation" aria-label="Site header">
        <h1 class="crumb">
          <a href="index.html">neuraorm</a> 
          <span>/ ${this._labelFor(currentKey)}</span>
        </h1>
        <button class="menuBtn" id="open" aria-haspopup="dialog" aria-controls="drawer" aria-expanded="false">
          <span class="bars" aria-hidden="true"></span>
          <span style="color:var(--muted); font-weight:600">Menu</span>
        </button>
      </div>

      <div class="backdrop" id="backdrop"></div>

      <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Site navigation" tabindex="-1">
        <header>
          <strong>Navigation</strong>
          <button class="closeBtn" id="close" aria-label="Close menu">Close</button>
        </header>
        <div class="small">sections</div>
        <ul class="nav" id="nav"></ul>
      </aside>
    `;

    // Populate nav + active state
    const nav = shadow.getElementById("nav");
    links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      if ((currentFile === "" && link.href === "index.html") || currentFile.toLowerCase() === link.href.toLowerCase()) {
        a.classList.add("active");
      }
      const li = document.createElement("li");
      li.appendChild(a);
      nav.appendChild(li);
    });

    // Interactions
    const drawer = shadow.getElementById("drawer");
    const backdrop = shadow.getElementById("backdrop");
    const openBtn = shadow.getElementById("open");
    const closeBtn = shadow.getElementById("close");

    const open = () => {
      drawer.classList.add("open");
      backdrop.classList.add("show");
      openBtn.setAttribute("aria-expanded", "true");
      drawer.focus();
    };
    const close = () => {
      drawer.classList.remove("open");
      backdrop.classList.remove("show");
      openBtn.setAttribute("aria-expanded", "false");
      openBtn.focus();
    };

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    shadow.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  _labelFor(key) {
    const map = {
      home: "home",
      journey: "engineer journey",
      now: "now",
      blog: "blog",
      "under construction": "under construction",
      "under-construction": "under construction"
    };
    return map[key.toLowerCase?.()] || key;
  }
}

customElements.define("site-header", SiteHeader);
// </script>
