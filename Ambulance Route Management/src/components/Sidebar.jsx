import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { 
  Activity, 
  Map, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Compass, 
  Send, 
  ShieldAlert, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Radio, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onNavigate }) {
  const { currentUser, logout } = useContext(AppContext);

  const handleLogoutClick = () => {
    logout();
    onNavigate('landing');
  };

  const getMenuItems = () => {
    switch (currentUser.role) {
      case 'Hospital':
        return [
          { id: 'overview', label: 'Dashboard Overview', icon: <Activity size={18} /> },
          { id: 'dispatch', label: 'Dispatch Center', icon: <Send size={18} /> },
          { id: 'route-monitoring', label: 'Route Monitoring', icon: <Map size={18} /> },
          { id: 'blockage-reports', label: 'Blockage Reports', icon: <ShieldAlert size={18} /> },
          { id: 'reports', label: 'Performance Analytics', icon: <TrendingUp size={18} /> },
          { id: 'settings', label: 'System Settings', icon: <Settings size={18} /> }
        ];
      case 'Driver':
        return [
          { id: 'driver-overview', label: 'Driver Dashboard', icon: <Compass size={18} /> },
          { id: 'report-blockage', label: 'Report Blockage', icon: <AlertTriangle size={18} /> },
          { id: 'trip-history', label: 'Trip History', icon: <Clock size={18} /> },
          { id: 'driver-profile', label: 'My Profile', icon: <Settings size={18} /> }
        ];
      case 'Police':
        return [
          { id: 'police-overview', label: 'Clearance Central', icon: <Radio size={18} /> },
          { id: 'clearance-requests', label: 'Route Requests', icon: <FileText size={18} /> },
          { id: 'active-blockages', label: 'Verify Blockages', icon: <ShieldAlert size={18} /> },
          { id: 'police-profile', label: 'Officer settings', icon: <Settings size={18} /> }
        ];
      default:
        return [
          { id: 'landing', label: 'Landing Home', icon: <BookOpen size={18} /> }
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity size={24} />
        <span>SECURE-ROUTE</span>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: 'auto' }}>
        <button
          onClick={handleLogoutClick}
          className="sidebar-item"
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            color: 'var(--danger)'
          }}
        >
          <LogOut size={18} />
          <span>Exit Workspace</span>
        </button>
      </div>
    </aside>
  );
}
