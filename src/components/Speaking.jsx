import Reveal from "./Reveal";
import { SPEAKING } from "../data/site";

export default function Speaking() {
  return (
    <section style={{ padding: "80px 40px", background: "#0a0a0a", color: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <Reveal dir="left">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>Speaking</p>
            <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{SPEAKING.title}</h3>
            <p style={{ fontSize: 15, color: "#888", marginTop: 8, lineHeight: 1.6 }}>{SPEAKING.description}</p>
            <p style={{ fontSize: 14, color: "#666", marginTop: 6 }}>{SPEAKING.date}</p>
          </div>
        </Reveal>
        <Reveal dir="right" delay={0.15}>
          <a
            href={SPEAKING.link} target="_blank" rel="noopener"
            style={{
              padding: "12px 28px", borderRadius: 999, border: "1px solid #333",
              color: "#ccc", textDecoration: "none", fontSize: 13, fontWeight: 600,
              letterSpacing: 1, transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#f5f5f0"; e.target.style.color = "#0a0a0a"; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#ccc"; }}
          >
            Read Article →
          </a>
        </Reveal>
      </div>
    </section>
  );
}