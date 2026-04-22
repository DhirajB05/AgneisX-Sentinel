import React from 'react';
import { motion } from 'framer-motion';

export default function GlobeHero() {
  return (
    <motion.div
      style={{
        width: '540px',
        height: '540px',
        position: 'relative',
        margin: 'auto'
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
    >
      <style>
        {`
          .globe-main {
            animation: globeSpin 30s linear infinite;
            transform-origin: 270px 270px;
          }
          .outer-ring-main {
            animation: ringRotate2 50s linear infinite reverse;
            transform-origin: 270px 270px;
          }
          .pulse-safe-2  { animation: pulseSafe2 2.0s ease-in-out infinite; }
          .pulse-threat-2 { animation: pulseThreat2 1.5s ease-in-out infinite; }

          @keyframes globeSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes ringRotate2  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes pulseSafe2   { 0%,100%{opacity:.4} 50%{opacity:1;filter:drop-shadow(0 0 10px #C8FF00)} }
          @keyframes pulseThreat2 { 0%,100%{opacity:.3} 50%{opacity:1;filter:drop-shadow(0 0 12px #FF2222)} }
        `}
      </style>
      <svg viewBox="0 0 540 540" width="100%" height="100%">
        {/* Outer glow ring */}
        <circle cx="270" cy="270" r="250" stroke="#C8FF00" fill="none" strokeWidth="0.3" opacity="0.15" />
        <circle cx="270" cy="270" r="258" stroke="#C8FF00" fill="none" strokeWidth="0.15" opacity="0.08"
          strokeDasharray="8 8" className="outer-ring-main" />

        {/* Main globe circle */}
        <circle cx="270" cy="270" r="220" stroke="#333" fill="none" strokeWidth="0.6" className="globe-main" />

        {/* Latitude rings */}
        {[
          { y: 100, rx: 70 },
          { y: 140, rx: 125 },
          { y: 180, rx: 170 },
          { y: 220, rx: 200 },
          { y: 270, rx: 220 },
          { y: 320, rx: 200 },
          { y: 360, rx: 170 },
          { y: 400, rx: 125 },
          { y: 440, rx: 70 }
        ].map((ring, i) => (
          <ellipse key={`lat-${i}`} cx="270" cy={ring.y} rx={ring.rx} ry="8"
            stroke="#1a1a1a" fill="none" strokeWidth="0.4" />
        ))}

        {/* Longitude lines */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((deg, i) => (
          <ellipse key={`lng-${i}`} cx="270" cy="270" rx="12" ry="220"
            stroke="#1a1a1a" fill="none" strokeWidth="0.4"
            style={{ transformOrigin: '270px 270px', transform: `rotate(${deg}deg)` }} />
        ))}

        {/* Connection lines */}
        <line x1="320" y1="180" x2="230" y2="220" stroke="#C8FF00" opacity="0.2" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="350" y1="310" x2="180" y2="340" stroke="#FF2222" opacity="0.15" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="230" y1="220" x2="180" y2="340" stroke="#C8FF00" opacity="0.08" strokeWidth="0.4" strokeDasharray="4 4" />
        <line x1="320" y1="180" x2="380" y2="280" stroke="#C8FF00" opacity="0.06" strokeWidth="0.4" strokeDasharray="4 4" />

        {/* Safe nodes */}
        <circle cx="320" cy="180" r="5" fill="#C8FF00" className="pulse-safe-2" />
        <circle cx="230" cy="220" r="4" fill="#C8FF00" className="pulse-safe-2" style={{ animationDelay: '0.5s' }} />
        <circle cx="380" cy="280" r="3.5" fill="#C8FF00" className="pulse-safe-2" style={{ animationDelay: '1s' }} />
        <circle cx="200" cy="260" r="3" fill="#C8FF00" className="pulse-safe-2" style={{ animationDelay: '1.5s' }} />

        {/* Threat nodes */}
        <circle cx="350" cy="310" r="5" fill="#FF2222" className="pulse-threat-2" />
        <circle cx="180" cy="340" r="4" fill="#FF2222" className="pulse-threat-2" style={{ animationDelay: '0.8s' }} />

        {/* Neutral nodes */}
        <circle cx="300" cy="400" r="2.5" fill="#444" opacity="0.5" />
        <circle cx="250" cy="370" r="2" fill="#444" opacity="0.4" />

        {/* Center shield icon */}
        <g transform="translate(255, 255)">
          <path d="M15 0 L28 8 L28 20 C28 30 15 36 15 36 C15 36 2 30 2 20 L2 8 Z"
            fill="none" stroke="#C8FF00" strokeWidth="0.8" opacity="0.3" />
          <text x="15" y="22" textAnchor="middle" fill="#C8FF00" fontSize="12" opacity="0.5"
            fontFamily="var(--font-mono)">⚡</text>
        </g>
      </svg>
    </motion.div>
  );
}
