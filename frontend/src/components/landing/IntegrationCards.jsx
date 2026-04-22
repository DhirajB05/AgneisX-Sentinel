import React from 'react';
import { motion } from 'framer-motion';

export default function IntegrationCards() {
  const integrations = [
    "ANTHROPIC CLAUDE", "GITHUB COPILOT", "OPENAI AGENTS",
    "CURSOR IDE", "WINDSURF", "LANGCHAIN",
    "AUTOGPT", "CREWAI", "ANY REST API"
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '720px', margin: '48px auto' }}>
      {integrations.map((name, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          whileHover={{ borderColor: '#C8FF00', color: '#C8FF00', transition: { duration: 0.2 } }}
          style={{
            background: '#0f0f0f',
            border: '1px solid #1a1a1a',
            padding: '20px 16px',
            borderRadius: '2px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#444',
            letterSpacing: '0.1em',
            cursor: 'default'
          }}
        >
          {name}
        </motion.div>
      ))}
    </div>
  );
}
