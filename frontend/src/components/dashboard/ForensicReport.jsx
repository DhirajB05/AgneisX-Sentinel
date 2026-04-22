import React from 'react';
import { motion } from 'framer-motion';

export default function ForensicReport({ report, triggered }) {
  if (!report || !triggered) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '16px', minHeight: '120px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)' }}>// NO THREATS DETECTED</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-4)' }}>Layer 2 was not triggered</div>
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
      case 'HIGH': return { background: 'rgba(239, 68, 68, 0.1)', color: 'var(--threat)', border: '1px solid rgba(239, 68, 68, 0.3)' };
      case 'MEDIUM': return { background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.3)' };
      case 'LOW': return { background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(34, 197, 94, 0.3)' };
      default: return { background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-2)', border: '1px solid var(--border)' };
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '16px', minHeight: '120px' }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--text-1)', fontWeight: 500, marginBottom: '16px' }}>
        Forensic Report
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {fields.map((f, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              style={{ padding: '6px 0' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                {f.label}
              </div>
              {f.isBadge ? (
                <div style={{
                  display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 8px', borderRadius: '4px',
                  ...getSeverityStyle(f.value)
                }}>
                  {f.value || 'UNKNOWN'}
                </div>
              ) : (
                <div style={{
                  fontFamily: f.font === 'body' ? 'var(--font-body)' : 'var(--font-mono)',
                  fontSize: f.font === 'body' ? (f.italic ? '11px' : '12px') : '12px',
                  color: f.isRed ? 'var(--threat)' : (f.italic ? 'var(--text-3)' : 'var(--text-1)'),
                  fontStyle: f.italic ? 'italic' : 'normal',
                  lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {f.value || 'N/A'}
                </div>
              )}
            </motion.div>
            {idx < fields.length - 1 && <div style={{ borderBottom: '1px solid var(--border-card)', margin: '4px 0' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
