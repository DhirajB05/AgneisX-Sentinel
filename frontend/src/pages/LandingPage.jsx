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

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '52px', padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['// Docs', '// Blog', '// GitHub', '// Twitter'].map(l => (
            <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#9CA3AF'}
              onMouseOut={e => e.currentTarget.style.color = '#4B5563'}
            >{l}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#F3F4F6', letterSpacing: '0.08em', fontWeight: 600 }}>
          /S/ <span style={{ fontWeight: 700 }}>sentinel</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            background: 'transparent', border: '1px solid #374151', color: '#9CA3AF',
            fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '8px 16px',
            cursor: 'pointer', letterSpacing: '0.06em', transition: 'border-color 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#9CA3AF'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#374151'}
          >.open [GITHUB]</button>
          <button style={{
            background: '#F3F4F6', border: 'none', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
            padding: '8px 16px', cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = '#22C55E'}
            onMouseOut={e => e.currentTarget.style.background = '#F3F4F6'}
            onClick={() => navigate('/loading')}
          >.enter [SENTINEL]</button>
        </div>
      </nav>

      {/* LEFT NAV */}
      <div style={{
        position: 'fixed', left: '28px', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 50
      }}>
        {SECTIONS.map((n, i) => (
          <a key={i} href={`#s${i+1}`} style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
              color: activeSection === i ? '#22C55E' : '#1F2937',
              transition: 'color 0.3s'
            }}>{n}</div>
          </a>
        ))}
      </div>

      {/* SECTION 01 — HERO */}
      <section id="s1" data-section style={{
        minHeight: '100vh', padding: '130px 80px 60px 80px',
        display: 'grid', gridTemplateColumns: '0.42fr 0.58fr', gap: '40px', alignItems: 'center',
        maxWidth: '1300px', margin: '0 auto'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4B5563', marginBottom: '16px' }}>01</div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 700,
              lineHeight: 1.0, letterSpacing: '-0.02em', color: '#F3F4F6',
              marginBottom: '20px', textTransform: 'uppercase'
            }}>
            AI SECURITY<br/>MIDDLEWARE
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280',
              lineHeight: 1.65, maxWidth: '380px', marginBottom: '28px'
            }}>
            Sentinel is optimized to intercept prompt injection attacks before they reach your AI system. Zero-latency detection, real-time forensic analysis.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              background: 'transparent', border: '1px solid #374151', color: '#9CA3AF',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
              padding: '11px 24px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'border-color 0.2s'
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#22C55E'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#374151'}
            >WHITEPAPER</button>
            <button style={{
              background: '#F3F4F6', border: 'none', color: '#000',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
              padding: '11px 24px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'background 0.2s'
            }}
              onMouseOver={e => e.currentTarget.style.background = '#22C55E'}
              onMouseOut={e => e.currentTarget.style.background = '#F3F4F6'}
              onClick={() => navigate('/loading')}
            >ENTER SENTINEL</button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <GlobeHero />
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0 24px 0' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #1F2937',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#22C55E'
        }}>/S/</div>
      </div>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #111', borderBottom: '1px solid #111', padding: '10px 0' }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 45s linear infinite',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#1F2937', letterSpacing: '0.1em'
        }}>
          {[1,2].map(k => (
            <React.Fragment key={k}>
              {['SENTINEL PHASE 1 LIVE','PROMPT INJECTION DEFENSE','APPLY TO JOIN BETA','REAL-TIME FORENSIC ENGINE','<50ms L1 LATENCY','97.3% DETECTION ACCURACY','EU AI ACT COMPLIANT','ONE LINE INTEGRATION'].map((t, i) => (
                <span key={i} style={{ padding: '0 40px' }}>////////  {t}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SECTION 02 — ARCHITECTURE DIAGRAM */}
      <section id="s2" data-section style={{
        minHeight: '100vh', padding: '100px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
        maxWidth: '1300px', margin: '0 auto'
      }}>
        {/* LEFT: Flow Diagram */}
        <div>
          <svg viewBox="0 0 440 520" width="100%" style={{ maxWidth: '420px' }}>
            {/* Input box */}
            <rect x="100" y="20" width="240" height="54" rx="4" fill="none" stroke="#374151" strokeWidth="0.7" />
            <text x="115" y="42" fontFamily="var(--font-mono)" fontSize="8" fill="#6B7280">01</text>
            <text x="115" y="56" fontFamily="var(--font-body)" fontSize="10" fill="#9CA3AF">AI Agent Input</text>
            <text x="280" y="52" fontFamily="var(--font-mono)" fontSize="8" fill="#4B5563">-- Email / Doc / Prompt</text>

            {/* Connector */}
            <line x1="220" y1="74" x2="220" y2="110" stroke="#22C55E" strokeWidth="1" />
            <polygon points="216,108 220,116 224,108" fill="#22C55E" />

            {/* SENTINEL ENGINE box */}
            <rect x="40" y="118" width="360" height="200" rx="4" fill="rgba(34,197,94,0.03)" stroke="#22C55E" strokeWidth="0.7" />
            <text x="56" y="142" fontFamily="var(--font-mono)" fontSize="9" fill="#22C55E">02</text>
            <text x="56" y="158" fontFamily="var(--font-mono)" fontSize="9" fill="#22C55E" fontWeight="600">SENTINEL MIDDLEWARE</text>

            {/* L1 box */}
            <rect x="60" y="175" width="150" height="55" rx="3" fill="rgba(255,255,255,0.02)" stroke="#374151" strokeWidth="0.5" />
            <text x="72" y="196" fontFamily="var(--font-mono)" fontSize="9" fill="#9CA3AF">LAYER 1: DeBERTa-v3</text>
            <text x="72" y="212" fontFamily="var(--font-mono)" fontSize="8" fill="#4B5563">Statistical Pattern Match</text>
            <rect x="165" y="199" width="36" height="16" rx="2" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
            <text x="170" y="211" fontFamily="var(--font-mono)" fontSize="7" fill="#22C55E">&lt;50ms</text>

            {/* Arrow L1 to L2 */}
            <line x1="210" y1="202" x2="228" y2="202" stroke="#22C55E" strokeWidth="0.7" strokeDasharray="4 2" />
            <polygon points="226,199 232,202 226,205" fill="#22C55E" />

            {/* L2 box */}
            <rect x="234" y="175" width="150" height="55" rx="3" fill="rgba(255,255,255,0.02)" stroke="#374151" strokeWidth="0.5" />
            <text x="246" y="196" fontFamily="var(--font-mono)" fontSize="9" fill="#9CA3AF">LAYER 2: AI ENGINE</text>
            <text x="246" y="212" fontFamily="var(--font-mono)" fontSize="8" fill="#4B5563">Semantic Intent Analysis</text>
            <rect x="338" y="199" width="36" height="16" rx="2" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" />
            <text x="340" y="211" fontFamily="var(--font-mono)" fontSize="6" fill="#F59E0B">300-800ms</text>

            {/* Escalation note */}
            <text x="56" y="255" fontFamily="var(--font-mono)" fontSize="7" fill="#374151">L1 flags suspicious  --&gt;  escalates to L2 for deep analysis</text>

            {/* Forensic box */}
            <rect x="60" y="268" width="320" height="36" rx="3" fill="rgba(255,255,255,0.01)" stroke="#1F2937" strokeWidth="0.4" />
            <text x="72" y="290" fontFamily="var(--font-mono)" fontSize="8" fill="#4B5563">FORENSIC ENGINE: attack_type + severity + explanation + sanitized_output</text>

            {/* Output connectors */}
            <line x1="140" y1="318" x2="140" y2="365" stroke="#22C55E" strokeWidth="1" />
            <polygon points="136,363 140,371 144,363" fill="#22C55E" />
            <line x1="300" y1="318" x2="300" y2="365" stroke="#EF4444" strokeWidth="1" />
            <polygon points="296,363 300,371 304,363" fill="#EF4444" />

            {/* SAFE box */}
            <rect x="60" y="373" width="160" height="50" rx="4" fill="none" stroke="#22C55E" strokeWidth="0.6" />
            <text x="75" y="395" fontFamily="var(--font-mono)" fontSize="10" fill="#22C55E">[SAFE] -- PASS TO AGENT</text>
            <text x="75" y="410" fontFamily="var(--font-mono)" fontSize="7" fill="#4B5563">No injection detected</text>

            {/* THREAT box */}
            <rect x="240" y="373" width="160" height="50" rx="4" fill="none" stroke="#EF4444" strokeWidth="0.6" />
            <text x="255" y="395" fontFamily="var(--font-mono)" fontSize="10" fill="#EF4444">[!] THREAT -- BLOCK</text>
            <text x="255" y="410" fontFamily="var(--font-mono)" fontSize="7" fill="#4B5563">Log + alert + sanitize</text>

            {/* Reference lines */}
            <line x1="400" y1="40" x2="430" y2="20" stroke="#374151" strokeWidth="0.3" strokeDasharray="3 3" />
            <text x="432" y="22" fontFamily="var(--font-mono)" fontSize="7" fill="#374151">a</text>
            <line x1="42" y1="250" x2="20" y2="270" stroke="#374151" strokeWidth="0.3" strokeDasharray="3 3" />
            <text x="12" y="278" fontFamily="var(--font-mono)" fontSize="7" fill="#374151">b</text>
          </svg>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#1F2937', textAlign: 'center', marginTop: '12px', letterSpacing: '0.12em' }}>
            // MODERN AI SECURITY INFRASTRUCTURE //
          </div>
        </div>

        {/* RIGHT: Copy */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4B5563', marginBottom: '12px' }}>02</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700,
            lineHeight: 1.05, color: '#F3F4F6', textTransform: 'uppercase', marginBottom: '32px'
          }}>
            GIVING AI AN<br/>EDGE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['ZERO-LATENCY DETECTION','PROMPT INJECTION DEFENSE','FORENSIC REPORTING','MULTI-AGENT SUPPORT','ONE-LINE INTEGRATION','EU AI ACT COMPLIANT'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#22C55E', fontSize: '11px' }}>/</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', letterSpacing: '0.04em' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER 03 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '48px 0' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #1F2937',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563'
        }}>03</div>
      </div>

      {/* SECTION 03 — SUPERCHARGE */}
      <section id="s3" data-section style={{ padding: '40px 80px 100px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: '#F3F4F6', textTransform: 'uppercase', marginBottom: '20px' }}>
          SUPERCHARGE YOUR AI STACK
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px auto' }}>
          Sentinel is an open-source AI security middleware for intercepting prompt injection attacks and protecting multi-agent systems at scale.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '600px', margin: '0 auto 56px auto' }}>
          {["ANTHROPIC CLAUDE","GITHUB COPILOT","OPENAI AGENTS","CURSOR IDE","WINDSURF","LANGCHAIN","AUTOGPT","CREWAI","ANY REST API"].map((name, i) => (
            <div key={i} style={{
              border: '1px solid #1F2937', padding: '16px 12px',
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4B5563', letterSpacing: '0.08em',
              cursor: 'default', transition: 'border-color 0.2s, color 0.2s'
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#22C55E'; e.currentTarget.style.color = '#22C55E'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#1F2937'; e.currentTarget.style.color = '#4B5563'; }}
            >{name}</div>
          ))}
        </div>
        <div style={{ border: '1px solid #1F2937', padding: '16px 24px', display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'left' }}>
          <span style={{ color: '#4B5563' }}># Protect any AI agent -- 1 line</span><br/>
          <span style={{ color: '#F3F4F6' }}>protected = </span>
          <span style={{ color: '#22C55E' }}>sentinel</span>
          <span style={{ color: '#F3F4F6' }}>.protect(your_agent)</span>
        </div>
      </section>

      {/* TICKER 2 */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #111', borderBottom: '1px solid #111', padding: '10px 0' }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 50s linear infinite',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#1F2937', letterSpacing: '0.1em'
        }}>
          {[1,2].map(k => (
            <React.Fragment key={k}>
              {['$86M OPENAI -> PROMPTFOO','$180M SENTINELONE -> PROMPT SECURITY','$213M CISCO -> ROBUST INTELLIGENCE','MARKET VALIDATION GROWING','AI SECURITY IS THE NEXT FRONTIER'].map((t, i) => (
                <span key={i} style={{ padding: '0 40px' }}>////////  {t}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SECTION 04 — MARKET */}
      <section id="s4" data-section style={{ padding: '80px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4B5563', marginBottom: '12px', textAlign: 'center' }}>04</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700, color: '#F3F4F6', textAlign: 'center', textTransform: 'uppercase', marginBottom: '48px' }}>
          THE MARKET IS PAYING FOR THIS
        </h2>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '64px' }}>
          {[
            { amount: "$86M", company: "OpenAI -> Promptfoo", date: "March 2026" },
            { amount: "$180M", company: "SentinelOne -> Prompt Security", date: "2025" },
            { amount: "$213M", company: "Cisco -> Robust Intelligence", date: "2024" }
          ].map((c, i) => (
            <div key={i} style={{
              flex: 1, border: '1px solid #1F2937', padding: '32px 24px', textAlign: 'center', transition: 'border-color 0.3s'
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#374151'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#1F2937'}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', color: '#22C55E', fontWeight: 700 }}>{c.amount}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginTop: '12px' }}>{c.company}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#374151', marginTop: '8px' }}>{c.date}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>We built the open, plug-and-play version.</p>
          <button style={{
            background: '#22C55E', border: 'none', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
            padding: '14px 32px', cursor: 'pointer', letterSpacing: '0.06em', transition: 'box-shadow 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(34,197,94,0.2)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => navigate('/loading')}
          >/S/ ENTER SENTINEL</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #111', padding: '24px 80px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#1F2937' }}>2026 SENTINEL -- AgneisX</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#1F2937' }}>BUILT FOR HACKATHON</span>
      </footer>

    </div>
    </motion.div>
  );
}
