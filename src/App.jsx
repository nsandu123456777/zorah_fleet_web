import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- ICONS ---
const Icons = {
  Yacht: () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <motion.g
        initial={{ y: 2 }} animate={{ y: -2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path d="M50 15 L85 80 L15 80 Z" fill="none" stroke="#10b981" strokeWidth="2" />
        <path d="M50 30 L70 75 L30 75 Z" fill="rgba(16,185,129,0.1)" stroke="none" />
        <path d="M10 85 L90 85" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
      </motion.g>
    </svg>
  ),
  Heli: () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <g>
        <motion.circle
          cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="10 5"
          animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="50" cy="50" r="20" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
        <rect x="48" y="20" width="4" height="60" fill="#10b981" />
        <rect x="20" y="48" width="60" height="4" fill="#10b981" />
      </g>
    </svg>
  ),
  Jet: () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <motion.g
        initial={{ x: -2 }} animate={{ x: 2 }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
      >
        <path d="M50 10 L80 80 L50 70 L20 80 Z" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="70" stroke="#10b981" strokeWidth="1" />
        <path d="M10 90 L30 90" stroke="#10b981" strokeWidth="1" opacity="0.5" />
        <path d="M70 90 L90 90" stroke="#10b981" strokeWidth="1" opacity="0.5" />
      </motion.g>
    </svg>
  ),
  Car: () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <g>
        <rect x="15" y="35" width="70" height="25" rx="5" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
        <path d="M25 35 L35 20 L65 20 L75 35" fill="none" stroke="#10b981" strokeWidth="2" />
        <motion.circle
          cx="30" cy="60" r="8" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2"
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="70" cy="60" r="8" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2"
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </g>
    </svg>
  )
};

const ValueIcons = {
  Clock: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ width: '24px', height: '24px', color: '#10b981' }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ width: '24px', height: '24px', color: '#10b981' }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ width: '24px', height: '24px', color: '#10b981' }}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
};

// --- DATA ---
const TEXT_HERO_DATA = {
  yacht: { mainText: "Command the open water with precision", subtitle: ["Operating System for", "Yacht Chartering"] },
  heli: { mainText: "Elevate above the ordinary", subtitle: ["Operating System for", "Helicopter Chartering"] },
  jet: { mainText: "The world is closer than you think", subtitle: ["Operating System for", "Private Jet Chartering"] },
  car: { mainText: "Luxury moves at your pace", subtitle: ["Operating System for", "Car Rentals"] }
};

const FEATURES_DATA = [
  { id: 'fleet', index: '[0.1]', title: 'Global Fleet Network', description: "Access premium vehicles across continents. Our curated selection ensures you travel in luxury, wherever your journey takes you.", details: "Operators experience enhanced situational awareness and effectiveness as Zorah Fleet streamlines critical decision-making in the modern travel landscape." },
  { id: 'booking', index: '[0.2]', title: 'Instant Booking', description: "Real-time availability and instant confirmation. Book your preferred vehicle in seconds with transparent pricing and no hidden fees.", details: "Our AI-powered platform seamlessly integrates availability checking and booking confirmation, providing travelers with a frictionless experience." },
  { id: 'concierge', index: '[0.3]', title: '24/7 Concierge', description: "Round-the-clock support for every journey. Our dedicated team ensures your travel experience exceeds expectations at every touchpoint.", details: "Zorah Fleet's targeting offering supports travelers with an AI-powered service chain, seamlessly and responsibly integrating all aspects of luxury travel." }
];

const UI_SHOWCASE_TIMELINE = [
  { startFrame: 0, endFrame: 208, title: "Home", description: "Welcome to Zorah Fleet" },
  { startFrame: 208, endFrame: 718, title: "My Portal", description: "Your centralized command center for tasks, yachts, and daily operations" },
  { startFrame: 718, endFrame: 869, title: null, description: "Integrated calendar for scheduling and availability tracking" },
  { startFrame: 869, endFrame: 1212, title: "Email Inbox", description: "AI-powered email parsing with automatic booking creation and yacht matching" },
  { startFrame: 1212, endFrame: 1628, title: "Booking Overview", description: "Auto-created bookings with all charter data in one place" },
  { startFrame: 1628, endFrame: 1939, title: "Operations", description: "Real-time booking pipeline with status tracking across all charters" },
  { startFrame: 1939, endFrame: 2089, title: null, description: "Contract generation and management linked directly to bookings" },
  { startFrame: 2089, endFrame: 2219, title: null, description: "Dynamic pricing engine with automated rate calculations" },
  { startFrame: 2219, endFrame: 2296, title: null, description: "Crew briefings and operational readiness per charter" },
  { startFrame: 2296, endFrame: 2363, title: null, description: "Post-charter workflows for close-out and reporting" },
  { startFrame: 2363, endFrame: 2424, title: null, description: "Automated workflows powering end-to-end operations" }
];

// --- COMPONENTS ---
const Particles = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          background: '#10b981',
          borderRadius: '50%',
          opacity: Math.random() * 0.4,
          left: `${Math.random() * 100}%`,
          top: '100%',
        }}
        animate={{ top: '-10%', opacity: 0 }}
        transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
      />
    ))}
  </div>
);

const HUDCorner = ({ position }) => {
  const styles = {
    tl: { top: 0, left: 0, borderTop: '2px solid #10b981', borderLeft: '2px solid #10b981' },
    tr: { top: 0, right: 0, borderTop: '2px solid #10b981', borderRight: '2px solid #10b981' },
    bl: { bottom: 0, left: 0, borderBottom: '2px solid #10b981', borderLeft: '2px solid #10b981' },
    br: { bottom: 0, right: 0, borderBottom: '2px solid #10b981', borderRight: '2px solid #10b981' },
  };
  return <div style={{ position: 'absolute', width: '10px', height: '10px', ...styles[position] }} />;
};

const VehicleCard = ({ id, Icon, label, desc, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.05 * index + 0.3, duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(id)}
      style={{
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid #1f2937',
        borderRadius: '4px',
        padding: '40px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 0.1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, #10b981, transparent)', pointerEvents: 'none' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid #10b981',
          borderRadius: '4px',
          boxShadow: isHovered ? '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)' : 'none',
          pointerEvents: 'none'
        }}
      />

      <div style={{ width: '60px', height: '60px', marginBottom: '20px', color: '#10b981', position: 'relative', zIndex: 2 }}>
        <Icon />
      </div>
      <h3 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#fff', fontSize: '1.1rem', fontWeight: '400', letterSpacing: '0.05em', marginBottom: '5px', position: 'relative', zIndex: 2 }}>
        {label}
      </h3>
      <p style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#10b981', fontSize: '0.75rem', fontWeight: '400', letterSpacing: '0.05em', opacity: 0.8, position: 'relative', zIndex: 2 }}>
        {desc}
      </p>

      <HUDCorner position="tl" />
      <HUDCorner position="br" />
    </motion.div>
  );
};

const ValueCard = ({ Icon, title, sub }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    style={{
      background: 'rgba(0, 0, 0, 0.6)',
      border: '1px solid #1f2937',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      backdropFilter: 'blur(5px)',
      flex: 1,
      minWidth: '250px'
    }}
  >
    <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}>
      <Icon />
    </div>
    <div>
      <h4 style={{ color: '#fff', margin: 0, fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.95rem', fontWeight: '400' }}>{title}</h4>
      <p style={{ color: '#9ca3af', margin: '5px 0 0', fontSize: '0.85rem', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400' }}>{sub}</p>
    </div>
  </motion.div>
);

// --- VIDEO-BASED UI SHOWCASE ---
const UIShowcaseSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("Home");
  const imagesRef = useRef([]);
  const scrollTriggerRef = useRef(null);
  const frameCount = 2424;

  useEffect(() => {
    const images = [];
    const promises = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const promise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      img.src = `/yacht_ui_frames/frame_${String(i).padStart(4, '0')}.jpg`;
      images.push(img);
      promises.push(promise);
    }

    imagesRef.current = images;

    Promise.all(promises).then(() => {
      setImagesLoaded(true);
    }).catch((err) => {
      console.error('Error loading UI frames:', err);
    });
  }, []);

  useLayoutEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = imagesRef.current;

    // Higher resolution canvas for crisp quality, scaled down by CSS
    canvas.width = 2000;
    canvas.height = 1400;

    // Enable image smoothing for better quality
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const render = (index) => {
      if (images[index] && images[index].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;
        // Cover fit - fill entire canvas, crop if needed
        if (imgAspect > canvasAspect) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    render(0);

    let currentSection = 0;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200vh",
        scrub: 0.3,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.min(Math.floor(progress * (frameCount - 1)), frameCount - 1);

          render(frameIndex);

          const section = UI_SHOWCASE_TIMELINE.findIndex(
            s => frameIndex >= s.startFrame && frameIndex < s.endFrame
          );
          if (section !== -1 && section !== currentSection) {
            currentSection = section;
            setActiveSection(section);
            // Find the correct title by looking backwards from current section
            let titleToShow = null;
            for (let i = section; i >= 0; i--) {
              if (UI_SHOWCASE_TIMELINE[i].title !== null) {
                titleToShow = UI_SHOWCASE_TIMELINE[i].title;
                break;
              }
            }
            if (titleToShow !== null) {
              setDisplayedTitle(titleToShow);
            }
          }
        },
        onLeave: () => {
          setTimeout(() => ScrollTrigger.refresh(), 100);
        },
        onEnterBack: () => {
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }
      });
      scrollTriggerRef.current = trigger;
    }, containerRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  const navigateToSection = (sectionIndex) => {
    if (!scrollTriggerRef.current) return;
    const section = UI_SHOWCASE_TIMELINE[sectionIndex];
    // Calculate progress based on the middle of the section
    const midFrame = (section.startFrame + section.endFrame) / 2;
    const progress = midFrame / frameCount;
    // Calculate the scroll position
    const trigger = scrollTriggerRef.current;
    const scrollTo = trigger.start + (trigger.end - trigger.start) * progress;
    gsap.to(window, { scrollTo: scrollTo, duration: 0.8, ease: "power2.inOut" });
  };

  const currentSection = UI_SHOWCASE_TIMELINE[activeSection];

  return (
    <div 
      ref={containerRef}
      style={{ 
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '100px 40px 40px',
        gap: '25px',
        position: 'relative',
        zIndex: 10
      }}>

        <motion.div
          key={displayedTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            zIndex: 20
          }}
        >
          <h2 style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#fff',
            marginBottom: '6px'
          }}>
            {displayedTitle}
          </h2>
          <p style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '0.9rem',
            fontWeight: '400',
            color: '#10b981',
            opacity: 0.9
          }}>
            {currentSection?.description}
          </p>
        </motion.div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          
          <AnimatePresence mode="wait">
            {activeSection % 2 === 0 && (
              <motion.div
                key={`left-${activeSection}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  left: '2%',
                  background: 'rgba(0, 0, 0, 0.95)',
                  border: '1px solid #10b981',
                  padding: '20px 25px',
                  minWidth: '220px',
                  maxWidth: '250px',
                  zIndex: 30,
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{
                  color: '#10b981',
                  fontSize: '1rem',
                  fontWeight: '400',
                  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  marginBottom: '6px'
                }}>
                  {displayedTitle}
                </div>
                <div style={{
                  color: '#9ca3af',
                  fontSize: '0.8rem',
                  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: '400',
                  lineHeight: '1.4'
                }}>
                  {currentSection?.description}
                </div>
                <HUDCorner position="tl" />
                <HUDCorner position="br" />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{
            position: 'relative',
            width: '1000px',
            height: '700px',
            background: '#000',
            border: '2px solid #10b981',
            borderRadius: '8px',
            boxShadow: '0 0 60px rgba(16, 185, 129, 0.3)',
            overflow: 'hidden',
            flexShrink: 0
          }}>

            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%'
              }}
            />

            <HUDCorner position="tl" />
            <HUDCorner position="tr" />
            <HUDCorner position="bl" />
            <HUDCorner position="br" />
          </div>

          <AnimatePresence mode="wait">
            {activeSection % 2 === 1 && (
              <motion.div
                key={`right-${activeSection}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  right: '2%',
                  background: 'rgba(0, 0, 0, 0.95)',
                  border: '1px solid #10b981',
                  padding: '20px 25px',
                  minWidth: '220px',
                  maxWidth: '250px',
                  zIndex: 30,
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{
                  color: '#10b981',
                  fontSize: '1rem',
                  fontWeight: '400',
                  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  marginBottom: '6px'
                }}>
                  {displayedTitle}
                </div>
                <div style={{
                  color: '#9ca3af',
                  fontSize: '0.8rem',
                  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: '400',
                  lineHeight: '1.4'
                }}>
                  {currentSection?.description}
                </div>
                <HUDCorner position="tl" />
                <HUDCorner position="br" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          zIndex: 20
        }}>
          {UI_SHOWCASE_TIMELINE.map((_, i) => (
            <div
              key={i}
              onClick={() => navigateToSection(i)}
              style={{
                width: i === activeSection ? '40px' : '20px',
                height: '4px',
                background: i === activeSection ? '#10b981' : '#374151',
                transition: 'all 0.4s ease',
                boxShadow: i === activeSection ? '0 0 15px rgba(16, 185, 129, 0.6)' : 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

// LANDING PAGE VERSION - DO NOT TOUCH THIS ONE - IT WORKS
const ScrollFeaturesSection = () => {
  const containerRef = useRef(null);
  const contentRefs = useRef([]);
  const headingRefs = useRef([]);
  const imageRefs = useRef([]);
  const [activeTab, setActiveTab] = useState('video');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      FEATURES_DATA.forEach((_, index) => {
        const content = contentRefs.current[index];
        const heading = headingRefs.current[index];
        const image = imageRefs.current[index];
        
        if (!content || !heading || !image) return;

        const headingHeight = heading.offsetHeight;

        ScrollTrigger.create({
          trigger: content,
          start: 'top top',
          endTrigger: image,
          end: () => `bottom ${headingHeight}px`,
          pin: heading,
          pinSpacing: false,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', padding: '100px 40px 120px', maxWidth: '1400px', margin: '0 auto' }}>
      {FEATURES_DATA.map((feature, index) => (
        <div 
          key={feature.id}
          style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', marginBottom: index < FEATURES_DATA.length - 1 ? '200px' : 0, position: 'relative' }}
        >
          <div ref={(el) => (headingRefs.current[index] = el)} style={{ width: '500px', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', color: '#fff', marginBottom: '15px', letterSpacing: '0.05em', fontWeight: '400' }}>
              {feature.index}
            </div>
            <h2 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '4rem', fontWeight: '400', color: '#fff', lineHeight: 1.1, margin: 0 }}>
              {feature.title}
            </h2>
          </div>

          <div ref={(el) => (contentRefs.current[index] = el)} style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1.25rem', color: '#d1d5db', lineHeight: 1.7, marginBottom: '25px', fontWeight: '400' }}>
              {feature.description}
            </p>

            <p style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: '40px', fontWeight: '400' }}>
              {feature.details}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <button onClick={() => setActiveTab('video')} style={{ padding: '12px 35px', background: activeTab === 'video' ? '#e5e7eb' : 'transparent', color: activeTab === 'video' ? '#000' : '#9ca3af', border: '1px solid #374151', borderRadius: '30px', cursor: 'pointer', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', fontWeight: '400', transition: 'all 0.3s' }}>
                VIDEO
              </button>
              <button onClick={() => setActiveTab('details')} style={{ padding: '12px 35px', background: activeTab === 'details' ? '#e5e7eb' : 'transparent', color: activeTab === 'details' ? '#000' : '#9ca3af', border: '1px solid #374151', borderRadius: '30px', cursor: 'pointer', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', fontWeight: '400', transition: 'all 0.3s' }}>
                DETAILS
              </button>
            </div>

            <div ref={(el) => (imageRefs.current[index] = el)} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ width: '100%', height: '300px', background: '#0a0a0a', border: '1px solid #10b981', borderRadius: '8px', position: 'relative', boxShadow: '0 0 30px rgba(16, 185, 129, 0.1)', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                  <div style={{ color: '#fff', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', fontSize: '0.85rem' }}>
                    {feature.title}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', flex: 1 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '12px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '4px', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400' }}>METRIC_0{i}</div>
                      <div style={{ fontSize: '1rem', color: '#10b981', fontFamily: 'monospace' }}>{Math.floor(Math.random() * 1000)}</div>
                      <div style={{ width: '100%', height: '2px', background: '#333', marginTop: '8px' }}>
                        <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#10b981' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: '60px', background: '#111', border: '1px solid #333', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', padding: '8px', gap: '2px' }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ flex: 1, background: '#666', opacity: 0.3, height: `${Math.random() * 100}%` }} />
                  ))}
                </div>

                <HUDCorner position="tl" />
                <HUDCorner position="br" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// TRANSITION SECTION - Buffer between UI showcase and features
const FlipCard = ({ number, title, desc, features, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Calculate animation: center (index 1) appears first, sides slide in with delay
  const getInitial = () => {
    if (index === 0) return { opacity: 0, x: -100 };
    if (index === 2) return { opacity: 0, x: 100 };
    return { opacity: 0, y: 30 };
  };

  const getAnimate = () => ({ opacity: 1, x: 0, y: 0 });

  const getDelay = () => (index === 1 ? 0 : 0.2);

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: getDelay() }}
      style={{
        perspective: '1000px',
        height: '280px'
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of card */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          padding: '40px 30px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '0.8rem',
            color: '#10b981',
            marginBottom: '15px',
            letterSpacing: '0.1em'
          }}>
            {number}
          </div>
          <h3 style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '1.5rem',
            fontWeight: '400',
            color: '#fff',
            marginBottom: '10px'
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '0.95rem',
            color: '#9ca3af',
            lineHeight: 1.6
          }}>
            {desc}
          </p>
        </div>

        {/* Back of card */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          padding: '40px 30px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '8px',
          boxSizing: 'border-box'
        }}>
          <h3 style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '1.2rem',
            fontWeight: '400',
            color: '#10b981',
            marginBottom: '20px'
          }}>
            {title}
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {features.map((feature, i) => (
              <li key={i} style={{
                fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontSize: '0.9rem',
                color: '#fff',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ color: '#10b981' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PlatformHighlightsSection = () => {
  const cards = [
    {
      number: '01',
      title: 'AI Agents',
      desc: 'Intelligent automation handles routine tasks so you can focus on relationships',
      features: ['Inbound customer support', 'Employee helpdesk', 'Outbound calling', 'Workflow automation']
    },
    {
      number: '02',
      title: 'Fleet Hub',
      desc: 'Every update reflected instantly across your entire operation',
      features: ['One-click URL import', 'Complete vessel profiles', 'Real-time availability', 'Fleet overview']
    },
    {
      number: '03',
      title: 'CRM',
      desc: 'Everything from inquiry to close-out in one seamless system',
      features: ['360° client profiles', 'Broker commission tracking', 'Activity history', 'Automated communications']
    }
  ];

  return (
    <div style={{ padding: '150px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <h2 style={{
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: '3rem',
          fontWeight: '400',
          color: '#fff',
          marginBottom: '20px'
        }}>
          Built for Modern Charter Operations
        </h2>
        <p style={{
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: '1.1rem',
          color: '#9ca3af',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          Every feature designed to streamline your workflow and elevate the client experience
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {cards.map((card, i) => (
          <FlipCard key={i} {...card} index={i} />
        ))}
      </div>
    </div>
  );
};

// VEHICLE JOURNEY VERSION - WITH SCROLL PINNING (EXACT COPY OF LANDING PAGE LOGIC)
const VehicleJourneyFeatures = () => {
  const containerRef = useRef(null);
  const contentRefs = useRef([]);
  const headingRefs = useRef([]);
  const imageRefs = useRef([]);
  const [activeTab, setActiveTab] = useState('video');
  const triggersRef = useRef([]);
  const hasRefreshedRef = useRef(false);

  useLayoutEffect(() => {
    // Clean up any existing triggers first
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const ctx = gsap.context(() => {
      FEATURES_DATA.forEach((_, index) => {
        const content = contentRefs.current[index];
        const heading = headingRefs.current[index];
        const image = imageRefs.current[index];

        if (!content || !heading || !image) return;

        const headingHeight = heading.offsetHeight;

        const trigger = ScrollTrigger.create({
          trigger: content,
          start: 'top top',
          endTrigger: image,
          end: () => `bottom ${headingHeight}px`,
          pin: heading,
          pinSpacing: false,
          invalidateOnRefresh: true,
          refreshPriority: -1, // Lower priority so it refreshes after UI showcase
        });

        triggersRef.current.push(trigger);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Use IntersectionObserver to refresh ScrollTriggers when section comes into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRefreshedRef.current) {
            // Refresh ScrollTrigger when section first comes into view
            hasRefreshedRef.current = true;
            ScrollTrigger.refresh();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px 0px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', padding: '100px 40px 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1.5rem', fontWeight: '400', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', color: '#fff' }}>FEATURES</h2>
      </div>

      {FEATURES_DATA.map((feature, index) => (
        <div
          key={feature.id}
          style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', marginBottom: index < FEATURES_DATA.length - 1 ? '200px' : 0, position: 'relative' }}
        >
          <div ref={(el) => (headingRefs.current[index] = el)} style={{ width: '500px', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', color: '#fff', marginBottom: '15px', letterSpacing: '0.05em', fontWeight: '400' }}>
              {feature.index}
            </div>
            <h2 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '4rem', fontWeight: '400', color: '#fff', lineHeight: 1.1, margin: 0 }}>
              {feature.title}
            </h2>
          </div>

          <div ref={(el) => (contentRefs.current[index] = el)} style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1.25rem', color: '#d1d5db', lineHeight: 1.7, marginBottom: '25px', fontWeight: '400' }}>
              {feature.description}
            </p>

            <p style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: '40px', fontWeight: '400' }}>
              {feature.details}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <button onClick={() => setActiveTab('video')} style={{ padding: '12px 35px', background: activeTab === 'video' ? '#e5e7eb' : 'transparent', color: activeTab === 'video' ? '#000' : '#9ca3af', border: '1px solid #374151', borderRadius: '30px', cursor: 'pointer', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', fontWeight: '400', transition: 'all 0.3s' }}>
                VIDEO
              </button>
              <button onClick={() => setActiveTab('details')} style={{ padding: '12px 35px', background: activeTab === 'details' ? '#e5e7eb' : 'transparent', color: activeTab === 'details' ? '#000' : '#9ca3af', border: '1px solid #374151', borderRadius: '30px', cursor: 'pointer', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '0.9rem', fontWeight: '400', transition: 'all 0.3s' }}>
                DETAILS
              </button>
            </div>

            <div ref={(el) => (imageRefs.current[index] = el)} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ width: '100%', height: '300px', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid #10b981', borderRadius: '8px', position: 'relative', boxShadow: '0 0 30px rgba(16, 185, 129, 0.1)', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                  <div style={{ color: '#fff', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', fontSize: '0.85rem' }}>
                    {feature.title}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', flex: 1 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #333', padding: '12px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '4px', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400' }}>METRIC_0{i}</div>
                      <div style={{ fontSize: '1rem', color: '#10b981', fontFamily: 'monospace' }}>{Math.floor(Math.random() * 1000)}</div>
                      <div style={{ width: '100%', height: '2px', background: '#333', marginTop: '8px' }}>
                        <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#10b981' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: '60px', background: 'rgba(0,0,0,0.4)', border: '1px solid #333', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', padding: '8px', gap: '2px' }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ flex: 1, background: '#10b981', opacity: 0.4, height: `${Math.random() * 100}%` }} />
                  ))}
                </div>

                <HUDCorner position="tl" />
                <HUDCorner position="br" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TextHeroSection = ({ vehicleId }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const patternRef = useRef(null);
  const data = TEXT_HERO_DATA[vehicleId];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 20%", scrub: 1 } });
      gsap.to(patternRef.current, { backgroundPosition: "200px 200px", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');`}</style>
      <div ref={containerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #000 0%, #064e3b 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, #000, transparent)', zIndex: 5 }} />
        <div ref={contentRef} style={{ textAlign: 'center', padding: '0 40px', maxWidth: '1200px', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: '400', color: '#fff', lineHeight: 1.2, marginBottom: '0', letterSpacing: '-0.02em' }}>
            {data.mainText}
          </h2>
          <div style={{ marginTop: '90px', color: '#9ca3af', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: '300', letterSpacing: '0.02em', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            {data.subtitle.map((line, i) => (<div key={i}>{line}</div>))}
          </div>
        </div>
        <div ref={patternRef} style={{ position: 'absolute', top: '65%', left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(0, 40, 30, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 40, 30, 0.5) 2px, transparent 2px)', backgroundSize: '50px 50px', opacity: 1, zIndex: 2, maskImage: 'linear-gradient(to bottom, transparent, black 5%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #064e3b)', zIndex: 5 }} />
      </div>
    </>
  );
};

const ImageSequenceHero = ({ vehicleId }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]);
  const frameCount = 151;

  const vehicleLabels = { yacht: 'YACHT', car: 'AUTO', jet: 'JET', heli: 'HELI' };

  useEffect(() => {
    const images = [];
    const promises = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const promise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      img.src = `/frames/${vehicleId}/frame_${String(i).padStart(4, '0')}.jpg`;
      images.push(img);
      promises.push(promise);
    }

    imagesRef.current = images;
    Promise.all(promises).then(() => setImagesLoaded(true)).catch((err) => console.error('Error loading images:', err));
  }, [vehicleId]);

  useLayoutEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = imagesRef.current;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const render = (index) => {
      if (images[index] && images[index].complete) {
        const img = images[index];
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    render(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=110vh",
        scrub: 0,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.min(Math.floor(progress * (frameCount - 1)), frameCount - 1);
          
          render(frameIndex);

          if (progress >= 0.75) {
            gsap.to(textRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out", overwrite: true });
          } else {
            gsap.to(textRef.current, { opacity: 0, scale: 0.8, y: 50, duration: 0.3, ease: "power2.in", overwrite: true });
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} style={{ height: '110vh', width: '100%', position: 'relative' }}>
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #000 90%)', opacity: 0.4, zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #000)', zIndex: 2 }} />
        <div ref={textRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', opacity: 0, transform: 'scale(0.8) translateY(50px)' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', letterSpacing: '0.05em', color: '#fff', textShadow: '0 0 30px rgba(16, 185, 129, 0.3)', margin: 0 }}>
            {vehicleLabels[vehicleId]}
          </h1>
        </div>
      </div>
    </div>
  );
};

const GreenSectionWrapper = ({ children }) => {
  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: 0, y: 0 });
  const [pos3, setPos3] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame;
    let time = 0;

    const animate = () => {
      time += 0.005;

      setPos1({
        x: Math.sin(time * 0.7) * 80,
        y: Math.cos(time * 0.5) * 60
      });
      setPos2({
        x: Math.cos(time * 0.6) * 100,
        y: Math.sin(time * 0.8) * 70
      });
      setPos3({
        x: Math.sin(time * 0.9) * 90,
        y: Math.cos(time * 0.4) * 80
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{ position: 'relative', background: '#064e3b', overflow: 'hidden' }}>
      {/* Top gradient fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '300px', background: 'linear-gradient(to bottom, #064e3b, transparent)', zIndex: 5, pointerEvents: 'none' }} />

      {/* Animated orbs using requestAnimationFrame */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            left: `calc(-10% + ${pos1.x}px)`,
            top: `calc(10% + ${pos1.y}px)`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            right: `calc(-15% + ${pos2.x}px)`,
            top: `calc(30% + ${pos2.y}px)`,
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(52, 211, 153, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            left: `calc(30% + ${pos3.x}px)`,
            bottom: `calc(-5% + ${pos3.y}px)`,
            background: 'radial-gradient(circle, rgba(5, 150, 105, 0.38) 0%, rgba(5, 150, 105, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            right: `calc(20% + ${pos1.y}px)`,
            bottom: `calc(20% + ${pos2.x}px)`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(16, 185, 129, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '300px', background: 'linear-gradient(to bottom, transparent, #064e3b)', zIndex: 5, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

const VehicleJourney = ({ vehicleId, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', position: 'relative' }}>
      <button onClick={onBack} style={{ position: 'fixed', top: '100px', left: '40px', zIndex: 100, background: 'transparent', border: '1px solid #10b981', color: '#10b981', padding: '10px 20px', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cursor: 'pointer', transition: 'all 0.3s', fontWeight: '400' }} onMouseEnter={(e) => { e.target.style.background = '#10b981'; e.target.style.color = '#000'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#10b981'; }}>
        ← BACK
      </button>

      <ImageSequenceHero vehicleId={vehicleId} />
      <TextHeroSection vehicleId={vehicleId} />
      
      <GreenSectionWrapper>
        <UIShowcaseSection />
        <PlatformHighlightsSection />
        <VehicleJourneyFeatures />
      </GreenSectionWrapper>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #064e3b 0%, #000 100%)', position: 'relative', overflow: 'hidden', padding: '100px 20px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, #064e3b, transparent)', zIndex: 5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #000, #064e3b, #000)', backgroundSize: '400% 400%', animation: 'gradientBG 20s ease infinite', zIndex: 0, opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 0, pointerEvents: 'none' }} />
        <Particles />

        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', marginBottom: '40px' }}>EXPERIENCE THE DIFFERENCE</h2>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ width: '250px', padding: '30px', border: '1px solid #10b981', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: '#10b981', fontSize: '2rem', marginBottom: '10px' }}>"</div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#ccc', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400' }}>Exceptional service. The platform makes everything seamless and transparent.</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2rem', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', color: '#fff', marginBottom: '20px' }}>READY TO ELEVATE YOUR JOURNEY?</h2>
          <button style={{ padding: '20px 60px', fontSize: '1.2rem', background: '#10b981', color: '#000', border: 'none', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', cursor: 'pointer' }}>
            START BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ onSelect }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 20px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { id: 'yacht', label: 'YACHT', desc: 'OCEAN CLASS A', Icon: Icons.Yacht },
            { id: 'heli', label: 'HELI', desc: 'URBAN AIR', Icon: Icons.Heli },
            { id: 'jet', label: 'JET', desc: 'STRATOSPHERE', Icon: Icons.Jet },
            { id: 'car', label: 'AUTO', desc: 'GROUND ELITE', Icon: Icons.Car },
          ].map((v, i) => (
            <VehicleCard key={v.id} {...v} index={i} onClick={onSelect} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '1.5rem', fontWeight: '400', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>WHY ZORAH FLEET</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <ValueCard Icon={ValueIcons.Clock} title="24/7 AVAILABILITY" sub="Always ready when you are." />
          <ValueCard Icon={ValueIcons.Shield} title="VERIFIED OPERATORS" sub="Premium, certified providers." />
          <ValueCard Icon={ValueIcons.Bolt} title="INSTANT QUOTES" sub="Real-time pricing, no waiting." />
        </div>
      </div>

      <ScrollFeaturesSection />

      {/* Testimonials Section */}
      <div style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '2.5rem',
            fontWeight: '400',
            color: '#fff',
            marginBottom: '15px'
          }}>
            What Our Clients Say
          </h2>
          <p style={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: '1rem',
            color: '#9ca3af',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Trusted by leading charter operators worldwide
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            {
              quote: "Zorah Fleet transformed how we manage our charter operations. The automation alone saved us countless hours every week.",
              name: "Sarah Mitchell",
              title: "Operations Director",
              company: "Azure Yacht Charters"
            },
            {
              quote: "The real-time availability and instant booking features have significantly increased our conversion rates. A game-changer for our business.",
              name: "James Rodriguez",
              title: "Fleet Manager",
              company: "Mediterranean Luxe"
            },
            {
              quote: "Finally, a platform that understands the complexity of yacht chartering. The AI-powered email parsing is incredibly accurate.",
              name: "Elena Vasquez",
              title: "Charter Broker",
              company: "Elite Nautical Group"
            }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                padding: '35px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              <div style={{
                color: '#10b981',
                fontSize: '3rem',
                lineHeight: 1,
                marginBottom: '20px',
                fontFamily: 'Georgia, serif'
              }}>
                "
              </div>
              <p style={{
                fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontSize: '0.95rem',
                color: '#d1d5db',
                lineHeight: 1.7,
                marginBottom: '25px',
                fontStyle: 'italic'
              }}>
                {testimonial.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: '0.95rem',
                    color: '#fff',
                    fontWeight: '400'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: '0.8rem',
                    color: '#10b981'
                  }}>
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #333', padding: '80px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '50px', cursor: 'pointer' }} onClick={() => window.open('https://zorah.ai/', '_blank')}>
          <img src="/zorah2.svg" alt="Zorah Logo" style={{ width: '200px', height: 'auto' }} />
        </motion.div>
        <p style={{ color: '#444', fontSize: '0.8rem', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400' }}>© 2025 ZORAH TECHNOLOGIES</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <motion.div style={{ position: 'fixed', left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: loading ? 'none' : 'auto', cursor: loading ? 'default' : 'pointer' }} initial={{ top: '50%', y: '-50%' }} animate={loading ? { top: '50%', y: '-50%' } : { top: '30px', y: '0%' }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} onClick={() => !loading && window.open('https://zorah.ai/', '_blank')}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '20px', filter: 'drop-shadow(0 0 10px #10b981)' }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.8, 1] }} transition={{ duration: 0.8, times: [0, 0.3, 0.6, 1] }}>
          <span style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', fontSize: loading ? '2.5rem' : '1.2rem', letterSpacing: '0.05em', transition: 'font-size 1.5s ease' }}>Zorah</span>
          <img src="/zorah.svg" alt="Logo" style={{ width: loading ? '100px' : '40px', height: 'auto', transition: 'width 1.5s ease' }} />
          <span style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: '400', fontSize: loading ? '2.5rem' : '1.2rem', letterSpacing: '0.05em', transition: 'font-size 1.5s ease' }}>Fleet</span>
        </motion.div>
      </motion.div>

      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(45deg, #000, #064e3b, #000)', backgroundSize: '400% 400%', animation: 'gradientBG 20s ease infinite', zIndex: 0, opacity: 0.3 }} />
      <style>{`@keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 0, pointerEvents: 'none' }} />
      <Particles />

      {showContent && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          <AnimatePresence mode='wait'>
            {selectedVehicle ? (
              <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VehicleJourney vehicleId={selectedVehicle} onBack={() => setSelectedVehicle(null)} />
              </motion.div>
            ) : (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LandingPage onSelect={setSelectedVehicle} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default App;
