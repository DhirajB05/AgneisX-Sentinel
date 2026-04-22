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
                style={{
                  background: '#111', border: '1px solid #222', borderRadius: '2px',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 12px',
                  cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s, background 0.15s'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#C8FF00'; e.currentTarget.style.color = '#C8FF00'; e.currentTarget.style.background = '#0f0f0f'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#444'; e.currentTarget.style.background = '#111'; }}
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
