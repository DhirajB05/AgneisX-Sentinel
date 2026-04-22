import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NavbarLanding() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [blurValue, setBlurValue] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
      const ratio = Math.min(latest / 50, 1);
      setBgOpacity(ratio * 0.96);
      setBlurValue(ratio * 8);
    });
  }, [scrollY]);

  return (
    <motion.nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '56px',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `rgba(8,8,8,${bgOpacity})`,
        backdropFilter: `blur(${blurValue}px)`,
        borderBottom: isScrolled ? '1px solid #1a1a1a' : '1px solid transparent',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: '#C8FF00', letterSpacing: '0.25em' }}>
        ⚡ SENTINEL
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {['FEATURES', 'HOW IT WORKS', 'INTEGRATIONS'].map((label) => (
          <motion.a
            key={label}
            href={`#${label.toLowerCase().replace(/ /g, '-')}`}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}
            whileHover={{ color: '#888', transition: { duration: 0.2 } }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      <motion.button
        onClick={() => navigate('/loading')}
        style={{
          background: '#C8FF00',
          color: '#000',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          padding: '10px 20px',
          borderRadius: '2px',
          border: 'none',
          cursor: 'pointer'
        }}
        whileHover={{ background: '#d4ff1a', scale: 1.02, transition: { duration: 0.15 } }}
      >
        [ENTER SENTINEL →]
      </motion.button>
    </motion.nav>
  );
}
