import React from 'react';

export default function GlobeHero() {
  // We recreate the logic from the Framer GlobeMorph component natively.
  // This avoids React/Vite ES module resolution crashes for bare "framer" imports.
  const GLOBE_URL = "https://tkartik.com/globe-to-flat-map/van-der-grinten-map.html";
  
  // Sentinel Dark Finance Theme matching
  const params = new URLSearchParams({
    hex: "22C55E",      // Sentinel Green
    ocean: "000000",    // Deep Black
    bg: "000000",       // Deep Black
    landOpacity: "1",
    globeOpacity: "0.5",
    density: "450"
  });

  const src = `${GLOBE_URL}?${params.toString()}`;

  return (
    <div style={{
      width: '100%', 
      maxWidth: '600px', 
      margin: '0 auto',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '400px',
      position: 'relative'
    }}>
      <iframe 
        src={src} 
        title="Sentinel Global Threat Map" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none' // Ensures it acts purely as a background visual
        }} 
      />
    </div>
  );
}
