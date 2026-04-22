import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isSafe = result.verdict === 'SAFE';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        border: isSafe ? '1px solid #C8FF00' : '1px solid #FF2222',
        boxShadow: isSafe ? 'var(--glow-safe)' : 'var(--glow-threat)',
        background: '#0f0f0f',
        padding: '16px',
        borderRadius: '2px',
        marginBottom: '16px'
      }}
    >
      {isSafe ? (
        <>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333', marginBottom: '8px' }}>INPUT CLASSIFIED</div>
          <div style={{
            display: 'inline-block', background: '#C8FF00', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
            padding: '4px 10px', borderRadius: '2px'
          }}>
            ● SAFE
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#C8FF00', marginTop: '8px' }}>
            THREAT SCORE: {result.injection_score.toFixed(4)}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333', marginTop: '4px' }}>
            L1: {result.layer1_latency_ms}ms | L2: NOT TRIGGERED
          </div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.05, 1] }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              display: 'inline-block', background: '#FF2222', color: '#FFF',
              fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
              padding: '4px 10px', borderRadius: '2px', marginBottom: '8px'
            }}
          >
            ⚠ THREAT DETECTED
          </motion.div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#FF2222' }}>
            THREAT SCORE: {result.injection_score.toFixed(4)}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333', marginTop: '4px' }}>
            L1: {result.layer1_latency_ms}ms | L2: TRIGGERED
          </div>
          <style>
            {`
              @keyframes blinkAlert { 0%,100%{color:#FF8800} 50%{color:transparent} }
            `}
          </style>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', animation: 'blinkAlert 1s step-start infinite', marginTop: '8px' }}>
            ESCALATED TO SENTINEL AI ENGINE
          </div>
        </>
      )}
    </motion.div>
  );
}
