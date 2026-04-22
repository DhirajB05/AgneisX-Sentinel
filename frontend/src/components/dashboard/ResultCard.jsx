import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isThreat = result.verdict === 'THREAT';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass-card"
        style={{
          padding: '20px',
          borderColor: isThreat ? 'rgba(255,34,34,0.2)' : 'rgba(200,255,0,0.15)',
          boxShadow: isThreat
            ? '0 0 40px rgba(255,34,34,0.06), inset 0 1px 0 rgba(255,34,34,0.05)'
            : '0 0 40px rgba(200,255,0,0.06), inset 0 1px 0 rgba(200,255,0,0.05)',
          position: 'relative', zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.05, 1] }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              background: isThreat ? '#FF2222' : '#C8FF00',
              color: isThreat ? '#FFF' : '#000',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              padding: '6px 16px', borderRadius: 'var(--radius-sm)',
              boxShadow: isThreat ? '0 0 20px rgba(255,34,34,0.3)' : '0 0 20px rgba(200,255,0,0.3)',
              letterSpacing: '0.12em'
            }}
          >
            {isThreat ? '⚠ THREAT DETECTED' : '✓ INPUT SAFE'}
          </motion.div>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: isThreat ? '#FF2222' : '#C8FF00',
            background: isThreat ? 'rgba(255,34,34,0.08)' : 'rgba(200,255,0,0.08)',
            padding: '4px 10px', borderRadius: '4px'
          }}>
            SCORE: {result.injection_score?.toFixed(4)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'VERDICT', value: result.verdict, color: isThreat ? '#FF2222' : '#C8FF00' },
            { label: 'LAYER 2', value: result.layer2_triggered ? 'TRIGGERED' : 'NOT TRIGGERED', color: result.layer2_triggered ? '#FF8800' : '#444' },
            { label: 'SEVERITY', value: result.severity || 'N/A', color: '#888' }
          ].map((field, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.015)', borderRadius: 'var(--radius-sm)',
              padding: '10px 12px'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#333', letterSpacing: '0.15em', marginBottom: '4px' }}>{field.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: field.color, fontWeight: 600 }}>{field.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
