import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function AnimCounter({ value }) {
  const [cur, setCur] = useState(0);
  const num = typeof value === 'string' ? parseFloat(value) : value;
  useEffect(() => {
    if (isNaN(num)) return;
    const start = cur;
    const st = performance.now();
    const dur = 500;
    const animate = (t) => {
      const p = Math.min((t - st) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCur(start + (num - start) * ease);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [num]); // eslint-disable-line
  if (typeof value === 'string') {
    if (value.includes('%')) return <>{cur.toFixed(1)}%</>;
    if (value.includes('ms')) return <>{Math.round(cur)}ms</>;
  }
  return <>{Math.round(cur)}</>;
}

export default function MetricCards({ totalScanned, totalThreats, blockRate, avgLatency }) {
  const ctrl = useAnimation();
  const [prev, setPrev] = useState(totalThreats);
  useEffect(() => {
    if (totalThreats > prev) {
      ctrl.start({ background: ['rgba(255,34,34,0.06)', 'rgba(255,255,255,0.015)'], transition: { duration: 0.8 } });
      setPrev(totalThreats);
    }
  }, [totalThreats]); // eslint-disable-line

  const cards = [
    { label: "INPUTS SCANNED", value: totalScanned, color: "#F0F0F0", flash: false },
    { label: "THREATS BLOCKED", value: totalThreats, color: "#FF2222", flash: true },
    { label: "BLOCK RATE", value: blockRate, color: "#C8FF00", flash: false },
    { label: "AVG L1 LATENCY", value: avgLatency > 0 ? `${avgLatency}ms` : "<50ms", color: "#666", flash: false }
  ];

  return (
    <div style={{ padding: '10px 12px', display: 'flex', gap: '10px', flexShrink: 0 }}>
      {cards.map((c, i) => (
        <motion.div key={i} animate={c.flash ? ctrl : undefined} style={{
          flex: 1, padding: '14px 16px',
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '10px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', letterSpacing: '0.1em', marginBottom: '6px' }}>
            {c.label}
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: c.color }}>
            <AnimCounter value={c.value} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#C8FF00', animation: 'pulse 2s ease-in-out infinite' }}>●</span> LIVE
          </div>
        </motion.div>
      ))}
    </div>
  );
}
