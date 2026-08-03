import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Bell, User, LogOut, Shield, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ activeTab, onNavigate }) {
  const { currentUser, logout, notifications, markNotificationRead, markAllNotificationsRead } = useContext(AppContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleNotifs = notifications.filter(
    (n) => n.role === 'All' || n.role === currentUser.role
  );
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  const handleLogoutClick = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h3>Smart Corridor Hub</h3>
        {currentUser.role !== 'None' && (
          <span className="animate-fade">
            {currentUser.role} Control Panel
          </span>
        )}
      </div>

      <div className="navbar-actions">
        {currentUser.role !== 'None' ? (
          <>
            {/* Notification Center */}
            <div style={{ position: 'relative' }}>
              <button 
                className="navbar-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                title="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && <div className="badge-dot" />}
              </button>

              {showNotifications && (
                <div className="card animate-fade" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '320px',
                  zIndex: 200,
                  marginTop: '0.75rem',
                  padding: '1rem',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Notifications ({unreadCount})</span>
                    {unreadCount > 0 && (
                      <button 
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 500 }}
                        onClick={() => markAllNotificationsRead(currentUser.role)}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  {roleNotifs.length === 0 ? (
                    <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      No notifications for your role.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {roleNotifs.map((n) => (
                        <div 
                          key={n.id} 
                          style={{
                            padding: '0.625rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: n.read ? 'transparent' : 'var(--primary-light)',
                            border: '1px solid var(--border)',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: n.type === 'error' ? 'var(--danger)' : n.type === 'warning' ? 'var(--warning)' : 'var(--text-main)' }}>
                              {n.title}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.timestamp}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem', paddingRight: '1rem' }}>
                            {n.message}
                          </p>
                          {!n.read && (
                            <button
                              onClick={() => markNotificationRead(n.id)}
                              style={{
                                position: 'absolute',
                                right: '4px',
                                bottom: '4px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--success)'
                              }}
                              title="Mark Read"
                            >
                              <Check size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div 
                className="user-profile"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="avatar">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentUser.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {currentUser.id}</span>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>

              {showProfileMenu && (
                <div className="card animate-fade" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '180px',
                  zIndex: 200,
                  marginTop: '0.75rem',
                  padding: '0.5rem'
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Shield size={12} /> Authorized Officer
                    </div>
                  </div>
                  <button 
                    onClick={handleLogoutClick}
                    className="sidebar-item"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem'
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => onNavigate('login')}>
            Officer Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
