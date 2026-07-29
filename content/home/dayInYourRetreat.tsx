export interface TimelineItemData {
  id: number;
  time: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const timelineItems: TimelineItemData[] = [
  {
    id: 1,
    time: 'Morning',
    title: 'Yoga & Stillness',
    desc: 'Gentle movement as the sun rises over the peaks. Breathwork, asana, and silence before the world wakes.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
  {
    id: 2,
    time: 'Afternoon',
    title: 'Explore & Wander',
    desc: 'Forest walks, village trails, or simply sitting by a stream. The mountain teaches at its own pace.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M3 17l4-8 4 4 3-6 4 10"/>
        <path d="M2 20h20"/>
      </svg>
    ),
  },
  {
    id: 3,
    time: 'Evening',
    title: 'Sunset & Reflection',
    desc: 'Watch the light shift over the valley. Journal, sketch, or just be. No agenda, only presence.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
        <path d="M19 3v4M21 5h-4"/>
      </svg>
    ),
  },
  {
    id: 4,
    time: 'Night',
    title: 'Chill & Unwind',
    desc: 'Chai around the fire. Conversations that matter, or the comfort of deep mountain silence.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 22c4.97 0 9-2.69 9-6 0-1.5-.75-2.87-2-3.9"/>
        <path d="M12 16c4.97 0 9-2.69 9-6S16.97 4 12 4 3 6.69 3 10c0 1.5.75 2.87 2 3.9"/>
        <path d="M12 16v6M8 18l4 4 4-4"/>
      </svg>
    ),
  },
];