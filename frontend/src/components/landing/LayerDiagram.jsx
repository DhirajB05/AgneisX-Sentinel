import React from 'react';
import { motion } from 'framer-motion';

export default function LayerDiagram() {
  return (
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
      {/* Layer stack - isometric perspective */}
      <div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {/* Input Layer */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{
            padding: '20px 28px',
            marginBottom: '2px',
            position: 'relative',
            zIndex: 1,
            borderColor: 'rgba(255,255,255,0.05)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#555' }}>
              AI AGENT INPUT
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333' }}>
              ← Email / Doc / Prompt
            </div>
          </div>
        </motion.div>

        {/* Connecting line */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, #333, #C8FF00)' }} />
        </div>

        {/* SENTINEL Engine - Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: 'rgba(200,255,0,0.02)',
            border: '1px solid rgba(200,255,0,0.2)',
            borderRadius: 'var(--radius)',
            padding: '28px',
            position: 'relative',
            zIndex: 3,
            boxShadow: '0 0 60px rgba(200,255,0,0.05), inset 0 1px 0 rgba(200,255,0,0.08)'
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#C8FF00', marginBottom: '20px', fontWeight: 600 }}>
            ⚡ SENTINEL MIDDLEWARE
          </div>

          {/* Layer 1 */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F0F0F0' }}>LAYER 1: DeBERTa-v3</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', marginTop: '4px' }}>
                Statistical Pattern Matching
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#C8FF00',
              background: 'rgba(200,255,0,0.08)', padding: '4px 10px', borderRadius: '4px'
            }}>
              &lt;50ms
            </div>
          </div>

          {/* Layer 2 */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F0F0F0' }}>LAYER 2: SENTINEL AI ENGINE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', marginTop: '4px' }}>
                Semantic Intent Analysis
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF8800',
              background: 'rgba(255,136,0,0.08)', padding: '4px 10px', borderRadius: '4px'
            }}>
              300-800ms
            </div>
          </div>
        </motion.div>

        {/* Connecting line */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, #C8FF00, #333)' }} />
        </div>

        {/* Output */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ flex: 1, padding: '16px 20px', borderColor: 'rgba(200,255,0,0.12)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C8FF00' }}>
              ✓ SAFE — PASS TO AGENT
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="glass-card"
            style={{ flex: 1, padding: '16px 20px', borderColor: 'rgba(255,34,34,0.12)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FF2222' }}>
              ⚠ THREAT — BLOCK + LOG
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
