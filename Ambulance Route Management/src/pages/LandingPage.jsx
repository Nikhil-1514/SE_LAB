import React from 'react';
import { Activity, Shield, Truck, Compass, CheckCircle2, ChevronRight, User } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const roles = [
    {
      title: 'Hospital Control Center',
      desc: 'Dispatch emergency ambulances, select priority levels, monitor live routes, and coordinate care with ER staff.',
      icon: <Activity size={32} color="var(--primary)" />,
      roleName: 'Hospital'
    },
    {
      title: 'Ambulance Driver',
      desc: 'Mobile navigation console showing real-time routes, GPS tracking, and instant road blockage reporting alerts.',
      icon: <Truck size={32} color="var(--danger)" />,
      roleName: 'Driver'
    },
    {
      title: 'Traffic Clearance Police',
      desc: 'Verify reported blocks on emergency corridors, clear routes, and prioritize green corridors for fast transport.',
      icon: <Shield size={32} color="var(--success)" />,
      roleName: 'Police'
    }
  ];

  return (
    <div className="animate-fade" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      
      {/* Header Bar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 3rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Activity size={24} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Smart Emergency Corridor Management System</h2>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('login')}>
          Enter Portal <ChevronRight size={16} />
        </button>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '5rem 3rem',
        textAlign: 'center',
        background: 'radial-gradient(circle at top right, var(--primary-light), transparent)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <span style={{
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          fontSize: '0.8125rem',
          fontWeight: 700,
          padding: '0.375rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Citywide Ambulance Priority System
        </span>
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontSize: '3rem',
          fontWeight: 800,
          marginTop: '1.5rem',
          marginBottom: '1rem',
          color: 'var(--text-main)',
          lineHeight: 1.2
        }}>
          Clear Paths. Save Lives.
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          An intelligent emergency routing and blockage clearance dashboard. Connecting hospitals, emergency drivers, and traffic police to establish secure green light corridors in real time.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ padding: '0.875rem 2rem' }} onClick={() => onNavigate('login')}>
            Start Emergency Simulator
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.875rem 2rem' }} onClick={() => {
            const el = document.getElementById('how-it-works');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}>
            See How It Works
          </button>
        </div>
      </section>

      {/* Key Statistics */}
      <section style={{ padding: '3rem 3rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>34%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Response Time Reduction</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--success)' }}>4.2 min</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Avg Corridor Clearance Time</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--danger)' }}>100%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Officer Action Accountability</div>
          </div>
        </div>
      </section>

      {/* System Roles Grid */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>A Three-Tier Interactive Workspace</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {roles.map((role, idx) => (
            <div key={idx} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '320px',
              padding: '2rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {role.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{role.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{role.desc}</p>
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                onClick={() => onNavigate('login')}
              >
                Sign in as {role.roleName}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Workflow */}
      <section id="how-it-works" style={{ padding: '5rem 3rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2rem' }}>Emergency Pipeline Workflow</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyStyle: 'center', fontWeight: 'bold', flexShrink: 0, justifyContent: 'center', padding: '0.25rem' }}>1</div>
              <div>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Hospital Dispatch Center Creates Request</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hospital monitors input details, assigns ambulance unit, priority severity, and begins tracking the medical corridor.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--danger)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyStyle: 'center', fontWeight: 'bold', flexShrink: 0, justifyContent: 'center', padding: '0.25rem' }}>2</div>
              <div>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Driver Reports Road Blockage Incident</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>If the ambulance driver encounters gridlock, roadwork, or crashes, they instantly log a report with type, severity, and photo placeholders.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--success)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyStyle: 'center', fontWeight: 'bold', flexShrink: 0, justifyContent: 'center', padding: '0.25rem' }}>3</div>
              <div>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Traffic Police Clear Route in Real Time</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Local traffic controllers receive warning logs, verify the blockages, redirect flows, and mark the corridor cleared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '3rem',
        textAlign: 'center',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>About System</a>
          <span>•</span>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Technical Stack</a>
          <span>•</span>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
        <p style={{ fontSize: '0.8125rem' }}>© 2026 Smart Emergency Corridor Management System. Capstone Software Engineering Project.</p>
      </footer>
    </div>
  );
}
