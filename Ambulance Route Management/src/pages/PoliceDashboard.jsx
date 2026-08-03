import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import MapPlaceholder from '../components/MapPlaceholder';
import { 
  ShieldAlert, 
  Map, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Radio, 
  MessageSquare,
  Activity,
  User,
  Filter
} from 'lucide-react';

export default function PoliceDashboard({ activeTab }) {
  const { 
    emergencies, 
    blockages, 
    policeAction, 
    addToast 
  } = useContext(AppContext);

  const [selectedBlockage, setSelectedBlockage] = useState(null);
  const [officerNotes, setOfficerNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Stats
  const activeEmergencies = emergencies.filter(e => e.status !== 'Completed' && e.status !== 'Cancelled');
  const activeBlocks = blockages.filter(b => b.status === 'Pending Verification' || b.status === 'Verified');
  const pendingClearance = blockages.filter(b => b.status === 'Pending Verification');
  
  const handleVerify = (blockId) => {
    policeAction(blockId, 'verify', officerNotes || 'Patrol unit confirmed blockage.');
    setOfficerNotes('');
    addToast('Blockage Verified', 'Blockage confirmed. Dispatching control officers.', 'warning');
  };

  const handleReject = (blockId) => {
    policeAction(blockId, 'reject', officerNotes || 'Report rejected. Obstruction cleared.');
    setOfficerNotes('');
    addToast('Blockage Dismissed', 'Blockage dismissed. Route marked green.', 'info');
  };

  const handleClear = (blockId) => {
    policeAction(blockId, 'clear', officerNotes || 'Corridor clearance complete. Green wave traffic light sync triggered.');
    setOfficerNotes('');
    addToast('Corridor Cleared', 'Ambulance green wave corridor is active.', 'success');
  };

  // Filter blockages list
  const filteredBlocks = blockages.filter(b => {
    if (filterStatus === 'All') return true;
    return b.status === filterStatus;
  });

  return (
    <div className="page-body animate-fade">
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Traffic Priority Clearance Desk</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Monitor emergency routing requests and clear blockages along emergency corridors.
        </p>
      </div>

      {activeTab === 'police-overview' && (
        <>
          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="card">
              <div className="card-title">
                <span>Active Transits</span>
                <Activity size={18} color="var(--primary)" />
              </div>
              <div className="card-value">{activeEmergencies.length}</div>
              <div className="card-subtext">Ambulances en-route</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Active Obstructions</span>
                <AlertTriangle size={18} color="var(--danger)" />
              </div>
              <div className="card-value">{activeBlocks.length}</div>
              <div className="card-subtext">Verified & pending</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Pending Clearance</span>
                <Radio size={18} color="var(--warning)" />
              </div>
              <div className="card-value">{pendingClearance.length}</div>
              <div className="card-subtext">Urgent dispatch response</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Cleared Corridor (Today)</span>
                <CheckCircle size={18} color="var(--success)" />
              </div>
              <div className="card-value">
                {blockages.filter(b => b.status === 'Cleared').length}
              </div>
              <div className="card-subtext">Safety goals met</div>
            </div>
          </div>

          <div className="dashboard-layout">
            
            {/* Left Column: Corridor Map & Verification form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Map view */}
              <div className="card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Map size={18} color="var(--primary)" /> Control Grid Map
                </h3>
                <MapPlaceholder 
                  trip={activeEmergencies[0]} 
                  activeBlockages={blockages} 
                  height="340px" 
                />
              </div>

              {/* Clearance verification console */}
              {selectedBlockage ? (
                <div className="card animate-fade" style={{ borderLeft: '5px solid var(--warning)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span className={`badge badge-${selectedBlockage.severity.toLowerCase()}`} style={{ marginBottom: '0.5rem' }}>
                        {selectedBlockage.severity} Priority
                      </span>
                      <h3>Obstruction: {selectedBlockage.id}</h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        Location: <strong>{selectedBlockage.location}</strong>
                      </p>
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setSelectedBlockage(null)}>
                      Close Panel
                    </button>
                  </div>

                  <div style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Reporter / Vehicle:</div>
                    <strong>{selectedBlockage.reportedBy}</strong>
                    <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Observation:</div>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-main)' }}>"{selectedBlockage.description}"</p>
                  </div>

                  {/* Action input note */}
                  <div className="form-group">
                    <label className="form-label">Response Actions / Patrol Dispatch Notes</label>
                    <div style={{ position: 'relative' }}>
                      <MessageSquare style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={16} />
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Unit 4 dispatched to clear lanes. Traffic light set to priority green." 
                        style={{ paddingLeft: '2.25rem' }}
                        value={officerNotes}
                        onChange={(e) => setOfficerNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {selectedBlockage.status === 'Pending Verification' && (
                      <>
                        <button className="btn btn-warning" onClick={() => handleVerify(selectedBlockage.id)}>
                          Verify Blockage
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleReject(selectedBlockage.id)}>
                          <XCircle size={16} /> Reject False Alarm
                        </button>
                      </>
                    )}
                    {selectedBlockage.status === 'Verified' && (
                      <button className="btn btn-success" onClick={() => handleClear(selectedBlockage.id)}>
                        <CheckCircle size={16} /> Mark Corridor Cleared
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                  <ShieldAlert size={24} color="var(--primary)" />
                  <div>
                    <h4 style={{ margin: 0 }}>Incident Review Suite</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                      Select a reported blockage from the active log queue to execute clearing or verification actions.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Pending logs lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Emergency clearance log queue */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3>Obstruction Incidents</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Filter size={14} color="var(--text-muted)" />
                    <select 
                      className="form-control" 
                      style={{ width: '120px', padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="All">All statuses</option>
                      <option value="Pending Verification">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Cleared">Cleared</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredBlocks.length === 0 ? (
                    <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      No blockages found in current filter.
                    </div>
                  ) : (
                    filteredBlocks.map((b) => (
                      <div 
                        key={b.id} 
                        style={{
                          border: '1px solid var(--border)',
                          padding: '0.875rem',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          backgroundColor: selectedBlockage?.id === b.id ? 'var(--primary-light)' : 'transparent',
                          transition: 'var(--transition-fast)'
                        }}
                        onClick={() => setSelectedBlockage(b)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                          <span>{b.type} ({b.id})</span>
                          <span className={`badge badge-${b.severity.toLowerCase()}`}>{b.severity}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          📍 {b.location}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Received: {b.timestamp}</span>
                          <span className="badge" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>{b.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

      {activeTab === 'clearance-requests' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Active Route Clearance Queue</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ambulance ID</th>
                  <th>Patient Target</th>
                  <th>Pickup Address</th>
                  <th>ETA</th>
                  <th>Priority</th>
                  <th>Route Corridor Status</th>
                </tr>
              </thead>
              <tbody>
                {emergencies.filter(e => e.status !== 'Completed').map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.ambulanceId}</strong></td>
                    <td>{e.patientName}</td>
                    <td>{e.pickupLocation}</td>
                    <td>{e.eta} mins</td>
                    <td><span className={`badge badge-${e.priority.toLowerCase()}`}>{e.priority}</span></td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'active-blockages' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Blockages Log Database</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Trip Context</th>
                  <th>Block Type</th>
                  <th>Street Address</th>
                  <th>Severity</th>
                  <th>Review Status</th>
                  <th>Action Logs</th>
                </tr>
              </thead>
              <tbody>
                {blockages.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.emergencyId}</td>
                    <td>{b.type}</td>
                    <td>{b.location}</td>
                    <td><span className={`badge badge-${b.severity.toLowerCase()}`}>{b.severity}</span></td>
                    <td>{b.status}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                        onClick={() => { setSelectedBlockage(b); setActiveTab('police-overview'); }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'police-profile' && (
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} /> Police Officer configurations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Officer Officer Name</label>
              <input type="text" className="form-control" readOnly value="Patrol Officer POL-209" />
            </div>
            <div>
              <label className="form-label">Assigned Control Sector</label>
              <input type="text" className="form-control" readOnly value="Metro Traffic Sector 4" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
