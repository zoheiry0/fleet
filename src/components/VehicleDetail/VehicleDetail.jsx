import {
  X, Truck, User, Phone, Star, Navigation, Fuel,
  Droplets, Activity, MapPin, CheckCircle2, Circle, Clock,
  Gauge, Package
} from 'lucide-react'
import { COLLECTION_POINTS, STATUS_COLORS, STATUS_LABELS } from '../../data/mockData'

export default function VehicleDetail({ vehicle, onClose }) {
  if (!vehicle) return null

  const statusColor = STATUS_COLORS[vehicle.status]
  const tankPercent = Math.round((vehicle.tankCurrent / vehicle.tankCapacity) * 100)

  const completedPoints = vehicle.route.completed.map(id => COLLECTION_POINTS.find(p => p.id === id)).filter(Boolean)
  const remainingPoints = vehicle.route.remaining.map(id => COLLECTION_POINTS.find(p => p.id === id)).filter(Boolean)
  const currentPoint = vehicle.route.current ? COLLECTION_POINTS.find(p => p.id === vehicle.route.current) : null

  return (
    <div style={{
      width: 320,
      background: 'white',
      borderLeft: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        background: `linear-gradient(135deg, ${statusColor}15, ${statusColor}08)`,
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: statusColor + '20',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            flexShrink: 0,
          }}>
            {vehicle.type === 'truck' ? '🚛' : '🚐'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{vehicle.name}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>{vehicle.plate}</div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                padding: '3px 10px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                background: statusColor + '20',
                color: statusColor,
              }}>
                ● {STATUS_LABELS[vehicle.status]}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Driver info */}
        <Section title="Driver" icon={<User size={14} />}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#6366f1',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
            }}>
              {vehicle.driver.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{vehicle.driver.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Phone size={10} /> {vehicle.driver.phone}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3, fontSize: 13 }}>
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontWeight: 600, color: '#111827' }}>{vehicle.driver.rating}</span>
            </div>
          </div>
        </Section>

        {/* Live stats */}
        <Section title="Live Status" icon={<Activity size={14} />}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <StatBox icon="⚡" label="Speed" value={`${vehicle.speed} km/h`} color="#6366f1" />
            <StatBox icon="📍" label="Last Update" value={vehicle.lastUpdate} color="#6b7280" />
            <StatBox icon="🛢️" label="Today UCO" value={`${vehicle.todayUCO}L`} color="#22c55e" />
            <StatBox icon="📦" label="Collections" value={vehicle.todayCollections} color="#f59e0b" />
          </div>
        </Section>

        {/* Fuel & Tank */}
        <Section title="Vehicle Status" icon={<Gauge size={14} />}>
          <LabeledBar
            label="Fuel Level"
            value={vehicle.fuelLevel}
            max={100}
            color={vehicle.fuelLevel < 20 ? '#ef4444' : vehicle.fuelLevel < 40 ? '#f59e0b' : '#22c55e'}
            suffix={`${vehicle.fuelLevel}%`}
          />
          <LabeledBar
            label="UCO Tank"
            value={vehicle.tankCurrent}
            max={vehicle.tankCapacity}
            color={tankPercent > 80 ? '#ef4444' : tankPercent > 50 ? '#f59e0b' : '#6366f1'}
            suffix={`${vehicle.tankCurrent}L / ${vehicle.tankCapacity}L`}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
            <span>Total mileage</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </Section>

        {/* Today's route */}
        <Section title="Today's Route" icon={<Navigation size={14} />}>
          {/* Completed stops */}
          {completedPoints.map((point, i) => (
            <RouteStop
              key={point.id}
              point={point}
              status="done"
              isLast={i === completedPoints.length - 1 && !currentPoint && remainingPoints.length === 0}
            />
          ))}

          {/* Current stop */}
          {currentPoint && (
            <RouteStop
              key={currentPoint.id}
              point={currentPoint}
              status="current"
              isLast={remainingPoints.length === 0}
            />
          )}

          {/* Remaining stops */}
          {remainingPoints.map((point, i) => (
            <RouteStop
              key={point.id}
              point={point}
              status="pending"
              isLast={i === remainingPoints.length - 1}
            />
          ))}

          {completedPoints.length === 0 && !currentPoint && remainingPoints.length === 0 && (
            <div style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '12px 0' }}>
              No route assigned
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span style={{ color: '#6366f1' }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function StatBox({ icon, label, value, color }) {
  return (
    <div style={{
      background: '#f9fafb',
      borderRadius: 8,
      padding: '8px 10px',
      border: '1px solid #f3f4f6',
    }}>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color }}>{value}</div>
    </div>
  )
}

function LabeledBar({ label, value, max, color, suffix }) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600, color: '#374151' }}>{suffix}</span>
      </div>
      <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }} />
      </div>
    </div>
  )
}

function RouteStop({ point, status, isLast }) {
  const icons = { done: <CheckCircle2 size={16} color="#22c55e" fill="#dcfce7" />, current: <Circle size={16} color="#6366f1" fill="#e0e7ff" />, pending: <Circle size={16} color="#d1d5db" /> }
  const typeIcons = { restaurant: '🍽️', hotel: '🏨', canteen: '🍱', fastfood: '🍟', bakery: '🥐' }

  return (
    <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
      {/* Timeline connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: 1 }}>{icons[status]}</div>
        {!isLast && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#22c55e40' : '#e5e7eb', marginTop: 3, marginBottom: 3 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>{typeIcons[point.type] || '📍'}</span>
          <span style={{ fontSize: 13, fontWeight: status === 'current' ? 700 : 500, color: status === 'pending' ? '#9ca3af' : '#111827' }}>
            {point.name}
          </span>
          {status === 'current' && (
            <span style={{ marginLeft: 'auto', fontSize: 10, background: '#e0e7ff', color: '#6366f1', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>
              Now
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 2, fontSize: 11, color: '#9ca3af' }}>
          <span>🛢️ {point.ucoLiters}L expected</span>
          <span><MapPin size={9} style={{ display: 'inline' }} /> {point.address.split(',')[0]}</span>
        </div>
      </div>
    </div>
  )
}
