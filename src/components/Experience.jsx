import Reveal from "./Reveal";
import { EXPERIENCE } from "../data/site";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "140px 40px", background: "#0a0a0a", color: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal dir="right">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Experience</p>
        </Reveal>
        <Reveal dir="right" delay={0.1}>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 80 }}>
            Where I've<br />built & shipped.
          </h2>
        </Reveal>

        {EXPERIENCE.map((exp, i) => {
          const isR = exp.align === "right";
          return (
            <Reveal key={i} dir={isR ? "right" : "left"} delay={0.1}>
              <div style={{ marginBottom: 100, display: "grid", gridTemplateColumns: isR ? "1fr 400px" : "400px 1fr", gap: 60 }}>
                <div style={{ order: isR ? 2 : 1, textAlign: isR ? "right" : "left" }}>
                  <div style={{ fontSize: 12, color: "#555", letterSpacing: 2, fontWeight: 500, marginBottom: 14 }}>{exp.period}</div>
                  <h3 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 4px", letterSpacing: -1 }}>{exp.role}</h3>
                  {exp.subtitle && <div style={{ fontSize: 16, color: "#888", fontWeight: 500, fontStyle: "italic", marginBottom: 8 }}>{exp.subtitle}</div>}
                  <div style={{ fontSize: 18, color: "#ccc", fontWeight: 600 }}>{exp.company}</div>
                  <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{exp.location}</div>
                </div>
                <div
                  style={{
                    order: isR ? 1 : 2, display: "flex", flexDirection: "column", justifyContent: "center",
                    borderLeft: isR ? "none" : "1px solid #222",
                    borderRight: isR ? "1px solid #222" : "none",
                    paddingLeft: isR ? 0 : 32, paddingRight: isR ? 32 : 0,
                  }}
                >
                  {exp.highlights.map((h, j) => (
                    <Reveal key={j} dir={isR ? "left" : "right"} delay={0.15 + j * 0.08}>
                      <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, marginBottom: 14, textAlign: isR ? "right" : "left" }}>{h}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}