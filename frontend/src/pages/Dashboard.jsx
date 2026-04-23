import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MetricCards from '../components/dashboard/MetricCards';
import ScanInput from '../components/dashboard/ScanInput';
import LayerAnimation from '../components/dashboard/LayerAnimation';
import ResultCard from '../components/dashboard/ResultCard';
import ForensicReport from '../components/dashboard/ForensicReport';
import AttackFeed from '../components/dashboard/AttackFeed';
import PreviousReports from '../components/dashboard/PreviousReports';
import DemoPayloadButtons from '../components/dashboard/DemoPayloadButtons';
import { useScanner } from '../hooks/useScanner';
import { useAttackLog } from '../hooks/useAttackLog';
import { useReports } from '../hooks/useReports';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlitchBackground from '../components/dashboard/GlitchBackground';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Dashboard() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [demoMode, setDemoMode] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const { scan, result, loading, loadingStage, error } = useScanner();
  const { log, totalScanned, totalThreats, blockRate, avgLatency } = useAttackLog();
  const { reports, loading: reportsLoading, refetch } = useReports();
  const [sidebarActive, setSidebarActive] = useState(0);

  React.useEffect(() => {
    const check = async () => {
      try { const r = await axios.get(`${API}/health`, { timeout: 3000 }); setIsOnline(r.data.status === 'ok'); }
      catch { setIsOnline(false); }
    };
    check(); const iv = setInterval(check, 25000); return () => clearInterval(iv);
  }, []);

  const handleScan = async (text) => { await scan(text || inputText); refetch(); };
  const handleSelectPayload = (text) => setInputText(text);

  const sidebarNav = [
    { section: 'SCANNING', items: [
      { label: 'Overview', active: true },
      { label: 'Scan Input' },
      { label: 'Forensics' },
      { label: 'Attack Feed' },
    ]},
    { section: 'SETTINGS', items: [
      { label: 'Configuration' },
      { label: 'API Keys' },
      { label: 'Documentation' },
    ]},
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div style={{ display: 'flex', height: '100vh', background: 'transparent', overflow: 'hidden', position: 'relative' }}>
      
      {/* GLITCH BACKGROUND */}
      <GlitchBackground 
        glitchColors={["#22C55E", "#C8FF00", "#166534"]} 
        glitchSpeed={80} 
        density={0.08}
        smooth={true}
        centerVignette={true}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.4 }} 
      />

      {/* LEFT SIDEBAR — matches reference: wider with text labels */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '200px', background: 'rgba(4, 8, 4, 0.85)', backdropFilter: 'blur(10px)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '0'
      }}>
        {/* User area */}
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--accent-dim)', border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', fontWeight: 700
          }}>/S/</div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-1)', fontWeight: 500 }}>Sentinel</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)' }}>v1.0 beta</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
            borderRadius: '6px', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)' }}>Q</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-3)' }}>Search...</span>
          </div>
        </div>

        {/* Nav sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {sidebarNav.map((sec, si) => (
            <div key={si} style={{ marginBottom: '8px' }}>
              <div style={{ padding: '8px 16px 4px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>{sec.section}</div>
              {sec.items.map((item, ii) => {
                const isActive = si === 0 && ii === sidebarActive;
                return (
                  <div key={ii} onClick={() => { if (si === 0) setSidebarActive(ii); }}
                    style={{
                      padding: '8px 16px', margin: '1px 8px', borderRadius: '6px', cursor: 'pointer',
                      background: isActive ? 'var(--accent-dim)' : 'transparent',
                      display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.15s'
                    }}
                    onMouseOver={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isActive ? 'var(--accent)' : 'var(--text-2)', fontWeight: isActive ? 500 : 400 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: isOnline ? 'var(--accent)' : 'var(--threat)',
            boxShadow: isOnline ? '0 0 6px var(--accent-glow)' : 'none'
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: isOnline ? 'var(--text-2)' : 'var(--threat)' }}>
            {isOnline ? 'SYSTEM ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0, background: 'rgba(6, 10, 6, 0.4)' }}>

        {/* Top bar — breadcrumbs + controls */}
        <div style={{
          height: '44px', borderBottom: '1px solid var(--border)',
          padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.01)', flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-3)', cursor: 'pointer' }}
              onClick={() => navigate('/')}>Sentinel</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-3)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-1)', fontWeight: 500 }}>Overview</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Demo toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: demoMode ? 'var(--accent)' : 'var(--text-3)' }}>DEMO</span>
              <div onClick={() => setDemoMode(!demoMode)} style={{
                width: '32px', height: '16px', borderRadius: '8px', cursor: 'pointer',
                background: demoMode ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${demoMode ? 'rgba(34,197,94,0.25)' : 'var(--border)'}`,
                position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px', transition: 'all 0.2s'
              }}>
                <motion.div animate={{ x: demoMode ? 14 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: '12px', height: '12px', borderRadius: '6px',
                    background: demoMode ? 'var(--accent)' : '#555',
                    boxShadow: demoMode ? '0 0 6px var(--accent-glow)' : 'none'
                  }} />
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)' }}>Today</span>
          </div>
        </div>

        {/* "Overview" heading */}
        <div style={{ padding: '16px 20px 4px', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, color: 'var(--text-1)' }}>Overview</h1>
        </div>

        {/* Metrics */}
        <MetricCards totalScanned={totalScanned} totalThreats={totalThreats} blockRate={blockRate} avgLatency={avgLatency} />

        {/* Content grid */}
        <div style={{ flex: 1, display: 'flex', gap: '12px', padding: '0 12px 12px', overflow: 'hidden', minHeight: 0 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto', minWidth: 0 }}>
            {/* Scan card */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              borderRadius: '10px', padding: '16px'
            }}>
              <DemoPayloadButtons demoMode={demoMode} onSelectPayload={handleSelectPayload} />
              <ScanInput inputText={inputText} setInputText={setInputText} onSubmit={handleScan} loading={loading} loadingStage={loadingStage} error={error} />
              <LayerAnimation stage={loadingStage} verdict={result?.verdict} />
            </div>
            <ResultCard result={result} />
            <ForensicReport report={result} triggered={result?.layer2_triggered} />
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              borderRadius: '10px', minHeight: '160px', overflow: 'hidden'
            }}>
              <AttackFeed log={log} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR — Notifications + Reports */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '280px', background: 'rgba(4, 8, 4, 0.85)', backdropFilter: 'blur(10px)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden'
      }}>
        <PreviousReports reports={reports} loading={reportsLoading} />
      </div>

    </div>
    </motion.div>
  );
}
