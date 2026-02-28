import Reveal from "./Reveal";
import { useParallax } from "./ParallaxPhoto";
import { EDUCATION } from "../data/site";

export default function Education() {
  const [ref, off] = useParallax(0.06);

  return (
    <section id="education" ref={ref} style={{ padding: "140px 40px", background: "#f5f5f0", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, calc(-50% + ${off}px))`,
          fontSize: "clamp(100px,18vw,260px)", fontWeight: 900, color: "rgba(0,0,0,0.025)",
          whiteSpace: "nowrap", letterSpacing: -8, pointerEvents: "none",
        }}
      >
        LEARN
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <Reveal dir="left">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Education</p>
        </Reveal>
        <Reveal dir="left" delay={0.1}>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 80 }}>
            Where I<br />grew roots.
          </h2>
        </Reveal>

        {EDUCATION.map((edu, i) => (
          <Reveal key={i} dir={i % 2 === 0 ? "left" : "right"} delay={0.12}>
            <div
              style={{
                borderTop: "1px solid #ccc", paddingTop: 36, marginBottom: 56,
                marginLeft: i === 1 ? "12%" : i === 2 ? "24%" : 0,
                marginRight: i === 1 ? 0 : i === 0 ? "12%" : 0,
                position: "relative",
              }}
            >
              {edu.current && (
                <span style={{ position: "absolute", top: 36, right: 0, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fff", background: "#111", padding: "4px 12px", borderRadius: 999 }}>
                  Current
                </span>
              )}
              <div style={{ fontSize: 12, color: "#999", letterSpacing: 2, fontWeight: 500, marginBottom: 12 }}>{edu.period}</div>
              <h3 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, margin: "0 0 6px", letterSpacing: -0.5 }}>{edu.degree}</h3>
              <div style={{ fontSize: 17, color: "#555", fontWeight: 600, marginBottom: 4 }}>{edu.school}</div>
              <div style={{ fontSize: 13, color: "#999", marginBottom: 12 }}>{edu.location}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#666", maxWidth: 560 }}>{edu.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}