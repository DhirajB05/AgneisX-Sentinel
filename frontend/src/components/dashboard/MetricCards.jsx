import React, { useState, useEffect } from 'react';

function AnimCounter({ value }) {
  const [cur, setCur] = useState(0);
  const num = typeof value === 'string' ? parseFloat(value) : value;
  useEffect(() => {
    if (isNaN(num)) return;
    const start = cur; const st = performance.now(); const dur = 500;
    const animate = (t) => { const p = Math.min((t - st) / dur, 1); const ease = 1 - Math.pow(1 - p, 3); setCur(start + (num - start) * ease); if (p < 1) requestAnimationFrame(animate); };
    requestAnimationFrame(animate);
  }, [num]);
  if (typeof value === 'string') { if (value.includes('%')) return <>{cur.toFixed(1)}%</>; if (value.includes('ms')) return <>{Math.round(cur)}ms</>; }
  return <>{Math.round(cur).toLocaleString()}</>;
}

export default function MetricCards({ totalScanned, totalThreats, blockRate, avgLatency }) {
  const cards = [
    { label: "Inputs scanned", value: totalScanned, color: "var(--text-1)", change: "+0.4% vs last session", changeUp: true },
    { label: "Threats blocked", value: totalThreats, color: "var(--threat)", change: "Active monitoring", changeUp: null },
    { label: "Block rate", value: blockRate, color: "var(--accent)", change: "Goal: 95%+", changeUp: null },
    { label: "Avg L1 latency", value: avgLatency > 0 ? `${avgLatency}ms` : "<50ms", color: "var(--text-2)", change: "Target: <50ms", changeUp: true },
  ];

  return (
    <div style={{ padding: '8px 12px', display: 'flex', gap: '10px', flexShrink: 0 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          flex: 1, padding: '14px 16px',
          background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '10px'
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-2)', marginBottom: '8px' }}>{c.label}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: c.color }}><AnimCounter value={c.value} /></div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-3)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {c.changeUp !== null && <span style={{ color: c.changeUp ? 'var(--accent)' : 'var(--threat)', fontSize: '9px' }}>{c.changeUp ? '^' : 'v'}</span>}
            {c.change}
          </div>
        </div>
      ))}
    </div>
  );
}
