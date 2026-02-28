import { useState, useEffect, useRef } from "react";

function useReveal(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setV(true);
    }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

export { useReveal };

export default function Reveal({ children, dir = "up", delay = 0, style = {} }) {
  const [ref, v] = useReveal(0.08);
  const t = {
    up: "translateY(70px)",
    down: "translateY(-50px)",
    left: "translateX(-80px)",
    right: "translateX(80px)",
    none: "none",
    scale: "scale(0.92)",
  };
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: v ? 1 : 0,
        transform: v ? "none" : t[dir],
        transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}