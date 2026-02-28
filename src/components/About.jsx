import Reveal from "./Reveal";
import Counter from "./Counter";
import Marquee from "./Marquee";
import { SITE, STATS, DOMAINS, SKILLS } from "../data/site";

export default function About() {
  return (
    <>
      {/* Marquee */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", paddingBottom: 4 }}>
        <Marquee items={SKILLS.row1} />
        <Marquee items={SKILLS.row2} reverse />
      </div>

      {/* About */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "140px 40px", background: "#f5f5f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <Reveal dir="left">
            <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: 5, textTransform: "uppercase", marginBottom: 32 }}>About</p>
          </Reveal>
          <Reveal dir="left" delay={0.1}>
            <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 48px", letterSpacing: -2, maxWidth: 800 }}>
              Engineering ML systems<br />from prototype to production.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <Reveal delay={0.25}>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: "#555" }}>
                I'm <strong style={{ color: "#111" }}>{SITE.name}</strong>, currently pursuing my M.S. at the University of Pittsburgh with a perfect 4.0 GPA. I have 5+ years of industry experience building scalable backend systems and production ML pipelines across cybersecurity and e-commerce.
              </p>
            </Reveal>
            <Reveal dir="right" delay={0.35}>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: "#555" }}>
                At Trend Micro, I architected distributed data pipelines processing billions of events and built high-concurrency scoring services. At Tagtoo, I developed deep learning models and recommendation systems serving 10M+ users. I bridge the gap between software engineering and machine learning.
              </p>
            </Reveal>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, marginTop: 80, borderTop: "1px solid #ddd", paddingTop: 48 }}>
            {STATS.map((s, i) => (
              <Reveal key={i} dir="up" delay={i * 0.1}>
                <div style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 900, letterSpacing: -3, color: "#111" }}>
                  {s.isDecimal ? s.value : <Counter end={s.value} suffix={s.suffix} />}
                </div>
                <div style={{ fontSize: 13, color: "#999", marginTop: 4, fontWeight: 500, letterSpacing: 1 }}>{s.label}</div>
              </Reveal>
            ))}
          </div>

          {/* Domain row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: 64, borderTop: "1px solid #ddd" }}>
            {DOMAINS.map((d, i) => (
              <Reveal key={i} dir="up" delay={i * 0.1}>
                <div style={{ paddingTop: 28, paddingRight: 24, borderRight: i < 3 ? "1px solid #ddd" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: -0.3 }}>{d.label}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{d.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}