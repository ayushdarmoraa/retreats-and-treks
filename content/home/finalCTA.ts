export interface StatData {
  id: number;
  num: string;
  label: string;
}

export interface FeatureData {
  id: number;
  text: string;
}

export const finalCTAStats: StatData[] = [
  { id: 1, num: '8+', label: 'Locations' },
  { id: 2, num: '100%', label: 'Custom' },
  { id: 3, num: '1:1', label: 'Consult' },
];

export const finalCTAFeatures: FeatureData[] = [
  { id: 1, text: 'Small groups only — never crowded' },
  { id: 2, text: 'Every journey built in conversation' },
  { id: 3, text: 'No fixed dates, no fixed packages' },
];

export const finalCTATags: string[] = ['Small groups', 'No fixed dates', 'Fully custom'];