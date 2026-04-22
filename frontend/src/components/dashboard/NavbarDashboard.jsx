import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function NavbarDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get(`${API}/health`, { timeout: 3000 });
        setIsOnline(res.data.status === 'ok');
      } catch {
        setIsOnline(false);
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav style={{
      height: '52px',
      background: 'rgba(255,255,255,0.01)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            background: 'none', border: 'none', color: '#333', cursor: 'pointer',
            fontSize: '16px', padding: 0, display: 'flex', alignItems: 'center',
            transition: 'color 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#C8FF00'}
          onMouseOut={e => e.currentTarget.style.color = '#333'}
        >
          ←
        </button>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '14px', color: '#F0F0F0',
          letterSpacing: '0.2em', fontWeight: 600
        }}>
          SENTINEL
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#222',
          background: 'rgba(200,255,0,0.05)', padding: '3px 8px', borderRadius: '4px',
          border: '1px solid rgba(200,255,0,0.08)'
        }}>
          v1.0
        </div>
      </div>

      <div style={{ width: '360px', overflow: 'hidden' }}>
        <style>
          {`
            @keyframes marqueeScroll {
              from { transform: translateX(100%); }
              to   { transform: translateX(-100%); }
            }
          `}
        </style>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', whiteSpace: 'nowrap',
          animation: 'marqueeScroll 30s linear infinite', letterSpacing: '0.1em'
        }}>
          SENTINEL ACTIVE /// L1: ONLINE /// L2: STANDBY /// MONITORING ENABLED ///
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <style>
          {`
            @keyframes pulseDot {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `}
        </style>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: isOnline ? '#C8FF00' : '#FF2222',
          animation: isOnline ? 'pulseDot 1.5s ease-in-out infinite' : 'none',
          boxShadow: isOnline ? '0 0 8px rgba(200,255,0,0.3)' : 'none'
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: isOnline ? '#555' : '#FF2222'
        }}>
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </div>
      </div>
    </nav>
  );
}
