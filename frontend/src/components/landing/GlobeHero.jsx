import React, { Suspense } from 'react';

// Using React.lazy to dynamically load the Framer component from the provided URL
// We use /* @vite-ignore */ so Vite doesn't try to bundle it locally,
// allowing the browser to fetch the ES module natively at runtime.
const FramerGlobe = React.lazy(() => import(/* @vite-ignore */ 'https://framer.com/m/GlobeMorph-EQi6Q2.js@rpqp20ugovX8JEbvoUoT'));

export default function GlobeHero() {
  return (
    <div style={{
      width: '100%', 
      maxWidth: '600px', 
      margin: '0 auto',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '400px'
    }}>
      <Suspense fallback={
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '11px', 
          color: 'var(--text-3)',
          letterSpacing: '0.1em'
        }}>
          [INITIALIZING GLOBE...]
        </div>
      }>
        <div style={{ width: '100%', height: '400px', position: 'relative' }}>
          <FramerGlobe style={{ width: '100%', height: '100%' }} />
        </div>
      </Suspense>
    </div>
  );
}
