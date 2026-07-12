export interface PathData {
  id: number;
  slug: 'retreats' | 'treks';
  tag: string;
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
}

export const twoPathsData: PathData[] = [
  {
    id: 1,
    slug: 'retreats',
    tag: 'Retreats',
    title: 'Stillness & Inner Reset',
    subtitle: 'Find silence in the mountains',
    image: {
      src: '/Images/Journeys/Stillness.webp',
      alt: 'Stillness and inner reset — Himalayan retreat',
    },
    description:
      'Stillness and inner recalibration. Time to reset your nervous system and come home to yourself.',
  },
  {
    id: 2,
    slug: 'treks',
    tag: 'Treks',
    title: 'Movement & High Terrain',
    subtitle: 'Walk where your mind clears',
    image: {
      src: '/Images/Journeys/HighTerrain.webp',
      alt: 'Movement and high terrain — Himalayan trek',
    },
    description:
      'Movement and embodied presence. Walking through high terrain where your mind becomes clear.',
  },
];