import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_PAYLOADS } from '../../data/payloads';

export default function DemoPayloadButtons({ demoMode, onSelectPayload }) {
  return (
    <AnimatePresence>
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{ overflow: 'hidden', marginBottom: '12px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '6px' }}>
            {DEMO_PAYLOADS.map((payload) => (
              <button
                key={payload.id}
                onClick={() => onSelectPayload(payload.text)}
                className="glass-card"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '8px 14px', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,255,0,0.25)';
                  e.currentTarget.style.color = '#C8FF00';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(200,255,0,0.06)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {payload.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
