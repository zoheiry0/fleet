import { Truck, Fuel, Droplets, Navigation, Clock } from 'lucide-react'
import { STATUS_COLORS, STATUS_LABELS, COLLECTION_POINTS } from '../../data/mockData'

export default function VehicleCard({ vehicle, isSelected, onClick }) {
  const statusColor = STATUS_COLORS[vehicle.status]
  const nextPoint = vehicle.route.next
    ? COLLECTION_POINTS.find(p => p.id === vehicle.route.next)
    : null

  const tankPercent = Math.round((vehicle.tankCurrent / vehicle.tankCapacity) * 100)

  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? '#f0f4ff' : 'white',
        border: `2px solid ${isSelected ? '#6366f1' : '#e5e7eb'}`,
        borderRadius: 12,
        padding: '12px 14px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: 8,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: statusColor + '18',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
        }}>
          {vehicle.type === 'truck' ? '🚛' : '🚐'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {vehicle.name}
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{vehicle.plate}</div>
        </div>
        <span style={{
          padding: '3px 8px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          background: statusColor + '20',
          color: statusColor,
          flexShrink: 0,
        }}>
          {STATUS_LABELS[vehicle.status]}
        </span>
      </div>

      {/* Driver */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <div style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#6366f1',
          color: 'white',
          fontSize: 9,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {vehicle.driver.avatar}
        </div>
        <span style={{ fontSize: 12, color: '#4b5563' }}>{vehicle.driver.name}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9ca3af' }}>
          <Clock size={10} style={{ display: 'inline', marginRight: 2 }} />
          {vehicle.lastUpdate}
        </span>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        <MetricPill icon={<Navigation size={10} />} label="Speed" value={`${vehicle.speed} km/h`} />
        <MetricPill
          icon={<Fuel size={10} />}
          label="Fuel"
          value={`${vehicle.fuelLevel}%`}
          warn={vehicle.fuelLevel < 20}
        />
        <MetricPill
          icon={<Droplets size={10} />}
          label="Tank"
          value={`${tankPercent}%`}
          good={tankPercent > 60}
        />
      </div>

      {/* Progress bars */}
      <div style={{ marginTop: 10 }}>
        <ProgressBar
          label="Fuel"
          value={vehicle.fuelLevel}
          color={vehicle.fuelLevel < 20 ? '#ef4444' : vehicle.fuelLevel < 40 ? '#f59e0b' : '#22c55e'}
        />
        <ProgressBar
          label="UCO Tank"
          value={tankPercent}
          color={tankPercent > 80 ? '#ef4444' : tankPercent > 50 ? '#f59e0b' : '#6366f1'}
          suffix={`${vehicle.tankCurrent}/${vehicle.tankCapacity}L`}
        />
      </div>

      {/* Next stop */}
      {nextPoint && (
        <div style={{
          marginTop: 8,
          padding: '6px 8px',
          background: '#f9fafb',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: '#6b7280',
        }}>
          <Navigation size={11} color="#6366f1" />
          <span>Next: </span>
          <span style={{ color: '#111827', fontWeight: 500 }}>{nextPoint.name}</span>
          <span style={{ marginLeft: 'auto', color: '#6366f1', fontWeight: 600 }}>{nextPoint.ucoLiters}L</span>
        </div>
      )}
    </div>
  )
}

function MetricPill({ icon, label, value, warn, good }) {
  const color = warn ? '#ef4444' : good ? '#22c55e' : '#6b7280'
  return (
    <div style={{
      background: '#f9fafb',
      borderRadius: 6,
      padding: '4px 6px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 10, color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color, marginTop: 1 }}>{value}</div>
    </div>
  )
}

function ProgressBar({ label, value, color, suffix }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>
        <span>{label}</span>
        <span>{suffix || `${value}%`}</span>
      </div>
      <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(value, 100)}%`, background: color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}
