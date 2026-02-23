/* =========================================================
   LOCATION REGISTRY — v1.0 (SINGLE SOURCE OF TRUTH)
   Every location in the platform is defined here.
   Adding a new location = add one entry. No other edits.
========================================================= */

export type LocationId = typeof LOCATIONS[number]['id'];

export const LOCATIONS = [
  {
    id: 'chakrata',
    name: 'Chakrata',
    tagline: 'A quiet Himalayan hill town, easily accessible from Dehradun.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 1,
    geo: { latitude: 30.704, longitude: 77.861 },
    address: { region: 'Uttarakhand', country: 'IN' },
    touristType: ['Wellness Travelers', 'Meditation Practitioners', 'Nature Retreat Seekers'],
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tagline: 'Remote Himalayan basecamp for classic multi-day treks.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 2,
    geo: { latitude: 31.043, longitude: 78.106 },
    address: { region: 'Uttarakhand', country: 'IN' },
    touristType: ['Adventure Trekkers', 'High-Altitude Hikers', 'Nature Explorers'],
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    tagline: 'A soft, accessible Himalayan retreat—romance and quiet in the clouds.',
    supportsRetreats: true,
    supportsTreks: false,
    active: true,
    priority: 3,
    geo: { latitude: 30.459, longitude: 78.066 },
    address: { region: 'Uttarakhand', country: 'IN' },
    touristType: ['Wellness Travelers', 'Romantic Getaway Seekers', 'Weekend Retreat Seekers'],
  },
  {
    id: 'munsiyari',
    name: 'Munsiyari',
    tagline: 'High-altitude alpine meadows for transformation and embodied presence.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 4,
    geo: { latitude: 29.963, longitude: 80.228 },
    address: { region: 'Uttarakhand', country: 'IN' },
    touristType: ['Adventure Trekkers', 'Meditation Practitioners', 'Spiritual Seekers'],
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga capital and spiritual gateway—traditions alive on the Ganges.',
    supportsRetreats: true,
    supportsTreks: false,
    active: true,
    priority: 5,
    geo: { latitude: 30.087, longitude: 78.268 },
    address: { region: 'Uttarakhand', country: 'IN' },
    touristType: ['Yoga Practitioners', 'Spiritual Seekers', 'Wellness Travelers'],
  },
] as const;

/**
 * Get a location by ID
 * Returns undefined if location not found or inactive
 */
export function getLocation(id: string) {
  return LOCATIONS.find((loc) => loc.id === id && loc.active);
}

/**
 * Get all active locations
 */
export function getActiveLocations() {
  return LOCATIONS.filter((loc) => loc.active).sort((a, b) => a.priority - b.priority);
}

/**
 * Get all locations that support retreats
 */
export function getRetreatsLocations() {
  return getActiveLocations().filter((loc) => loc.supportsRetreats);
}

/**
 * Get all locations that support treks
 */
export function getTraksLocations() {
  return getActiveLocations().filter((loc) => loc.supportsTreks);
}
