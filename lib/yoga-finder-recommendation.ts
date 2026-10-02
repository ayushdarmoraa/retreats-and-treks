import type { YogaRetreatProductId } from '../config/retreatProgramEvents';

export type YogaRecommendation = {
  productId?: YogaRetreatProductId;
  ttc?: boolean;
  helpMeChoose?: boolean;
  requestedLocation: string;
  reason: string;
  custom: boolean;
  href: string;
};

export function getYogaRecommendation(answers: Record<string, string>): YogaRecommendation {
  const location = answers.yogaLocation === 'unsure' ? '' : answers.yogaLocation || '';
  const duration = answers.yogaDuration || '';
  const experience = answers.yogaExperience || '';

  if (answers.yogaType === 'ttc') {
    return { requestedLocation: location, reason: 'You selected structured Yoga study and teacher preparation.', custom: false, ttc: true, href: '/yoga-teacher-training' };
  }
  if (location && location !== 'rishikesh') {
    const customHref: Record<string, string> = {
      chakrata: '/retreats/chakrata/yoga-retreat',
      sankri: '/retreats/sankri/yoga-retreat',
      zanskar: '/yoga-retreat-zanskar',
      other: '/retreats/yoga-retreat-uttarakhand',
    };
    return { requestedLocation: location, reason: `${location} is handled as a custom, demand-led Yoga enquiry. Rishikesh is the regular published alternative.`, custom: true, href: customHref[location] ?? '/retreats/yoga-retreat-uttarakhand' };
  }
  if (duration === 'Weekend') return { productId: 'yoga-rishikesh-weekend', requestedLocation: location || 'rishikesh', reason: 'You selected a limited-time Weekend format.', custom: false, href: '/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry' };
  if (duration === '5 days') return { productId: 'yoga-rishikesh-5-day', requestedLocation: location || 'rishikesh', reason: 'You selected the primary introductory 5-day format.', custom: false, href: '/5-day-yoga-retreat' };
  if (experience === 'Beginner' && (!duration || duration === 'Flexible')) return { productId: 'yoga-rishikesh-5-day', requestedLocation: location || 'rishikesh', reason: 'The 5-day format is the primary introductory Rishikesh retreat and suits a beginner with no fixed duration preference.', custom: false, helpMeChoose: true, href: '/5-day-yoga-retreat' };
  if (duration === '7 days') return { productId: 'yoga-rishikesh-7-day', requestedLocation: location || 'rishikesh', reason: 'You selected a deeper immersion with more time for consistency and workshops.', custom: false, href: '/7-day-yoga-retreat' };
  if (duration === '10 days') return { productId: 'yoga-rishikesh-10-day', requestedLocation: location || 'rishikesh', reason: 'You selected an extended immersion with sustained routine and reflective time.', custom: false, href: '/10-day-yoga-retreat' };
  return { productId: 'yoga-rishikesh-5-day', requestedLocation: location || 'rishikesh', reason: 'You have no fixed preference, so the 5-day Rishikesh retreat is the clearest starting point.', custom: false, helpMeChoose: true, href: '/5-day-yoga-retreat' };
}
