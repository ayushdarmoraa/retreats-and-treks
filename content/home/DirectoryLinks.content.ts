export interface DirectoryColumn {
  title: string;
  links: { text: string; href: string }[];
}

export const directoryLinksContent: {
  eyebrow: string;
  headline: string;
  accentWords: number;
  subtext: string;
  columns: DirectoryColumn[];
} = {
  eyebrow: 'Directory',
  headline: 'Featured Journeys & Hubs',
  accentWords: 2,
  subtext: 'Quick access to our high-intent retreat programs and priority alpine locations.',
  columns: [
    {
      title: 'Core Hubs',
      links: [
        { text: 'Himalayan retreats — programs', href: '/retreats' },
        { text: 'Best retreats in Uttarakhand', href: '/retreats/best-retreat-in-uttarakhand' },
        { text: 'Himalayan treks — routes', href: '/treks' },
        { text: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
        { text: 'Program comparison matrix', href: '/retreat-programs' },
      ],
    },
    {
      title: 'High-Intent Programs',
      links: [
        { text: 'Burnout Recovery retreat', href: '/retreats/journeys/burnout-recovery' },
        { text: 'Rest & Reset retreat', href: '/retreats/journeys/rest-and-reset' },
        { text: 'Yoga & Movement retreat', href: '/retreats/journeys/yoga-and-movement' },
        { text: 'Creative Healing Retreat', href: '/creative-retreat' },
      ],
    },
    {
      title: 'Priority Locations',
      links: [
        { text: 'Chakrata forest retreats', href: '/locations/chakrata' },
        { text: 'Sankri basecamp escapes', href: '/locations/sankri' },
        { text: 'Rishikesh yoga riverfront', href: '/locations/rishikesh' },
        { text: 'Joshimath sanctuary', href: '/locations/joshimath' },
      ],
    },
    {
      title: 'Expedition Treks',
      links: [
        { text: 'Brahmatal Winter Trek', href: '/treks/location/lohajung/brahmatal-trek' },
        { text: 'Roopkund Lake', href: '/treks/location/lohajung/roopkund-trek' },
        { text: 'Har Ki Dun Valley', href: '/treks/location/sankri/har-ki-dun-trek' },
        { text: 'Dayara Bugyal Meadows', href: '/treks/location/barsu/dayara-bugyal-trek' },
      ],
    },
  ],
};