import React from 'react';
import { motion } from 'framer-motion';

export default function DemoBanner({ demoMode, setDemoMode }) {
  return (
    <div style={{
      height: '60px', padding: '0 20px',
      background: 'rgba(200,255,0,0.03)',
      borderBottom: '1px solid rgba(200,255,0,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gridColumn: '1 / -1'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C8FF00' }}>
        // DEMO MODE
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333' }}>
        Using predefined payloads — showcase mode active
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333' }}>DEMO MODE</div>
        <div 
          onClick={() => setDemoMode(!demoMode)}
          style={{
            width: '36px', height: '20px', borderRadius: '10px', cursor: 'pointer',
            background: demoMode ? '#C8FF00' : '#2a2a2a',
            position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3px'
          }}
        >
          <motion.div 
            animate={{ x: demoMode ? 16 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: '14px', height: '14px', borderRadius: '7px',
              background: demoMode ? '#000' : '#555'
            }}
          />
        </div>
      </div>
    </div>
  );
}
