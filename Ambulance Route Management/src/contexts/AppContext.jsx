import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// Mock Initial Data
const INITIAL_EMERGENCIES = [
  {
    id: 'TRIP-401',
    patientName: 'Sarah Jenkins',
    age: 42,
    condition: 'Acute Cardiac Distress',
    priority: 'Critical',
    hospital: 'City General Hospital',
    ambulanceId: 'AMB-12',
    driverId: 'DRV-102',
    driverName: 'Robert Vance',
    pickupLocation: '822 Oakwood Dr',
    destination: 'City General Hospital',
    status: 'En Route',
    routeHealthScore: 68,
    eta: 9,
    distanceRemaining: 4.8,
    blockages: ['BLK-901'],
    currentRoute: 'Oakwood Dr ➔ 5th Avenue ➔ Medical Park Circle',
    alternateRoute: 'Oakwood Dr ➔ Broadway ➔ Pine St ➔ Medical Park Circle',
    history: [
      { status: 'Requested', time: '14:20', description: 'Emergency request received from 822 Oakwood Dr.' },
      { status: 'Assigned', time: '14:21', description: 'Ambulance AMB-12 and Driver Robert Vance assigned.' },
      { status: 'Accepted', time: '14:22', description: 'Driver Robert Vance accepted assignment.' },
      { status: 'En Route', time: '14:23', description: 'Ambulance is en route. Live tracking initialized.' },
      { status: 'Blockage Detected', time: '14:25', description: 'Driver reported heavy traffic blockage on 5th Avenue.' },
      { status: 'Police Notified', time: '14:25', description: 'Corridor clearance request sent to Traffic Police.' }
    ]
  },
  {
    id: 'TRIP-402',
    patientName: 'David Chen',
    age: 67,
    condition: 'Stroke Symptoms',
    priority: 'High',
    hospital: 'Metro Health Medical Center',
    ambulanceId: 'AMB-05',
    driverId: 'DRV-105',
    driverName: 'Elena Rostova',
    pickupLocation: '1540 Grand Boulevard',
    destination: 'Metro Health Medical Center',
    status: 'Completed',
    routeHealthScore: 98,
    eta: 0,
    distanceRemaining: 0,
    blockages: [],
    currentRoute: 'Grand Boulevard ➔ expressway ➔ Health Way',
    alternateRoute: '',
    history: [
      { status: 'Requested', time: '13:05', description: 'Emergency request received.' },
      { status: 'Assigned', time: '13:07', description: 'Ambulance AMB-05 and Driver Elena Rostova assigned.' },
      { status: 'Accepted', time: '13:08', description: 'Driver Elena accepted assignment.' },
      { status: 'En Route', time: '13:10', description: 'Ambulance en route to hospital.' },
      { status: 'Hospital Reached', time: '13:22', description: 'Ambulance arrived at Metro Health Medical Center.' },
      { status: 'Completed', time: '13:30', description: 'Patient handed over to ER. Emergency trip completed.' }
    ]
  }
];

const INITIAL_BLOCKAGES = [
  {
    id: 'BLK-901',
    emergencyId: 'TRIP-401',
    type: 'Heavy Traffic',
    severity: 'Critical',
    description: 'Severe multi-lane gridlock due to construction narrowing lane exit near 5th Avenue.',
    location: '5th Avenue Near Exit 4B',
    gps: '40.7306° N, 73.9352° W',
    status: 'Pending Verification',
    reportedBy: 'Robert Vance (AMB-12)',
    timestamp: '14:25',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOT-001',
    role: 'All',
    title: 'Severe Blockage Reported',
    message: 'Driver Robert Vance reported a Critical blockage on 5th Avenue.',
    type: 'error',
    timestamp: '14:25',
    read: false
  },
  {
    id: 'NOT-002',
    role: 'Police',
    title: 'Route Clearance Request',
    message: 'Urgent: Clearance requested for Ambulance AMB-12 on TRIP-401.',
    type: 'warning',
    timestamp: '14:25',
    read: false
  },
  {
    id: 'NOT-003',
    role: 'Hospital',
    title: 'Trip Started',
    message: 'Ambulance AMB-12 is now en route to patient Sarah Jenkins.',
    type: 'info',
    timestamp: '14:23',
    read: false
  }
];

export const AppProvider = ({ children }) => {
  const [emergencies, setEmergencies] = useState(INITIAL_EMERGENCIES);
  const [blockages, setBlockages] = useState(INITIAL_BLOCKAGES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('se_user');
    return saved ? JSON.parse(saved) : { role: 'None', name: '', id: '' };
  });

  // Toast notifier helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Notification center helper
  const addNotification = (role, title, message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newNotif = {
      id: `NOT-${Date.now()}`,
      role,
      title,
      message,
      type,
      timestamp: time,
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addToast(title, message, type);
  };

  // Login handler
  const login = (role, username) => {
    const user = { role, name: username, id: role === 'Driver' ? 'DRV-102' : role === 'Police' ? 'POL-209' : 'HOSP-702' };
    setCurrentUser(user);
    localStorage.setItem('se_user', JSON.stringify(user));
    addToast('Authentication Success', `Welcome back, ${username}!`, 'success');
  };

  // Logout handler
  const logout = () => {
    setCurrentUser({ role: 'None', name: '', id: '' });
    localStorage.removeItem('se_user');
    addToast('Logged Out', 'Successfully logged out of the session.', 'info');
  };

  // Create Emergency Trip
  const dispatchAmbulance = (data) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTripId = `TRIP-${Math.floor(100 + Math.random() * 900)}`;
    const newTrip = {
      id: newTripId,
      patientName: data.patientName,
      age: parseInt(data.age) || 35,
      condition: data.condition,
      priority: data.priority,
      hospital: data.hospital || 'City General Hospital',
      ambulanceId: data.ambulanceId || 'AMB-03',
      driverId: data.driverId || 'DRV-102',
      driverName: data.driverName || 'Robert Vance',
      pickupLocation: data.pickupLocation,
      destination: data.destination || 'City General Hospital',
      status: 'Requested',
      routeHealthScore: 100,
      eta: 15,
      distanceRemaining: 7.2,
      blockages: [],
      currentRoute: `${data.pickupLocation} ➔ High Street ➔ Medical Park Circle`,
      alternateRoute: `${data.pickupLocation} ➔ Riverside Parkway ➔ Medical Park Circle`,
      history: [
        { status: 'Requested', time, description: `Emergency dispatched for ${data.patientName}.` }
      ]
    };

    setEmergencies((prev) => [newTrip, ...prev]);
    addNotification('All', 'New Emergency Dispatched', `Ambulance assigned to ${data.patientName} (${data.priority} priority).`, 'info');
    return newTripId;
  };

  // Update Trip status (Driver Actions)
  const updateTripStatus = (tripId, newStatus, reason = '') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setEmergencies((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId) {
          let desc = `Trip status updated to ${newStatus}.`;
          if (newStatus === 'Accepted') desc = `${trip.driverName} accepted the assignment.`;
          else if (newStatus === 'En Route') desc = `Ambulance is en route. Live route visualization active.`;
          else if (newStatus === 'Hospital Reached') desc = `Ambulance has safely arrived at ${trip.destination}.`;
          else if (newStatus === 'Completed') desc = `Patient handed over. Emergency session closed.`;
          else if (newStatus === 'Cancelled') desc = `Trip was cancelled: ${reason}`;

          return {
            ...trip,
            status: newStatus,
            history: [...trip.history, { status: newStatus, time, description: desc }]
          };
        }
        return trip;
      })
    );

    if (newStatus === 'Cancelled') {
      addNotification('All', 'Emergency Cancelled', `Trip ${tripId} has been cancelled.`, 'error');
    } else {
      addNotification('All', 'Trip Status Update', `Trip ${tripId} is now ${newStatus}.`, 'info');
    }
  };

  // Report Blockage (Driver Action)
  const reportBlockage = (blockageData) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const blockId = `BLK-${Math.floor(100 + Math.random() * 900)}`;

    const newBlockage = {
      id: blockId,
      emergencyId: blockageData.emergencyId,
      type: blockageData.type,
      severity: blockageData.severity,
      description: blockageData.description,
      location: blockageData.location,
      gps: blockageData.gps || '40.7128° N, 74.0060° W',
      status: 'Pending Verification',
      reportedBy: currentUser.name || 'Ambulance Driver',
      timestamp: time,
      image: blockageData.image || 'https://images.unsplash.com/photo-1594913785162-e67857495924?w=500&auto=format&fit=crop&q=60'
    };

    setBlockages((prev) => [newBlockage, ...prev]);

    setEmergencies((prev) =>
      prev.map((trip) => {
        if (trip.id === blockageData.emergencyId) {
          const updatedHistory = [
            ...trip.history,
            { status: 'Blockage Detected', time, description: `Driver reported blockage (${blockageData.type}) at ${blockageData.location}.` },
            { status: 'Police Notified', time, description: `Alert transmitted to local Traffic Clearance desk.` }
          ];
          return {
            ...trip,
            status: 'Blockage Detected',
            routeHealthScore: Math.max(10, trip.routeHealthScore - 40),
            blockages: [...trip.blockages, blockId],
            history: updatedHistory
          };
        }
        return trip;
      })
    );

    addNotification('Police', 'New Blockage Reported', `Traffic alert: ${blockageData.type} reported near ${blockageData.location}. Verification required.`, 'warning');
  };

  // Police Verify / Clear Blockages
  const policeAction = (blockageId, action, notes = '') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setBlockages((prev) =>
      prev.map((b) => (b.id === blockageId ? { ...b, status: action === 'verify' ? 'Verified' : action === 'reject' ? 'Rejected' : 'Cleared' } : b))
    );

    const blockage = blockages.find((b) => b.id === blockageId);
    if (!blockage) return;

    if (action === 'reject') {
      // Revert the blockage on the trip
      setEmergencies((prev) =>
        prev.map((trip) => {
          if (trip.id === blockage.emergencyId) {
            return {
              ...trip,
              status: 'En Route',
              routeHealthScore: Math.min(100, trip.routeHealthScore + 40),
              blockages: trip.blockages.filter((id) => id !== blockageId),
              history: [...trip.history, { status: 'En Route', time, description: `Police rejected blockage report ${blockageId}: ${notes || 'False alarm'}.` }]
            };
          }
          return trip;
        })
      );
      addNotification('All', 'Blockage Report Dismissed', `Police dismissed traffic report at ${blockage.location}. Route restored.`, 'info');
    } 
    else if (action === 'verify') {
      setEmergencies((prev) =>
        prev.map((trip) => {
          if (trip.id === blockage.emergencyId) {
            return {
              ...trip,
              history: [...trip.history, { status: 'Blockage Detected', time, description: `Police verified blockage ${blockageId}: ${notes || 'Traffic control dispatched.'}` }]
            };
          }
          return trip;
        })
      );
      addNotification('All', 'Blockage Verified', `Police verified blockage at ${blockage.location}. Traffic control en route.`, 'warning');
    }
    else if (action === 'clear') {
      setEmergencies((prev) =>
        prev.map((trip) => {
          if (trip.id === blockage.emergencyId) {
            const isRemainingBlockages = trip.blockages.filter(id => id !== blockageId).length > 0;
            return {
              ...trip,
              status: isRemainingBlockages ? 'Blockage Detected' : 'Route Cleared',
              routeHealthScore: isRemainingBlockages ? trip.routeHealthScore : 100,
              eta: Math.max(3, trip.eta - 5),
              blockages: trip.blockages.filter((id) => id !== blockageId),
              history: [
                ...trip.history,
                { status: 'Route Cleared', time, description: `Emergency corridor cleared by traffic authority. Notes: ${notes || 'Priority green light enabled'}.` }
              ]
            };
          }
          return trip;
        })
      );
      addNotification('All', 'Route Corridor Cleared', `Police cleared route blockage at ${blockage.location}. Ambulance priority restored.`, 'success');
    }
  };

  // Notification clear handler
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = (role) => {
    setNotifications((prev) =>
      prev.map((n) => (n.role === role || n.role === 'All' ? { ...n, read: true } : n))
    );
  };

  // Simulation: Tick down ETA/distance and move vehicles if status is En Route/Route Cleared
  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencies((prev) =>
        prev.map((trip) => {
          if (trip.status === 'En Route' || trip.status === 'Route Cleared') {
            if (trip.distanceRemaining > 0.2) {
              const newDistance = parseFloat((trip.distanceRemaining - 0.2).toFixed(1));
              const newEta = Math.max(1, Math.ceil(newDistance * 1.8));
              return {
                ...trip,
                distanceRemaining: newDistance,
                eta: newEta
              };
            } else if (trip.distanceRemaining <= 0.2 && trip.distanceRemaining > 0) {
              const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return {
                ...trip,
                distanceRemaining: 0,
                eta: 0,
                status: 'Hospital Reached',
                history: [...trip.history, { status: 'Hospital Reached', time, description: `Ambulance reached ${trip.destination}.` }]
              };
            }
          }
          return trip;
        })
      );
    }, 15000); // Progress every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        emergencies,
        blockages,
        notifications,
        toasts,
        currentUser,
        login,
        logout,
        dispatchAmbulance,
        updateTripStatus,
        reportBlockage,
        policeAction,
        markNotificationRead,
        markAllNotificationsRead,
        addToast,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
