export interface RetreatMeta {
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  tag: string;
}

export const featuredRetreatsMeta: Record<string, RetreatMeta> = {
  'weekend-retreat': {
    image: { src: '/Images/Journeys/weekend.webp', alt: 'Weekend Retreat' },
    tag: 'Weekend',
  },
  'yoga-and-movement': {
    image: { src: '/Images/Journeys/yoga.webp', alt: 'Yoga Retreat' },
    tag: 'Yoga',
  },
  'meditation-and-silence': {
    image: { src: '/Images/Journeys/meditation.webp', alt: 'Meditation Retreat' },
    tag: 'Silence',
  },
};

export const featuredRetreatsSlugs = ['weekend-retreat', 'yoga-and-movement', 'meditation-and-silence'];