import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JetJourney() {
  const sectionRef = useRef(null);
  const jetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(jetRef.current,
        { x: '-100%', y: '50%' },
        {
          x: '120%',
          y: '-50%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a3e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div ref={jetRef} style={{
        fontSize: '15rem',
        filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.8))'
      }}>
        ✈️
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '100px',
          textAlign: 'center',
          zIndex: 10
        }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#10b981' }}>
          Private Aviation
        </h2>
        <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
          Fly on your terms
        </p>
      </motion.div>
    </div>
  );
}
