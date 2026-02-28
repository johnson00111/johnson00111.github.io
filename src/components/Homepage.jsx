import { useState, useEffect } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ParallaxPhoto from "./ParallaxPhoto";
import Experience from "./Experience";
import Education from "./Education";
import Races from "./Races";
import QuoteSection from "./QuoteSection";
import Projects from "./Projects";
import Speaking from "./Speaking";
import { BlogList } from "./BlogList";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { PHOTOS } from "../data/site";

// Scroll progress bar
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const d = document.documentElement;
      setP(d.scrollTop / (d.scrollHeight - d.clientHeight));
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

export default function Homepage({ blogPosts = [] }) {
  const progress = useScrollProgress();

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif", color: "#111", background: "#f5f5f0", overflowX: "hidden" }}>
      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, background: "#fff", width: `${progress * 100}%`, zIndex: 200 }} />

      <Nav />
      <Hero />
      <About />
      <ParallaxPhoto src={PHOTOS.work} alt="Working" label="Where ideas become code." sublabel="At Work" position="center 20%" />
      <Experience />
      <Education />
      <ParallaxPhoto src={PHOTOS.marathon} alt="Marathon" label={`"We don't stop until we cross the finish line."`} sublabel="Overheard at Tokyo Marathon, 2025" bold />
      <Races />
      <QuoteSection />
      <ParallaxPhoto src={PHOTOS.campus} alt="Campus" label="Never stop learning." sublabel="Pittsburgh, PA" />
      <Projects />
      <Speaking />
      <BlogList posts={blogPosts} />
      <Contact />
      <Footer />
    </div>
  );
}