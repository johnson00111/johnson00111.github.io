import Reveal from "./Reveal";
import { SITE } from "../data/site";

export function Contact() {
  return (
    <section id="contact" style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#f5f5f0", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          fontSize: "clamp(80px,15vw,220px)", fontWeight: 900, color: "rgba(255,255,255,0.02)",
          whiteSpace: "nowrap", letterSpacing: -6, pointerEvents: "none",
        }}
      >
        CONNECT
      </div>

      <div style={{ textAlign: "center", maxWidth: 700, position: "relative" }}>
        <Reveal dir="scale">
          <h2 style={{ fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, marginBottom: 24 }}>
            Let's build<br />something great.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 16, color: "#777", lineHeight: 1.75, marginBottom: 48 }}>
            Open to full-time opportunities in Software Engineering, ML Engineering,<br />AI Engineering, and Backend/Data Infrastructure roles.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Email", href: `mailto:${SITE.email}` },
              { label: "GitHub", href: SITE.github },
              { label: "LinkedIn", href: SITE.linkedin },
              { label: "Instagram", href: SITE.instagram },
            ].map(({ label, href }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener"
                style={{
                  padding: "14px 32px", borderRadius: 999, border: "1px solid #333",
                  color: "#ccc", textDecoration: "none", fontSize: 13, fontWeight: 600,
                  transition: "all 0.35s", letterSpacing: 1,
                }}
                onMouseEnter={(e) => { e.target.style.background = "#f5f5f0"; e.target.style.color = "#0a0a0a"; e.target.style.borderColor = "#f5f5f0"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#ccc"; e.target.style.borderColor = "#333"; }}
              >
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}