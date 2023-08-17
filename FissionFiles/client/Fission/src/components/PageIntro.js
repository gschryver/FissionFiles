import React, { useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';
import "./css/page-intro.css";
import oppieSig from "./img/oppie-sig.png";
import oppie from "./img/oppie.jpg";

const PageIntro = () => {
    const introRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('page-intro-visible');
        } else {
          entry.target.classList.remove('page-intro-visible');
        }
      },
      {
        threshold: 0.1
      }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  return (
    <section ref={introRef} className="page-intro text-center">
      <h3 className="page-intro-header">A clandestine operation</h3>
      <p className="intro-text">The Manhattan Project was a covert enterprise of unparalleled significance during World War II. Led by the United States, with contributions from the United Kingdom and Canada, this ambitious initiative aimed to develop the world's first atomic bombs.</p>

      

<div className="mt-4 mb-4">
    <Image src={oppie} className="oppie-portrait" alt="Portrait of J. Robert Oppenheimer" />
      <p className="intro-quote"><span className="intro-quote-saol">If the</span> radiance of a thousand suns Were to burst at once <span className="intro-quote-saol">into the</span> sky, that would be like the splendor 
      <span className="intro-quote-saol"> of the</span> Mighty One...<span className="intro-quote-saol">&</span> now I am become Death, The destroyer of worlds.</p>
      </div>

    <Image src={oppieSig} className="oppie-sig" alt="Oppenheimer's signature" />
    </section>

    
  );
};

export default PageIntro;
