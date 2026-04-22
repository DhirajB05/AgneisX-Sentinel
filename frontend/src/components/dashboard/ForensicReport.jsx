import React from 'react';
import { motion } from 'framer-motion';

export default function ForensicReport({ report, triggered }) {
  if (!report || !triggered) {
    return (
      <div style={{
        background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '2px', padding: '16px', minHeight: '120px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#333333' }}>// NO THREATS DETECTED //</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#2a2a2a' }}>Layer 2 was not triggered</div>
      </div>
    );
  }

  const fields = [
    { label: "ATTACK TYPE", value: report.attack_type, isBadge: false, isRed: true },
    { label: "SEVERITY", value: report.severity, isBadge: true },
    { label: "INTENT", value: report.malicious_intent, font: 'body' },
    { label: "SANITIZED", value: report.sanitized_output, font: 'body', italic: true },
    { label: "ANALYSIS", value: report.explanation, font: 'body' },
  ];

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'HIGH': return { background: '#FF2222', color: '#FFF' };
      case 'MEDIUM': return { background: '#FF8800', color: '#000' };
      case 'LOW': return { background: '#C8FF00', color: '#000' };
      default: return { background: '#555', color: '#FFF' };
    }
  };

  return (
    <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '2px', padding: '16px', minHeight: '120px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#C8FF00', letterSpacing: '0.2em' }}>
        // FORENSIC REPORT
      </div>
      <div style={{ borderBottom: '1px solid #1a1a1a', margin: '8px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {fields.map((f, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              style={{ padding: '4px 0' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#2a2a2a', textTransform: 'uppercase', marginBottom: '4px' }}>
                {f.label}
              </div>
              {f.isBadge ? (
                <div style={{
                  display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 8px', borderRadius: '2px',
                  ...getSeverityStyle(f.value)
                }}>
                  {f.value || 'UNKNOWN'}
                </div>
              ) : (
                <div style={{
                  fontFamily: f.font === 'body' ? 'var(--font-body)' : 'var(--font-mono)',
                  fontSize: f.font === 'body' ? (f.italic ? '11px' : '12px') : '12px',
                  color: f.isRed ? '#FF2222' : (f.italic ? '#555555' : (f.font === 'body' ? '#F0F0F0' : '#444444')),
                  fontStyle: f.italic ? 'italic' : 'normal',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {f.value || 'N/A'}
                </div>
              )}
            </motion.div>
            {idx < fields.length - 1 && <div style={{ borderBottom: '1px solid #111', margin: '8px 0' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
