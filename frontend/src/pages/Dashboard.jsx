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
import GlobeBackground from '../components/dashboard/GlobeBackground';
import { useScanner } from '../hooks/useScanner';
import { useAttackLog } from '../hooks/useAttackLog';
import { useReports } from '../hooks/useReports';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      try {
        const r = await axios.get(`${API}/health`, { timeout: 3000 });
        setIsOnline(r.data.status === 'ok');
      } catch { setIsOnline(false); }
    };
    check();
    const iv = setInterval(check, 25000);
    return () => clearInterval(iv);
  }, []);

  const handleScan = async (text) => {
    await scan(text || inputText);
    refetch();
  };
  const handleSelectPayload = (text) => setInputText(text);

  const sidebarItems = [
    { icon: '◎', label: 'Dashboard' },
    { icon: '⬡', label: 'Scan' },
    { icon: '◇', label: 'Reports' },
    { icon: '⚙', label: 'Settings' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>

      {/* ═══ SIDEBAR ═══ */}
      <div style={{
        width: '56px', background: '#050505',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '16px', gap: '4px', flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'rgba(200,255,0,0.06)', border: '1px solid rgba(200,255,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', marginBottom: '20px', cursor: 'pointer'
        }} onClick={() => navigate('/')}>⚡</div>

        {sidebarItems.map((item, i) => (
          <div key={i} onClick={() => setSidebarActive(i)} style={{
            width: '36px', height: '36px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', cursor: 'pointer',
            background: sidebarActive === i ? 'rgba(200,255,0,0.06)' : 'transparent',
            color: sidebarActive === i ? '#C8FF00' : '#333',
            transition: 'all 0.15s', position: 'relative'
          }}>
            {item.icon}
            {sidebarActive === i && <div style={{
              position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)',
              width: '2px', height: '18px', borderRadius: '0 2px 2px 0', background: '#C8FF00'
            }} />}
          </div>
        ))}

        <div style={{ marginTop: 'auto', marginBottom: '16px' }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: isOnline ? '#C8FF00' : '#FF2222',
            boxShadow: isOnline ? '0 0 6px rgba(200,255,0,0.4)' : 'none',
            animation: isOnline ? 'pulse 2s ease-in-out infinite' : 'none'
          }} />
        </div>
      </div>

      {/* ═══ MAIN ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top nav bar */}
        <div style={{
          height: '44px', borderBottom: '1px solid rgba(255,255,255,0.04)',
          padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.01)', flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#fff', letterSpacing: '0.12em', fontWeight: 600 }}>SENTINEL</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#333', background: 'rgba(200,255,0,0.04)', padding: '2px 6px', borderRadius: '3px', border: '1px solid rgba(200,255,0,0.08)' }}>v1.0</span>
          </div>
          <div style={{ overflow: 'hidden', width: '280px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a',
              whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite'
            }}>
              SENTINEL ACTIVE /// L1: ONLINE /// L2: STANDBY /// MONITORING ENABLED /// SENTINEL ACTIVE /// L1: ONLINE ///
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Demo toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: demoMode ? '#C8FF00' : '#333' }}>DEMO</span>
              <div onClick={() => setDemoMode(!demoMode)} style={{
                width: '32px', height: '16px', borderRadius: '8px', cursor: 'pointer',
                background: demoMode ? 'rgba(200,255,0,0.15)' : 'rgba(255,255,255,0.04)',
                border: demoMode ? '1px solid rgba(200,255,0,0.25)' : '1px solid rgba(255,255,255,0.06)',
                position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px',
                transition: 'all 0.2s'
              }}>
                <motion.div animate={{ x: demoMode ? 14 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: '12px', height: '12px', borderRadius: '6px',
                    background: demoMode ? '#C8FF00' : '#444',
                    boxShadow: demoMode ? '0 0 6px rgba(200,255,0,0.4)' : 'none'
                  }} />
              </div>
            </div>
            {/* Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: isOnline ? '#C8FF00' : '#FF2222',
                boxShadow: isOnline ? '0 0 6px rgba(200,255,0,0.3)' : 'none'
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: isOnline ? '#555' : '#FF2222' }}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <MetricCards totalScanned={totalScanned} totalThreats={totalThreats} blockRate={blockRate} avgLatency={avgLatency} />

        {/* Main Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px', gap: '10px', padding: '0 12px 12px 12px', overflow: 'hidden' }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto', position: 'relative' }}>
            <GlobeBackground />

            {/* Scan card */}
            <div style={{
              background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '10px', padding: '16px', position: 'relative', zIndex: 1
            }}>
              <DemoPayloadButtons demoMode={demoMode} onSelectPayload={handleSelectPayload} />
              <ScanInput inputText={inputText} setInputText={setInputText} onSubmit={handleScan} loading={loading} loadingStage={loadingStage} error={error} />
              <LayerAnimation stage={loadingStage} verdict={result?.verdict} />
            </div>

            <ResultCard result={result} />
            <ForensicReport result={result} />

            {/* Attack feed */}
            <div style={{
              background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '10px', minHeight: '140px', overflow: 'hidden'
            }}>
              <AttackFeed log={log} />
            </div>
          </div>

          {/* Right — Reports */}
          <div style={{
            background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <PreviousReports reports={reports} loading={reportsLoading} />
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
