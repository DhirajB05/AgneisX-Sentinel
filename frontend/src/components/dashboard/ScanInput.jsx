import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanInput({ inputText, setInputText, onSubmit, loading, loadingStage, error }) {
  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    let timer;
    if (loadingStage === 'l1') {
      timer = setTimeout(() => setSlowLoad(true), 5000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlowLoad(false);
    }
    return () => clearTimeout(timer);
  }, [loadingStage]);

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '2px', padding: '16px'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333', letterSpacing: '0.15em', marginBottom: '8px' }}>
        // SCAN INPUT
      </div>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="PASTE TEXT FOR ANALYSIS // AGENT INPUT // DOCUMENT CONTENT..."
        style={{
          width: '100%', height: '90px', resize: 'none',
          background: '#0a0a0a', border: '1px solid #222', borderRadius: '2px', padding: '10px 12px',
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888',
          outline: 'none', transition: 'border-color 0.2s, color 0.2s'
        }}
        onFocus={(e) => { e.target.style.borderColor = '#C8FF00'; e.target.style.color = '#F0F0F0'; }}
        onBlur={(e) => { e.target.style.borderColor = '#222'; e.target.style.color = '#888'; }}
      />

      <div style={{ textAlign: 'right', marginTop: '4px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: inputText.length > 4500 ? '#FF8800' : '#2a2a2a' }}>
        {inputText.length} / 5000
      </div>

      {error && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF2222', marginTop: '6px' }}>
          {error}
        </div>
      )}

      {slowLoad && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FF8800', marginTop: '4px' }}>
          WARMING UP MODEL — PLEASE WAIT...
        </div>
      )}

      <button
        onClick={() => onSubmit(inputText)}
        disabled={loading || inputText.trim() === ''}
        style={{
          width: '100%', height: '40px', marginTop: '10px',
          background: '#C8FF00', color: '#000', border: 'none', borderRadius: '2px',
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
          cursor: loading || inputText.trim() === '' ? 'not-allowed' : 'pointer',
          opacity: loading || inputText.trim() === '' ? 0.4 : 1,
          pointerEvents: loading || inputText.trim() === '' ? 'none' : 'auto'
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
