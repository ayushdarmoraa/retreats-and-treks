export interface PlanningResourceLink {
  text: string;
  href: string;
}

export const planningResourcesContent: {
  headline: string;
  accentWords: number;
  links: PlanningResourceLink[];
} = {
  headline: 'Retreat Planning Resources',
  accentWords: 1,
  links: [
    { text: 'Compare All Retreat Programs', href: '/retreat-programs' },
    { text: 'How to Choose the Right Retreat', href: '/topics/retreat-decision' },
    { text: 'Explore Basecamp Locations', href: '/locations' },
    { text: 'View Retreat Calendar', href: '/retreat-calendar' },
  ],
};