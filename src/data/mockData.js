// Mock data for UCO (Used Cooking Oil) Collection Fleet
// Locations centered around a city (using Paris as example)

export const COLLECTION_POINTS = [
  { id: 'cp1', name: 'Le Bistro Central', type: 'restaurant', lat: 48.8566, lng: 2.3522, ucoLiters: 80, lastCollection: '2026-02-15', address: '12 Rue de Rivoli, Paris' },
  { id: 'cp2', name: 'Grande Brasserie', type: 'restaurant', lat: 48.8606, lng: 2.3376, ucoLiters: 120, lastCollection: '2026-02-14', address: '5 Boulevard Haussmann, Paris' },
  { id: 'cp3', name: 'Hotel Lumière Kitchen', type: 'hotel', lat: 48.8738, lng: 2.2950, ucoLiters: 200, lastCollection: '2026-02-10', address: '88 Avenue des Ternes, Paris' },
  { id: 'cp4', name: 'Cafétéria Universitaire', type: 'canteen', lat: 48.8462, lng: 2.3446, ucoLiters: 150, lastCollection: '2026-02-12', address: '45 Rue des Écoles, Paris' },
  { id: 'cp5', name: 'Snack du Marché', type: 'restaurant', lat: 48.8628, lng: 2.3617, ucoLiters: 60, lastCollection: '2026-02-16', address: '3 Rue du Temple, Paris' },
  { id: 'cp6', name: 'Fast & Fresh', type: 'fastfood', lat: 48.8702, lng: 2.3070, ucoLiters: 95, lastCollection: '2026-02-13', address: '17 Rue de Passy, Paris' },
  { id: 'cp7', name: 'Boulangerie Dumont', type: 'bakery', lat: 48.8519, lng: 2.3688, ucoLiters: 40, lastCollection: '2026-02-11', address: '22 Rue de la Bastille, Paris' },
  { id: 'cp8', name: 'Hôpital Saint-Louis Cantine', type: 'canteen', lat: 48.8724, lng: 2.3620, ucoLiters: 280, lastCollection: '2026-02-09', address: '1 Avenue Claude Vellefaux, Paris' },
  { id: 'cp9', name: 'Kebab Palace', type: 'fastfood', lat: 48.8799, lng: 2.3553, ucoLiters: 55, lastCollection: '2026-02-16', address: '34 Rue Marx Dormoy, Paris' },
  { id: 'cp10', name: 'Resto du Cœur', type: 'canteen', lat: 48.8669, lng: 2.3852, ucoLiters: 110, lastCollection: '2026-02-08', address: '7 Rue de Lagny, Paris' },
];

export const DRIVERS = [
  { id: 'd1', name: 'Jean-Pierre Moreau', phone: '+33 6 12 34 56 78', avatar: 'JP', rating: 4.8 },
  { id: 'd2', name: 'Amina Bouchard', phone: '+33 6 23 45 67 89', avatar: 'AB', rating: 4.9 },
  { id: 'd3', name: 'Luca Fernandez', phone: '+33 6 34 56 78 90', avatar: 'LF', rating: 4.7 },
  { id: 'd4', name: 'Sophie Leroy', phone: '+33 6 45 67 89 01', avatar: 'SL', rating: 4.6 },
];

export const VEHICLES = [
  {
    id: 'v1',
    name: 'UCO Truck Alpha',
    plate: 'PA-001-UCO',
    type: 'truck',
    status: 'active',
    driver: DRIVERS[0],
    lat: 48.8610,
    lng: 2.3490,
    speed: 32,
    heading: 45,
    fuelLevel: 68,
    tankCapacity: 1000,
    tankCurrent: 420,
    mileage: 87432,
    lastUpdate: '2 min ago',
    todayCollections: 3,
    todayUCO: 260,
    route: {
      current: 'cp2',
      next: 'cp5',
      completed: ['cp1', 'cp2'],
      remaining: ['cp5', 'cp10'],
    },
    history: [
      { lat: 48.8566, lng: 2.3522 },
      { lat: 48.8580, lng: 2.3530 },
      { lat: 48.8595, lng: 2.3500 },
      { lat: 48.8606, lng: 2.3376 },
      { lat: 48.8610, lng: 2.3490 },
    ],
  },
  {
    id: 'v2',
    name: 'UCO Truck Beta',
    plate: 'PA-002-UCO',
    type: 'truck',
    status: 'active',
    driver: DRIVERS[1],
    lat: 48.8702,
    lng: 2.3070,
    speed: 18,
    heading: 270,
    fuelLevel: 45,
    tankCapacity: 1000,
    tankCurrent: 695,
    mileage: 62187,
    lastUpdate: '1 min ago',
    todayCollections: 4,
    todayUCO: 445,
    route: {
      current: 'cp6',
      next: 'cp3',
      completed: ['cp4', 'cp7', 'cp6'],
      remaining: ['cp3'],
    },
    history: [
      { lat: 48.8462, lng: 2.3446 },
      { lat: 48.8519, lng: 2.3688 },
      { lat: 48.8600, lng: 2.3500 },
      { lat: 48.8660, lng: 2.3200 },
      { lat: 48.8702, lng: 2.3070 },
    ],
  },
  {
    id: 'v3',
    name: 'UCO Van Gamma',
    plate: 'PA-003-UCO',
    type: 'van',
    status: 'idle',
    driver: DRIVERS[2],
    lat: 48.8724,
    lng: 2.3620,
    speed: 0,
    heading: 0,
    fuelLevel: 92,
    tankCapacity: 500,
    tankCurrent: 110,
    mileage: 34901,
    lastUpdate: '8 min ago',
    todayCollections: 2,
    todayUCO: 165,
    route: {
      current: 'cp8',
      next: 'cp9',
      completed: ['cp8'],
      remaining: ['cp9'],
    },
    history: [
      { lat: 48.8800, lng: 2.3700 },
      { lat: 48.8760, lng: 2.3650 },
      { lat: 48.8724, lng: 2.3620 },
    ],
  },
  {
    id: 'v4',
    name: 'UCO Van Delta',
    plate: 'PA-004-UCO',
    type: 'van',
    status: 'offline',
    driver: DRIVERS[3],
    lat: 48.8462,
    lng: 2.3900,
    speed: 0,
    heading: 180,
    fuelLevel: 15,
    tankCapacity: 500,
    tankCurrent: 0,
    mileage: 51223,
    lastUpdate: '42 min ago',
    todayCollections: 0,
    todayUCO: 0,
    route: {
      current: null,
      next: null,
      completed: [],
      remaining: [],
    },
    history: [
      { lat: 48.8462, lng: 2.3900 },
    ],
  },
];

export const DASHBOARD_STATS = {
  totalVehicles: 4,
  activeVehicles: 2,
  idleVehicles: 1,
  offlineVehicles: 1,
  todayTotalUCO: 870,
  todayTarget: 1500,
  totalCollectionPoints: 10,
  pendingCollections: 4,
  weeklyUCO: [320, 410, 380, 520, 490, 600, 870],
  weeklyDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
};

export const STATUS_COLORS = {
  active: '#22c55e',
  idle: '#f59e0b',
  offline: '#ef4444',
};

export const STATUS_LABELS = {
  active: 'Active',
  idle: 'Idle',
  offline: 'Offline',
};

export const VEHICLE_TYPE_ICONS = {
  truck: '🚛',
  van: '🚐',
};

export const COLLECTION_POINT_ICONS = {
  restaurant: '🍽️',
  hotel: '🏨',
  canteen: '🍱',
  fastfood: '🍟',
  bakery: '🥐',
};
