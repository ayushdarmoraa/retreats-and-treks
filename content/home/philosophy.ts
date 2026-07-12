export interface PhilosophyCard {
  id: number;
  title: string;
  body: string;
}

export const philosophyCards: PhilosophyCard[] = [
  {
    id: 1,
    title: 'Designed Around You',
    body: "We don't run fixed events or fixed schedules. We design journeys around what you're actually seeking — whether that's stillness, challenge, or transformation.",
  },
  {
    id: 2,
    title: 'Locations With Purpose',
    body: 'Each Himalayan location is chosen deliberately — for its landscape, its silence, and its medicine. Not for convenience. Not for trend.',
  },
  {
    id: 3,
    title: 'Conversation First',
    body: 'Your journey takes shape in dialogue, not forms. We listen before we suggest — because the right retreat may not be the first one you imagine.',
  },
];