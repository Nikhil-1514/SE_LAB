import React, { useContext, useState, useEffect } from 'react';
import { AppProvider, AppContext } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HospitalDashboard from './pages/HospitalDashboard';
import DriverDashboard from './pages/DriverDashboard';
import PoliceDashboard from './pages/PoliceDashboard';
import { X, ShieldAlert } from 'lucide-react';

function DashboardRouter() {
  const { currentUser, toasts } = useContext(AppContext);
  
  // Custom router state
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('overview');

  // Automatically switch active tab when switching roles
  useEffect(() => {
    if (currentUser.role === 'Hospital') {
      setCurrentPage('hospital');
      setActiveTab('overview');
    } else if (currentUser.role === 'Driver') {
      setCurrentPage('driver');
      setActiveTab('driver-overview');
    } else if (currentUser.role === 'Police') {
      setCurrentPage('police');
      setActiveTab('police-overview');
    } else {
      setCurrentPage('landing');
      setActiveTab('overview');
    }
  }, [currentUser.role]);

  // Page Routing Switch
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      
      // Dashboards
      case 'hospital':
        if (currentUser.role !== 'Hospital') return <UnauthorizedPage onNavigate={setCurrentPage} />;
        return <HospitalDashboard activeTab={activeTab} />;
      case 'driver':
        if (currentUser.role !== 'Driver') return <UnauthorizedPage onNavigate={setCurrentPage} />;
        return <DriverDashboard activeTab={activeTab} />;
      case 'police':
        if (currentUser.role !== 'Police') return <UnauthorizedPage onNavigate={setCurrentPage} />;
        return <PoliceDashboard activeTab={activeTab} />;
      
      default:
        return <NotFoundPage onNavigate={setCurrentPage} />;
    }
  };

  // Check if we should render navigation layout wrappers
  const useDashboardLayout = ['hospital', 'driver', 'police'].includes(currentPage);

  return (
    <div className="app-container">
      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <div className="toast-content">
              <div className="toast-title">{t.title}</div>
              <div className="toast-message">{t.message}</div>
            </div>
          </div>
        ))}
      </div>

      {useDashboardLayout ? (
        <>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={setCurrentPage} />
          <div className="main-content">
            <Navbar activeTab={activeTab} onNavigate={setCurrentPage} />
            {renderPage()}
          </div>
        </>
      ) : (
        <div style={{ width: '100%' }}>{renderPage()}</div>
      )}
    </div>
  );
}

// Fallback Pages
function UnauthorizedPage({ onNavigate }) {
  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <ShieldAlert size={64} color="var(--danger)" style={{ marginBottom: '1.5rem' }} />
      <h2 style={{ marginBottom: '0.5rem' }}>403 - Workspace Access Denied</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        You do not possess the authorized security tokens to access this corridor console.
      </p>
      <button className="btn btn-primary" onClick={() => onNavigate('login')}>
        Go to Portal Sign In
      </button>
    </div>
  );
}

function NotFoundPage({ onNavigate }) {
  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <ShieldAlert size={64} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
      <h2 style={{ marginBottom: '0.5rem' }}>404 - Grid Node Offline</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        The route coordinate or layout page you requested does not exist on this network.
      </p>
      <button className="btn btn-primary" onClick={() => onNavigate('landing')}>
        Return to Landing Home
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardRouter />
    </AppProvider>
  );
}
