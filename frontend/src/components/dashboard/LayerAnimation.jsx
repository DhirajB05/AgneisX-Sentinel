import React from 'react';
import { motion } from 'framer-motion';

function Node({ label, color, active, badge }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: `1px solid ${color}`, transition: 'border-color 0.3s' }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color, textTransform: 'uppercase', marginTop: '4px', textAlign: 'center', transition: 'color 0.3s' }}>{label}</div>
      {active && badge && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#333', marginTop: '2px' }}>{badge}</div>
      )}
    </div>
  );
}

function Line({ active }) {
  return (
    <svg width="60" height="20" style={{ margin: '0 -10px' }}>
      <motion.line
        x1="0" y1="10" x2="60" y2="10"
        stroke={active ? "#C8FF00" : "#222"}
        strokeWidth="1"
        strokeDasharray="6"
        initial={{ strokeDashoffset: 60 }}
        animate={{ strokeDashoffset: active ? 0 : 60 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

export default function LayerAnimation({ stage, verdict }) {
  const getNodeColor = (nodeIndex) => {
    if (stage === 'idle') return '#222';
    if (stage === 'l1') {
      if (nodeIndex === 1) return '#C8FF00';
      return '#222';
    }
    if (stage === 'l2') {
      if (nodeIndex === 1 || nodeIndex === 2) return '#C8FF00';
      if (nodeIndex === 3) return '#FF8800';
    }
    if (stage === 'complete') {
      if (nodeIndex === 1 || nodeIndex === 2) return '#C8FF00';
      if (nodeIndex === 3) return verdict === 'SAFE' ? '#C8FF00' : '#FF2222';
    }
    return '#222';
  };

  const getLabelColor = (nodeIndex) => {
    const c = getNodeColor(nodeIndex);
    return c === '#222' ? '#2a2a2a' : c;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0, padding: '12px 16px', marginTop: '8px' }}>
      <Node label="INPUT" color={getLabelColor(1)} active={stage !== 'idle'} badge={null} />
      <Line active={stage === 'l1' || stage === 'l2' || stage === 'complete'} />
      <Node label="L1: BERT" color={getLabelColor(2)} active={stage === 'l2' || stage === 'complete'} badge="<50ms" />
      <Line active={stage === 'l2' || stage === 'complete'} />
      <Node label="L2: ENGINE" color={getLabelColor(3)} active={stage === 'complete' && verdict === 'THREAT'} badge="300-800ms" />
    </div>
  );
}
