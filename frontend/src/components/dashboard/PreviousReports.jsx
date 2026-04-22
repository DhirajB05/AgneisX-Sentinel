import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#444', letterSpacing: '0.1em' }}>
          // REPORTS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#222' }}>
          SUPABASE 
          <style>
            {`
              @keyframes pulseSupa {
                0%, 100% { opacity: 0.3; }
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
                height: '48px', margin: '6px 12px', borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }} />
            ))}
          </>
        ) : reports.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#222' }}>// NO REPORTS YET //</div>
          </div>
        ) : (
          <AnimatePresence>
            {reports.map((report, idx) => (
              <motion.div
                key={report.id || idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.02)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  cursor: 'default', transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: report.verdict === 'THREAT' ? '#FF2222' : '#C8FF00',
                    color: report.verdict === 'THREAT' ? '#FFF' : '#000',
                    fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700,
                    padding: '2px 8px', borderRadius: '3px', alignSelf: 'flex-start'
                  }}>
                    {report.verdict}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222' }}>
                    {timeAgo(report.created_at)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '55%' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444',
                    textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
                  }}>
                    {report.input_preview}
                  </div>
                  {report.verdict === 'THREAT' && report.attack_type && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#333', marginTop: '2px' }}>
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
