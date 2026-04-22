import React from 'react';
import { motion } from 'framer-motion';

export default function LayerDiagram() {
  return (
    <div style={{ position: 'relative', height: '420px', maxWidth: '700px', margin: 'auto' }}>
      
      {/* Card A (top) */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: 0, left: '10%', width: '80%',
          background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '20px', borderRadius: '2px'
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#444' }}>AI AGENT INPUT</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333', marginTop: '4px' }}>User input / document / email...</div>
      </motion.div>

      {/* Card B (middle, foreground) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: '100px', left: '5%', width: '90%',
          background: '#0f0f0f', border: '1px solid #C8FF00',
          boxShadow: '0 0 40px rgba(200,255,0,0.12)',
          padding: '24px', borderRadius: '2px', zIndex: 2
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#C8FF00', marginBottom: '16px' }}>⚡ SENTINEL MIDDLEWARE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F0F0F0' }}>LAYER 1: DeBERTa-v3</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444' }}>&lt;50ms</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F0F0F0' }}>LAYER 2: SENTINEL AI ENGINE</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444' }}>300-800ms</div>
        </div>
      </motion.div>

      {/* Card C (bottom) */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: '220px', left: '10%', width: '80%',
          background: '#080808', border: '1px solid #1a1a1a', padding: '20px', borderRadius: '2px'
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C8FF00' }}>● SAFE — INPUT VERIFIED</div>
      </motion.div>

    </div>
  );
}
