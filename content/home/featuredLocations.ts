// ── Location Type & Default Data ──
export interface Location {
  id: string;
  name: string;
  tagline: string;
}

export const defaultLocations: Location[] = [
  { id: 'chakrata', name: 'Chakrata', tagline: 'Offbeat Himalayan village' },
  { id: 'sankri', name: 'Sankri', tagline: 'Gateway to Har Ki Dun' },
  { id: 'munsiyari', name: 'Munsiyari', tagline: 'Panoramic Himalayan views' },
  { id: 'mussoorie', name: 'Mussoorie', tagline: 'Queen of the Hills' },
  { id: 'rishikesh', name: 'Rishikesh', tagline: 'Yoga capital of the world' },
  { id: 'zanskar', name: 'Zanskar', tagline: 'Remote Himalayan valley' },
];

// ── Location Images ──
export interface LocationImage {
  src: string;
  alt: string;
}

export const locationImages: Record<string, LocationImage> = {
  'chakrata': {
    src: '/Images/location/chakrata.webp',
    alt: 'Chakrata',
  },
  'sankri': {
    src: '/Images/location/sankri.webp',
    alt: 'Sankri',
  },
  'munsiyari': {
    src: '/Images/location/munsiyari.webp',
    alt: 'Munsiyari',
  },
  'mussoorie': {
    src: '/Images/location/mussoorie.webp',
    alt: 'Mussoorie',
  },
  'rishikesh': {
    src: '/Images/location/rishikesh.webp',
    alt: 'Rishikesh',
  },
  'zanskar': {
    src: '/Images/location/zanskar.webp',
    alt: 'Zanskar',
  },
  'joshimath': {
    src: '/Images/location/joshimath.webp',
    alt: 'Joshimath',
  },
  'lohajung': {
    src: '/Images/location/lohajung.webp',
    alt: 'Lohajung',
  },
};

export const defaultLocationImage: LocationImage = {
  src: '/Images/location/chakrata.webp',
  alt: 'Location',
};