export interface TestimonialData {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  meta: string;
  vibe: string;
  review: string;
  stars: number;
}

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    image: { src: '/Images/Testimonials/priya.webp', alt: 'Priya Mehta' },
    name: 'Priya Mehta',
    meta: 'Chakrata · Meditation Retreat',
    vibe: '🧘 Meditation',
    review:
      'I came burnt out and left feeling like myself again. The silence, the mountains, the pace — nothing was rushed. It felt designed just for me, because it was.',
    stars: 5,
  },
  {
    id: 2,
    image: { src: '/Images/Testimonials/rohan.webp', alt: 'Rohan Sharma' },
    name: 'Rohan Sharma',
    meta: 'Sankri · Weekend Retreat',
    vibe: '🍵 Tea Vibes',
    review:
      "Woke up to mist over the valley every morning. The evenings around the fire with chai — I didn't know I needed this until I was in it. Already planning the next one.",
    stars: 5,
  },
  {
    id: 3,
    image: { src: '/Images/Testimonials/anika.webp', alt: 'Anika Verma' },
    name: 'Anika Verma',
    meta: 'Munsiyari · Walking Retreat',
    vibe: '🚶 Walking',
    review:
      "The walks weren't just physical — something shifted internally. By day three, my mind was quieter than it's been in years. This place changes you.",
    stars: 5,
  },
];