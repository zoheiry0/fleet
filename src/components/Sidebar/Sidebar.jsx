import { useState } from 'react'
import { Search, Filter, Truck, X } from 'lucide-react'
import VehicleCard from './VehicleCard'
import { STATUS_COLORS } from '../../data/mockData'

const STATUS_FILTERS = ['all', 'active', 'idle', 'offline']

export default function Sidebar({ vehicles, selectedVehicle, onVehicleSelect }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = vehicles.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.name.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const counts = {
    all: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    offline: vehicles.filter(v => v.status === 'offline').length,
  }

  return (
    <div style={{
      width: 320,
      background: '#f8fafc',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Sidebar header */}
      <div style={{ padding: '16px 16px 12px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Truck size={18} color="#6366f1" />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>Fleet Vehicles</span>
          <span style={{
            marginLeft: 'auto',
            background: '#6366f180',
            color: '#6366f1',
            fontWeight: 700,
            fontSize: 12,
            padding: '1px 8px',
            borderRadius: 20,
          }}>
            {vehicles.length}
          </span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search vehicle or driver..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: 13,
              outline: 'none',
              background: '#f9fafb',
              boxSizing: 'border-box',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status filter tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {STATUS_FILTERS.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                flex: 1,
                padding: '4px 0',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                transition: 'all 0.15s',
                background: statusFilter === status
                  ? (status === 'all' ? '#6366f1' : STATUS_COLORS[status])
                  : '#f3f4f6',
                color: statusFilter === status ? 'white' : '#6b7280',
              }}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              <span style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {counts[status]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: 40, fontSize: 13 }}>
            <Filter size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.4 }} />
            No vehicles match your filter
          </div>
        ) : (
          filtered.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicle?.id === vehicle.id}
              onClick={() => onVehicleSelect(selectedVehicle?.id === vehicle.id ? null : vehicle)}
            />
          ))
        )}
      </div>
    </div>
  )
}
