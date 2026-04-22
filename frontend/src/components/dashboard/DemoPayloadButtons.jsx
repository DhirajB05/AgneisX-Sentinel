import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_PAYLOADS } from '../../data/payloads';

export default function DemoPayloadButtons({ demoMode, onSelectPayload }) {
  return (
    <AnimatePresence>
      {demoMode && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          style={{ overflow: 'hidden', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {DEMO_PAYLOADS.map((p) => (
              <button key={p.id} onClick={() => onSelectPayload(p.text)} style={{
                background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '6px', padding: '7px 12px', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#555',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                transition: 'all 0.15s'
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(200,255,0,0.2)'; e.currentTarget.style.color = '#C8FF00'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#555'; }}
              >{p.label}</button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
