import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function YachtJourney() {
  const sectionRef = useRef(null);
  const yachtRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const yacht = yachtRef.current;
    const text = textRef.current;

    gsap.fromTo(
      yacht,
      { x: '-20%' },
      {
        x: '120%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      text.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style>
        {`
          @keyframes ripple {
            0% { transform: translate(-50%, 0) scale(0.5); opacity: 1; }
            100% { transform: translate(-50%, 0) scale(1.5); opacity: 0; }
          }
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            20% { opacity: 0.5; }
            80% { opacity: 0.5; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}
      </style>

      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.2,
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom'
        }} />
      </div>

      {/* HUD Elements */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        zIndex: 20,
        fontFamily: 'monospace'
      }}>
        <div style={{
          color: '#10b981',
          fontSize: '12px',
          letterSpacing: '0.2em',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 8px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          NAV: 34° 21' 19" S
        </div>
        <div style={{
          color: '#10b981',
          fontSize: '12px',
          letterSpacing: '0.2em',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 8px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          LNG: 18° 28' 56" E
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            marginTop: '8px',
            boxShadow: '0 0 8px #10b981'
          }}
        />
      </div>

      {/* Scan Line */}
      <motion.div
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          zIndex: 30,
          boxShadow: '0 0 15px #10b981'
        }}
      />

      {/* Main Text */}
      <div ref={textRef} style={{
        position: 'absolute',
        top: '33%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10,
        width: '100%',
        padding: '0 16px'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'white',
          letterSpacing: '0.2em',
          textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
          margin: 0
        }}>
          YACHT CHARTER
        </h2>
        <p style={{
          color: '#10b981',
          fontFamily: 'monospace',
          letterSpacing: '0.5em',
          marginTop: '16px',
          textTransform: 'uppercase',
          fontSize: 'clamp(0.75rem, 2vw, 1.125rem)'
        }}>
          Luxury at Sea // Class A
        </p>
      </div>

      {/* Yacht Container */}
      <div
        ref={yachtRef}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: 0,
          width: '600px',
          height: '400px',
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        {/* Wireframe Yacht SVG */}
        <svg
          viewBox="0 0 600 400"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
          }}
        >
          <g stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Hull */}
            <path d="M50,300 C150,330 450,330 550,280 L520,220 L80,220 Z" fill="rgba(16,185,129,0.05)" />
            <path d="M80,220 L520,220" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Deck Details */}
            <path d="M120,220 L140,180 L250,180 L270,220" />
            <path d="M280,220 L300,160 L450,160 L480,220" />
            
            {/* Mast */}
            <line x1="300" y1="220" x2="300" y2="50" strokeWidth="3" />
            
            {/* Sails */}
            <path d="M305,55 L480,200 L305,200 Z" fill="rgba(16,185,129,0.02)" />
            <path d="M295,65 L120,200 L295,200 Z" fill="rgba(16,185,129,0.02)" />
            
            {/* Rigging */}
            <line x1="300" y1="50" x2="550" y2="280" opacity="0.5" strokeWidth="1" />
            <line x1="300" y1="50" x2="50" y2="300" opacity="0.5" strokeWidth="1" />
            
            {/* Windows */}
            <rect x="320" y="180" width="30" height="10" strokeWidth="1" />
            <rect x="370" y="180" width="30" height="10" strokeWidth="1" />
          </g>
        </svg>

        {/* Water Ripples */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '100%',
                  aspectRatio: '4/1',
                  width: `${200 + i * 100}px`,
                  animation: `ripple 3s infinite linear ${i * 1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
              animation: `floatUp ${5 + Math.random() * 5}s infinite linear ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
