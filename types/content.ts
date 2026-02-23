import { LocationId } from '@/config/locations';

/* =========================================================
	 SEO MASTER CONTENT SCHEMAS — v1.0 (LOCKED)
	 Do NOT modify without architectural review
========================================================= */

/* ---------- Shared ---------- */

export type ImageAsset = {
	src: string;
	alt: string;
};

export type FAQ = {
	question: string;
	answer: string;
};

/* ---------- Retreat ---------- */

export type RetreatContent = {
	/** Core SEO */
	slug: string;
	title: string;              // H1 + <title>
	description: string;        // meta description

	/** Classification */
	locationId: LocationId;
	retreatType:
		| 'Meditation'
		| 'Yoga'
		| 'Wellness'
		| 'Digital Detox'
		| 'Art'
		| 'Music';

	/** Logistics */
	duration: string;           // e.g. "2 Nights / 3 Days"
	pickupPoint: string;        // e.g. "Dehradun"
	bestFor: string[];          // burnout, beginners, professionals

	/** Page content */
	overview: string;
	highlights: string[];
	itinerary: string[];
	inclusions: string[];
	exclusions: string[];

	/** Media */
	images: ImageAsset[];

	/** Trust & conversion */
	faqs: FAQ[];
	ctaLabel: string;           // e.g. "WhatsApp Us"
};

/* ---------- Trek ---------- */

export type TrekContent = {
	/** Core SEO */
	slug: string;
	title: string;
	description: string;

	/** Classification */
	locationId: LocationId;
	trekType:
		| 'Weekend Trek'
		| 'Guided Trek'
		| 'Beginner Trek'
		| 'Waterfall Trek'
		| 'Cave Trek';

	/** Difficulty & safety */
	difficulty: 'Easy' | 'Moderate' | 'Challenging';
	altitude?: string;
	distance?: string;

	/** Logistics */
	duration: string;
	bestSeason: string[];
	pickupPoint: string;

	/** Page content */
	overview: string;
	highlights: string[];
	itinerary: string[];
	inclusions: string[];
	exclusions: string[];

	/** Media */
	images: ImageAsset[];

	/** Trust */
	faqs: FAQ[];
	/** Content linking */
	relatedBlogSlugs?: string[];
};

/* ---------- Blog ---------- */

export type BlogContent = {
	/** Core SEO */
	slug: string;
	title: string;
	description: string;

	/** Classification */
	category:
		| 'Location Authority'
		| 'Retreat Decision'
		| 'Trek Decision'
		| 'Lifestyle';

	/** Content */
	publishedAt: string;
	lastUpdated?: string;       // ISO date string; falls back to publishedAt if absent
	readingTime: string;
	content: string;            // markdown or HTML string

	/** SEO linking rule */
	targetMoneyPage: string;    // EXACTLY ONE internal link
	/** Additional internal authority links */
	relatedTreks?: string[];
	relatedRetreats?: string[];
};
