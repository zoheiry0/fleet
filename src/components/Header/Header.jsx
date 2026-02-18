import { Truck, Droplets, MapPin, TrendingUp, Bell, Map, List, RefreshCw } from 'lucide-react'
import { DASHBOARD_STATS, STATUS_COLORS } from '../../data/mockData'

export default function Header({ showCollectionPoints, onToggleCollectionPoints, viewMode, onToggleView, onRefresh }) {
  const stats = DASHBOARD_STATS
  const progressPct = Math.round((stats.todayTotalUCO / stats.todayTarget) * 100)

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 56, borderBottom: '1px solid #f3f4f6' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Truck size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827', lineHeight: 1 }}>UCO Fleet</div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>Collection Manager</div>
          </div>
        </div>

        <div style={{ width: 1, height: 32, background: '#e5e7eb', margin: '0 4px' }} />

        {/* Vehicle status badges */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <StatusBadge count={stats.activeVehicles} label="Active" color={STATUS_COLORS.active} />
          <StatusBadge count={stats.idleVehicles} label="Idle" color={STATUS_COLORS.idle} />
          <StatusBadge count={stats.offlineVehicles} label="Offline" color={STATUS_COLORS.offline} />
        </div>

        <div style={{ flex: 1 }} />

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ToggleButton
            onClick={onToggleCollectionPoints}
            active={showCollectionPoints}
            icon={<MapPin size={14} />}
            label="Collection Points"
          />
          <button
            onClick={onRefresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
              fontSize: 12,
              color: '#6b7280',
              transition: 'all 0.15s',
            }}
            title="Simulate update"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <div style={{
            position: 'relative',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
          }}>
            <Bell size={16} color="#6b7280" />
            <span style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              background: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white',
            }} />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 52, overflowX: 'auto' }}>
        <StatItem
          icon={<Droplets size={16} color="#6366f1" />}
          label="Today's UCO"
          value={`${stats.todayTotalUCO}L`}
          sub={`/ ${stats.todayTarget}L target`}
          accent="#6366f1"
          progress={progressPct}
        />
        <Divider />
        <StatItem
          icon={<MapPin size={16} color="#22c55e" />}
          label="Pending Pickups"
          value={stats.pendingCollections}
          sub={`of ${stats.totalCollectionPoints} points`}
          accent="#22c55e"
        />
        <Divider />
        <StatItem
          icon={<Truck size={16} color="#f59e0b" />}
          label="Fleet Active"
          value={`${stats.activeVehicles}/${stats.totalVehicles}`}
          sub="vehicles on route"
          accent="#f59e0b"
        />
        <Divider />
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
          {stats.weeklyUCO.map((val, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{
                width: 18,
                height: Math.round((val / Math.max(...stats.weeklyUCO)) * 36),
                background: i === stats.weeklyUCO.length - 1 ? '#6366f1' : '#e0e7ff',
                borderRadius: 3,
                minHeight: 4,
              }} />
              <span style={{ fontSize: 9, color: '#9ca3af' }}>{stats.weeklyDays[i]}</span>
            </div>
          ))}
          <div style={{ marginLeft: 4, fontSize: 11, color: '#6b7280' }}>
            <TrendingUp size={12} style={{ display: 'inline', color: '#22c55e' }} /> Weekly
          </div>
        </div>
      </div>
    </header>
  )
}

function StatusBadge({ count, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontWeight: 700, color: '#111827' }}>{count}</span>
      <span style={{ color: '#9ca3af' }}>{label}</span>
    </div>
  )
}

function ToggleButton({ onClick, active, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 8,
        border: `1px solid ${active ? '#6366f1' : '#e5e7eb'}`,
        background: active ? '#eef2ff' : 'white',
        cursor: 'pointer',
        fontSize: 12,
        color: active ? '#6366f1' : '#6b7280',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.15s',
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function StatItem({ icon, label, value, sub, accent, progress }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: accent + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#9ca3af' }}>{label}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
            {value}
            <span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af', marginLeft: 4 }}>{sub}</span>
          </div>
        </div>
      </div>
      {progress !== undefined && (
        <div style={{ marginTop: 4, height: 3, background: '#f3f4f6', borderRadius: 2, width: 160 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: accent, borderRadius: 2 }} />
        </div>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ width: 1, height: 36, background: '#f3f4f6', flexShrink: 0 }} />
}
