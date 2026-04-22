import React from 'react';

export default function GlobeHero() {
  return (
    <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
      <style>
        {`
          .fleek-globe { animation: globeRot 40s linear infinite; transform-origin: 260px 260px; }
          .fleek-ring  { animation: ringRot 60s linear infinite reverse; transform-origin: 260px 260px; }
          .nd-safe  { animation: ndPulse 2s ease-in-out infinite; }
          .nd-threat { animation: ndPulse2 1.5s ease-in-out infinite; }
          @keyframes globeRot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes ringRot  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes ndPulse  { 0%,100%{opacity:.3;r:3} 50%{opacity:1;r:4} }
          @keyframes ndPulse2 { 0%,100%{opacity:.25;r:3} 50%{opacity:1;r:4.5} }
        `}
      </style>
      <svg viewBox="0 0 520 520" width="100%" height="100%">
        {/* Outer dashed ring */}
        <circle cx="260" cy="260" r="245" stroke="#1a1a1a" fill="none" strokeWidth="0.4" strokeDasharray="6 4" className="fleek-ring" />
        {/* Main sphere outline */}
        <circle cx="260" cy="260" r="210" stroke="#333" fill="none" strokeWidth="0.5" />
        {/* Inner reference circle */}
        <circle cx="260" cy="260" r="170" stroke="#1a1a1a" fill="none" strokeWidth="0.3" />

        {/* Latitude lines */}
        {[{ y: 100, rx: 50 }, { y: 140, rx: 110 }, { y: 185, rx: 165 }, { y: 220, rx: 195 },
          { y: 260, rx: 210 }, { y: 300, rx: 195 }, { y: 335, rx: 165 },
          { y: 380, rx: 110 }, { y: 420, rx: 50 }
        ].map((r, i) => (
          <ellipse key={`lat${i}`} cx="260" cy={r.y} rx={r.rx} ry="6" stroke="#1a1a1a" fill="none" strokeWidth="0.35" />
        ))}

        {/* Longitude lines */}
        {[0, 22, 45, 67, 90, 112, 135, 157].map((deg, i) => (
          <ellipse key={`lng${i}`} cx="260" cy="260" rx="10" ry="210" stroke="#1a1a1a" fill="none" strokeWidth="0.35"
            style={{ transformOrigin: '260px 260px', transform: `rotate(${deg}deg)` }} />
        ))}

        {/* Connection lines — dashed */}
        <line x1="310" y1="170" x2="220" y2="210" stroke="#C8FF00" opacity="0.25" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="310" y1="170" x2="380" y2="260" stroke="#C8FF00" opacity="0.15" strokeWidth="0.4" strokeDasharray="4 3" />
        <line x1="220" y1="210" x2="180" y2="310" stroke="#C8FF00" opacity="0.1" strokeWidth="0.4" strokeDasharray="4 3" />
        <line x1="340" y1="300" x2="180" y2="310" stroke="#FF2222" opacity="0.12" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="220" y1="210" x2="290" y2="350" stroke="#C8FF00" opacity="0.08" strokeWidth="0.3" strokeDasharray="4 3" />

        {/* Safe nodes (yellow-green) */}
        <circle cx="310" cy="170" r="4" fill="#C8FF00" className="nd-safe" />
        <circle cx="220" cy="210" r="3.5" fill="#C8FF00" className="nd-safe" style={{ animationDelay: '0.4s' }} />
        <circle cx="380" cy="260" r="3" fill="#C8FF00" className="nd-safe" style={{ animationDelay: '0.8s' }} />
        <circle cx="290" cy="350" r="2.5" fill="#C8FF00" className="nd-safe" style={{ animationDelay: '1.2s' }} />
        <circle cx="200" cy="260" r="2.5" fill="#C8FF00" className="nd-safe" style={{ animationDelay: '1.6s' }} />

        {/* Threat nodes (red) */}
        <circle cx="340" cy="300" r="4" fill="#FF2222" className="nd-threat" />
        <circle cx="180" cy="310" r="3.5" fill="#FF2222" className="nd-threat" style={{ animationDelay: '0.6s' }} />

        {/* Neutral dots */}
        <circle cx="300" cy="390" r="1.5" fill="#333" />
        <circle cx="240" cy="360" r="1.5" fill="#333" />
        <circle cx="260" cy="150" r="1.5" fill="#333" />
        <circle cx="350" cy="200" r="1.5" fill="#333" />
      </svg>
    </div>
  );
}
