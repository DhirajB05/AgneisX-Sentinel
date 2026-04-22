import React from 'react';
import { motion } from 'framer-motion';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isThreat = result.verdict === 'THREAT';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-card)',
        borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)' }}>// VERDICT</div>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700,
          color: isThreat ? 'var(--threat)' : 'var(--accent)',
          padding: '4px 10px', background: isThreat ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-dim)',
          borderRadius: '4px', letterSpacing: '0.05em'
        }}>
          {isThreat ? 'THREAT DETECTED' : 'SAFE'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text-3)', marginBottom: '4px' }}>CONFIDENCE</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-1)' }}>{(result.injection_score * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text-3)', marginBottom: '4px' }}>LATENCY</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-1)' }}>
            {result.layer2_triggered ? 'L2 (+450ms)' : 'L1 (<50ms)'}
          </div>
        </div>
      </div>
      
      {result.why && (
        <div style={{ marginTop: '4px', borderTop: '1px solid var(--border-card)', paddingTop: '12px' }}>
           <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-2)', marginBottom: '4px' }}>[!] EXPLANATION</div>
           <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-1)', lineHeight: 1.5 }}>{result.why}</div>
        </div>
      )}
      
      {result.technique && (
        <div style={{ marginTop: '4px' }}>
           <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-2)', marginBottom: '4px' }}>[!] TECHNIQUE</div>
           <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-1)', lineHeight: 1.5 }}>{result.technique}</div>
        </div>
      )}
    </motion.div>
  );
}
