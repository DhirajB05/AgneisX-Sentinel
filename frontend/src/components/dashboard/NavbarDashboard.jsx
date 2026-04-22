import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
      height: '48px',
      background: '#080808',
      borderBottom: '1px solid #1a1a1a',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gridColumn: '1 / -1'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            background: 'none', border: 'none', color: '#444', cursor: 'pointer',
            fontSize: '18px', padding: 0, display: 'flex', alignItems: 'center'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#C8FF00'}
          onMouseOut={e => e.currentTarget.style.color = '#444'}
        >
          ←
        </button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#C8FF00', letterSpacing: '0.2em', marginLeft: '12px' }}>
          ⚡ SENTINEL
        </div>
      </div>

      <div style={{ width: '400px', overflow: 'hidden' }}>
        <style>
          {`
            @keyframes marqueeScroll {
              from { transform: translateX(100%); }
              to   { transform: translateX(-100%); }
            }
          `}
        </style>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2a2a2a', whiteSpace: 'nowrap',
          animation: 'marqueeScroll 30s linear infinite'
        }}>
          SENTINEL ACTIVE /// L1: ONLINE /// L2: STANDBY /// MONITORING ENABLED ///
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
          animation: isOnline ? 'pulseDot 1.5s ease-in-out infinite' : 'none'
        }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isOnline ? '#444' : '#FF2222' }}>
          {isOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
        </div>
      </div>
    </nav>
  );
}
