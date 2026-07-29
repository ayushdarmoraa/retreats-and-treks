export interface StepData {
  id: number;
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const howItWorksSteps: StepData[] = [
  {
    id: 1,
    step: '01',
    title: "You share what you're seeking",
    desc: "Your intention, what's happening in your life, what a retreat would need to be.",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 2,
    step: '02',
    title: 'We help you choose the right land',
    desc: 'Which location and which retreat format makes sense — or we suggest something unexpected.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
      </svg>
    ),
  },
  {
    id: 3,
    step: '03',
    title: 'Your journey takes shape',
    desc: 'In conversation. Not checkout pages, not templates. A retreat designed for you.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
];