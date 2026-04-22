import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttackFeed({ log }) {
  // log is an array of scan result objects.
  // entry: { timestamp, input_preview, injection_score, verdict, layer2_triggered }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #111', borderRight: '1px solid #111', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2a2a2a' }}>// LIVE SESSION FEED</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#333333' }}>LAST 20</div>
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#080808', zIndex: 10 }}>
            <tr>
              <th style={{ width: '70px', fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left' }}>TIME</th>
              <th style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left' }}>PREVIEW</th>
              <th style={{ width: '70px', fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left' }}>SCORE</th>
              <th style={{ width: '100px', fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left' }}>VERDICT</th>
              <th style={{ width: '32px', fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#222', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'center' }}>L2</th>
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
                    background: entry.verdict === 'THREAT' ? '#0d0000' : '#080808',
                    borderBottom: '1px solid #111'
                  }}
                >
                  <td style={{ padding: '8px', color: '#555', whiteSpace: 'nowrap' }}>
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour12: false })}
                  </td>
                  <td style={{ padding: '8px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {entry.input_preview}
                  </td>
                  <td style={{ padding: '8px', color: entry.verdict === 'THREAT' ? '#FF2222' : '#C8FF00' }}>
                    {entry.injection_score.toFixed(4)}
                  </td>
                  <td style={{ padding: '8px', color: entry.verdict === 'THREAT' ? '#FF2222' : '#C8FF00', fontWeight: 700 }}>
                    {entry.verdict}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', color: entry.layer2_triggered ? '#FF8800' : '#333' }}>
                    {entry.layer2_triggered ? '⚠' : '○'}
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
