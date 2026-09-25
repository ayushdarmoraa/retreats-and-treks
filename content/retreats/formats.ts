// content/retreats/formats.ts

export interface RetreatFormat {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  href: string;
}

export const retreatFormatsData: RetreatFormat[] = [
  {
    slug: 'weekend-retreat',
    title: 'Weekend Retreat',
    description: 'A peaceful 2–3 day retreat combining rest, nature immersion, and guided wellness activities in a serene mountain setting.',
    tag: 'Weekend',
    image: '/Images/Journeys/weekend.webp',
    href: '/retreats/journeys/weekend-retreat',
  },
  {
    slug: 'meditation-retreat',
    title: 'Meditation Retreat',
    description: 'A transformative 2–3 day meditation retreat with guided sessions, mindfulness practice, and silent immersion in nature.',
    tag: 'Meditation',
    image: '/Images/Journeys/meditation.webp',
    href: '/retreats/journeys/meditation-silence',
  },
  {
    slug: 'yoga-retreat',
    title: 'Yoga Retreat',
    description: 'A rejuvenating 2–3 day yoga retreat with daily classes, asana practice, pranayama, and holistic wellness in a mountain setting.',
    tag: 'Yoga',
    image: '/Images/Journeys/yoga.webp',
    href: '/retreats/journeys/yoga-and-movement',
  },
];

export function getAllRetreatFormats(): RetreatFormat[] {
  return retreatFormatsData;
}

export function getRetreatFormat(slug: string): RetreatFormat | undefined {
  return retreatFormatsData.find((f) => f.slug === slug);
}