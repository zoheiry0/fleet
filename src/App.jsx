import { useState, useCallback } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import FleetMap from './components/Map/FleetMap'
import VehicleDetail from './components/VehicleDetail/VehicleDetail'
import { VEHICLES } from './data/mockData'

export default function App() {
  const [vehicles, setVehicles] = useState(VEHICLES)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showCollectionPoints, setShowCollectionPoints] = useState(true)

  // Simulate a live refresh — nudge vehicle positions slightly
  const handleRefresh = useCallback(() => {
    setVehicles(prev =>
      prev.map(v => {
        if (v.status !== 'active') return v
        const jitter = () => (Math.random() - 0.5) * 0.002
        return {
          ...v,
          lat: v.lat + jitter(),
          lng: v.lng + jitter(),
          speed: Math.max(0, v.speed + Math.round((Math.random() - 0.5) * 10)),
          lastUpdate: 'just now',
        }
      })
    )
    if (selectedVehicle) {
      setSelectedVehicle(prev => {
        const updated = vehicles.find(v => v.id === prev?.id)
        return updated || prev
      })
    }
  }, [vehicles, selectedVehicle])

  const handleVehicleSelect = useCallback((vehicle) => {
    setSelectedVehicle(vehicle)
  }, [])

  // Keep detail panel in sync with vehicle list
  const detailVehicle = selectedVehicle
    ? vehicles.find(v => v.id === selectedVehicle.id) || selectedVehicle
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <Header
        showCollectionPoints={showCollectionPoints}
        onToggleCollectionPoints={() => setShowCollectionPoints(p => !p)}
        onRefresh={handleRefresh}
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar
          vehicles={vehicles}
          selectedVehicle={detailVehicle}
          onVehicleSelect={handleVehicleSelect}
        />
        <div style={{ flex: 1, position: 'relative' }}>
          <FleetMap
            vehicles={vehicles}
            selectedVehicle={detailVehicle}
            onVehicleSelect={handleVehicleSelect}
            showCollectionPoints={showCollectionPoints}
          />
        </div>
        {detailVehicle && (
          <VehicleDetail
            vehicle={detailVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </div>
    </div>
  )
}
