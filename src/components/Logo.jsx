import { motion } from 'framer-motion';

const Bracket = ({ style, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: "circOut" }}
    style={{
      position: 'absolute',
      width: '16px',
      height: '16px',
      border: '2px solid rgba(16, 185, 129, 0.8)',
      ...style
    }}
  />
);

export default function Logo() {
  const themeColor = '#10b981';

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '12px 32px',
          overflow: 'hidden'
        }}
      >
        {/* HUD Brackets */}
        <Bracket style={{ top: 0, left: 0, borderRight: 0, borderBottom: 0 }} delay={0.2} />
        <Bracket style={{ top: 0, right: 0, borderLeft: 0, borderBottom: 0 }} delay={0.2} />
        <Bracket style={{ bottom: 0, left: 0, borderRight: 0, borderTop: 0 }} delay={0.2} />
        <Bracket style={{ bottom: 0, right: 0, borderLeft: 0, borderTop: 0 }} delay={0.2} />

        {/* Scan Line Sweep */}
        <motion.div
          initial={{ top: '-10%', opacity: 0 }}
          animate={{ 
            top: ['0%', '100%'], 
            opacity: [0, 1, 0] 
          }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px #10b981',
            zIndex: 10
          }}
        />

        {/* Main Content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 20
        }}>
          {/* System Online Dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1, 
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              scale: { duration: 0.3, delay: 0.8 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: themeColor,
              boxShadow: `0 0 8px ${themeColor}`
            }}
          />

          {/* Logo Text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              textShadow: [
                `0 0 0px ${themeColor}`,
                `4px 0 2px ${themeColor}`,
                `-4px 0 2px ${themeColor}`,
                `0 0 15px ${themeColor}`,
                `0 0 8px ${themeColor}`
              ]
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.1, 0.2, 0.5, 1]
            }}
            style={{
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '0.25em',
              color: themeColor,
              whiteSpace: 'nowrap',
              margin: 0
            }}
          >
            <motion.span
              animate={{ 
                opacity: [0.8, 1, 0.8], 
                textShadow: [
                  `0 0 8px ${themeColor}`, 
                  `0 0 12px ${themeColor}`, 
                  `0 0 8px ${themeColor}`
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: 1.5 
              }}
            >
              ZORAH FLEET
            </motion.span>
          </motion.h1>
        </div>

        {/* Grid Background Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          opacity: 0.2,
          zIndex: 0
        }} />
      </motion.div>
    </div>
  );
}
