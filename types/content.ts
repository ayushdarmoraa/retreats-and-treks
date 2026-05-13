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


	/** Depth content (Phase 1 expansion) */
	safety?: string;
	permits?: string;
	monthlyConditions?: { month: string; conditions: string }[];
	whoShouldAvoid?: string;
	localLogistics?: string;

	/** High-intent sections (2026 upgrade) */
	priceRange?: string;
	groupSize?: string;
	howToReach?: string[];
	packingList?: string[];
	altitudeProfile?: string[];
	risksAndSafety?: string[];

	/** Freshness signal for sitemap lastmod */
	updatedAt?: string;

	/** Visual/conversion upgrade (2026-Q2) — all optional, backward compatible */
	heroImage?: string;                  // Hero image src (e.g. /Images/trek/hero/brahmatal-hero.webp)
	heroImageAlt?: string;               // Hero image alt for SEO
	heroTagline?: string;                // Emotional subheadline under H1
	trustSignals?: { label: string; sublabel?: string }[];  // Hero trust strip (4 items ideal)
	whyThisTrek?: { headline: string; body: string };       // Narrative "why" block, 150-250 words
	emotionalHooks?: { icon?: string; title: string; body: string }[];  // 4-6 icon cards
	experienceGallery?: { src: string; alt: string; caption?: string }[]; // 4-6 cinematic images
	cinematicMoment?: { image: string; alt: string; quote: string; attribution?: string }; // Full-bleed quote
	difficultyProfile?: {                // Visual 4-axis meter (0-5 integer scale)
		physical: number;
		technical: number;
		altitude: number;
		weather: number;
	};
	whatYouExperience?: string[];        // Secondary highlights for visual cards
	seoKeywordCluster?: string[];        // Long-tail keywords surfaced in final summary
};

/* ---------- Blog ---------- */

export type BlogContent = {
	/** Core SEO */
	slug: string;
	title: string;
        seoTitle?: string;
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

	/** Optional FAQ items for FAQPage JSON-LD schema */
	faqItems?: Array<{ question: string; answer: string }>;
};
