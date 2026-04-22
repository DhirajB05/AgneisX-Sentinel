import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [linesVisible, setLinesVisible] = useState(0);

  useEffect(() => {
    // Redirect to dashboard after 3200ms
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    // Show lines sequentially
    const intervals = [0, 400, 800, 1200, 1600, 2000].map((delay, index) => {
      return setTimeout(() => setLinesVisible(index + 1), delay);
    });

    return () => intervals.forEach(clearTimeout);
  }, []);

  const lines = [
    "> INITIALIZING SENTINEL v2.0...",
    "> LOADING LAYER 1: DeBERTa-v3...",
    "> LOADING LAYER 2: SENTINEL AI ENGINE...",
    "> CONNECTING THREAT DATABASE...",
    "> CALIBRATING DETECTION THRESHOLD: 0.75",
    "> ALL SYSTEMS OPERATIONAL ✓"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <div style={{ position: 'fixed', width: '100%', height: '2px', background: 'rgba(200,255,0,0.04)', pointerEvents: 'none', animation: 'scanline 1.5s linear infinite', top: '-2px', left: 0 }} />
      <style>
        {`
          @keyframes scanline {
            from { top: -2px; }
            to { top: 100vh; }
          }
        `}
      </style>

      <div style={{ width: '420px', fontFamily: 'var(--font-mono)' }}>
        <div style={{ fontSize: '11px', color: '#222', whiteSpace: 'pre', marginBottom: '16px', lineHeight: '1.2' }}>
{`┌──────────────────────────────┐
│   SENTINEL BOOT SEQUENCE     │
└──────────────────────────────┘`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: linesVisible > index ? 1 : 0 }}
              transition={{ duration: 0 }} // instantaneous appearance when state updates
              style={{
                fontSize: '12px',
                color: index === 5 ? '#C8FF00' : '#555',
                fontWeight: index === 5 ? 700 : 400
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '24px', height: '2px', background: '#111', width: '100%' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'linear' }}
            style={{ height: '100%', background: '#C8FF00' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
