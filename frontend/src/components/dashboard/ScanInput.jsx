import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanInput({ inputText, setInputText, onSubmit, loading, loadingStage, error }) {
  const [slow, setSlow] = useState(false);
  useEffect(() => { if (!loading) { setSlow(false); return; } const t = setTimeout(() => setSlow(true), 5000); return () => clearTimeout(t); }, [loading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
        <span>// SCAN INPUT</span>
        <span style={{ color: error ? 'var(--threat)' : 'var(--text-4)' }}>{error || `${inputText.length} / 5000`}</span>
      </div>
      <textarea value={inputText} onChange={e => setInputText(e.target.value.slice(0, 5000))}
        placeholder="Paste text for analysis // agent input // document content..."
        style={{
          width: '100%', minHeight: '80px', resize: 'vertical',
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-card)', borderRadius: '8px',
          padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-1)', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s'
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(34,197,94,0.05)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
      {slow && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--warning)', animation: 'blink 1.5s ease-in-out infinite' }}>[!] WARMING UP MODEL -- PLEASE WAIT...</div>}
      <button onClick={() => onSubmit(inputText)} disabled={loading} style={{
        width: '100%', height: '42px', background: 'var(--accent)', border: 'none', borderRadius: '8px',
        color: '#000', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.06em', cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1, transition: 'all 0.15s'
      }}
        onMouseOver={e => { if (!loading) e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.2)'; }}
        onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <AnimatePresence mode="wait">
          {(loadingStage === 'idle' || loadingStage === 'complete') && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SCAN INPUT --&gt;</motion.span>}
          {loadingStage === 'l1' && <motion.span key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SCANNING LAYER 1...</motion.span>}
          {loadingStage === 'l2' && <motion.span key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>ESCALATING TO SENTINEL AI...</motion.span>}
        </AnimatePresence>
      </button>
    </div>
  );
}
