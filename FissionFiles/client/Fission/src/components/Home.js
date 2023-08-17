import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./css/home.css";
import NavBar from "./nav/navbar";
import PageIntro from "./PageIntro";

export default function Hello() {
  const [isActive, setIsActive] = useState(false);
  const heroRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;

    const hero = heroRef.current;
    const rect = hero.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div>
    <div className={`w-100 ${isActive ? "fade-in" : ""}`}>
      <NavBar fadeInFromTop={true} />
     <div className="hero-section">
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hero-image"
      >
        <div
          className="spotlight"
          style={{
            opacity,
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(30, 145, 255, 0.4), rgba(242, 92, 5, 0.5), rgba(242, 5, 5, 0.6), rgba(255, 255, 255, 0))`,
          }}
        />

        <div className="additional-text">
          A curated deep dive into the Manhattan Project
        </div>

        <div className="hero-text">
          <span className="saol">the </span> 
          <span className="glow-text">radiance </span> 
          <span className="saol">of a </span> 
          <span className="glow-text">thousand suns</span>
        </div>
        </div>
        </div>
        </div>


        <Container fluid className="page-intro-section">
        <PageIntro />
        </Container>

    </div>
    
  );
}
