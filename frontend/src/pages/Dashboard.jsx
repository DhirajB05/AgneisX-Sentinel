import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarDashboard from '../components/dashboard/NavbarDashboard';
import DemoBanner from '../components/dashboard/DemoBanner';
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

export default function Dashboard() {
  const [inputText, setInputText] = useState('');
  const [demoMode, setDemoMode] = useState(true);
  const { scan, result, loading, loadingStage, error } = useScanner();
  const { log, totalScanned, totalThreats, blockRate, avgLatency } = useAttackLog();
  const { reports, loading: reportsLoading, refetch } = useReports();

  const handleScan = async (text) => {
    await scan(text || inputText);
    refetch();
  };

  const handleSelectPayload = (text) => {
    setInputText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
    <div style={{ display: 'flex', height: '100vh', background: '#000', overflow: 'hidden' }}>

      {/* ─── SIDEBAR ─── */}
      <div style={{
        width: '64px',
        background: 'rgba(255,255,255,0.015)',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        gap: '4px',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', marginBottom: '24px'
        }}>
          ⚡
        </div>

        {/* Nav icons */}
        {[
          { icon: '◎', label: 'Dashboard', active: true },
          { icon: '⬡', label: 'Scan', active: false },
          { icon: '◇', label: 'Reports', active: false },
          { icon: '⚙', label: 'Settings', active: false },
        ].map((item, i) => (
          <div key={i} style={{
            width: '40px', height: '40px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', cursor: 'pointer',
            background: item.active ? 'rgba(200,255,0,0.06)' : 'transparent',
            color: item.active ? '#C8FF00' : '#333',
            transition: 'all 0.2s',
            position: 'relative'
          }}
          onMouseOver={e => { if (!item.active) e.currentTarget.style.color = '#666'; }}
          onMouseOut={e => { if (!item.active) e.currentTarget.style.color = '#333'; }}
          >
            {item.icon}
            {item.active && (
              <div style={{
                position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)',
                width: '3px', height: '20px', borderRadius: '0 3px 3px 0',
                background: '#C8FF00'
              }} />
            )}
          </div>
        ))}

        {/* Bottom indicator */}
        <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
          <style>
            {`
              @keyframes pulseDotSidebar {
                0%, 100% { opacity: 0.4; box-shadow: none; }
                50% { opacity: 1; box-shadow: 0 0 8px rgba(200,255,0,0.4); }
              }
            `}
          </style>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#C8FF00',
            animation: 'pulseDotSidebar 2s ease-in-out infinite'
          }} />
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top Bar */}
        <NavbarDashboard />
        <DemoBanner demoMode={demoMode} setDemoMode={setDemoMode} />

        {/* Metrics Row */}
        <MetricCards totalScanned={totalScanned} totalThreats={totalThreats} blockRate={blockRate} avgLatency={avgLatency} />

        {/* Main Grid */}
        <div style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '12px',
          padding: '0 16px 12px 16px',
          overflow: 'hidden'
        }}>

          {/* Left: Scan + Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'auto', position: 'relative' }}>
            <GlobeBackground />

            {/* Scan Area */}
            <div className="glass-card" style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
              <DemoPayloadButtons demoMode={demoMode} onSelectPayload={handleSelectPayload} />
              <ScanInput
                inputText={inputText}
                setInputText={setInputText}
                onSubmit={handleScan}
                loading={loading}
                loadingStage={loadingStage}
                error={error}
              />
              <LayerAnimation stage={loadingStage} verdict={result?.verdict} />
            </div>

            {/* Result + Forensic */}
            <ResultCard result={result} />
            <ForensicReport result={result} />

            {/* Attack Feed */}
            <div className="glass-card" style={{ minHeight: '160px', overflow: 'hidden' }}>
              <AttackFeed log={log} />
            </div>
          </div>

          {/* Right: Reports Sidebar */}
          <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <PreviousReports reports={reports} loading={reportsLoading} />
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
