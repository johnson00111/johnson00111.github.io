import { useState, useEffect } from "react";
import { useReveal } from "./Reveal";

export default function Counter({ end, suffix = "" }) {
  const [ref, vis] = useReveal(0.3);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!vis) return;
    let s = 0;
    const step = Math.max(end / 120, 0.1);
    const id = setInterval(() => {
      s += step;
      if (s >= end) {
        setVal(end);
        clearInterval(id);
      } else {
        setVal(Math.floor(s));
      }
    }, 16);
    return () => clearInterval(id);
  }, [vis, end]);

  return <span ref={ref}>{val}{suffix}</span>;
}