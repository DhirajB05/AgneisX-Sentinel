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
        background: ['#0d0000', '#0f0f0f'],
        transition: { duration: 0.5 }
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrevThreats(totalThreats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalThreats]);

  const cards = [
    { label: "INPUTS SCANNED", value: totalScanned, color: "#F0F0F0", animateBg: false },
    { label: "THREATS BLOCKED", value: totalThreats, color: "#FF2222", animateBg: true },
    { label: "BLOCK RATE", value: blockRate, color: "#C8FF00", animateBg: false },
    { label: "AVG L1 LATENCY", value: avgLatency > 0 ? `${avgLatency}ms` : "<50ms", color: "#888888", animateBg: false }
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <style>
        {`
          @keyframes liveDot {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}
      </style>
      
      {cards.map((c, idx) => (
        <motion.div 
          key={idx}
          animate={c.animateBg ? controls : undefined}
          style={{
            background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '16px', borderRadius: '2px'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
            {c.label}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 700, color: c.color }}>
            <AnimatedCounter value={c.value} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#2a2a2a', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ animation: 'liveDot 2s ease-in-out infinite' }}>●</span> LIVE
          </div>
        </motion.div>
      ))}
    </div>
  );
}
