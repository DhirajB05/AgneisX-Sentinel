import React from 'react';

export default function PreviousReports({ reports, loading }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid var(--border)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--text-1)', fontWeight: 500 }}>Notifications</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>LIVE</div>
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1, padding: '12px 16px' }}>
        {loading ? (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textAlign: 'center', marginTop: '20px' }}>Loading...</div>
        ) : reports.length === 0 ? (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textAlign: 'center', marginTop: '20px' }}>No reports yet</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reports.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  background: r.verdict === 'THREAT' ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-dim)', 
                  border: `1px solid ${r.verdict === 'THREAT' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: r.verdict === 'THREAT' ? 'var(--threat)' : 'var(--accent)'
                }}>
                  !
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-1)', lineHeight: 1.4 }}>
                    {r.verdict === 'THREAT' ? `Blocked ${r.attack_type || 'Attack'}` : 'Safe interaction processed'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-3)', marginTop: '2px' }}>
                    {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
