import Reveal from "./Reveal";

const MAIN_RACES = [
  { year: "2026", event: "Chicago Marathon", type: "Full Marathon", location: "Chicago, IL", upcoming: true },
  { year: "2025", event: "Challenge Taiwan", type: "Triathlon", location: "Taitung, Taiwan", upcoming: false },
  { year: "2025", event: "Tokyo Marathon", type: "Full Marathon", location: "Tokyo, Japan", upcoming: false },
  { year: "2024", event: "EVA Air Marathon", type: "Full Marathon", location: "Taipei, Taiwan", upcoming: false },
];

const OTHER_RACES = [
  { event: "World Masters Games", type: "21K", location: "Taipei", year: "2025" },
  { event: "PUMA Night Run", type: "10K", location: "Taipei", year: "2025" },
  { event: "Taipei Marathon", type: "21K", location: "Taipei", year: "2023" },
  { event: "Taipei Starlight Marathon", type: "11K", location: "Taipei", year: "2023" },
];

export default function Races() {
  return (
    <section style={{ padding: "clamp(80px,10vw,120px) clamp(20px,4vw,40px)", background: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal dir="left">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Race Log</p>
        </Reveal>
        <Reveal dir="left" delay={0.1}>
          <h2 style={{ fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: "clamp(40px,5vw,64px)" }}>
            Finish lines<br />I've crossed.
          </h2>
        </Reveal>

        {/* Main races */}
        {MAIN_RACES.map((r, i) => (
          <Reveal key={i} dir={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
            <div
              style={{
                borderTop: "1px solid #ddd", padding: "clamp(20px,2.5vw,32px) 0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: 24, flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontSize: "clamp(20px,2vw,28px)", fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>{r.event}</h3>
                  {r.upcoming && (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#f5f5f0", background: "#111", padding: "3px 10px", borderRadius: 999 }}>Upcoming</span>
                  )}
                </div>
                <span style={{ fontSize: 13, color: "#999" }}>{r.location}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", letterSpacing: 0.5 }}>{r.type}</div>
                <div style={{ fontSize: 12, color: "#bbb" }}>{r.year}</div>
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid #ddd" }} />

        {/* Other races — compact */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Other Races</p>
            <div className="other-races" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
              {OTHER_RACES.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: "#888", padding: "6px 0" }}>
                  <span style={{ fontWeight: 600, color: "#666" }}>{r.event}</span>
                  <span style={{ color: "#bbb" }}> · {r.type} · {r.location} · {r.year}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Stats — centered at bottom */}
        <Reveal delay={0.35}>
          <div className="race-stats" style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,4vw,48px)", marginTop: 48, borderTop: "1px solid #ddd", paddingTop: "clamp(32px,4vw,48px)" }}>
            {[
              { num: "3", label: "Marathons" },
              { num: "1", label: "Triathlon" },
              { num: "8", label: "Total Races" },
              { num: "3", label: "Countries" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, letterSpacing: -2, color: "#111" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#999", fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .race-stats { flex-wrap: wrap !important; }
          .other-races { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}