export interface LifeItemData {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  tag: string;
  title: string;
  desc: string;
}

export const lifeItems: LifeItemData[] = [
  {
    id: 1,
    image: { src: '/Images/Moments/meditation.webp', alt: 'Meditation in mountains' },
    tag: '🧘 Meditation',
    title: 'Stillness in the Mountains',
    desc: 'Morning practice as mist lifts over the valley. Breathwork, silence, and the sound of wind.',
  },
  {
    id: 2,
    image: { src: '/Images/Moments/walking.webp', alt: 'Walking in mountains' },
    tag: '🚶 Walking',
    title: 'Trails That Clear the Mind',
    desc: 'Forest paths, ridge walks, and the kind of quiet that only mountains offer.',
  },
  {
    id: 3,
    image: { src: '/Images/Moments/tea.webp', alt: 'Tea by the fire' },
    tag: '🍵 Tea Vibes',
    title: 'Evenings Around the Fire',
    desc: 'Chai, conversation, and the warmth of a fire as the Himalayas turn golden.',
  },
];