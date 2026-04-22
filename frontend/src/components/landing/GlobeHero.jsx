import React from 'react';
import { motion } from 'framer-motion';

export default function GlobeHero() {
  return (
    <motion.div
      style={{
        width: '480px',
        height: '480px',
        position: 'relative',
        margin: 'auto'
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
    >
      <style>
        {`
          .globe-svg {
            animation: globeRotate 25s linear infinite;
            transform-origin: 240px 240px;
          }
          .outer-ring {
            animation: ringRotate 45s linear infinite reverse;
            transform-origin: 240px 240px;
          }
          .pulse-safe  { animation: pulseSafe 2.0s ease-in-out infinite; }
          .pulse-threat { animation: pulseThreat 1.5s ease-in-out infinite; }

          @keyframes globeRotate  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes ringRotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes pulseSafe    { 0%,100%{opacity:.5} 50%{opacity:1;filter:drop-shadow(0 0 6px #C8FF00)} }
          @keyframes pulseThreat  { 0%,100%{opacity:.4} 50%{opacity:1;filter:drop-shadow(0 0 8px #FF2222)} }
        `}
      </style>
      <svg viewBox="0 0 480 480" width="100%" height="100%">
        <circle cx="240" cy="240" rx="200" ry="200" stroke="#222222" fill="none" strokeWidth="0.8" className="globe-svg" />
        
        {/* Latitude rings */}
        {[
          { y: 80, rx: 60 },
          { y: 120, rx: 110 },
          { y: 160, rx: 145 },
          { y: 200, rx: 160 },
          { y: 240, rx: 145 },
          { y: 280, rx: 110 },
          { y: 320, rx: 60 }
        ].map((ring, i) => (
          <ellipse key={`lat-${i}`} cx="240" cy={ring.y} rx={ring.rx} ry="8" stroke="#1a1a1a" fill="none" strokeWidth="0.5" />
        ))}

        {/* Longitude lines */}
        {[0, 22, 45, 67, 90, 112, 135, 157].map((deg, i) => (
          <ellipse key={`long-${i}`} cx="240" cy="240" rx="10" ry="200" stroke="#1a1a1a" fill="none" strokeWidth="0.5" style={{ transformOrigin: '240px 240px', transform: `rotate(${deg}deg)` }} />
        ))}

        {/* Outer dashed ring */}
        <circle cx="240" cy="240" r="220" stroke="#1a1a1a" fill="none" strokeWidth="1" strokeDasharray="6 6" className="outer-ring" />

        {/* Connection lines */}
        <line x1="285" y1="160" x2="240" y2="190" stroke="#C8FF00" opacity="0.15" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="310" y1="280" x2="155" y2="300" stroke="#FF2222" opacity="0.10" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Node dots */}
        <circle cx="285" cy="160" r="5" fill="#C8FF00" className="pulse-safe" />
        <circle cx="180" cy="210" r="4" fill="#C8FF00" className="pulse-safe" />
        <circle cx="310" cy="280" r="5" fill="#FF2222" className="pulse-threat" />
        <circle cx="155" cy="300" r="4" fill="#FF2222" className="pulse-threat" />
        <circle cx="240" cy="190" r="3" fill="#C8FF00" className="pulse-safe" />
        <circle cx="270" cy="330" r="3" fill="#888888" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
