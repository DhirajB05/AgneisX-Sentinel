import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlobeHero from '../components/landing/GlobeHero';

const SECTIONS = ['01', '02', '03', '04', '05', '06'];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const els = document.querySelectorAll('[data-section]');
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight / 2 && r.bottom > 0) setActiveSection(i);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>

      {/* ══════ NAVBAR — exact Fleek style ══════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '56px', padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['// Docs', '// Blog', '// GitHub', '// Twitter'].map(l => (
            <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#444', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.color = '#888'}
              onMouseOut={e => e.currentTarget.style.color = '#444'}
            >{l}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#fff', letterSpacing: '0.05em', fontWeight: 600 }}>
          ⚡ <span style={{ fontWeight: 700 }}>sentinel</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            background: 'transparent', border: '1px solid #333', color: '#ccc',
            fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '8px 16px',
            cursor: 'pointer', letterSpacing: '0.06em'
          }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#888'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#333'}
          >.open [GITHUB]</button>
          <button style={{
            background: '#fff', border: 'none', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
            padding: '8px 16px', cursor: 'pointer', letterSpacing: '0.06em'
          }}
            onMouseOver={e => e.currentTarget.style.background = '#C8FF00'}
            onMouseOut={e => e.currentTarget.style.background = '#fff'}
            onClick={() => navigate('/loading')}
          >.enter [SENTINEL]</button>
        </div>
      </nav>

      {/* ══════ LEFT SECTION NAV — exact Fleek ══════ */}
      <div style={{
        position: 'fixed', left: '28px', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 50
      }}>
        {SECTIONS.map((n, i) => (
          <a key={i} href={`#s${i+1}`} style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
              color: activeSection === i ? '#C8FF00' : '#222',
              transition: 'color 0.3s'
            }}>{n}</div>
          </a>
        ))}
      </div>

      {/* ═══════════════════ SECTION 01 — HERO ═══════════════════ */}
      <section id="s1" data-section style={{
        minHeight: '100vh', padding: '140px 80px 60px 80px',
        display: 'grid', gridTemplateColumns: '0.45fr 0.55fr', gap: '40px', alignItems: 'center',
        maxWidth: '1300px', margin: '0 auto'
      }}>
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444', marginBottom: '16px' }}>01</motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 700,
              lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff',
              marginBottom: '20px', textTransform: 'uppercase'
            }}>
            AI SECURITY<br/>MIDDLEWARE
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666',
              lineHeight: 1.65, maxWidth: '380px', marginBottom: '28px'
            }}>
            Sentinel is optimized to intercept prompt injection attacks before they reach your AI system. Zero-latency detection, real-time forensic analysis.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              background: 'transparent', border: '1px solid #444', color: '#ccc',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
              padding: '11px 24px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#C8FF00'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#444'}
            >WHITEPAPER</button>
            <button style={{
              background: '#fff', border: 'none', color: '#000',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
              padding: '11px 24px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}
              onMouseOver={e => e.currentTarget.style.background = '#C8FF00'}
              onMouseOut={e => e.currentTarget.style.background = '#fff'}
              onClick={() => navigate('/loading')}
            >ENTER SENTINEL</button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7 }}>
          <GlobeHero />
        </motion.div>
      </section>

      {/* ═══ LIGHTNING BOLT DIVIDER ═══ */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0 24px 0' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: '#C8FF00'
        }}>⚡</div>
      </div>

      {/* ═══ SCROLLING TICKER — exact Fleek ═══ */}
      <div style={{
        overflow: 'hidden', borderTop: '1px solid #111', borderBottom: '1px solid #111',
        padding: '10px 0'
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 45s linear infinite',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#333',
          letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          {[1,2].map(k => (
            <React.Fragment key={k}>
              {[
                'SENTINEL PHASE 1 LIVE',
                'PROMPT INJECTION DEFENSE',
                'APPLY TO JOIN BETA',
                'REAL-TIME FORENSIC ENGINE',
                '<50ms L1 LATENCY',
                '97.3% DETECTION ACCURACY',
                'EU AI ACT COMPLIANT',
                'ONE LINE INTEGRATION',
              ].map((t, i) => (
                <span key={i} style={{ padding: '0 40px' }}>////////  {t}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SECTION 02 — THE EDGE ═══════════════════ */}
      <section id="s2" data-section style={{
        minHeight: '100vh', padding: '100px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
        maxWidth: '1300px', margin: '0 auto'
      }}>
        {/* LEFT: Isometric Diagram */}
        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 500 500" width="100%" style={{ maxWidth: '460px' }}>
            {/* Layer 01 — top */}
            <g>
              <rect x="140" y="40" width="220" height="70" rx="3" fill="none" stroke="#333" strokeWidth="0.6" />
              <text x="155" y="62" fontFamily="var(--font-mono)" fontSize="9" fill="#555">01</text>
              <text x="155" y="80" fontFamily="var(--font-body)" fontSize="10" fill="#666">Input Layer</text>
              <line x1="250" y1="42" x2="350" y2="20" stroke="#444" strokeWidth="0.4" strokeDasharray="3 3" />
              <text x="355" y="22" fontFamily="var(--font-mono)" fontSize="8" fill="#555">a</text>
            </g>
            {/* Connecting line */}
            <line x1="250" y1="110" x2="250" y2="160" stroke="#C8FF00" strokeWidth="0.8" />
            <line x1="180" y1="110" x2="80" y2="170" stroke="#C8FF00" strokeWidth="0.5" strokeDasharray="4 3" />

            {/* Layer 02 — middle (main engine) */}
            <g>
              <rect x="50" y="170" width="320" height="160" rx="3" fill="rgba(200,255,0,0.02)" stroke="#C8FF00" strokeWidth="0.6" />
              <text x="65" y="195" fontFamily="var(--font-mono)" fontSize="9" fill="#C8FF00">02</text>
              <text x="65" y="210" fontFamily="var(--font-mono)" fontSize="8" fill="#C8FF00">SENTINEL ENGINE</text>

              {/* Inner boxes */}
              <rect x="70" y="225" width="130" height="45" rx="2" fill="rgba(255,255,255,0.02)" stroke="#333" strokeWidth="0.4" />
              <text x="82" y="250" fontFamily="var(--font-mono)" fontSize="8" fill="#888">L1: DeBERTa-v3</text>
              <text x="82" y="262" fontFamily="var(--font-mono)" fontSize="7" fill="#444">&lt;50ms</text>

              <rect x="220" y="225" width="130" height="45" rx="2" fill="rgba(255,255,255,0.02)" stroke="#333" strokeWidth="0.4" />
              <text x="232" y="250" fontFamily="var(--font-mono)" fontSize="8" fill="#888">L2: AI Engine</text>
              <text x="232" y="262" fontFamily="var(--font-mono)" fontSize="7" fill="#444">300-800ms</text>

              {/* Arrow between */}
              <line x1="200" y1="247" x2="218" y2="247" stroke="#C8FF00" strokeWidth="0.6" markerEnd="url(#arrow)" />

              {/* Lightning icon */}
              <text x="170" y="310" fontFamily="var(--font-heading)" fontSize="20" fill="#C8FF00">⚡</text>

              {/* Label lines */}
              <line x1="52" y1="250" x2="20" y2="280" stroke="#444" strokeWidth="0.4" strokeDasharray="3 3" />
              <text x="5" y="292" fontFamily="var(--font-mono)" fontSize="8" fill="#555">b</text>
            </g>

            {/* Connecting line */}
            <line x1="250" y1="330" x2="250" y2="380" stroke="#C8FF00" strokeWidth="0.8" />

            {/* Layer 03 — bottom */}
            <g>
              <rect x="120" y="380" width="260" height="60" rx="3" fill="none" stroke="#333" strokeWidth="0.6" />
              <text x="135" y="402" fontFamily="var(--font-mono)" fontSize="9" fill="#555">03</text>
              <text x="135" y="418" fontFamily="var(--font-body)" fontSize="10" fill="#666">AI Agent Output</text>
              <line x1="380" y1="410" x2="420" y2="430" stroke="#444" strokeWidth="0.4" strokeDasharray="3 3" />
              <text x="425" y="432" fontFamily="var(--font-mono)" fontSize="8" fill="#555">c</text>
            </g>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#C8FF00" />
              </marker>
            </defs>
          </svg>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#222',
            textAlign: 'center', marginTop: '16px', letterSpacing: '0.15em'
          }}>
            // MODERN AI SECURITY INFRASTRUCTURE //
          </div>
        </div>

        {/* RIGHT: Copy */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444', marginBottom: '12px' }}>02</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700,
            lineHeight: 1.05, color: '#fff', textTransform: 'uppercase', marginBottom: '32px'
          }}>
            GIVING AI AN<br/>EDGE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'ZERO-LATENCY DETECTION',
              'PROMPT INJECTION DEFENSE',
              'FORENSIC REPORTING',
              'MULTI-AGENT SUPPORT',
              'ONE-LINE INTEGRATION',
              'EU AI ACT COMPLIANT'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C8FF00', fontSize: '12px' }}>⚡</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#888', letterSpacing: '0.04em' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER WITH NUMBER ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '48px 0' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #222',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#444'
        }}>03</div>
        <div style={{ color: '#C8FF00', fontSize: '16px' }}>⚡</div>
      </div>

      {/* ═══════════════════ SECTION 03 — SUPERCHARGE ═══════════════════ */}
      <section id="s3" data-section style={{ padding: '40px 80px 100px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700,
          color: '#fff', textTransform: 'uppercase', marginBottom: '20px'
        }}>
          SUPERCHARGE YOUR AI STACK
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '14px', color: '#555',
          lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px auto'
        }}>
          Sentinel is an open-source AI security middleware for intercepting prompt injection attacks and protecting multi-agent systems at scale.
        </p>

        {/* Integration grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '600px', margin: '0 auto 56px auto' }}>
          {["ANTHROPIC CLAUDE", "GITHUB COPILOT", "OPENAI AGENTS", "CURSOR IDE", "WINDSURF", "LANGCHAIN", "AUTOGPT", "CREWAI", "ANY REST API"].map((name, i) => (
            <div key={i} style={{
              border: '1px solid #1a1a1a', padding: '16px 12px', textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', letterSpacing: '0.08em',
              cursor: 'default', transition: 'border-color 0.2s, color 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#C8FF00'; e.currentTarget.style.color = '#C8FF00'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#444'; }}
            >{name}</div>
          ))}
        </div>

        {/* Code snippet */}
        <div style={{
          border: '1px solid #1a1a1a', padding: '16px 24px', display: 'inline-block',
          fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'left'
        }}>
          <span style={{ color: '#444' }}># Protect any AI agent — 1 line</span><br/>
          <span style={{ color: '#fff' }}>protected = </span>
          <span style={{ color: '#C8FF00' }}>sentinel</span>
          <span style={{ color: '#fff' }}>.protect(your_agent)</span>
        </div>
      </section>

      {/* ═══ TICKER 2 ═══ */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #111', borderBottom: '1px solid #111', padding: '10px 0' }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 50s linear infinite',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#222', letterSpacing: '0.1em'
        }}>
          {[1,2].map(k => (
            <React.Fragment key={k}>
              {['$86M OPENAI → PROMPTFOO', '$180M SENTINELONE → PROMPT SECURITY', '$213M CISCO → ROBUST INTELLIGENCE',
                'MARKET VALIDATION GROWING', 'AI SECURITY IS THE NEXT FRONTIER'
              ].map((t, i) => (
                <span key={i} style={{ padding: '0 40px' }}>////////  {t}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SECTION 04 — MARKET ═══════════════════ */}
      <section id="s4" data-section style={{ padding: '80px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444', marginBottom: '12px', textAlign: 'center' }}>04</div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700,
          color: '#fff', textAlign: 'center', textTransform: 'uppercase', marginBottom: '48px'
        }}>
          THE MARKET IS PAYING FOR THIS
        </h2>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '64px' }}>
          {[
            { amount: "$86M", company: "OpenAI → Promptfoo", date: "March 2026" },
            { amount: "$180M", company: "SentinelOne → Prompt Security", date: "2025" },
            { amount: "$213M", company: "Cisco → Robust Intelligence", date: "2024" }
          ].map((c, i) => (
            <div key={i} style={{
              flex: 1, border: '1px solid #1a1a1a', padding: '32px 24px', textAlign: 'center',
              transition: 'border-color 0.3s'
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#333'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#1a1a1a'}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', color: '#C8FF00', fontWeight: 700 }}>{c.amount}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#555', marginTop: '12px' }}>{c.company}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#333', marginTop: '8px' }}>{c.date}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#666', marginBottom: '24px' }}>
            We built the open, plug-and-play version.
          </p>
          <button style={{
            background: '#C8FF00', border: 'none', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
            padding: '14px 32px', cursor: 'pointer', letterSpacing: '0.06em'
          }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(200,255,0,0.2)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => navigate('/loading')}
          >⚡ ENTER SENTINEL</button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        borderTop: '1px solid #111', padding: '24px 80px',
        display: 'flex', justifyContent: 'space-between'
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#222' }}>© 2026 SENTINEL — AgneisX</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#222' }}>BUILT FOR HACKATHON</span>
      </footer>

      {/* Bottom scroll */}
      <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', letterSpacing: '0.15em' }}>
          SCROLL TO EXPLORE ↓
        </motion.div>
      </div>

    </div>
    </motion.div>
  );
}
