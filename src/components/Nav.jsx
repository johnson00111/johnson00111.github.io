import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const navItems = ["About", "Experience", "Education", "Projects", "Blog", "Contact"];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px clamp(20px, 4vw, 40px)", mixBlendMode: "difference",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>J.</div>

        {/* Desktop nav */}
        <div className="nav-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {navItems.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(s.toLowerCase()); }}
              style={{ color: "#fff", textDecoration: "none", fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}
            >{s}</a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none", background: "none", border: "none", color: "#fff",
            fontSize: 24, cursor: "pointer", padding: 4,
          }}
          className="mobile-menu-btn"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,10,0.95)",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 32,
          }}
        >
          {navItems.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(s.toLowerCase()); }}
              style={{ color: "#f5f5f0", textDecoration: "none", fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}
            >{s}</a>
          ))}
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {[
              { label: "GitHub", href: "https://github.com/johnson00111" },
              { label: "LinkedIn", href: "https://linkedin.com/in/johnsonjao" },
              { label: "Instagram", href: "https://www.instagram.com/johnsonjao/" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener" style={{ color: "#888", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </div>
      )}

      {/* Social icons - vertical right side (desktop only) */}
      <div
        className="social-sidebar"
        style={{
          position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
          zIndex: 100, display: "flex", flexDirection: "column", gap: 20, mixBlendMode: "difference",
        }}
      >
        {[
          { label: "GitHub", href: "https://github.com/johnson00111", path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" },
          { label: "LinkedIn", href: "https://linkedin.com/in/johnsonjao", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" },
          { label: "Instagram", href: "https://www.instagram.com/johnsonjao/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.43.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.43-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.44.71-2.1 1.37A5.89 5.89 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.78.71 1.44 1.37 2.1.66.66 1.32 1.07 2.1 1.37.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.78-.3 1.44-.71 2.1-1.37.66-.66 1.07-1.32 1.37-2.1.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.89 5.89 0 00-1.37-2.1A5.89 5.89 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" },
        ].map(({ label, href, path }) => (
          <a
            key={label} href={href} target="_blank" rel="noopener" title={label}
            style={{ color: "#fff", opacity: 0.5, transition: "opacity 0.3s", display: "block", width: 18, height: 18 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d={path} /></svg>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}