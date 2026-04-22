import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanInput({ inputText, setInputText, onSubmit, loading, loadingStage, error }) {
  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    if (!loading) { setSlowLoad(false); return; }
    const timer = setTimeout(() => setSlowLoad(true), 5000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333',
        letterSpacing: '0.12em', display: 'flex', justifyContent: 'space-between'
      }}>
        <span>// SCAN INPUT</span>
        <span style={{ color: error ? '#FF2222' : '#222' }}>
          {error || `${inputText.length} / 5000`}
        </span>
      </div>

      <textarea
        value={inputText}
        onChange={e => setInputText(e.target.value.slice(0, 5000))}
        placeholder="PASTE TEXT FOR ANALYSIS // AGENT INPUT // DOCUMENT CONTENT..."
        style={{
          width: '100%', minHeight: '100px', resize: 'vertical',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F0F0F0',
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s'
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'rgba(200,255,0,0.2)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(200,255,0,0.04)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {slowLoad && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FF8800',
          animation: 'blink 1.5s ease-in-out infinite'
        }}>
          ⚠ WARMING UP MODEL — PLEASE WAIT...
        </div>
      )}

      <button
        onClick={() => onSubmit(inputText)}
        disabled={loading}
        className="btn-primary"
        style={{
          width: '100%',
          opacity: loading ? 0.7 : 1,
          position: 'relative',
          overflow: 'hidden',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AnimatePresence mode="wait">
          {(loadingStage === 'idle' || loadingStage === 'complete') && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SCAN INPUT →</motion.span>}
          {loadingStage === 'l1' && <motion.span key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>SCANNING LAYER 1...</motion.span>}
          {loadingStage === 'l2' && <motion.span key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>ESCALATING TO SENTINEL AI ENGINE...</motion.span>}
        </AnimatePresence>
      </button>
    </div>
  );
}
