import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ShieldAlert, Loader2 } from 'lucide-react';

export default function ScanInput({ inputText, setInputText, onSubmit, loading, loadingStage, error }) {
  const charCount = useMemo(() => (inputText || '').length, [inputText]);

  const buttonLabel =
    loadingStage === "l1"
      ? "SCANNING LAYER 1..."
      : loadingStage === "l2"
      ? "ESCALATING TO LAYER 2..."
      : loadingStage === "complete"
      ? "SCAN COMPLETE"
      : "SCAN INPUT →";

  const buttonIcon =
    loadingStage === "idle" || loadingStage === "complete" ? (
      <Zap size={16} />
    ) : (
      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
    );

  const demoMode = false; // Add logic if needed

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ position: 'relative', width: '100%' }}
    >
      <div className="scan-bg-glow" />

      <div className="scan-card">
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#d4d4d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', height: '10px', width: '10px', borderRadius: '50%', background: '#C8FF00', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <span style={{ userSelect: 'none', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              {demoMode ? "DEMO MODE ACTIVE" : "LIVE SCAN MODE"}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
            <Clock size={16} />
            <span style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} color="#C8FF00" />
          <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.025em', fontFamily: 'var(--font-heading)' }}>
            Scan Input
          </h3>
        </div>

        <p style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '24px', color: '#a3a3a3' }}>
          Paste any user prompt, email, webpage text, or agent input. SENTINEL
          checks it for prompt injection before it reaches the model.
        </p>

        <div style={{ position: 'relative' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 5000))}
            placeholder="PASTE INPUT FOR ANALYSIS // ENTER ANY TEXT OR AI AGENT INPUT..."
            className={`scan-textarea ${error ? 'error' : ''}`}
            maxLength={5000}
          />

          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#737373', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: error ? '#f87171' : 'inherit' }}>
              {error ? error : "Ready for scan"}
            </span>
            <span>{charCount} / 5000</span>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={() => onSubmit(inputText)}
            disabled={loading || !inputText.trim()}
            style={{
              height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px',
              borderRadius: '16px', fontWeight: 600, color: '#000', transition: 'all 0.2s', padding: '0 16px',
              background: '#C8FF00', border: 'none', cursor: (loading || !inputText.trim()) ? 'not-allowed' : 'pointer',
              opacity: (loading || !inputText.trim()) ? 0.5 : 1, fontSize: '14px', fontFamily: 'var(--font-mono)'
            }}
            onMouseOver={(e) => { if (!loading && inputText.trim()) e.currentTarget.style.background = '#d4ff1a'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#C8FF00'; }}
          >
            {buttonIcon}
            {buttonLabel}
          </button>

          <div style={{
            height: '48px', display: 'flex', alignItems: 'center', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)', padding: '0 16px', fontSize: '14px', color: '#d4d4d4'
          }}>
            <span style={{ opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Threshold</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', color: '#C8FF00' }}>0.75</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
