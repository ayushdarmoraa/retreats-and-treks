// content/retreats/intentions.ts

export interface RetreatIntention {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
}

const intentions: RetreatIntention[] = [
  {
    slug: 'rest-and-reset',
    title: 'Rest & Reset',
    description: 'Permission to stop, for people who have been running too long.',
    tag: 'RETREAT',
    image: '/Images/services/restreset.webp',
  },
  {
    slug: 'burnout-recovery',
    title: 'Burnout Recovery',
    description: 'A weekend mountain retreat designed to help you disconnect from constant work pressure and reconnect with nature, slow living, and meaningful rest.',
    tag: 'RETREAT',
    image: '/Images/services/burnoutrec.webp',
  },
  {
    slug: 'yoga-and-movement',
    title: 'Yoga Retreats & Movement',
    description: 'Yoga retreats, teacher training, aerial yoga, and online classes guided by Sakshi.',
    tag: 'RETREAT',
    image: '/Images/services/yoga.webp',
  },
  {
    slug: 'meditation-and-silence',
    title: 'Meditation & Silence',
    description: 'Drop into the depth that silence reveals, with guidance and sanctuary.',
    tag: 'RETREAT',
    image: '/Images/Journeys/meditation.webp',
  },
  {
    slug: 'trek-and-paint',
    title: 'Trek & Paint Retreat',
    description: 'Walk the Himalayas by day, paint what you see by evening — where trail meets canvas.',
    tag: 'RETREAT',
    image: '/Images/blog/painting-in-the-himalayas.webp',
  },
  {
    slug: 'weekend-art-retreat',
    title: 'Weekend Art Retreat',
    description: 'Two days of uninterrupted creative expression in the mountains — enough to remember why you create.',
    tag: 'RETREAT',
    image: '/Images/art-retreat/art-supplies.webp',
  },
  {
    slug: 'sound-healing',
    title: 'Sound Healing',
    description: 'Bathe your nervous system in resonance that restores and recalibrates.',
    tag: 'RETREAT',
    image: '/Images/services/soundhealing.webp',
  },
  {
    slug: 'weekend-retreat',
    title: 'Weekend Retreat',
    description: 'A compressed reset for those who need mountain time but have limited availability.',
    tag: 'RETREAT',
    image: '/Images/services/weekendretreat.webp',
  },
  {
    slug: 'private-and-custom',
    title: 'Private & Custom',
    description: 'A retreat designed entirely around your needs, timeline, and intentions.',
    tag: 'RETREAT',
    image: '/Images/services/privatecustom.webp',
  },
  {
    slug: 'art',
    title: 'Art Retreats',
    description: 'Creative retreats combining art, nature, and healing practices.',
    tag: 'COLLECTION',
    image: '/Images/services/artcreative.webp',
  },
];

export function getAllIntentions(): RetreatIntention[] {
  return intentions;
}

export function getIntention(slug: string): RetreatIntention | undefined {
  return intentions.find((i) => i.slug === slug);
}