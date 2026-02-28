import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [off, setOff] = useState(0);
  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setOff((r.top + r.height / 2 - window.innerHeight / 2) * speed);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [speed]);
  return [ref, off];
}

export { useParallax };

export default function ParallaxPhoto({ src, alt, label, sublabel }) {
  const [ref, off] = useParallax(0.12);
  return (
    <section ref={ref} style={{ height: "70vh", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: "-20% 0",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${off}px)`,
          filter: "grayscale(80%) brightness(0.45)",
          transition: "transform 0.1s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Reveal dir="scale">
          <p
            style={{
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 800,
              color: "#f5f5f0",
              textAlign: "center",
              letterSpacing: -1,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {label}
          </p>
          {sublabel && (
            <p
              style={{
                fontSize: 14,
                color: "rgba(245,245,240,0.6)",
                marginTop: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {sublabel}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}