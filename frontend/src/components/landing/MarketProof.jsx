import React from 'react';
import { motion } from 'framer-motion';

export default function MarketProof() {
  const cards = [
    { amount: "$86M", company: "OpenAI → Promptfoo", date: "March 2026", desc: "Prompt security infrastructure" },
    { amount: "$180M", company: "SentinelOne → Prompt Security", date: "2025", desc: "AI firewall acquisition" },
    { amount: "$213M", company: "Cisco → Robust Intelligence", date: "2024", desc: "Model validation platform" }
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '900px', margin: '48px auto' }}>
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.12, duration: 0.5 }}
          className="glass-card glass-card-hover"
          style={{
            padding: '36px 28px',
            flex: 1,
            textAlign: 'center',
            cursor: 'default'
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '48px', color: '#C8FF00',
            fontWeight: 700, lineHeight: 1
          }}>
            {card.amount}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', marginTop: '16px'
          }}>
            {card.company}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', color: '#444', marginTop: '6px'
          }}>
            {card.desc}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#222', marginTop: '12px',
            letterSpacing: '0.1em'
          }}>
            {card.date}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
