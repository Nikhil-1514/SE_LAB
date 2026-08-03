import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import MapPlaceholder from '../components/MapPlaceholder';
import AnalyticsCharts from '../components/AnalyticsCharts';
import TestConsole from '../components/TestConsole';
import { 
  Activity, 
  Map, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Clock, 
  FileSpreadsheet, 
  ShieldAlert, 
  Navigation,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';

export default function HospitalDashboard({ activeTab }) {
  const { 
    emergencies, 
    blockages, 
    dispatchAmbulance, 
    updateTripStatus,
    addToast 
  } = useContext(AppContext);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [priority, setPriority] = useState('High');
  const [ambulanceId, setAmbulanceId] = useState('AMB-03');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('City General Hospital');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Metrics
  const activeTrips = emergencies.filter(e => e.status !== 'Completed' && e.status !== 'Cancelled');
  const completedTrips = emergencies.filter(e => e.status === 'Completed');
  const activeBlocksCount = blockages.filter(b => b.status === 'Verified' || b.status === 'Pending Verification').length;

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !pickupLocation || !condition) {
      addToast('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }
    
    dispatchAmbulance({
      patientName,
      age,
      condition,
      priority,
      ambulanceId,
      pickupLocation,
      destination
    });

    // Reset Form
    setPatientName('');
    setAge('');
    setCondition('');
    setPickupLocation('');
    
    addToast('Ambulance Dispatched', 'Emergency task successfully allocated.', 'success');
  };

  const handleCancelTrip = (tripId) => {
    if (confirm("Are you sure you want to abort this emergency route dispatch?")) {
      updateTripStatus(tripId, 'Cancelled', 'Cancelled by hospital control.');
      addToast('Trip Cancelled', `Trip ${tripId} has been closed.`, 'info');
    }
  };

  // Filter and Search Emergencies
  const filteredEmergencies = emergencies.filter(e => {
    const matchesSearch = e.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' ? true : e.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="page-body animate-fade">
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Hospital Control Command</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Real-time ambulance corridor dispatch, rerouting, and traffic response metrics.
          </p>
        </div>
      </div>

      {/* Main workspace switching */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="card">
              <div className="card-title">
                <span>Active Emergencies</span>
                <Activity size={18} color="var(--primary)" />
              </div>
              <div className="card-value">{activeTrips.length}</div>
              <div className="card-subtext">Route guidance active</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Route Congestions / Blocks</span>
                <AlertTriangle size={18} color="var(--danger)" />
              </div>
              <div className="card-value">{activeBlocksCount}</div>
              <div className="card-subtext">Requiring police clearance</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Avg Response Time</span>
                <Clock size={18} color="var(--warning)" />
              </div>
              <div className="card-value">11.4m</div>
              <div className="card-subtext">-2.4m improvement today</div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Completed Trips (Today)</span>
                <CheckCircle size={18} color="var(--success)" />
              </div>
              <div className="card-value">{completedTrips.length}</div>
              <div className="card-subtext">Safely handed to ER</div>
            </div>
          </div>

          <div className="dashboard-layout">
            
            {/* Left Area: Live tracking & dispatch */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Map panel */}
              <div className="card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Map size={18} color="var(--primary)" /> Live Emergency Corridor Tracking
                </h3>
                <MapPlaceholder trip={selectedTrip || activeTrips[0]} activeBlockages={blockages} height="350px" />
              </div>

              {/* Active Emergency list */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>Active Corridors</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Search patient..." 
                      className="form-control" 
                      style={{ width: '180px', padding: '0.375rem 0.75rem', fontSize: '0.75rem' }} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select 
                      className="form-control" 
                      style={{ width: '110px', padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="All">All Priorities</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Trip ID</th>
                        <th>Patient Name</th>
                        <th>Condition</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>ETA / Dist</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmergencies.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            No active emergency routes matching filters.
                          </td>
                        </tr>
                      ) : (
                        filteredEmergencies.map((e) => (
                          <tr key={e.id} style={{ cursor: 'pointer', backgroundColor: selectedTrip?.id === e.id ? 'var(--primary-light)' : 'white' }} onClick={() => setSelectedTrip(e)}>
                            <td><strong>{e.id}</strong></td>
                            <td>{e.patientName} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({e.age})</span></td>
                            <td>{e.condition}</td>
                            <td>
                              <span className={`badge badge-${e.priority.toLowerCase()}`}>
                                {e.priority}
                              </span>
                            </td>
                            <td>
                              <span className={`badge badge-status ${e.status.toLowerCase().replace(' ', '-')}`}>
                                {e.status}
                              </span>
                            </td>
                            <td>{e.status === 'Completed' ? 'Arrived' : `${e.eta} min (${e.distanceRemaining} km)`}</td>
                            <td>
                              {e.status !== 'Completed' && e.status !== 'Cancelled' && (
                                <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }} onClick={(ev) => { ev.stopPropagation(); handleCancelTrip(e.id); }}>
                                  Abort
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Simulation Verification suite */}
              <TestConsole />

            </div>

            {/* Right Area: Blockages panel & Quick Dispatch Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Emergency Dispatch Form */}
              <div className="card">
                <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} color="var(--primary)" /> Quick Dispatch Unit
                </h3>
                <form onSubmit={handleDispatchSubmit}>
                  <div className="form-group">
                    <label className="form-label">Patient Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Michael Scott" 
                      required 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }} className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Age" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ambulance Unit</label>
                      <select className="form-control" value={ambulanceId} onChange={(e) => setAmbulanceId(e.target.value)}>
                        <option value="AMB-03">AMB-03 (Avail)</option>
                        <option value="AMB-05">AMB-05 (Completed)</option>
                        <option value="AMB-12">AMB-12 (Busy)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Condition Context</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Cardiological Arrest" 
                      required
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pickup Incident Address</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. 505 Scranton Industrial Parkway" 
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }} className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Corridor Severity</label>
                      <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Destination Facility</label>
                      <input type="text" className="form-control" readOnly value={destination} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <Plus size={16} /> Deploy Emergency Unit
                  </button>
                </form>
              </div>

              {/* Blockages Feed */}
              <div className="card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={18} color="var(--danger)" /> Active Blockage Alerts
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {blockages.filter(b => b.status !== 'Cleared' && b.status !== 'Rejected').length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      All route corridors running green.
                    </div>
                  ) : (
                    blockages.filter(b => b.status !== 'Cleared' && b.status !== 'Rejected').map((b) => (
                      <div 
                        key={b.id} 
                        style={{
                          border: '1px solid var(--border)',
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: b.severity === 'Critical' ? 'var(--danger-light)' : 'var(--warning-light)',
                          fontSize: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                          <span>{b.type} ({b.id})</span>
                          <span style={{ color: b.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)' }}>{b.severity}</span>
                        </div>
                        <div style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}><strong>Location:</strong> {b.location}</div>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{b.description}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Reported: {b.timestamp}</span>
                          <span className={`badge`} style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>{b.status}</span>
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

      {/* Other Tabs */}
      {activeTab === 'dispatch' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Deploy Corridor Unit</h3>
            {/* Render form here same as above */}
            <form onSubmit={handleDispatchSubmit}>
              <div className="form-group">
                <label className="form-label">Patient Name</label>
                <input type="text" className="form-control" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Condition</label>
                <input type="text" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Pickup Location</label>
                <input type="text" className="form-control" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Deploy</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'route-monitoring' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Emergency Route Monitor Map</h3>
          <MapPlaceholder trip={selectedTrip || activeTrips[0]} activeBlockages={blockages} height="500px" />
        </div>
      )}

      {activeTab === 'blockage-reports' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Active and History Blockage Log</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Blockage ID</th>
                  <th>Trip ID</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Reported By</th>
                </tr>
              </thead>
              <tbody>
                {blockages.map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.emergencyId}</td>
                    <td>{b.type}</td>
                    <td>{b.location}</td>
                    <td><span className={`badge badge-${b.severity.toLowerCase()}`}>{b.severity}</span></td>
                    <td>{b.status}</td>
                    <td>{b.reportedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <AnalyticsCharts />
      )}

      {activeTab === 'settings' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Hospital Corridor Configurations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Preferred Response ETA Limit (Minutes)</label>
              <input type="number" className="form-control" defaultValue={15} style={{ width: '120px' }} />
            </div>
            <div>
              <label className="form-label">Simulated Signal Auto-Override Corridor Duration (Seconds)</label>
              <input type="number" className="form-control" defaultValue={45} style={{ width: '120px' }} />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => addToast('Config Saved', 'System configurations updated.', 'success')}>
              Save System Settings
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
