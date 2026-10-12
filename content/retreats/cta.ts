// content/retreats/cta.ts

export const ctaData = {
  eyebrow: 'Begin With Intention',
  headline: "Let's shape",
  accent: 'your mountain reset.',
  description:
    "Tell us what you're carrying, seeking, or ready to release — we'll shape the right location, pace, and retreat format around you.",
  points: [
    'Small groups only — never crowded',
    'Every journey built in conversation',
    'No fixed dates, no fixed packages',
  ],
  stats: [
    { num: '8+', label: 'Locations' },
    { num: '100%', label: 'Custom' },
    { num: '1:1', label: 'Consult' },
  ],
  priceLabel: 'Starting from ₹18,000',
  buttonText: 'Talk on WhatsApp',
  secondaryButtonText: 'Browse Retreats',
  tags: ['Small groups', 'No fixed dates', 'Fully custom'],
};

export function getCTAData() {
  return ctaData;
}