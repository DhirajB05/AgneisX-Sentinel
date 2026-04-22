import React from 'react';
import { AnimatePresence } from 'framer-motion';

function timeAgo(dateString) {
  if (!dateString) return '';
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function PreviousReports({ reports, loading }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #111', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2a2a2a' }}>// PREVIOUS REPORTS</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333333' }}>
          SUPABASE 
          <style>
            {`
              @keyframes pulseSupa {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }
            `}
          </style>
          <span style={{ color: '#C8FF00', animation: 'pulseSupa 2s ease-in-out infinite' }}>●</span>
        </div>
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }}>
        <style>
          {`
            @keyframes shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}
        </style>
        
        {loading && reports.length === 0 ? (
          <>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: '44px', margin: '4px 12px', borderRadius: '2px',
                background: 'linear-gradient(90deg, #111, #1a1a1a, #111)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }} />
            ))}
          </>
        ) : reports.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333333' }}>// NO REPORTS YET //</div>
          </div>
        ) : (
          <AnimatePresence>
            {reports.map((report, idx) => (
              <motion.div
                key={report.id || idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  padding: '8px 12px', borderBottom: '1px solid #0d0d0d',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  cursor: 'default'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: report.verdict === 'THREAT' ? '#FF2222' : '#C8FF00',
                    color: '#000',
                    fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '2px 6px', borderRadius: '2px', alignSelf: 'flex-start'
                  }}>
                    {report.verdict}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#2a2a2a' }}>
                    {timeAgo(report.created_at)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '60%' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {report.input_preview}
                  </div>
                  {report.verdict === 'THREAT' && report.attack_type && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#444', marginTop: '2px' }}>
                      {report.attack_type}
                    </div>
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
