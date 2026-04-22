import React from 'react';
import { motion } from 'framer-motion';

export default function MarketProof() {
  const cards = [
    { amount: "$86M", company: "OpenAI → Promptfoo", date: "March 2026" },
    { amount: "$180M", company: "SentinelOne → Prompt Security", date: "2025" },
    { amount: "$213M", company: "Cisco → Robust Intelligence", date: "2024" }
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '900px', margin: '48px auto' }}>
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15, duration: 0.4 }}
          style={{
            background: '#0f0f0f',
            border: '1px solid #1a1a1a',
            padding: '32px',
            borderRadius: '2px',
            flex: 1,
            textAlign: 'center'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '48px', color: '#C8FF00', fontWeight: 700, lineHeight: 1 }}>{card.amount}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#555', marginTop: '16px' }}>{card.company}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333', marginTop: '8px' }}>{card.date}</div>
        </motion.div>
      ))}
    </div>
  );
}
