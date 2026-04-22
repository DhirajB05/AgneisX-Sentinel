import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NavbarLanding() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [bgOpacity, setBgOpacity] = useState(0);
  const [blurValue, setBlurValue] = useState(0);
  const [borderOpacity, setBorderOpacity] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const ratio = Math.min(latest / 80, 1);
      setBgOpacity(ratio * 0.92);
      setBlurValue(ratio * 16);
      setBorderOpacity(ratio * 0.08);
    });
  }, [scrollY]);

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `rgba(0,0,0,${bgOpacity})`,
        backdropFilter: `blur(${blurValue}px)`,
        borderBottom: `1px solid rgba(255,255,255,${borderOpacity})`,
      }}
    >
      {/* Left — Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {['// Docs', '// GitHub', '// About'].map((label) => (
          <motion.span
            key={label}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#333',
              letterSpacing: '0.08em', cursor: 'pointer', transition: 'color 0.2s'
            }}
            whileHover={{ color: '#888' }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      {/* Center — Logo */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '16px', color: '#F0F0F0',
        letterSpacing: '0.3em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <span style={{ color: '#C8FF00', fontSize: '18px' }}>⚡</span>
        SENTINEL
      </div>

      {/* Right — CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '10px' }}
          onClick={() => document.getElementById('section-4')?.scrollIntoView({ behavior: 'smooth' })}>
          .open [SDK]
        </button>
        <button
          onClick={() => navigate('/loading')}
          style={{
            background: '#C8FF00', color: '#000', fontFamily: 'var(--font-mono)',
            fontSize: '10px', fontWeight: 700, padding: '8px 16px', border: 'none',
            cursor: 'pointer', letterSpacing: '0.08em',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(200,255,0,0.25)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
        >
          .enter [SENTINEL]
        </button>
      </div>
    </motion.nav>
  );
}
