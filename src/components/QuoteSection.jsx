import Reveal from "./Reveal";
import { useParallax } from "./ParallaxPhoto";
import { PHOTOS } from "../data/site";

export default function QuoteSection() {
  const [ref, off] = useParallax(0.1);

  return (
    <section ref={ref} style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", inset: "-15% 0",
          backgroundImage: `url(${PHOTOS.life})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "grayscale(70%) brightness(0.3)",
          transform: `translateY(${off * 0.5}px)`,
        }}
      />
      <Reveal dir="scale" style={{ position: "relative", zIndex: 1 }}>
        <blockquote
          style={{
            fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 300, lineHeight: 1.5, textAlign: "center",
            maxWidth: 720, margin: "0 auto", color: "#eee", fontStyle: "italic", letterSpacing: -0.5,
            transform: `translateY(${off}px)`,
          }}
        >
          "Without data, you're just another person with an opinion."
          <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(245,245,240,0.45)", marginTop: 24, fontStyle: "normal", letterSpacing: 3, textTransform: "uppercase" }}>
            — W. Edwards Deming
          </div>
        </blockquote>
      </Reveal>
    </section>
  );
}