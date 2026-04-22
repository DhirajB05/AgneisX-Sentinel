import React from 'react';
import { motion } from 'framer-motion';

export default function IntegrationCards() {
  const integrations = [
    "ANTHROPIC CLAUDE", "GITHUB COPILOT", "OPENAI AGENTS",
    "CURSOR IDE", "WINDSURF", "LANGCHAIN",
    "AUTOGPT", "CREWAI", "ANY REST API"
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '720px', margin: '40px auto' }}>
      {integrations.map((name, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.04, duration: 0.3 }}
          whileHover={{
            borderColor: 'rgba(200,255,0,0.3)',
            boxShadow: '0 0 30px rgba(200,255,0,0.06)',
            color: '#C8FF00'
          }}
          className="glass-card"
          style={{
            padding: '22px 16px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#555',
            letterSpacing: '0.1em',
            cursor: 'default',
            transition: 'all 0.25s ease'
          }}
        >
          {name}
        </motion.div>
      ))}
    </div>
  );
}
