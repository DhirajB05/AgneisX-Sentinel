import React from 'react';
import { DEMO_PAYLOADS } from '../../data/payloads';

export default function DemoPayloadButtons({ demoMode, onSelectPayload }) {
  if (!demoMode) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
      {DEMO_PAYLOADS.map(p => (
        <button key={p.id} onClick={() => onSelectPayload(p.text)}
          style={{
            background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px',
            color: 'var(--text-2)', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '6px 12px',
            cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.05em'
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--text-3)'; e.currentTarget.style.color = 'var(--text-1)'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
