// content/retreats/locations.ts

import type { LocationId } from '@/config/locations';

export interface Location {
  id: LocationId;
  name: string;
  tagline: string;
  supportsRetreats: boolean;
  supportsTreks: boolean;
  active: boolean;
  priority: number;
  image: string;
  href: string;
}

export const locationsData: Location[] = [
  {
    id: 'chakrata',
    name: 'Chakrata',
    tagline: 'A quiet Himalayan hill town, easily accessible from Dehradun.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 1,
    image: '/Images/location/chakrata.webp',
    href: '/retreats/chakrata',
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tagline: 'Remote Himalayan basecamp for classic multi-day treks.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 2,
    image: '/Images/location/sankri.webp',
    href: '/retreats/sankri',
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    tagline: 'A soft, accessible Himalayan retreat—romance and quiet in the clouds.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 3,
    image: '/Images/location/mussoorie.webp',
    href: '/retreats/mussoorie',
  },
  {
    id: 'munsiyari',
    name: 'Munsiyari',
    tagline: 'High-altitude alpine meadows for transformation and embodied presence.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 4,
    image: '/Images/location/munsiyari.webp',
    href: '/retreats/munsiyari',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga capital and spiritual gateway—traditions alive on the Ganges.',
    supportsRetreats: true,
    supportsTreks: false,
    active: true,
    priority: 5,
    image: '/Images/location/rishikesh.webp',
    href: '/retreats/rishikesh',
  },
  {
    id: 'zanskar',
    name: 'Zanskar',
    tagline: 'A high-altitude river valley in Ladakh — raw remoteness, ancient monasteries, and transformative silence.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 6,
    image: '/Images/location/zanskar.webp',
    href: '/retreats/zanskar',
  },
];

export function getAllLocations(): Location[] {
  return locationsData;
}

export function getLocation(id: string): Location | undefined {
  return locationsData.find((loc) => loc.id === id);
}