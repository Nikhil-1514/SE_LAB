import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import MapPlaceholder from '../components/MapPlaceholder';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Map, 
  Compass, 
  Info,
  Clock,
  ArrowRight,
  Upload,
  User,
  History
} from 'lucide-react';

export default function DriverDashboard({ activeTab }) {
  const { 
    emergencies, 
    blockages, 
    updateTripStatus, 
    reportBlockage, 
    addToast 
  } = useContext(AppContext);

  // Active assignment: First trip that is not completed or cancelled
  const activeAssignment = emergencies.find(
    (e) => e.status !== 'Completed' && e.status !== 'Cancelled'
  );

  // Blockage form state
  const [blockType, setBlockType] = useState('Heavy Traffic');
  const [severity, setSeverity] = useState('High');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleReport = (e) => {
    e.preventDefault();
    if (!activeAssignment) {
      addToast('No Active Trip', 'You must have an active trip to report a blockage.', 'error');
      return;
    }
    if (!location) {
      addToast('Validation Error', 'Location description is required.', 'error');
      return;
    }

    reportBlockage({
      emergencyId: activeAssignment.id,
      type: blockType,
      severity,
      location,
      description,
      gps: '40.7128° N, 74.0060° W'
    });

    setLocation('');
    setDescription('');
    addToast('Incident Transmitted', 'Traffic blockage alert sent to police.', 'warning');
  };

  const handleAccept = () => {
    if (activeAssignment) {
      updateTripStatus(activeAssignment.id, 'Accepted');
      addToast('Trip Accepted', 'Emergency task allocated to driver unit.', 'success');
    }
  };

  const handleStart = () => {
    if (activeAssignment) {
      updateTripStatus(activeAssignment.id, 'En Route');
      addToast('Route Started', 'Emergency corridor tracking is now live.', 'info');
    }
  };

  const handleComplete = () => {
    if (activeAssignment) {
      updateTripStatus(activeAssignment.id, 'Completed');
      addToast('Trip Complete', 'Ambulance successfully arrived at hospital.', 'success');
    }
  };

  return (
    <div className="page-body animate-fade" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>Ambulance Driver Workspace</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Mobile-optimized layout for navigation, incident reports, and dispatch updates.
        </p>
      </div>

      {activeTab === 'driver-overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Assignment Card */}
          {activeAssignment ? (
            <div className="card" style={{ borderLeft: '5px solid var(--danger)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className={`badge badge-${activeAssignment.priority.toLowerCase()}`} style={{ marginBottom: '0.5rem' }}>
                    {activeAssignment.priority} Emergency
                  </span>
                  <h3>Active Mission: {activeAssignment.id}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--danger)' }}>
                    {activeAssignment.status === 'Completed' ? 'Arrived' : `${activeAssignment.eta} mins`}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ETA to Destination</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }} className="grid-2">
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Patient Name:</div>
                  <strong>{activeAssignment.patientName} ({activeAssignment.age})</strong>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Condition:</div>
                  <strong>{activeAssignment.condition}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Pickup Location:</div>
                  <strong>{activeAssignment.pickupLocation}</strong>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Destination:</div>
                  <strong>{activeAssignment.destination}</strong>
                </div>
              </div>

              {/* Status workflow timeline */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-primary)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.75rem'
              }}>
                <div>Current Stage: <span className="badge" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>{activeAssignment.status}</span></div>
                <div>Distance: <strong>{activeAssignment.distanceRemaining} km remaining</strong></div>
              </div>

              {/* Trip Controls */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {activeAssignment.status === 'Requested' && (
                  <button className="btn btn-primary" onClick={handleAccept}>
                    Accept Mission
                  </button>
                )}
                {activeAssignment.status === 'Accepted' && (
                  <button className="btn btn-success" onClick={handleStart}>
                    <Play size={16} /> Start Navigation
                  </button>
                )}
                {(activeAssignment.status === 'En Route' || activeAssignment.status === 'Route Cleared' || activeAssignment.status === 'Blockage Detected' || activeAssignment.status === 'Hospital Reached') && (
                  <button className="btn btn-primary" onClick={handleComplete}>
                    Complete Assignment
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}><Compass size={48} style={{ margin: '0 auto' }} /></div>
              <h3>No Active Dispatches</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.5rem auto 1rem' }}>
                You are currently on standby. Updates will appear immediately once the Hospital Control Center assigns a trip.
              </p>
            </div>
          )}

          {/* Map Simulation */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map size={18} color="var(--primary)" /> Route Navigator
            </h3>
            <MapPlaceholder trip={activeAssignment} activeBlockages={blockages} height="300px" />
          </div>

        </div>
      )}

      {activeTab === 'report-blockage' && (
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color="var(--danger)" /> Report Emergency Corridor Blockage
          </h3>
          
          {!activeAssignment ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              You must have an active en-route trip assignment to report blockages.
            </div>
          ) : (
            <form onSubmit={handleReport}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
                <div className="form-group">
                  <label className="form-label">Blockage Type</label>
                  <select className="form-control" value={blockType} onChange={(e) => setBlockType(e.target.value)}>
                    <option value="Heavy Traffic">Heavy Traffic</option>
                    <option value="Accident">Accident / Collision</option>
                    <option value="Road Closed">Road Closed</option>
                    <option value="Construction">Construction narrowing</option>
                    <option value="Flood">Flooding / Water Hazard</option>
                    <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                    <option value="Other">Other Obstacle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Severity Level</label>
                  <select className="form-control" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="Critical">Critical (Complete Stop)</option>
                    <option value="High">High (Major Delays)</option>
                    <option value="Medium">Medium (Moderate traffic)</option>
                    <option value="Low">Low (Minor block)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Blockage Location (Nearest intersection / landmark)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 5th Avenue and Oak Street intersection" 
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Observation Details</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Describe the situation for Traffic police officers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Photo Simulation */}
              <div className="form-group">
                <label className="form-label">Evidence Image Capture (Simulation)</label>
                <div style={{
                  border: '2px dashed var(--border)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}>
                  <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                  <span style={{ fontSize: '0.75rem' }}>Click to capture photo from dashboard camera</span>
                </div>
              </div>

              <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '1rem' }}>
                <AlertTriangle size={16} /> Transmit Incident Alert
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'trip-history' && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={18} /> Driver Journey Logs
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Patient</th>
                  <th>Destination</th>
                  <th>Priority</th>
                  <th>Final Outcome</th>
                </tr>
              </thead>
              <tbody>
                {emergencies.filter(e => e.status === 'Completed' || e.status === 'Cancelled').map((e) => (
                  <tr key={e.id}>
                    <td><strong>{e.id}</strong></td>
                    <td>{e.patientName}</td>
                    <td>{e.destination}</td>
                    <td><span className={`badge badge-${e.priority.toLowerCase()}`}>{e.priority}</span></td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'driver-profile' && (
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} /> Driver System Identity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Officer Driver Name</label>
              <input type="text" className="form-control" readOnly value="Robert Vance" />
            </div>
            <div>
              <label className="form-label">Allocated Ambulance ID</label>
              <input type="text" className="form-control" readOnly value="AMB-12" />
            </div>
            <div>
              <label className="form-label">Assigned Depot Branch</label>
              <input type="text" className="form-control" readOnly value="District 4 Emergency Center" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
