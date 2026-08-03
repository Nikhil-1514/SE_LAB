import React from 'react';
import { MapPin, AlertTriangle, Shield, CheckCircle, Navigation } from 'lucide-react';

export default function MapPlaceholder({ trip, activeBlockages = [], height = '300px' }) {
  // Mock coordinate placements within our grid boundary
  const hospitalPos = { x: 80, y: 35 };  // Hospital destination (right side)
  const startPos = { x: 15, y: 70 };     // Driver start point (left bottom)
  
  // Calculate simulated position of ambulance based on remaining distance
  const progressRatio = trip ? Math.min(1, (7.2 - trip.distanceRemaining) / 7.2) : 0;
  
  // Interpolated ambulance coordinates along path
  const ambulancePos = {
    x: startPos.x + (hospitalPos.x - startPos.x) * progressRatio,
    y: startPos.y + (hospitalPos.y - startPos.y) * progressRatio
  };

  // Blockage positioning if any exist for this trip
  const blockagePos = { x: 50, y: 50 }; // Mid-route blockage marker

  // Police checkpoint coordinates
  const policePos = { x: 58, y: 40 };

  const hasActiveBlockage = activeBlockages.some(
    (b) => b.emergencyId === (trip ? trip.id : '') && (b.status === 'Verified' || b.status === 'Pending Verification')
  );

  const blockInfo = activeBlockages.find(b => b.emergencyId === (trip ? trip.id : ''));

  return (
    <div className="map-placeholder" style={{ height }}>
      <div className="map-grid-overlay" />

      {/* Primary Route Path */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Draw main corridor */}
        <path
          d={`M ${startPos.x}% ${startPos.y}% Q 45% 65%, ${hospitalPos.x}% ${hospitalPos.y}%`}
          fill="none"
          stroke={hasActiveBlockage ? 'var(--danger)' : 'var(--success)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Draw main route corridor solid track */}
        <path
          d={`M ${startPos.x}% ${startPos.y}% Q 45% 65%, ${hospitalPos.x}% ${hospitalPos.y}%`}
          fill="none"
          stroke={hasActiveBlockage ? 'var(--danger)' : 'var(--success)'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={hasActiveBlockage ? '6,6' : 'none'}
        />

        {/* Draw alternate route path */}
        {hasActiveBlockage && (
          <path
            d={`M ${startPos.x}% ${startPos.y}% Q 40% 15%, ${hospitalPos.x}% ${hospitalPos.y}%`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="5,5"
            strokeOpacity="0.85"
          />
        )}
      </svg>

      {/* Start (Pickup) Marker */}
      <div className="map-marker" style={{ left: `${startPos.x}%`, top: `${startPos.y}%` }}>
        <div className="map-marker-pin" style={{ backgroundColor: 'var(--text-muted)' }}>
          <MapPin size={12} />
        </div>
        <div className="map-marker-label">Pickup Point</div>
      </div>

      {/* Destination Hospital Marker */}
      <div className="map-marker" style={{ left: `${hospitalPos.x}%`, top: `${hospitalPos.y}%` }}>
        <div className="map-marker-pin" style={{ backgroundColor: 'var(--primary)' }}>
          <CheckCircle size={12} />
        </div>
        <div className="map-marker-label" style={{ backgroundColor: 'var(--primary)' }}>Hospital Center</div>
      </div>

      {/* Police Station/Unit Marker */}
      <div className="map-marker" style={{ left: `${policePos.x}%`, top: `${policePos.y}%` }}>
        <div className="map-marker-pin" style={{ backgroundColor: 'var(--warning)' }}>
          <Shield size={12} />
        </div>
        <div className="map-marker-label" style={{ backgroundColor: 'var(--warning)', color: 'white' }}>Police Squad 4</div>
      </div>

      {/* Active Trip Ambulance Position */}
      {trip && trip.status !== 'Completed' && trip.status !== 'Requested' && (
        <div 
          className="map-marker animate-fade" 
          style={{ 
            left: `${ambulancePos.x}%`, 
            top: `${ambulancePos.y}%`,
            transition: 'left 1s linear, top 1s linear',
            zIndex: 10
          }}
        >
          <div 
            className="map-marker-pin" 
            style={{ 
              backgroundColor: 'var(--danger)', 
              animation: 'pulse 1.5s infinite',
              transform: 'scale(1.2)'
            }}
          >
            <Navigation size={12} style={{ transform: 'rotate(45deg)' }} />
          </div>
          <div className="map-marker-label" style={{ backgroundColor: 'var(--danger)' }}>
            {trip.ambulanceId} ({trip.eta} mins)
          </div>
        </div>
      )}

      {/* Blockage Marker */}
      {hasActiveBlockage && (
        <div className="map-marker animate-fade" style={{ left: `${blockagePos.x}%`, top: `${blockagePos.y}%`, zIndex: 9 }}>
          <div 
            className="map-marker-pin" 
            style={{ 
              backgroundColor: 'var(--danger)',
              boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)'
            }}
          >
            <AlertTriangle size={12} />
          </div>
          <div className="map-marker-label" style={{ backgroundColor: 'var(--danger)' }}>
            {blockInfo?.type || 'Obstacle'} ({blockInfo?.severity})
          </div>
        </div>
      )}

      {/* HUD Info panel */}
      <div style={{
        position: 'absolute',
        bottom: '0.75rem',
        left: '0.75rem',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        color: 'white',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.75rem',
        maxWidth: '240px',
        boxShadow: 'var(--shadow-md)',
        backdropFilter: 'blur(4px)',
        zIndex: 20
      }}>
        {trip ? (
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Navigation size={12} /> Live Route Tracking
            </div>
            <div style={{ marginBottom: '0.125rem' }}>Trip ID: <strong>{trip.id}</strong></div>
            <div style={{ marginBottom: '0.125rem' }}>ETA: <strong>{trip.eta} minutes</strong></div>
            <div style={{ marginBottom: '0.125rem' }}>Remaining: <strong>{trip.distanceRemaining} km</strong></div>
            <div>Corridor: <span style={{ color: hasActiveBlockage ? 'var(--danger)' : 'var(--success)' }}>
              {hasActiveBlockage ? 'Blocked (Rerouting)' : 'Green Corridor Active'}
            </span></div>
          </div>
        ) : (
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#38bdf8' }}>Smart City Grid</div>
            <div>All ambulance monitoring points online.</div>
            <div>Ready to display dispatched active routes.</div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        left: '0.75rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '0.5rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.65rem',
        border: '1px solid var(--border)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
          <span>Hospital Center</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
          <span>Ambulance Track</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }} />
          <span>Traffic Police</span>
        </div>
        {hasActiveBlockage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '0', backgroundColor: 'var(--danger)', transform: 'rotate(45deg)' }} />
            <span>Active Blockage</span>
          </div>
        )}
      </div>
    </div>
  );
}
