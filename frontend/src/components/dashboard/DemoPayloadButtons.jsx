import React from 'react';
import { DEMO_PAYLOADS } from '../../data/payloads';
import AnimatedButton from './AnimatedButton';

export default function DemoPayloadButtons({ demoMode, onSelectPayload }) {
  if (!demoMode) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
      {DEMO_PAYLOADS.map(p => (
        <AnimatedButton 
          key={p.id} 
          variant="secondary" 
          onClick={() => onSelectPayload(p.text)}
          style={{ padding: '6px 12px', fontSize: '10px' }}
        >
          {p.label}
        </AnimatedButton>
      ))}
    </div>
  );
}
