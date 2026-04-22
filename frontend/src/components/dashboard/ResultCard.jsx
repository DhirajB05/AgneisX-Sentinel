import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultCard({ result }) {
  if (!result) return null;
  const t = result.verdict === 'THREAT';

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          background: 'rgba(255,255,255,0.015)',
          border: `1px solid ${t ? 'rgba(255,34,34,0.15)' : 'rgba(200,255,0,0.12)'}`,
          borderRadius: '10px', padding: '16px',
          boxShadow: t ? '0 0 30px rgba(255,34,34,0.04)' : '0 0 30px rgba(200,255,0,0.04)',
          position: 'relative', zIndex: 1
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.05, 1] }}
            style={{
              background: t ? '#FF2222' : '#C8FF00', color: t ? '#fff' : '#000',
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
              padding: '5px 14px', borderRadius: '4px', letterSpacing: '0.1em',
              boxShadow: t ? '0 0 16px rgba(255,34,34,0.25)' : '0 0 16px rgba(200,255,0,0.25)'
            }}>
            {t ? '⚠ THREAT DETECTED' : '✓ INPUT SAFE'}
          </motion.div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: t ? '#FF2222' : '#C8FF00',
            background: t ? 'rgba(255,34,34,0.06)' : 'rgba(200,255,0,0.06)',
            padding: '3px 8px', borderRadius: '3px'
          }}>
            SCORE: {result.injection_score?.toFixed(4)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { label: 'VERDICT', value: result.verdict, color: t ? '#FF2222' : '#C8FF00' },
            { label: 'LAYER 2', value: result.layer2_triggered ? 'TRIGGERED' : 'NOT TRIGGERED', color: result.layer2_triggered ? '#FF8800' : '#444' },
            { label: 'SEVERITY', value: result.severity || 'N/A', color: '#888' }
          ].map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '6px', padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#333', letterSpacing: '0.12em', marginBottom: '3px' }}>{f.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: f.color, fontWeight: 600 }}>{f.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
