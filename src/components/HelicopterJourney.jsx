import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HelicopterJourney() {
  const sectionRef = useRef(null);
  const helicopterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(helicopterRef.current,
        { y: '100%', x: '-50%', rotate: -15 },
        {
          y: '-100%',
          x: '50%',
          rotate: 15,
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
      background: 'linear-gradient(180deg, #ff6b6b 0%, #ffa500 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div ref={helicopterRef} style={{
        fontSize: '15rem',
        filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))',
        animation: 'rotate 0.5s linear infinite'
      }}>
        🚁
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
          Helicopter Charter
        </h2>
        <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)' }}>
          Arrive in style
        </p>
      </motion.div>
    </div>
  );
}
