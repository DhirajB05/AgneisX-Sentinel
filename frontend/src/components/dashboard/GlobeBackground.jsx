import React from 'react';

export default function GlobeBackground() {
  return (
    <div style={{
      position: 'absolute',
      width: '500px',
      height: '500px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.08
    }}>
      <style>
        {`
          .bg-globe-rotate {
            animation: bgGlobeRotate 60s linear infinite;
            transform-origin: 240px 240px;
          }
          @keyframes bgGlobeRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <svg viewBox="0 0 480 480" width="100%" height="100%" className="bg-globe-rotate">
        <circle cx="240" cy="240" rx="200" ry="200" stroke="#C8FF00" fill="none" strokeWidth="0.3" />
        
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
          <ellipse key={`bg-lat-${i}`} cx="240" cy={ring.y} rx={ring.rx} ry="8" stroke="#C8FF00" fill="none" strokeWidth="0.3" />
        ))}

        {/* Longitude lines */}
        {[0, 22, 45, 67, 90, 112, 135, 157].map((deg, i) => (
          <ellipse key={`bg-long-${i}`} cx="240" cy="240" rx="10" ry="200" stroke="#C8FF00" fill="none" strokeWidth="0.3" style={{ transformOrigin: '240px 240px', transform: `rotate(${deg}deg)` }} />
        ))}
      </svg>
    </div>
  );
}
