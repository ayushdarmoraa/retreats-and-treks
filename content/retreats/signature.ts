// content/retreats/signature.ts

export interface SignatureRetreat {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  href: string;
}

export const signatureRetreatsData: SignatureRetreat[] = [
  {
    slug: 'yoga-retreat-uttarakhand',
    title: 'Yoga Retreats',
    description: 'Multi-day Himalayan yoga retreats focused on movement, breath, recovery and mindful living.',
    tag: 'Yoga',
    image: '/Images/services/yoga.webp',
    href: '/retreats/yoga-retreat-uttarakhand',
  },
  {
    slug: 'meditation-retreat-uttarakhand',
    title: 'Meditation Retreats',
    description: 'Guided meditation retreats designed for silence, clarity, emotional balance and deep rest.',
    tag: 'Meditation',
    image: '/Images/Journeys/meditation.webp',
    href: '/retreats/meditation-retreat-uttarakhand',
  },
  {
    slug: 'weekend-himalayan-retreats',
    title: 'Weekend Retreats',
    description: 'Short Himalayan escapes designed for busy professionals needing genuine rest.',
    tag: 'Weekend',
    image: '/Images/services/weekendretreat.webp',
    href: '/retreats/weekend-himalayan-retreats',
  },
  {
    slug: 'creative-retreat',
    title: 'Creative Healing Retreat',
    description: 'Art, journaling, nature and mindfulness combined into one immersive healing experience.',
    tag: 'Creative',
    image: '/Images/services/artcreative.webp',
    href: '/creative-retreat',
  },
];

export function getAllSignatureRetreats(): SignatureRetreat[] {
  return signatureRetreatsData;
}

export function getSignatureRetreat(slug: string): SignatureRetreat | undefined {
  return signatureRetreatsData.find((r) => r.slug === slug);
}