import { useState, useEffect, useRef } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const ringRef = useRef(null);
  const circumference = 2 * Math.PI * 20; // r=20

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offset = circumference - circumference * progress;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transform: visible ? "translateY(0)" : "translateY(10px)",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    >
      {/* Ring + Arrow (always on the right) */}
      <div style={{
        position: "relative",
        width: 46,
        height: 46,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg
          width="46" height="46" viewBox="0 0 46 46"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <circle cx="23" cy="23" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <circle
            ref={ringRef}
            cx="23" cy="23" r="20"
            fill="none" stroke="#f5f5f0" strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 23 23)"
            style={{ transition: "stroke-dashoffset 0.15s" }}
          />
        </svg>
        <svg
          width="14" height="14" viewBox="0 0 16 16"
          fill="none" stroke="#f5f5f0" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "relative" }}
        >
          <path d="M8 14V3" />
          <path d="M3 7l5-5 5 5" />
        </svg>
      </div>

      {/* Text expands to the LEFT */}
      <span style={{
        maxWidth: hovered ? 130 : 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#f5f5f0",
        opacity: hovered ? 1 : 0,
        marginRight: hovered ? 6 : 0,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        BACK TO TOP
      </span>
    </button>
  );
}