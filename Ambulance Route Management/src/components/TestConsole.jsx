import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Play, CheckCircle2, RotateCcw, AlertTriangle, ShieldAlert, BadgeInfo } from 'lucide-react';

export default function TestConsole() {
  const { 
    dispatchAmbulance, 
    updateTripStatus, 
    reportBlockage, 
    policeAction,
    addToast,
    addNotification
  } = useContext(AppContext);

  const [activeScenario, setActiveScenario] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${time}] ${message}`, ...prev]);
  };

  const scenarios = [
    {
      id: 1,
      title: 'Emergency Dispatched',
      desc: 'Hospital dispatches AMB-03 for patient Michael Green.',
      run: () => {
        addLog('Starting Scenario 1...');
        const tripId = dispatchAmbulance({
          patientName: 'Michael Green',
          age: 54,
          condition: 'Severe Chest Pain',
          priority: 'Critical',
          pickupLocation: '404 Walnut Ave',
          destination: 'City General Hospital',
          ambulanceId: 'AMB-03',
          driverName: 'Robert Vance'
        });
        addLog(`Created trip ${tripId} with Critical priority.`);
        addToast('Scenario Success', 'Emergency dispatched successfully!', 'success');
      }
    },
    {
      id: 2,
      title: 'Driver Rejects Assignment',
      desc: 'Simulates a driver rejection due to mechanical warning.',
      run: () => {
        addLog('Starting Scenario 2...');
        const tripId = 'TRIP-401'; // Uses active trip
        addLog(`Driver Elena Rostova receives assignment for TRIP-401...`);
        setTimeout(() => {
          updateTripStatus(tripId, 'Cancelled', 'Engine warning light reported.');
          addLog(`TRIP-401 declined by driver. Reason: Engine Warning.`);
          addToast('Driver Declined', 'Trip cancelled by driver.', 'warning');
        }, 1500);
      }
    },
    {
      id: 3,
      title: 'Report Multiple Blockages',
      desc: 'Driver reports heavy traffic and secondary accident.',
      run: () => {
        addLog('Starting Scenario 3...');
        reportBlockage({
          emergencyId: 'TRIP-401',
          type: 'Heavy Traffic',
          severity: 'High',
          location: '5th Avenue exit ramp',
          description: 'Congestion spilling onto highway.'
        });
        addLog('Reported Blockage 1: Heavy Traffic.');
        
        setTimeout(() => {
          reportBlockage({
            emergencyId: 'TRIP-401',
            type: 'Accident',
            severity: 'Critical',
            location: 'Grand Ave Bypass',
            description: 'Two-car fender blocking single lane.'
          });
          addLog('Reported Blockage 2: Accident.');
          addToast('Multiple Blockages', 'Two blockages logged for TRIP-401.', 'error');
        }, 1500);
      }
    },
    {
      id: 4,
      title: 'Police Verifies Blockage',
      desc: 'Traffic police accepts & verifies the blockage on route.',
      run: () => {
        addLog('Starting Scenario 4...');
        policeAction('BLK-901', 'verify', 'Patrol car confirmed gridlock.');
        addLog('Police marked BLK-901 as Verified.');
      }
    },
    {
      id: 5,
      title: 'Police Rejects False Alarm',
      desc: 'Police dismisses a false warning blockage report.',
      run: () => {
        addLog('Starting Scenario 5...');
        policeAction('BLK-901', 'reject', 'Road is clear. False alarm.');
        addLog('Police dismissed blockage BLK-901.');
      }
    },
    {
      id: 6,
      title: 'Route Recalculates',
      desc: 'Trigger alternative navigation on active blockage alert.',
      run: () => {
        addLog('Starting Scenario 6...');
        addLog('Analyzing alternative pathways around 5th Ave...');
        setTimeout(() => {
          addLog('Rerouting complete. Alternate route Broadway ➔ Pine St selected.');
          addNotification('All', 'Route Recalculated', 'Ambulance rerouted via Broadway to bypass 5th Avenue.', 'success');
        }, 1200);
      }
    },
    {
      id: 7,
      title: 'Emergency Cancelled',
      desc: 'Hospital aborts the dispatch, releasing ambulance.',
      run: () => {
        addLog('Starting Scenario 7...');
        updateTripStatus('TRIP-401', 'Cancelled', 'Patient transported via private vehicle.');
        addLog('Emergency TRIP-401 cancelled by Hospital authority.');
      }
    },
    {
      id: 8,
      title: 'Simultaneous Emergencies',
      desc: 'Dispatches multiple ambulances to demonstrate state scaling.',
      run: () => {
        addLog('Starting Scenario 8...');
        dispatchAmbulance({
          patientName: 'Arthur Dent',
          age: 40,
          condition: 'Head Injury',
          priority: 'High',
          pickupLocation: '15 Heartland Lane',
          ambulanceId: 'AMB-04'
        });
        setTimeout(() => {
          dispatchAmbulance({
            patientName: 'Clara Oswald',
            age: 26,
            condition: 'Respiratory Distress',
            priority: 'Critical',
            pickupLocation: '88 London Road',
            ambulanceId: 'AMB-09'
          });
        }, 1000);
      }
    },
    {
      id: 9,
      title: 'Notifications Delivered',
      desc: 'Sends simulated cross-role notifications.',
      run: () => {
        addLog('Starting Scenario 9...');
        addNotification('Driver', 'Corridor Clearance Approved', 'Traffic light priority set for Grand Boulevard route.', 'success');
        addLog('Dispatched custom notification alert to driver panel.');
      }
    },
    {
      id: 10,
      title: 'Dashboard Sync Check',
      desc: 'Walks through automated pipeline: Dispatch -> Block -> Clear.',
      run: () => {
        addLog('Starting Scenario 10 Complete Workflow...');
        // Step 1: Dispatch
        const id = dispatchAmbulance({
          patientName: 'Jane Watson',
          age: 33,
          condition: 'Allergic Reaction',
          priority: 'High',
          pickupLocation: 'Baker Street Apt 2B',
          ambulanceId: 'AMB-10'
        });
        addLog(`Step 1: Hospital dispatched TRIP-${id}`);

        // Step 2: Driver Accepts
        setTimeout(() => {
          updateTripStatus(id, 'Accepted');
          addLog(`Step 2: Driver accepted TRIP-${id}`);
        }, 2000);

        // Step 3: Driver starts route
        setTimeout(() => {
          updateTripStatus(id, 'En Route');
          addLog(`Step 3: Driver is en route on TRIP-${id}`);
        }, 4000);

        // Step 4: Driver reports blockage
        setTimeout(() => {
          reportBlockage({
            emergencyId: id,
            type: 'Road Closed',
            severity: 'Critical',
            location: 'Baker Street Main Junction',
            description: 'Water main break block.'
          });
          addLog(`Step 4: Driver reported Road Closed blockage on TRIP-${id}`);
        }, 6000);

        // Step 5: Police clears route
        setTimeout(() => {
          // Find the created blockage id
          addLog(`Step 5: Traffic Police clearing blockage for TRIP-${id}`);
          addNotification('All', 'Emergency Clearance', `Police cleared Baker Street Corridor. Route is Green.`, 'success');
          updateTripStatus(id, 'Route Cleared');
        }, 9000);
      }
    }
  ];

  const handleRun = (scenario) => {
    setActiveScenario(scenario.id);
    scenario.run();
  };

  return (
    <div className="card animate-fade">
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldAlert size={20} color="var(--primary)" /> Testing Verification Suite
      </h3>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        Automate system actions to test centralized real-time updates and role-based dashboard synchronizations.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {scenarios.map((sc) => (
            <div 
              key={sc.id} 
              style={{
                border: '1px solid var(--border)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeScenario === sc.id ? 'var(--primary-light)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{sc.id}. {sc.title}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sc.desc}</div>
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.625rem', fontSize: '0.75rem' }}
                onClick={() => handleRun(sc)}
              >
                <Play size={12} /> Run
              </button>
            </div>
          ))}
        </div>

        {/* Live Logs console */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#38bdf8',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          height: '420px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.25rem' }}>
            <span style={{ fontWeight: 'bold', color: 'white' }}>SIMULATION LOGS</span>
            <button 
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              onClick={() => setLogs([])}
              title="Clear Console"
            >
              <RotateCcw size={12} />
            </button>
          </div>
          {logs.length === 0 ? (
            <div style={{ color: '#64748b', textAlign: 'center', margin: 'auto' }}>
              Console ready. Click "Run" on any scenario.
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '0.25rem', wordBreak: 'break-all' }}>{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
