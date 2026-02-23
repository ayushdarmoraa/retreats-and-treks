import { RetreatContent } from '@/types/content';

const weekendRetreatFromDehradun: RetreatContent = {
	slug: 'weekend-retreat-from-dehradun',
	title: 'Chakrata Weekend Retreat From Dehradun',
	description:
		'A peaceful 2 nights 3 days weekend retreat in Chakrata with stay, meals, nature walks, and guided sessions. Pickup and drop from Dehradun.',

	locationId: 'chakrata',
	retreatType: 'Wellness',

	duration: '2 Nights / 3 Days',
	pickupPoint: 'Dehradun',
	bestFor: ['burnout', 'working professionals', 'weekend travelers'],

	overview:
		'This Chakrata weekend retreat from Dehradun is designed for people seeking a short but deeply refreshing break in nature. Surrounded by forests and Himalayan views, the retreat combines rest, mindful activities, and slow travel.',

	highlights: [
		'Scenic mountain stay in Chakrata',
		'Guided nature walks and silence hours',
		'Simple wellness and relaxation sessions',
		'Bonfire and quiet evenings',
		'Pickup and drop from Dehradun',
	],

	itinerary: [
		'Day 1: Pickup from Dehradun, drive to Chakrata, check-in, evening relaxation',
		'Day 2: Morning wellness session, sightseeing, nature walk, bonfire',
		'Day 3: Breakfast, reflection time, return to Dehradun',
	],

	inclusions: [
		'Accommodation',
		'All meals',
		'Local transfers',
		'Guided activities',
	],

	exclusions: [
		'Personal expenses',
		'Travel insurance',
		'Anything not mentioned in inclusions',
	],

	images: [
		{
			src: '/images/chakrata-retreat-1.jpg',
			alt: 'Mountain retreat stay in Chakrata',
		},
	],

	faqs: [
		{
			question: 'Is this retreat suitable for beginners?',
			answer:
				'Yes. This retreat is designed for beginners and people new to wellness or retreats.',
		},
		{
			question: 'Where does the trip start and end?',
			answer:
				'The retreat starts and ends in Dehradun with group pickup and drop.',
		},
	],

	ctaLabel: 'WhatsApp Us',
};

export default weekendRetreatFromDehradun;

