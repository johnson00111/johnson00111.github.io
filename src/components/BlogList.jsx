import Reveal from "./Reveal";

export function BlogList({ posts }) {
  return (
    <section id="blog" style={{ padding: "140px 40px", background: "#f5f5f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal dir="left">
          <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Blog</p>
        </Reveal>
        <Reveal dir="left" delay={0.1}>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 64 }}>
            Writing &<br />thinking out loud.
          </h2>
        </Reveal>

        {posts.map((post, i) => (
          <Reveal key={i} dir={i % 2 === 0 ? "right" : "left"} delay={i * 0.06}>
            <a
              href={post.url || "#"}
              style={{
                borderTop: "1px solid #ddd", padding: "28px 0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", transition: "all 0.4s", textDecoration: "none", color: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "20px"; e.currentTarget.querySelector(".arr").style.transform = "translateX(10px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.querySelector(".arr").style.transform = "translateX(0)"; }}
            >
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{post.title}</h3>
                <span style={{ fontSize: 13, color: "#999" }}>{post.date} · {post.tag}</span>
              </div>
              <span className="arr" style={{ fontSize: 22, color: "#ccc", transition: "transform 0.4s" }}>→</span>
            </a>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid #ddd" }} />
      </div>
    </section>
  );
}
