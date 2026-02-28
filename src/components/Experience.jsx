import Reveal from "./Reveal";
import { EXPERIENCE } from "../data/site";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "clamp(80px,10vw,140px) clamp(20px,4vw,40px)", background: "#0a0a0a", color: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal dir="right">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Experience</p>
        </Reveal>
        <Reveal dir="right" delay={0.1}>
          <h2 style={{ fontSize: "clamp(28px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: "clamp(40px,6vw,80px)" }}>
            Where I've<br />built & shipped.
          </h2>
        </Reveal>

        {EXPERIENCE.map((exp, i) => {
          const isR = exp.align === "right";
          return (
            <Reveal key={i} dir={isR ? "right" : "left"} delay={0.1}>
              <div className="exp-block" style={{ marginBottom: "clamp(60px,8vw,100px)", display: "grid", gridTemplateColumns: isR ? "1fr 400px" : "400px 1fr", gap: "clamp(24px,4vw,60px)" }}>
                <div style={{ order: isR ? 2 : 1, textAlign: isR ? "right" : "left" }} className="exp-info">
                  <div style={{ fontSize: 12, color: "#555", letterSpacing: 2, fontWeight: 500, marginBottom: 14 }}>{exp.period}</div>
                  <h3 style={{ fontSize: "clamp(24px,4vw,50px)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 4px", letterSpacing: -1 }}>{exp.role}</h3>
                  {exp.subtitle && <div style={{ fontSize: 16, color: "#888", fontWeight: 500, fontStyle: "italic", marginBottom: 8 }}>{exp.subtitle}</div>}
                  <div style={{ fontSize: 18, color: "#ccc", fontWeight: 600 }}>{exp.company}</div>
                  <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{exp.location}</div>
                </div>
                <div
                  className="exp-highlights"
                  style={{
                    order: isR ? 1 : 2, display: "flex", flexDirection: "column", justifyContent: "center",
                    borderLeft: isR ? "none" : "1px solid #222",
                    borderRight: isR ? "1px solid #222" : "none",
                    paddingLeft: isR ? 0 : 32, paddingRight: isR ? 32 : 0,
                  }}
                >
                  {exp.highlights.map((h, j) => (
                    <Reveal key={j} dir={isR ? "left" : "right"} delay={0.15 + j * 0.08}>
                      <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, marginBottom: 14, textAlign: isR ? "right" : "left" }} className="exp-highlight-text">{h}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-block { grid-template-columns: 1fr !important; }
          .exp-info { text-align: left !important; order: 1 !important; }
          .exp-highlights {
            order: 2 !important;
            border-left: 1px solid #222 !important;
            border-right: none !important;
            padding-left: 20px !important;
            padding-right: 0 !important;
            margin-top: 20px;
          }
          .exp-highlight-text { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}