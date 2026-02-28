import Reveal from "./Reveal";
import { PROJECTS } from "../data/site";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "140px 40px", background: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal dir="right">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Selected Work</p>
        </Reveal>
        <Reveal dir="right" delay={0.1}>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 80 }}>
            Projects that<br />drove results.
          </h2>
        </Reveal>

        {PROJECTS.map((p, i) => (
          <Reveal key={i} dir={i % 2 === 0 ? "left" : "right"} delay={0.08}>
            <div
              style={{
                borderTop: "1px solid #ccc", padding: "44px 0",
                display: "grid", gridTemplateColumns: "50px 1fr 1fr", gap: 36,
                cursor: "pointer", transition: "all 0.5s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "20px"; e.currentTarget.style.background = "rgba(0,0,0,0.015)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 13, color: "#bbb", fontWeight: 600, paddingTop: 6 }}>{p.num}</span>
              <div>
                <h3 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, lineHeight: 1.1, margin: 0, whiteSpace: "pre-line", letterSpacing: -0.5 }}>{p.title}</h3>
                {p.status && (
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#f5f5f0", background: "#111", padding: "3px 10px", borderRadius: 999 }}>
                    {p.status}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: 15, color: "#777", lineHeight: 1.75, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: "4px 12px", border: "1px solid #ccc", borderRadius: 999, color: "#888", letterSpacing: 0.5 }}>{t}</span>
                  ))}
                  {p.link && (
                    <a
                      href={p.link} target="_blank" rel="noopener"
                      style={{ fontSize: 12, fontWeight: 600, color: "#111", textDecoration: "none", marginLeft: 4, letterSpacing: 0.5, transition: "color 0.3s" }}
                      onMouseEnter={(e) => (e.target.style.color = "#555")}
                      onMouseLeave={(e) => (e.target.style.color = "#111")}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid #ccc" }} />
      </div>
    </section>
  );
}