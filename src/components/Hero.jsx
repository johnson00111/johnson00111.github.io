import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import { SITE, PHOTOS } from "../data/site";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroOp = Math.max(0, 1 - scrollY / 500);

  return (
    <section
      style={{
        height: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        position: "relative", overflow: "hidden", background: "#0a0a0a",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${PHOTOS.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "grayscale(100%) brightness(0.25)",
          transform: `scale(${1 + scrollY * 0.0003})`,
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div style={{ opacity: heroOp, position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(245,245,240,0.5)", letterSpacing: 6, textTransform: "uppercase", marginBottom: 32 }}>
            {SITE.title}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h1 style={{ fontSize: "clamp(56px,12vw,140px)", fontWeight: 900, lineHeight: 0.9, margin: 0, color: "#f5f5f0", letterSpacing: -4 }}>
            JOHNSON
          </h1>
        </Reveal>
        <Reveal delay={0.45}>
          <h1 style={{ fontSize: "clamp(56px,12vw,140px)", fontWeight: 200, lineHeight: 0.9, margin: 0, color: "#f5f5f0", letterSpacing: 8, fontStyle: "italic" }}>
            JAO
          </h1>
        </Reveal>
        <Reveal delay={0.6}>
          <p style={{ fontSize: 16, color: "rgba(245,245,240,0.55)", marginTop: 36, maxWidth: 480, margin: "36px auto 0", lineHeight: 1.8 }}>
            {SITE.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.8}>
          <div style={{ marginTop: 56, color: "rgba(245,245,240,0.3)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", animation: "fl 2.5s ease-in-out infinite" }}>
            ↓ Scroll to explore
          </div>
          <style>{`@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}`}</style>
        </Reveal>
      </div>
    </section>
  );
}