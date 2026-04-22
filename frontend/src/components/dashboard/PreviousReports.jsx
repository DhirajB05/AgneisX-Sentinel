import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function timeAgo(d) {
  if (!d) return '';
  const s = Math.floor((new Date() - new Date(d)) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function PreviousReports({ reports, loading }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.03)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', letterSpacing: '0.1em' }}>// REPORTS</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', display: 'flex', alignItems: 'center', gap: '4px' }}>
          SUPABASE <span style={{ color: '#C8FF00', animation: 'pulse 2s ease-in-out infinite' }}>●</span>
        </span>
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {loading && reports.length === 0 ? (
          [1,2,3].map(i => (
            <div key={i} style={{
              height: '44px', margin: '6px 10px', borderRadius: '6px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.015), rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
              backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite'
            }} />
          ))
        ) : reports.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#222' }}>// NO REPORTS //</span>
          </div>
        ) : (
          <AnimatePresence>
            {reports.map((r, i) => (
              <motion.div key={r.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                style={{
                  padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.02)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  cursor: 'default', transition: 'background 0.15s'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{
                    display: 'inline-block', alignSelf: 'flex-start',
                    background: r.verdict === 'THREAT' ? '#FF2222' : '#C8FF00',
                    color: r.verdict === 'THREAT' ? '#fff' : '#000',
                    fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 700,
                    padding: '2px 6px', borderRadius: '2px'
                  }}>{r.verdict}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#222' }}>{timeAgo(r.created_at)}</span>
                </div>
                <div style={{ maxWidth: '55%', textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.input_preview}
                  </div>
                  {r.attack_type && r.verdict === 'THREAT' && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#333', marginTop: '2px' }}>{r.attack_type}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
