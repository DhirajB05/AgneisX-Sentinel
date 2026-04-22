import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

function AnimatedCounter({ value }) {
  const [current, setCurrent] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  useEffect(() => {
    if (isNaN(numericValue)) return;
    
    const duration = 600;
    const start = current;
    const end = numericValue;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const nextVal = start + (end - start) * easeOut;
      
      setCurrent(nextVal);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericValue]);

  const display = typeof value === 'string' 
    ? (value.includes('%') ? `${current.toFixed(1)}%` : (value.includes('ms') ? `${Math.round(current)}ms` : Math.round(current)))
    : Math.round(current);

  return <>{display}</>;
}

export default function MetricCards({ totalScanned, totalThreats, blockRate, avgLatency }) {
  const controls = useAnimation();
  const [prevThreats, setPrevThreats] = useState(totalThreats);

  useEffect(() => {
    if (totalThreats > prevThreats) {
      controls.start({
        background: ['rgba(255,34,34,0.06)', 'rgba(255,255,255,0.02)'],
        transition: { duration: 0.8 }
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrevThreats(totalThreats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalThreats]);

  const cards = [
    { label: "INPUTS SCANNED", value: totalScanned, color: "#F0F0F0", animateBg: false, icon: "◎" },
    { label: "THREATS BLOCKED", value: totalThreats, color: "#FF2222", animateBg: true, icon: "⚠" },
    { label: "BLOCK RATE", value: blockRate, color: "#C8FF00", animateBg: false, icon: "◆" },
    { label: "AVG L1 LATENCY", value: avgLatency > 0 ? `${avgLatency}ms` : "<50ms", color: "#888888", animateBg: false, icon: "⏱" }
  ];

  return (
    <div style={{ padding: '12px 16px', display: 'flex', gap: '12px' }}>
      <style>
        {`
          @keyframes liveDot {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
      
      {cards.map((c, idx) => (
        <motion.div 
          key={idx}
          animate={c.animateBg ? controls : undefined}
          className="glass-card"
          style={{
            flex: 1, padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444',
              letterSpacing: '0.12em'
            }}>
              {c.label}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.3 }}>{c.icon}</div>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700,
            color: c.color, letterSpacing: '-0.02em'
          }}>
            <AnimatedCounter value={c.value} />
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#222',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            <span style={{ color: '#C8FF00', animation: 'liveDot 2s ease-in-out infinite' }}>●</span> LIVE
          </div>
        </motion.div>
      ))}
    </div>
  );
}
