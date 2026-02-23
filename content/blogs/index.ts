/**
 * BLOG REGISTRY
 * Single source of truth for all blog posts
 * Imported and used by dynamic route /blog/[slug]
 */

import { BlogContent } from '@/types/content';

// Import all blog content
import trekVsRetreat from './trek-vs-retreat';
import chakrataVsMussoorie from './chakrata-vs-mussoorie-weekend-trip';
import bestTimeForRetreatInChakrata from './best-time-for-retreat-in-chakrata';
import howToReachChakrataForARetreat from './how-to-reach-chakrata-for-a-retreat';
import isChakrataGoodForARetreat from './is-chakrata-good-for-a-retreat';
import chakrataVsRishikeshForARetreat from './chakrata-vs-rishikesh-for-a-retreat';
import retreatVsTrekWhichIsRightForYou from './retreat-vs-trek-which-is-right-for-you';
import threeDayVsFiveDayHimalayanRetreat from './3-day-vs-5-day-himalayan-retreat';
import howMuchDoesAHimalayanRetreatCost from './how-much-does-a-himalayan-retreat-cost';
import bestTimeForRetreatInSankri from './best-time-for-retreat-in-sankri';
import howToReachSankriForARetreat from './how-to-reach-sankri-for-a-retreat';
import isSankriGoodForARetreat from './is-sankri-good-for-a-retreat';
import bestTimeForRetreatInMunsiyari from './best-time-for-retreat-in-munsiyari';
import howToReachMunsiyariForARetreat from './how-to-reach-munsiyari-for-a-retreat';
import isMunsiyariGoodForARetreat from './is-munsiyari-good-for-a-retreat';
import bestTimeForRetreatInRishikesh from './best-time-for-retreat-in-rishikesh';
import howToReachRishikeshForARetreat from './how-to-reach-rishikesh-for-a-retreat';
import isRishikeshGoodForARetreat from './is-rishikesh-good-for-a-retreat';

// Hardcoded blog posts (extracted from static routes)
const chakrataVsSankri: BlogContent = {
  slug: 'chakrata-vs-sankri',
  title: 'Chakrata vs Sankri: Which Is Better for Your First Himalayan Experience?',
  description:
    'Confused between Chakrata and Sankri? This comparison explains differences in vibe, activities, effort level, and who each destination is best suited for.',
  category: 'Location Authority',
  publishedAt: '2026-02-03',
  readingTime: '7 min read',
  content: `
Planning a trip to the Himalayas and wondering where to start? If you've researched Uttarakhand destinations, you've likely encountered two names: Chakrata and Sankri. Both are Himalayan destinations, both are accessible from Dehradun, and both offer authentic mountain experiences — yet they're profoundly different places.

The confusion is natural. The real question isn't which is better, but which is better for you. This guide breaks down the differences to help you choose the destination that matches your goals, timeline, and style.

## At a Glance: Chakrata vs Sankri

**Chakrata:**
- Quiet hill town with lush forests
- Wellness retreats and short nature treks
- Weekend-friendly 2–3 day visits
- Lower physical demands

**Sankri:**
- Remote mountain village
- Trekking base camp for serious adventures
- Multi-day Himalayan treks (4–7 days)
- Higher physical involvement

## Overall Vibe & Environment

**Chakrata** feels calm, forested, and introspective. The town is built for slowness — meditation, yoga, peaceful walks, and living surrounded by nature. It's a place where you pause, breathe, and reset. The pace is gentle. The expectation is reflection.

**Sankri** feels rugged and purposeful. It's a mountain village organized entirely around trekking. Guides, porters, trek infrastructure — everything here exists to support people climbing mountains. The pace is deliberate. The expectation is effort.

## Activities: Retreats vs Treks

**Chakrata** is retreat-first. You go to Chakrata for yoga, meditation, wellness, and reflective retreats. Trekking in Chakrata is secondary — short day walks, easy forest trails, waterfall hikes. The primary benefit comes from stillness.

**Sankri** is trek-only. Sankri exists as a base camp for serious multi-day Himalayan trekking. There are no wellness retreats here. The destination is the mountain experience, not the rest.

## Physical Effort & Time Commitment

**Chakrata** requires minimal preparation. A weekend holds a full retreat or light trek experience. You can arrive unprepared, settle into relaxation, and leave refreshed without significant physical or logistical challenge.

**Sankri** requires serious preparation. Multi-day treks demand 6–8 weeks of fitness training, proper gear, acclimatization plans, and mental readiness. You need at least 5–9 days off work. This isn't a weekend trip — it's a commitment.

## Accessibility & Comfort

**Chakrata** offers easier access. It's 60 km from Dehradun with good roads, a 2–3 hour drive. Accommodations include retreat centers with private rooms, comfortable beds, and basic amenities. You won't be roughing it.

**Sankri** requires a longer travel day. It's 140 km from Dehradun, 4–5 hours of mountain driving. Accommodation during treks consists of tent camps at altitude or basic mountain guesthouses. This is basic infrastructure — function over comfort.

## Which One Should You Choose?

**Choose Chakrata if you:**
- Want a calm Himalayan break from city stress
- Are curious about meditation or yoga retreats
- Have limited time (weekend available)
- Prefer gentle walking over strenuous trekking
- Want comfort and reflection over challenge

**Choose Sankri if you:**
- Want your first real Himalayan trekking experience
- Enjoy physical challenges and mountain goals
- Can commit 5–9 days and prepare properly
- Are interested in serious trails, not casual walks
- Want to summit peaks or trek through valleys

## A Note for First-Time Himalayan Travelers

There is no objectively "better" destination. The best choice is the one aligned with what you actually need right now. Choosing the right destination improves your experience quality, prevents disappointment, and sets you up for a positive first Himalayan memory. If you're looking for rest, Chakrata is perfect. If you're looking for adventure, Sankri is perfect. Knowing the difference is the key to choosing correctly.

Both Chakrata and Sankri offer authentic, meaningful Himalayan experiences — they're just fundamentally different experiences. Your choice comes down to a simple question: Are you seeking rest and reflection, or adventure and immersion? Answer that honestly, and you'll know exactly which destination to choose.
  `,
  targetMoneyPage: '/retreats/chakrata',
};

const kedarkanthaVsHarKiDun: BlogContent = {
  slug: 'kedarkantha-vs-har-ki-dun',
  title: 'Kedarkantha vs Har Ki Dun: Which Trek Is Better for Beginners?',
  description:
    'Confused between Kedarkantha and Har Ki Dun? This detailed comparison explains differences in duration, difficulty, experience, and who each trek is best for.',
  category: 'Trek Decision',
  publishedAt: '2026-02-04',
  readingTime: '6 min read',
  content: `
If you're planning your first serious Himalayan trek from Sankri, you've likely encountered two names: Kedarkantha and Har Ki Dun. Both are beginner-friendly, both start from the same base camp, and both offer incredible Himalayan experiences — yet they're fundamentally different treks.

The choice between them isn't about which is objectively better. It's about which aligns with what you want from your mountain experience. This guide breaks down the real differences to help you decide confidently.

## Quick Snapshot

**Kedarkantha:**
- Duration: 4–5 days
- Experience: Summit-focused with snow trekking
- Best for: First Himalayan peak bagging
- Key feature: Reaching a 12,500 ft summit

**Har Ki Dun:**
- Duration: 5–6 days
- Experience: Valley traverse with meadows and forests
- Best for: Complete nature immersion without peak pressure
- Key feature: Beautiful alpine meadows and pastoral valley life

## Duration & Time Commitment

**Kedarkantha** is typically completed in 4–5 days, making it ideal if you have 6–7 days of leave. It's the shorter choice for those with limited vacation time.

**Har Ki Dun** usually takes 5–6 days, requiring 7–8 days of leave. The extra day allows for a more leisurely pace and better acclimatization.

## Physical Difficulty & Climb

**Kedarkantha** is a summit push. Your highest camp is at ~12,000 ft, and the final day involves a 1,500–2,000 ft elevation gain to reach the 12,500 ft summit. There's exposed terrain and potential snow on the upper sections. This requires better fitness preparation.

**Har Ki Dun** is more moderate. You reach a maximum altitude of ~10,800 ft, and the climbing is spread over multiple days without dramatic summit push. It's physically demanding but less punishing.

## The Experience You'll Have

**Kedarkantha** gives you the summit experience. You wake before dawn on the final day, push through altitude and cold, and stand on a Himalayan peak. The sense of achievement is profound. Sunrise from the summit is unforgettable.

**Har Ki Dun** gives you the valley experience. You walk through lush forests, camp in alpine meadows, wake up to herds of grazing horses (khaki breeds), and experience mountain life as locals know it. The beauty is gentle, not triumphant.

## Who Should Choose Each Trek?

**Choose Kedarkantha if you:**
- Want your first real "summit" experience
- Have good fitness and can prepare for 6–8 weeks
- Enjoy the challenge of pushing toward a peak
- Want a powerful sense of achievement
- Can handle altitude and exposure

**Choose Har Ki Dun if you:**
- Prefer immersion in landscape over peak racing
- Want a more relaxed, meditative trek
- Are newer to trekking or value comfort over conquest
- Want to experience mountain life and culture
- Value beauty and ease over challenge

## Verdict

Both treks are excellent first Himalayan experiences. Kedarkantha wins if your goal is peak bagging and achievement. Har Ki Dun wins if your goal is connection to nature and landscape. Neither is objectively "better" — they serve different intentions.

Choose based on what draws you: the satisfaction of reaching a peak, or the peace of moving through a beautiful valley. Both will change how you see mountains.
  `,
  targetMoneyPage: '/treks/kedarkantha-trek',
  relatedTreks: ['kedarkantha-trek', 'har-ki-dun-trek'],
};

const isWeekendRetreatWorthIt: BlogContent = {
  slug: 'is-weekend-retreat-worth-it',
  title: 'Is a Weekend Retreat Worth It? The Real Case for Stepping Away',
  description:
    'Wondering if a weekend retreat is worth the cost and time away? We break down the actual benefits and who should prioritize a short-away experience.',
  category: 'Retreat Decision',
  publishedAt: '2026-02-05',
  readingTime: '5 min read',
  content: `
A common question: Is a weekend retreat actually worth it? Between the cost, travel time, and taking leave from work, many people question whether 2–3 days away justifies the effort.

The short answer: It depends on your definition of "worth."

## The Financial View

A weekend retreat costs money. A 3-day stay might run ₹15,000–30,000 depending on location and amenities. That's real money. From a pure cost perspective, it's not cheap.

But consider what you're paying for: A hotel weekend might cost the same but leave you exhausted and unchanged. A retreat specifically designs those 2–3 days to reset your nervous system. That design has value.

## The Time Investment Reality

You're taking 3–4 days of leave and spending 4–6 hours on travel. That's significant time.

But contrast that with your baseline: If you're chronically stressed, the cost of that stress (lost productivity, poor decisions, burnout building) is real. A strategic pause might prevent a 3-month recovery period later.

## Who Should Actually Go on a Weekend Retreat?

**You should prioritize a weekend retreat if:**
- You work high-stress, mentally demanding roles
- You haven't had real rest in 3+ months
- Your sleep or focus has declined
- You're making poor decisions due to fatigue
- You have specific goals (clarity on a decision, creative breakthrough)

**A weekend retreat is probably NOT urgent if:**
- You've had a recent vacation
- You're in a stable, low-stress period
- You have major travel or expenses coming up
- You're not specifically seeking something (just going because it's "wellness")

## The Underrated Benefit: Permission to Stop

The most valuable part of a retreat isn't the yoga or the meditation. It's **permission to stop**. In normal life, you always have an excuse to work or check email. A retreat removes that permission. You can't be productive there. You're forced to be present.

That forced pause resets your baseline. When you return, you're genuinely calmer. You make better decisions for 2–4 weeks after. That's scientifically documented.

## The Real Answer

Is a weekend retreat worth it?

If you're running at 90% capacity and haven't paused in months, yes — absolutely. The cost is small compared to the benefit.

If you're taking a retreat every few months or you're already well-rested, maybe not. The ROI is lower.

The right question isn't "Is a weekend retreat worth it?" It's "Right now, am I the kind of person who needs to pause?" If the answer is yes, go. The retreat isn't the luxury — it's the necessity.
  `,
  targetMoneyPage: '/retreats/chakrata/rest-and-reset',
  relatedRetreats: ['rest-and-reset', 'weekend-retreat'],
};

/**
 * All blog posts (registry)
 */
export const ALL_BLOG_POSTS: ReadonlyArray<BlogContent> = [
  chakrataVsSankri,
  chakrataVsMussoorie,
  trekVsRetreat,
  kedarkanthaVsHarKiDun,
  isWeekendRetreatWorthIt,
  bestTimeForRetreatInChakrata,
  howToReachChakrataForARetreat,
  isChakrataGoodForARetreat,
  chakrataVsRishikeshForARetreat,
  retreatVsTrekWhichIsRightForYou,
  threeDayVsFiveDayHimalayanRetreat,
  howMuchDoesAHimalayanRetreatCost,
  bestTimeForRetreatInSankri,
  howToReachSankriForARetreat,
  isSankriGoodForARetreat,
  bestTimeForRetreatInMunsiyari,
  howToReachMunsiyariForARetreat,
  isMunsiyariGoodForARetreat,
  bestTimeForRetreatInRishikesh,
  howToReachRishikeshForARetreat,
  isRishikeshGoodForARetreat,
] as const;

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogContent[] {
  return [...ALL_BLOG_POSTS];
}

/**
 * Get a single blog post by slug
 */
export function getBlogBySlug(slug: string): BlogContent | undefined {
  return ALL_BLOG_POSTS.find((post) => post.slug === slug) as BlogContent | undefined;
}

/**
 * Get blog posts for sitemap (slug + publishing date for lastModified)
 */
export function getBlogPostsForSitemap(): Array<{ slug: string; publishedAt: string; lastUpdated?: string }> {
  return ALL_BLOG_POSTS.map((post) => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
    lastUpdated: post.lastUpdated,
  }));
}
