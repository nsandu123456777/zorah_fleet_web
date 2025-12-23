import { motion } from 'framer-motion';

export default function UIShowcase() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: '4rem',
          color: '#10b981',
          marginBottom: '3rem',
          textAlign: 'center',
          textShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
        }}
      >
        Your Command Center
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid #10b981',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)'
        }}
      >
        <p style={{
          fontSize: '1.5rem',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Automate your entire fleet operations. Monitor bookings in real-time.
          Manage charters, helicopters, jets, and luxury vehicles from one powerful platform.
        </p>
      </motion.div>
    </div>
  );
}
