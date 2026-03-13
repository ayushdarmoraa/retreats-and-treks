import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/what-to-pack-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What to Pack for a Meditation Retreat — Complete Packing List | Retreats And Treks',
    description:
      'The complete packing list for a Himalayan meditation retreat — what to bring, what to leave behind, and why less is more. Covers clothing, practice essentials, altitude gear, and common mistakes.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What to Pack for a Meditation Retreat — Complete Packing List',
      description: 'Everything you need (and don\'t need) for a Himalayan meditation retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What to Pack for a Meditation Retreat — Complete Packing List'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need special meditation clothing?',
    answer:
      'No. Comfortable, loose-fitting clothing that allows you to sit cross-legged for extended periods is all you need. Avoid clothing with hard seams, tight waistbands, or complicated fastenings. Soft trousers, loose tops, and layers are ideal. You do not need specific meditation outfits or spiritual attire.',
  },
  {
    question: 'Should I bring my phone to a meditation retreat?',
    answer:
      'Bring it for emergency contact and travel logistics but expect to surrender it at the start of the retreat. Our retreats are device-free during the programme. If you need your phone for the journey to and from the retreat, bring it — it will be stored safely for the duration.',
  },
  {
    question: 'What should I NOT bring to a retreat?',
    answer:
      'Books, journals (unless the programme includes journaling), work materials, multiple devices, excessive clothing, and anything that maintains your connection to daily life. The point of a retreat is removal. Every object that connects you to your ordinary routine creates a subtle pull back toward it.',
  },
  {
    question: 'Do I need altitude sickness medication for Zanskar?',
    answer:
      'Zanskar retreats operate at 3,500 metres. We recommend consulting your doctor about Diamox (acetazolamide) before departure. Our itineraries include acclimatisation days. Bring altitude sickness medication as a precaution, but the gradual ascent and acclimatisation schedule prevent most issues. Stay hydrated and avoid alcohol for 48 hours before arrival.',
  },
  {
    question: 'Is bedding provided at the retreat?',
    answer:
      'Yes. All our retreat locations provide bedding, pillows, and blankets. For Zanskar monastery stays, we provide sleeping bags rated for mountain temperatures. You do not need to bring your own bedding. A silk sleeping bag liner is optional for personal comfort.',
  },
];

export default function WhatToPackPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'What to Pack for a Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What to Pack for a Meditation Retreat — Complete Packing List',
    description: 'The complete packing list for a Himalayan meditation retreat.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  const sectionStyle = { marginBottom: 'var(--space-xl)' } as const;
  const h2Style = { fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' } as const;
  const proseStyle = { lineHeight: 1.8, marginBottom: '0.75rem' } as const;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'What to Pack' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            What to Pack for a Meditation Retreat: The Complete List
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The principle is simple: bring less than you think you need. A retreat is an
            exercise in removal, and your packing should reflect that. Here is everything
            you actually need &mdash; and the common mistakes that create unnecessary
            distraction.
          </p>
        </header>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Clothing — Comfort Over Everything</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>3&ndash;4 sets of loose, comfortable clothing</strong> &mdash; soft trousers or loose pants that allow cross-legged sitting without restriction</li>
            <li><strong>Warm layers</strong> &mdash; fleece, light down jacket, or shawl. Mountain mornings and evenings are cold even in summer</li>
            <li><strong>Warm socks</strong> &mdash; 3&ndash;4 pairs. You may be barefoot in practice rooms but will want warmth in between</li>
            <li><strong>A shawl or large scarf</strong> &mdash; doubles as a meditation wrap, blanket, and warmth layer during sitting</li>
            <li><strong>Comfortable walking shoes</strong> &mdash; for walking meditation and nature paths</li>
            <li><strong>Sandals or slip-on shoes</strong> &mdash; for moving between rooms easily</li>
            <li><strong>Rain jacket</strong> &mdash; Himalayan weather is unpredictable, especially June&ndash;September</li>
          </ul>
          <p style={proseStyle}>
            Skip: formal clothes, multiple outfit changes per day, jeans (too restrictive for
            sitting), anything that requires ironing. You are not performing for anyone. Dress
            for comfort.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Practice Essentials</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Meditation cushion (optional)</strong> &mdash; we provide cushions and mats, but if you have a favourite zafu, bring it</li>
            <li><strong>Eye mask</strong> &mdash; for sleep and optional use during resting meditation</li>
            <li><strong>Earplugs</strong> &mdash; useful if you are a light sleeper in shared accommodation</li>
            <li><strong>Water bottle</strong> &mdash; refillable, 1 litre minimum. Hydration is critical, especially at altitude</li>
            <li><strong>Small torch/headlamp</strong> &mdash; for early morning walks before dawn, especially in Zanskar where paths are unlit</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>For Himalayan Altitude (Zanskar — 3,500m)</h2>
          <p style={proseStyle}>
            If your retreat is in{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>
            , add these to your list:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Sun protection</strong> &mdash; SPF 50+ sunscreen, lip balm with SPF, UV-blocking sunglasses. UV intensity at 3,500m is significantly higher</li>
            <li><strong>Warm hat and gloves</strong> &mdash; for early mornings and cold evenings</li>
            <li><strong>Altitude medication</strong> &mdash; Diamox (consult your doctor), plus electrolyte sachets</li>
            <li><strong>Extra warm layer</strong> &mdash; down jacket or heavy fleece for monastery courtyards</li>
            <li><strong>Moisturiser</strong> &mdash; dry mountain air dehydrates skin quickly</li>
          </ul>
          <p style={proseStyle}>
            For forest retreats in{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
            {' '}(2,000m), altitude gear is not necessary, but warm layers and rain protection are still essential.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Retreat"
          subtext="We'll send you a location-specific packing list when you book."
          vertical="retreat"
          category="packing-guide"
          sourcePath={PATH}
        />

        <section style={sectionStyle}>
          <h2 style={h2Style}>Toiletries &amp; Personal Items</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>Toothbrush and toothpaste</li>
            <li>Any prescription medications (bring enough for the full duration plus 2 extra days)</li>
            <li>Basic first aid: plasters, painkillers, anti-diarrheal tablets</li>
            <li>Insect repellent (forest retreats in Chakrata)</li>
            <li>Moisturiser and lip balm</li>
            <li>Small towel (full towels provided, but a quick-dry travel towel is useful)</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What NOT to Bring</h2>
          <p style={proseStyle}>
            This list matters more than the packing list. Every object that connects you to
            your ordinary routine creates a subtle pull away from the retreat experience.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Books and reading material</strong> &mdash; resisting the urge to read is part of the practice</li>
            <li><strong>Journals</strong> &mdash; unless the programme specifically includes journaling. Writing during silence can become a substitute for sitting with experience directly</li>
            <li><strong>Work materials</strong> &mdash; laptop, notebooks with to-do lists, anything from the office</li>
            <li><strong>Extra devices</strong> &mdash; tablet, e-reader, camera. One phone (surrendered on arrival) is enough</li>
            <li><strong>Excessive clothing</strong> &mdash; you do not need variety. You need comfort. 3&ndash;4 outfits is plenty for a 7-day retreat</li>
            <li><strong>Expectations</strong> &mdash; this is the hardest thing to leave behind and the most important</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>The One-Bag Principle</h2>
          <p style={proseStyle}>
            If your packing does not fit in a single bag (40&ndash;50 litres), you are bringing
            too much. This is true for 3-day retreats and 10-day retreats alike. The physical
            simplicity of arriving with one bag sets the tone for the simplicity of the
            experience. Read{' '}
            <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>how to prepare for a retreat</Link>
            {' '}for the full mental and practical preparation guide.
          </p>
        </section>

        <FeaturedRetreat
          title="7-Day Meditation Retreat in the Himalayas"
          description="Forest or monastery. All meals, accommodation, and facilitation included. Just bring yourself and one bag."
          links={[
            { label: 'View programme', href: '/7-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'How to Prepare for a Retreat', href: '/how-to-prepare-for-a-retreat' },
            { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
            { label: 'First Meditation Retreat Tips', href: '/first-meditation-retreat-tips' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>How to Prepare</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
