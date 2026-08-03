import React from 'react';
import { Activity, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AnalyticsCharts() {
  // Mock data for weekly request volumes
  const requestHistory = [
    { day: 'Mon', count: 18 },
    { day: 'Tue', count: 24 },
    { day: 'Wed', count: 32 },
    { day: 'Thu', count: 21 },
    { day: 'Fri', count: 29 },
    { day: 'Sat', count: 15 },
    { day: 'Sun', count: 12 }
  ];

  // Blockages by severity
  const severityBreakdown = [
    { name: 'Critical', count: 4, color: 'var(--danger)' },
    { name: 'High', count: 12, color: 'var(--warning)' },
    { name: 'Medium', count: 18, color: '#f59e0b' },
    { name: 'Low', count: 8, color: 'var(--primary)' }
  ];

  const maxVal = Math.max(...requestHistory.map(r => r.count));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Overview Analytics Bar Charts */}
      <div className="card">
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="var(--primary)" /> Emergency Request Volume (Past 7 Days)
        </h4>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '160px',
          paddingTop: '1rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '0.5rem'
        }}>
          {requestHistory.map((item, idx) => {
            const barHeight = (item.count / maxVal) * 100;
            return (
              <div 
                key={idx} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexGrow: 1,
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.count}</span>
                <div 
                  style={{
                    width: '32px',
                    height: `${barHeight}px`,
                    backgroundColor: 'var(--primary-light)',
                    border: '1px solid var(--primary)',
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                    transition: 'height 0.8s ease',
                    position: 'relative'
                  }}
                  className="chart-bar"
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--primary)',
                    opacity: 0.15,
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0'
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blockages & Clearances breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-2">
        <div className="card">
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} color="var(--danger)" /> Blockages by Severity
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {severityBreakdown.map((item, idx) => {
              const percentage = (item.count / 42) * 100; // Mock total 42 blockages
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.count} ({Math.round(percentage)}%)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percentage}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--success)" /> Response Time Metrics
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--primary-light)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--primary)'
              }}>
                <Clock size={20} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg dispatch to en route</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>1.8 minutes</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--success-light)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--success)'
              }}>
                <CheckCircle2 size={20} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg route clearance duration</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>4.2 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
