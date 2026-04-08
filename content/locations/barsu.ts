import type { LocationPremiumContent } from '@/content/locations/index';

const barsuLocation: LocationPremiumContent = {
  id: 'barsu',
  name: 'Barsu',
  landTone: {
    opening: 'Barsu is a peaceful Himalayan village and the base for Dayara Bugyal, known for its meadows and forests.'
  },
  bridgingInnerWorkMovement: {
    title: 'Why Barsu is Ideal for Beginners',
    description: 'The gentle terrain and proximity to alpine meadows make Barsu perfect for first-time trekkers and families.'
  },
  retreatLogic: {
    title: 'Why Choose Barsu',
    factors: [
      { title: 'Meadow Access', description: 'Direct trail to Dayara Bugyal.' },
      { title: 'Quiet Village', description: 'Low crowds, authentic Himalayan life.' },
      { title: 'Forests & Views', description: 'Forested approach and views of Bandarpoonch.' }
    ]
  },
  intentionsFit: {
    title: 'Who Will Love Barsu',
    description: 'Best for beginners, families, and those seeking gentle Himalayan adventure.',
    intentions: [
      { title: 'Beginner Trekkers', description: 'Gentle, non-technical terrain.' },
      { title: 'Nature Lovers', description: 'Forests, meadows, and wildlife.' },
      { title: 'Families', description: 'Safe and accessible for all ages.' }
    ]
  },
  seasonalCharacter: {
    title: 'Seasonal Character',
    seasons: [
      { month: 'January', mood: 'Snowy', description: 'Meadows covered in snow, ideal for winter trekking.' },
      { month: 'April', mood: 'Green', description: 'Meadows turn lush green, rhododendrons bloom.' },
      { month: 'June', mood: 'Alpine', description: 'Clear skies, best for panoramic views.' }
    ]
  },
  practicalContext: {
    title: 'Practical Info',
    bestSeasons: 'December–March (snow), April–June (green meadows)',
    accessibility: 'Drive from Dehradun/Rishikesh via Uttarkashi (6–7 hrs)',
    crowdProfile: 'Low to moderate, mostly trekkers',
    notFor: 'Not for those seeking high-altitude challenge or luxury.'
  },
  networkContext: 'Barsu is connected by road and is the main base for Dayara Bugyal. Limited mobile coverage.',
  ctaText: 'Trek Dayara Bugyal from Barsu',
  retreatSlugs: [],
  trekSlugs: ['dayara-bugyal-trek'],
  relatedBlogSlugs: [],
  placesAndLandscapes: [
    { name: 'Dayara Bugyal', type: 'meadow', description: 'One of Uttarakhand’s largest and most scenic alpine meadows.' },
    { name: 'Barsu Village', type: 'village', description: 'Traditional Himalayan village, base for treks.' },
    { name: 'Barnala Tal', type: 'natural', description: 'Small high-altitude lake en route to Dayara.' }
  ],
  softExperiences: [
    { name: 'Meadow Walks', type: 'walk', description: 'Gentle walks through alpine meadows.' },
    { name: 'Village Life', type: 'cultural', description: 'Experience local Himalayan culture.' }
  ],
};

export default barsuLocation;
