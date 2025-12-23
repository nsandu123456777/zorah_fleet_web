import { motion } from 'framer-motion';

const vehicles = [
  { id: 'helicopter', label: 'HELICOPTER', code: 'H-01' },
  { id: 'jet', label: 'PRIVATE JET', code: 'J-X7' },
  { id: 'yacht', label: 'YACHT', code: 'Y-99' },
  { id: 'car', label: 'LUXURY CARS', code: 'C-GT' },
];

const CornerBracket = ({ position }) => {
  const baseStyle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    border: '2px solid #10b981'
  };

  const positions = {
    tl: { top: 0, left: 0, borderRight: 0, borderBottom: 0 },
    tr: { top: 0, right: 0, borderLeft: 0, borderBottom: 0 },
    bl: { bottom: 0, left: 0, borderRight: 0, borderTop: 0 },
    br: { bottom: 0, right: 0, borderLeft: 0, borderTop: 0 }
  };

  return <div style={{ ...baseStyle, ...positions[position] }} />;
};

const VehicleCard = ({ vehicle, onClick }) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(vehicle.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: 'relative',
        width: '100%',
        height: '160px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Background Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.2,
        background: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* HUD Corners */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '16px'
      }}>
        {/* Status Header */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '10px',
            color: '#10b981',
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            opacity: 0.8
          }}>AVAILABLE</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block'
            }}
          />
        </div>

        {/* Code Identifier */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '10px',
          color: 'rgba(16, 185, 129, 0.5)',
          fontFamily: 'monospace'
        }}>
          [{vehicle.code}]
        </div>

        {/* Vehicle Label */}
        <h3 style={{
          fontSize: '1.5rem',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'white',
          letterSpacing: '0.25em',
          textShadow: '0 0 5px rgba(16, 185, 129, 0.5)',
          margin: 0
        }}>
          {vehicle.label}
        </h3>
        
        {/* Selection Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          color: '#10b981',
          fontSize: '12px',
          fontFamily: 'monospace',
          letterSpacing: '0.2em',
          opacity: 0
        }}>
          &gt; INITIALIZE &lt;
        </div>
      </div>
    </motion.button>
  );
};

export default function VehicleBlocks({ onBlockClick }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientFlow 15s ease infinite',
      padding: '2rem',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}
      </style>

      <div style={{
        width: '100%',
        maxWidth: '900px',
        position: 'relative'
      }}>
        {/* Moving Background Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.1
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 10
          }}
        >
          <h2 style={{
            color: '#10b981',
            fontFamily: 'monospace',
            fontSize: '1.125rem',
            letterSpacing: '0.3em',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'inline-block',
            paddingBottom: '8px',
            paddingLeft: '32px',
            paddingRight: '32px',
            margin: 0
          }}>
            SELECT VEHICLE CLASS
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          position: 'relative',
          zIndex: 10
        }}>
          {vehicles.map((v) => (
            <VehicleCard 
              key={v.id} 
              vehicle={v} 
              onClick={onBlockClick} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
