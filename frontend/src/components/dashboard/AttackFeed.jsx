import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttackFeed({ log }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--text-1)', fontWeight: 500 }}>Live Session Feed</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)' }}>LAST 20</div>
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '11px' }}>
          <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10 }}>
            <tr>
              <th style={{ width: '70px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', padding: '8px 16px', textAlign: 'left', fontWeight: 400 }}>Time</th>
              <th style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', padding: '8px 16px', textAlign: 'left', fontWeight: 400 }}>Preview</th>
              <th style={{ width: '70px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', padding: '8px 16px', textAlign: 'left', fontWeight: 400 }}>Score</th>
              <th style={{ width: '100px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', padding: '8px 16px', textAlign: 'left', fontWeight: 400 }}>Verdict</th>
              <th style={{ width: '40px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', padding: '8px 16px', textAlign: 'center', fontWeight: 400 }}>L2</th>
            </tr>
          </thead>
          <tbody style={{ position: 'relative' }}>
            <AnimatePresence initial={false}>
              {log.slice().reverse().map((entry, i) => (
                <motion.tr
                  key={`${entry.timestamp}-${i}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: entry.verdict === 'THREAT' ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                    borderBottom: '1px solid var(--border-card)'
                  }}
                >
                  <td style={{ padding: '10px 16px', color: 'var(--text-3)', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour12: false })}
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {entry.input_preview}
                  </td>
                  <td style={{ padding: '10px 16px', color: entry.verdict === 'THREAT' ? 'var(--threat)' : 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {entry.injection_score.toFixed(4)}
                  </td>
                  <td style={{ padding: '10px 16px', color: entry.verdict === 'THREAT' ? 'var(--threat)' : 'var(--text-1)', fontWeight: 500, fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                    {entry.verdict}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', color: entry.layer2_triggered ? '#FF8800' : '#333' }}>
                    {entry.layer2_triggered ? '!' : '-'}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
