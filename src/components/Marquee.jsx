export default function Marquee({ items, reverse = false }) {
  const d = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "14px 0" }}>
      <div
        style={{
          display: "inline-flex",
          gap: 48,
          animation: `mrq${reverse ? "R" : ""} ${reverse ? 28 : 24}s linear infinite`,
        }}
      >
        {d.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#666",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes mrq { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mrqR { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
}