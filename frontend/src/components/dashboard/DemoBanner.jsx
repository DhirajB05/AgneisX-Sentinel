import React from 'react';
import { motion } from 'framer-motion';

export default function DemoBanner({ demoMode, setDemoMode }) {
  return (
    <div style={{
      height: '44px', padding: '0 20px',
      background: demoMode ? 'rgba(200,255,0,0.02)' : 'transparent',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
      transition: 'background 0.3s'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: demoMode ? '#C8FF00' : '#333' }}>
        {demoMode ? '// DEMO MODE ACTIVE' : '// DEMO MODE'}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#222' }}>
        {demoMode ? 'Using predefined payloads — showcase mode' : ''}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333' }}>DEMO</div>
        <div 
          onClick={() => setDemoMode(!demoMode)}
          style={{
            width: '36px', height: '20px', borderRadius: '10px', cursor: 'pointer',
            background: demoMode ? 'rgba(200,255,0,0.2)' : 'rgba(255,255,255,0.05)',
            border: demoMode ? '1px solid rgba(200,255,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
            position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3px',
            transition: 'all 0.3s'
          }}
        >
          <motion.div 
            animate={{ x: demoMode ? 16 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: '14px', height: '14px', borderRadius: '7px',
              background: demoMode ? '#C8FF00' : '#444',
              boxShadow: demoMode ? '0 0 8px rgba(200,255,0,0.4)' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}
