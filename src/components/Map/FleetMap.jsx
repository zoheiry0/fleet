import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import { COLLECTION_POINTS, STATUS_COLORS } from '../../data/mockData'
import { useEffect } from 'react'

// Fix default leaflet marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function createVehicleIcon(vehicle) {
  const color = STATUS_COLORS[vehicle.status]
  const emoji = vehicle.type === 'truck' ? '🚛' : '🚐'
  const html = `
    <div style="
      background: white;
      border: 3px solid ${color};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      position: relative;
    ">
      ${emoji}
      <span style="
        position: absolute;
        bottom: -6px;
        right: -6px;
        width: 12px;
        height: 12px;
        background: ${color};
        border-radius: 50%;
        border: 2px solid white;
      "></span>
    </div>
  `
  return L.divIcon({ html, className: '', iconSize: [40, 40], iconAnchor: [20, 20] })
}

function createCollectionPointIcon(point) {
  const icons = { restaurant: '🍽️', hotel: '🏨', canteen: '🍱', fastfood: '🍟', bakery: '🥐' }
  const emoji = icons[point.type] || '📍'
  const html = `
    <div style="
      background: white;
      border: 2px solid #6366f1;
      border-radius: 8px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    ">${emoji}</div>
  `
  return L.divIcon({ html, className: '', iconSize: [30, 30], iconAnchor: [15, 15] })
}

function MapFlyTo({ selectedVehicle }) {
  const map = useMap()
  useEffect(() => {
    if (selectedVehicle) {
      map.flyTo([selectedVehicle.lat, selectedVehicle.lng], 15, { duration: 1 })
    }
  }, [selectedVehicle, map])
  return null
}

export default function FleetMap({ vehicles, selectedVehicle, onVehicleSelect, showCollectionPoints }) {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapFlyTo selectedVehicle={selectedVehicle} />

      {/* Collection point markers */}
      {showCollectionPoints && COLLECTION_POINTS.map(point => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={createCollectionPointIcon(point)}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{point.name}</strong>
              <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{point.address}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12 }}>🛢️ UCO Available</span>
                <strong style={{ color: '#6366f1' }}>{point.ucoLiters}L</strong>
              </div>
              <div style={{ marginTop: 4, fontSize: 11, color: '#888' }}>
                Last collected: {point.lastCollection}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Vehicle route history polylines */}
      {vehicles.map(vehicle => (
        vehicle.history.length > 1 && (
          <Polyline
            key={`route-${vehicle.id}`}
            positions={vehicle.history.map(p => [p.lat, p.lng])}
            color={STATUS_COLORS[vehicle.status]}
            weight={selectedVehicle?.id === vehicle.id ? 4 : 2}
            opacity={selectedVehicle?.id === vehicle.id ? 0.9 : 0.4}
            dashArray={vehicle.status === 'offline' ? '6,6' : null}
          />
        )
      ))}

      {/* Vehicle markers */}
      {vehicles.map(vehicle => (
        <Marker
          key={vehicle.id}
          position={[vehicle.lat, vehicle.lng]}
          icon={createVehicleIcon(vehicle)}
          eventHandlers={{ click: () => onVehicleSelect(vehicle) }}
        >
          <Popup>
            <div style={{ minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{vehicle.type === 'truck' ? '🚛' : '🚐'}</span>
                <div>
                  <strong>{vehicle.name}</strong>
                  <div style={{ fontSize: 11, color: '#888' }}>{vehicle.plate}</div>
                </div>
                <span style={{
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 11,
                  background: STATUS_COLORS[vehicle.status] + '22',
                  color: STATUS_COLORS[vehicle.status],
                  fontWeight: 600,
                }}>
                  {vehicle.status.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <span>👤 {vehicle.driver.name.split(' ')[0]}</span>
                <span>⚡ {vehicle.speed} km/h</span>
                <span>⛽ {vehicle.fuelLevel}%</span>
                <span>🛢️ {vehicle.tankCurrent}L</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Pulse ring for active vehicles */}
      {vehicles
        .filter(v => v.status === 'active')
        .map(vehicle => (
          <Circle
            key={`pulse-${vehicle.id}`}
            center={[vehicle.lat, vehicle.lng]}
            radius={80}
            color={STATUS_COLORS.active}
            fillColor={STATUS_COLORS.active}
            fillOpacity={0.05}
            weight={1}
            opacity={0.4}
          />
        ))}
    </MapContainer>
  )
}
