import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarDashboard from '../components/dashboard/NavbarDashboard';
import DemoBanner from '../components/dashboard/DemoBanner';
import MetricCards from '../components/dashboard/MetricCards';
import GlobeBackground from '../components/dashboard/GlobeBackground';
import ScanInput from '../components/dashboard/ScanInput';
import DemoPayloadButtons from '../components/dashboard/DemoPayloadButtons';
import LayerAnimation from '../components/dashboard/LayerAnimation';
import ResultCard from '../components/dashboard/ResultCard';
import ForensicReport from '../components/dashboard/ForensicReport';
import AttackFeed from '../components/dashboard/AttackFeed';
import PreviousReports from '../components/dashboard/PreviousReports';

import { useScanner } from '../hooks/useScanner';
import { useAttackLog } from '../hooks/useAttackLog';
import { useReports } from '../hooks/useReports';

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const { scan, result, loading, loadingStage, error } = useScanner();
  const { log, totalScanned, totalThreats, blockRate, avgLatency } = useAttackLog();
  const { reports, loading: reportsLoading, refetch } = useReports();

  const handleSelectPayload = (text) => {
    setInputText(text);
  };

  const handleSubmit = async (text) => {
    await scan(text);
    setTimeout(refetch, 1000); // trigger report refetch after scan finishes
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
    <div className="dashboard-layout">
      <style>
        {`
          .dashboard-layout {
            display: grid;
            grid-template-rows: 48px 60px 1fr 220px;
            grid-template-columns: 280px 1fr 320px;
            height: 100vh;
            overflow: hidden;
            background: #080808;
          }
        `}
      </style>

      {/* Row 1 */}
      <NavbarDashboard />

      {/* Row 2 */}
      <DemoBanner demoMode={demoMode} setDemoMode={setDemoMode} />

      {/* Row 3, Col 1 */}
      <div style={{ gridRow: '3', gridColumn: '1', borderRight: '1px solid #111' }}>
        <MetricCards 
          totalScanned={totalScanned} 
          totalThreats={totalThreats} 
          blockRate={blockRate} 
          avgLatency={avgLatency} 
        />
      </div>

      {/* Row 3, Col 2 */}
      <div style={{ gridRow: '3', gridColumn: '2', position: 'relative', padding: '32px 48px', overflowY: 'auto', borderRight: '1px solid #111' }}>
        <GlobeBackground />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <DemoPayloadButtons demoMode={demoMode} onSelectPayload={handleSelectPayload} />
          <ScanInput 
            inputText={inputText} 
            setInputText={setInputText} 
            onSubmit={handleSubmit} 
            loading={loading} 
            loadingStage={loadingStage} 
            error={error} 
          />
          <LayerAnimation stage={loadingStage} verdict={result?.verdict || null} />
        </div>
      </div>

      {/* Row 3, Col 3 */}
      <div style={{ gridRow: '3', gridColumn: '3', padding: '24px', overflowY: 'auto' }}>
        <ResultCard result={result} />
        <ForensicReport report={result?.claude_report} triggered={result?.layer2_triggered} />
      </div>

      {/* Row 4, Col 1-2 */}
      <div style={{ gridRow: '4', gridColumn: '1 / 3' }}>
        <AttackFeed log={log} />
      </div>

      {/* Row 4, Col 3 */}
      <div style={{ gridRow: '4', gridColumn: '3' }}>
        <PreviousReports reports={reports} loading={reportsLoading} />
      </div>

    </div>
    </motion.div>
  );
}
