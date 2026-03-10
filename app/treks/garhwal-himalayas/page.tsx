import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/garhwal-himalayas';

export function generateMetadata(): Metadata {
  return {
    title: '4 Best Treks in Garhwal Himalayas (3,850m–4,800m) — 2026 Guide | Retreats And Treks',
    description:
      'The 4 best Garhwal Himalaya treks ranked by difficulty: Brahmatal (3,850m), Kuari Pass (3,876m), Roopkund (4,800m) & Pangarchulla (4,590m). Season, route & comparison guide from Lohajung and Joshimath.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '4 Best Treks in Garhwal Himalayas — Routes from 3,850m to 4,800m',
      description:
        'Compare 4 high-altitude Garhwal treks by difficulty, season & views. Brahmatal, Kuari Pass, Roopkund, Pangarchulla — the complete planning guide.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What are the best treks in the Garhwal Himalayas?',
    answer:
      'The four premier treks in the Garhwal Himalaya are Brahmatal (frozen lake trek from Lohajung, moderate difficulty), Roopkund (the mystery lake trek at 4,800 metres, challenging), Kuari Pass (Lord Curzon Trail from Joshimath, moderate with panoramic Nanda Devi views), and Pangarchulla (a true summit climb to 4,590 metres, challenging). Each offers a different character — from winter snow treks to high-altitude summit pushes.',
  },
  {
    question: 'How do I reach Garhwal trekking bases?',
    answer:
      'The two main trek bases in Garhwal are Lohajung and Joshimath. Lohajung is reached via a 10-hour drive from Rishikesh through Karnaprayag and Dewal. Joshimath is approximately 270 km from Rishikesh (9–10 hours) via Rudraprayag and Chamoli. Both have regular bus services and shared taxis from Rishikesh and Haridwar. The nearest rail head is Haridwar; the nearest airport is Jolly Grant in Dehradun.',
  },
  {
    question: 'What is the best season for Garhwal Himalaya treks?',
    answer:
      'It depends on the trek. Brahmatal is a winter trek best done December to March. Roopkund has two windows: pre-monsoon (May–June) and post-monsoon (September–October). Kuari Pass is excellent in spring (March–May) and autumn (October–November). Pangarchulla is best in March to May when consolidated snow allows the summit push. Monsoon (July–August) should be avoided across all Garhwal routes due to heavy rainfall and trail instability.',
  },
  {
    question: 'Are Garhwal treks suitable for beginners?',
    answer:
      'Brahmatal and Kuari Pass are moderate-difficulty treks accessible to first-time Himalayan trekkers with reasonable fitness. Both keep below 4,000 metres and have no technical sections. Roopkund and Pangarchulla are challenging routes recommended for experienced trekkers with prior high-altitude exposure above 4,000 metres. If you are new to Himalayan trekking, start with Brahmatal or Kuari Pass before attempting the higher routes.',
  },
  {
    question: 'How does Garhwal compare to other trekking regions in Uttarakhand?',
    answer:
      'Garhwal offers higher altitude and more dramatic Himalayan scenery than the mid-altitude trails around Chakrata (2,000–2,400 metres). Compared to the Sankri-based treks in western Garhwal (Kedarkantha, Har Ki Dun), the Lohajung and Joshimath routes access the Nanda Devi Sanctuary zone — among the most spectacular mountain landscapes in India. Garhwal treks generally require more days (5–7) and greater fitness than weekend trails near Dehradun.',
  },
  {
    question: 'Is Brahmatal safe for beginners with no trekking experience?',
    answer:
      'Yes. Brahmatal is one of the safest introductory Himalayan treks. It stays below 4,000 metres (AMS risk is minimal at 3,850 m), has no technical sections like rock scrambles or fixed ropes, and follows a well-established trail from Lohajung with reliable guide support. The moderate 4-day duration keeps fatigue manageable. Beginners should maintain 3–4 weeks of regular cardio (jogging, cycling) beforehand and carry proper cold-weather gear for winter conditions. The trail is graded moderate, not easy — but with basic fitness preparation, it is well within reach of a first-time trekker.',
  },
  {
    question: 'Which is harder — Kuari Pass or Kedarkantha?',
    answer:
      'They are close in difficulty — both are moderate treks reaching similar altitudes (Kuari Pass at 3,876 m, Kedarkantha at 3,800 m). The key difference is structure: Kedarkantha has a steep summit-day push (1,500 ft in a few hours) while Kuari Pass spreads elevation gain more evenly across 5 days of ridge walking. Kedarkantha involves winter snow conditions (December–March) with potential whiteout risk near the summit, whereas Kuari Pass in spring or autumn has milder weather. For pure physical demand, the Kedarkantha summit day is harder; for sustained multi-day effort, Kuari Pass is slightly more taxing. Neither requires technical skills.',
  },
];

export default function GarhwalHimalayasTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // CollectionPage + ItemList structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Treks in Garhwal Himalayas',
    description:
      'A curated guide to the best high-altitude treks in the Garhwal Himalaya region, including routes from Lohajung and Joshimath.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Brahmatal Trek',
          url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Roopkund Trek',
          url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Kuari Pass Trek',
          url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek'),
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Pangarchulla Peak Trek',
          url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek'),
        },
      ],
    },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Garhwal Himalayas' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
<header style={{
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem',
  paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    {/* Eyebrow */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.56rem', letterSpacing: '0.28em',
        textTransform: 'uppercase' as const,
        color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7,
      }}>Trekking Guide · Uttarakhand</span>
    </div>

    {/* H1 */}
    <h1 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
      fontWeight: 200,
      letterSpacing: '-0.035em',
      color: '#111111',
      lineHeight: 1.1,
      margin: '0 0 2rem',
    }}>
      Best Treks in the Garhwal Himalayas
    </h1>

    {/* Quick meta pills */}
    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem', marginBottom: '2.5rem' }}>
      {[
        { label: 'Routes', value: '4 Treks' },
        { label: 'Altitude', value: '3,850m – 4,800m' },
        { label: 'Bases', value: 'Lohajung & Joshimath' },
        { label: 'Season', value: 'Dec – Jun, Sep – Nov' },
      ].map((item) => (
        <span key={item.label} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.78rem', fontWeight: 300, color: '#333333',
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '100px', padding: '5px 14px',
        }}>
          <span style={{
            fontSize: '0.55rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase' as const,
            color: 'var(--color-primary)', opacity: 0.75,
          }}>{item.label}</span>
          {item.value}
        </span>
      ))}
    </div>

    {/* Body paragraphs */}
    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.95rem', lineHeight: 1.85,
      color: '#3a3a3a', fontWeight: 300,
      margin: '0 0 1.25rem',
      paddingLeft: '1.5rem',
      borderLeft: '2px solid rgba(15,118,110,0.25)',
    }}>
      The Garhwal Himalaya stretches across the northern arc of Uttarakhand — from the Nanda Devi
      Sanctuary in the east to the Gangotri massif in the west. This is where India&apos;s highest
      peaks live: Nanda Devi at 7,816 metres, Kamet, Chaukhamba, Dronagiri, and dozens of
      6,000-metre summits that form the spine of the Greater Himalaya. For trekkers, Garhwal
      offers some of the most scenic and accessible high-altitude routes in the entire range —
      frozen lake traverses, historic ridge walks, and summit climbs that place you face-to-face
      with the highest mountains in India.
    </p>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem', lineHeight: 1.85,
      color: '#555555', fontWeight: 300,
      margin: '0',
    }}>
      Unlike the heavily trafficked circuits of Nepal or the permit-restricted zones of Ladakh,
      the Garhwal trekking routes retain a sense of wildness and solitude. Two base towns —{' '}
      <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Lohajung</Link>{' '}
      and{' '}
      <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Joshimath</Link>{' '}
      — serve as launchpads for four distinct routes that together cover the full spectrum of
      Himalayan trekking: from moderate ridge walks with continuous panoramas to challenging
      summit pushes above 4,500 metres.
    </p>

  </div>
</header>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Tell us your dates and experience level. We will match you to the right Garhwal route."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

        {/* ── GEOGRAPHY ────────────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Terrain</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem',
    }}>
      Garhwal Geography: Understanding the Terrain
    </h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      The Garhwal division of Uttarakhand encompasses the districts of Chamoli, Rudraprayag,
      Uttarkashi, Tehri, Pauri, Dehradun, and Haridwar. The trekking terrain lies primarily in
      Chamoli district — the administrative heart of the Nanda Devi Biosphere Reserve and home
      to some of the most protected alpine ecosystems in Asia.
    </p>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      The geological character of Garhwal is defined by the Main Central Thrust — the tectonic
      boundary where the Indian plate dives beneath the Eurasian plate. This has produced a
      landscape of extraordinary vertical relief: valleys at 1,500 metres sit within direct
      sight of peaks above 7,000 metres. For trekkers, this means views that are disproportionately
      dramatic relative to the altitude you reach. A moderate trek to 3,800 metres in Garhwal
      delivers panoramas that would require 5,000+ metres in other Himalayan regions.
    </p>

    {/* List as cards */}
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
      {[
        {
          title: 'Nanda Devi Sanctuary zone.',
          body: <>The{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund</Link>{' '}
            and{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla</Link>{' '}
            routes approach the outer rim of the Nanda Devi Sanctuary, offering views into the inner
            sanctuary that are otherwise inaccessible. The sanctuary has been closed to trekkers since
            1983, making these peripheral routes the closest you can get to India&apos;s second-highest peak.</>
        },
        {
          title: 'Lake and glacier systems.',
          body: <>Garhwal&apos;s trekking routes pass through a landscape shaped by Pleistocene glaciation — cirque lakes like{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal</Link>{' '}
            and Roopkund sit in glacial hollows carved during the last ice age. In winter, these lakes
            freeze solid, creating the signature visual of Garhwal winter trekking.</>
        },
        {
          title: 'Ridge and valley structure.',
          body: <>The{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass</Link>{' '}
            route follows a high ridge that runs parallel to the main Himalayan chain — this is why
            the views are continuous rather than episodic. You walk along the crest with the peaks
            arrayed before you for kilometres at a stretch.</>
        },
      ].map((item, i, arr) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0 1.25rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#ffffff', border: '2px solid var(--color-primary)',
              flexShrink: 0, marginTop: '0.28rem',
            }} />
            {i < arr.length - 1 && (
              <span style={{
                width: '1px', flex: 1,
                background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))',
                marginTop: '4px', minHeight: '1.5rem',
              }} />
            )}
          </div>
          <div style={{ paddingBottom: i < arr.length - 1 ? '1.5rem' : '0' }}>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>{item.title}</strong>{' '}{item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ── TREK BASES ───────────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Base Towns</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>
      Garhwal Trek Bases: Lohajung &amp; Joshimath
    </h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      All four Garhwal treks launch from one of two base towns, each with a distinct character
      and access profile.
    </p>

    {/* Two base cards */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      {/* Lohajung */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderTop: '2px solid var(--color-primary)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ margin: '0 0 0.75rem' }}>
          <Link href="/treks/location/lohajung" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 500,
            color: 'var(--color-primary)', textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Lohajung — Gateway to Brahmatal &amp; Roopkund →
          </Link>
        </h3>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.8, color: '#555555', margin: 0 }}>
          Lohajung is a small roadhead village at 2,350 metres in the Chamoli district, perched on
          a ridge overlooking the Wan valley. It serves as the common base camp for both the{' '}
          <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link>{' '}
          and the{' '}
          <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund Trek</Link>.
          Reached by a 10-hour drive from Rishikesh via Karnaprayag and Dewal, Lohajung is as far
          from a tourist town as you can get — basic guesthouses, a handful of dhabas, and the
          quiet intensity of a working mountain village. This remoteness is precisely what makes
          the treks from here feel genuinely wild.
        </p>
      </div>

      {/* Joshimath */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderTop: '2px solid var(--color-primary)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ margin: '0 0 0.75rem' }}>
          <Link href="/treks/location/joshimath" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 500,
            color: 'var(--color-primary)', textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Joshimath — Gateway to Kuari Pass &amp; Pangarchulla →
          </Link>
        </h3>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.8, color: '#555555', margin: 0 }}>
          Joshimath sits at 1,875 metres on the pilgrim road to Badrinath — a historic mountain
          town with deep religious significance (it houses one of the four cardinal matts established
          by Adi Shankaracharya). For trekkers, Joshimath is the launch point for the{' '}
          <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link>{' '}
          and the{' '}
          <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak Trek</Link>.
          Better connected than Lohajung — with regular bus services from Rishikesh (9–10 hours)
          and more accommodation options — Joshimath also serves as a gateway to Auli, the Valley
          of Flowers, and Hemkund Sahib.
        </p>
      </div>
    </div>
  </div>
</section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Not sure which route? We can help you choose based on your fitness, dates, and experience."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

        {/* ── THE FOUR TREKS ───────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>The Routes</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>The Four Great Garhwal Treks</h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2.5rem' }}>
      Each trek occupies a distinct niche — different difficulty, different season, different
      mountain character. Together they cover the full Garhwal trekking spectrum.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>

      {/* Brahmatal */}
      <div style={{
        background: '#f7f9f7',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '8px',
        padding: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' as const }}>
          <h3 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            color: '#111111', margin: 0, lineHeight: 1.3,
          }}>Brahmatal Trek — The Frozen Lake Winter Classic</h3>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            color: 'var(--color-primary)',
            background: 'rgba(15,118,110,0.08)',
            border: '1px solid rgba(15,118,110,0.18)',
            borderRadius: '100px', padding: '3px 10px',
            whiteSpace: 'nowrap' as const, flexShrink: 0,
          }}>Moderate</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem', marginBottom: '1rem' }}>
          {[
            { label: 'Altitude', value: '3,850 m' },
            { label: 'Duration', value: '4 days' },
            { label: 'Season', value: 'December–March' },
          ].map(item => (
            <span key={item.label} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', fontWeight: 300, color: '#555555',
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '100px', padding: '3px 10px',
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.7 }}>{item.label}</span>
              {item.value}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
          The{' '}
          <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link>{' '}
          is Garhwal&apos;s premier winter trek — a 22 km route from Lohajung to the frozen Brahmatal lake
          at 3,850 metres. The trail passes through dense oak and rhododendron forest before emerging
          onto snow-covered ridges with views of Trishul and Nanda Ghunti. At moderate difficulty with
          no technical sections, Brahmatal is the ideal entry point to{' '}
          <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>winter trekking in Uttarakhand</Link>{' '}
          for those ready to go beyond the more crowded Kedarkantha circuit.
        </p>
      </div>

      {/* Roopkund */}
      <div style={{
        background: '#f7f9f7',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid #e65100',
        borderRadius: '8px',
        padding: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' as const }}>
          <h3 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            color: '#111111', margin: 0, lineHeight: 1.3,
          }}>Roopkund Trek — The Mystery Lake Expedition</h3>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            color: '#e65100',
            background: 'rgba(230,81,0,0.07)',
            border: '1px solid rgba(230,81,0,0.18)',
            borderRadius: '100px', padding: '3px 10px',
            whiteSpace: 'nowrap' as const, flexShrink: 0,
          }}>Challenging</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem', marginBottom: '1rem' }}>
          {[
            { label: 'Altitude', value: '4,800 m' },
            { label: 'Duration', value: '7 days' },
            { label: 'Season', value: 'May–June, Sep–Oct' },
          ].map(item => (
            <span key={item.label} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', fontWeight: 300, color: '#555555',
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '100px', padding: '3px 10px',
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.7 }}>{item.label}</span>
              {item.value}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
          The{' '}
          <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund Trek</Link>{' '}
          is one of the most iconic routes in the Indian Himalayas — a 53 km expedition from Lohajung
          to the glacial Roopkund Lake at 4,800 metres, famous for the ancient human skeletal remains
          discovered at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates
          exposed high-altitude terrain above 4,000 metres, and demands genuine fitness and altitude
          tolerance. This is the trek for experienced Himalayan trekkers seeking a multi-day expedition
          in Garhwal&apos;s most dramatic landscape.
        </p>
      </div>

      {/* Kuari Pass */}
      <div style={{
        background: '#f7f9f7',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '8px',
        padding: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' as const }}>
          <h3 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            color: '#111111', margin: 0, lineHeight: 1.3,
          }}>Kuari Pass Trek — The Panoramic Ridge Walk</h3>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            color: 'var(--color-primary)',
            background: 'rgba(15,118,110,0.08)',
            border: '1px solid rgba(15,118,110,0.18)',
            borderRadius: '100px', padding: '3px 10px',
            whiteSpace: 'nowrap' as const, flexShrink: 0,
          }}>Moderate</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem', marginBottom: '1rem' }}>
          {[
            { label: 'Altitude', value: '3,876 m' },
            { label: 'Duration', value: '5 days' },
            { label: 'Season', value: 'Mar–May, Oct–Nov' },
          ].map(item => (
            <span key={item.label} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', fontWeight: 300, color: '#555555',
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '100px', padding: '3px 10px',
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.7 }}>{item.label}</span>
              {item.value}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
          The{' '}
          <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link>{' '}
          follows the historic Lord Curzon Trail along a high ridge offering near-continuous views of
          the Nanda Devi Sanctuary, Dronagiri, Chaukhamba, and Kamet. At moderate difficulty with no
          technical challenges, this is widely considered the finest view-to-effort ratio of any trek
          in Uttarakhand. Spring brings rhododendron blooms; autumn delivers the sharpest visibility
          and golden forest colours. An excellent{' '}
          <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>summer trek</Link>{' '}
          option for those who prefer moderate altitude without sacrificing Himalayan grandeur.
        </p>
      </div>

      {/* Pangarchulla */}
      <div style={{
        background: '#f7f9f7',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid #e65100',
        borderRadius: '8px',
        padding: '1.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' as const }}>
          <h3 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            color: '#111111', margin: 0, lineHeight: 1.3,
          }}>Pangarchulla Peak Trek — The Summit Challenge</h3>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            color: '#e65100',
            background: 'rgba(230,81,0,0.07)',
            border: '1px solid rgba(230,81,0,0.18)',
            borderRadius: '100px', padding: '3px 10px',
            whiteSpace: 'nowrap' as const, flexShrink: 0,
          }}>Challenging</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem', marginBottom: '1rem' }}>
          {[
            { label: 'Altitude', value: '4,590 m' },
            { label: 'Duration', value: '6 days' },
            { label: 'Season', value: 'March–May' },
          ].map(item => (
            <span key={item.label} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', fontWeight: 300, color: '#555555',
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '100px', padding: '3px 10px',
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.7 }}>{item.label}</span>
              {item.value}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
          The{' '}
          <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak Trek</Link>{' '}
          combines the Kuari Pass approach with a true summit push to 4,590 metres — one of the few
          accessible summit experiences in Garhwal. The final day involves a steep snow-and-scree
          ascent with an alpine start, rewarded by a 360° panorama that includes Nanda Devi, Nanda
          Ghunti, Dronagiri, and the entire Nanda Devi Sanctuary. Recommended for experienced
          trekkers with prior high-altitude exposure who want the satisfaction of standing on a peak
          rather than a pass.
        </p>
      </div>

    </div>
  </div>
</section>

        {/* ── SEASONAL GUIDE ───────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Best Time to Go</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>When to Trek in Garhwal: Seasonal Guide</h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Garhwal trekking is not a single-season activity — different routes open in different
      months, and the landscape transforms dramatically with the seasons.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
      {[
        {
          season: 'Winter',
          months: 'December–March',
          dot: 'var(--color-primary)',
          body: <>
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal, a moderate snow trek from Lohajung,</Link>{' '}
            is the standout winter route — frozen lakes, snow-covered ridges, and clear mountain visibility.
            Kuari Pass is also feasible in early spring (March) with lingering snow adding alpine character.
            Roopkund and Pangarchulla are inaccessible in deep winter. For more{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>winter trek options across Uttarakhand</Link>, see our seasonal guide.
          </>
        },
        {
          season: 'Spring',
          months: 'March–May',
          dot: 'var(--color-primary)',
          body: <>
            The widest trekking window. Both Kuari Pass and Pangarchulla are in prime condition.
            Brahmatal transitions from snow to green in late March. Roopkund opens in late May.
            Rhododendron blooms colour the forests below 3,500 metres. This is the peak season for the{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>best summer treks in Uttarakhand</Link>.
          </>
        },
        {
          season: 'Pre-monsoon',
          months: 'May–June',
          dot: 'var(--color-primary)',
          body: <>
            Roopkund&apos;s primary window. Snow line retreats above 4,000 metres, making the higher routes
            passable. Temperatures are warm at lower elevations. Afternoon cloud build-up is common but
            mornings are typically clear.
          </>
        },
        {
          season: 'Monsoon',
          months: 'July–August',
          dot: '#e65100',
          body: <>
            Not recommended for any Garhwal trek. Heavy rainfall, trail erosion, landslide risk, and zero
            visibility above the treeline. All guided operations suspend during this period.
          </>
        },
        {
          season: 'Autumn',
          months: 'September–November',
          dot: 'var(--color-primary)',
          body: <>
            Roopkund&apos;s secondary window. Kuari Pass is outstanding in October–November with the sharpest
            mountain visibility of the year. Temperatures drop quickly after October — winter conditions
            return to higher elevations by late November.
          </>
        },
      ].map((item, i, arr) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0 1.25rem' }}>
          {/* Timeline spine */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: item.dot === '#e65100' ? 'rgba(230,81,0,0.15)' : 'rgba(15,118,110,0.12)',
              border: `2px solid ${item.dot}`,
              flexShrink: 0, marginTop: '0.22rem',
            }} />
            {i < arr.length - 1 && (
              <span style={{
                width: '1px', flex: 1, minHeight: '1.5rem', marginTop: '4px',
                background: 'linear-gradient(to bottom, rgba(15,118,110,0.2), rgba(15,118,110,0.04))',
              }} />
            )}
          </div>
          {/* Content */}
          <div style={{ paddingBottom: i < arr.length - 1 ? '1.75rem' : '0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.82rem', fontWeight: 500, color: '#111111',
              }}>{item.season}</span>
              <span style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.72rem', fontWeight: 300, color: '#999999',
              }}>{item.months}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

{/* ── DIFFICULTY COMPARISON ────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Compare Routes</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>Difficulty &amp; Altitude Comparison</h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Choosing the right Garhwal trek depends on your experience level and the kind of challenge
      you want. Here is how the four routes compare:
    </p>

    {/* Table */}
    <div style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.84rem' }}>
        <thead>
          <tr style={{ background: '#f7f9f7', borderBottom: '1px solid #e5e7eb' }}>
            {['Trek', 'Difficulty', 'Max Altitude', 'Duration', 'Best For'].map((h) => (
              <th key={h} style={{
                textAlign: 'left', padding: '0.75rem 1rem',
                fontSize: '0.55rem', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase' as const,
                color: 'var(--color-primary)', opacity: 0.75,
                whiteSpace: 'nowrap' as const,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', diff: 'Moderate', alt: '3,850 m', dur: '4 days', best: 'Winter snow trek, first Garhwal experience' },
            { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', diff: 'Moderate', alt: '3,876 m', dur: '5 days', best: 'Panoramic views, spring / autumn trek' },
            { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', diff: 'Challenging', alt: '4,590 m', dur: '6 days', best: 'Summit experience, experienced trekkers' },
            { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', diff: 'Challenging', alt: '4,800 m', dur: '7 days', best: 'Expedition-style, iconic destination' },
          ].map((row, i, arr) => (
            <tr key={row.name} style={{ borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              <td style={{ padding: '0.85rem 1rem' }}>
                <Link href={row.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.85rem' }}>{row.name}</Link>
              </td>
              <td style={{ padding: '0.85rem 1rem' }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  color: row.diff === 'Moderate' ? 'var(--color-primary)' : '#e65100',
                  background: row.diff === 'Moderate' ? 'rgba(15,118,110,0.08)' : 'rgba(230,81,0,0.07)',
                  border: `1px solid ${row.diff === 'Moderate' ? 'rgba(15,118,110,0.2)' : 'rgba(230,81,0,0.2)'}`,
                  borderRadius: '100px', padding: '2px 8px',
                }}>{row.diff}</span>
              </td>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 300, color: '#333333' }}>{row.alt}</td>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 300, color: '#333333', whiteSpace: 'nowrap' as const }}>{row.dur}</td>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 300, color: '#555555', fontSize: '0.82rem' }}>{row.best}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      <strong style={{ fontWeight: 500, color: '#111111' }}>For beginners:</strong> Start with{' '}
      <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>the Brahmatal winter trek</Link>{' '}
      or{' '}
      <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>the Kuari Pass ridge walk</Link>.
      Both stay below 4,000 metres, have no technical sections, and are well-supported by guided
      operations. If you are entirely new to Himalayan trekking, our{' '}
      <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner treks guide</Link>{' '}
      can help you decide whether to start in Garhwal or closer to Dehradun.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      <strong style={{ fontWeight: 500, color: '#111111' }}>For experienced trekkers:</strong>{' '}
      <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>the Pangarchulla summit climb</Link>{' '}
      and{' '}
      <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>the Roopkund expedition</Link>{' '}
      demand prior high-altitude experience (above 4,000 m), multi-day trekking fitness, and
      comfort with steep, exposed terrain. These are serious mountain routes, not enhanced day hikes.
    </p>

  </div>
</section>

        {/* ── GARHWAL VS OTHER REGIONS ─────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Regional Context</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>Garhwal vs Other Uttarakhand Trekking Regions</h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Uttarakhand offers trekking across three distinct zones. Each serves a different kind of trekker:
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>

      {/* Chakrata */}
      <div style={{
        background: '#ffffff', border: '1px solid #e5e7eb',
        borderTop: '2px solid #94a3b8',
        borderRadius: '8px', padding: '1.5rem',
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <Link href="/treks/location/chakrata" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 500,
            color: 'var(--color-primary)', textDecoration: 'none',
          }}>Chakrata →</Link>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#999999', marginTop: '0.2rem' }}>mid-altitude · 2,000–2,400 m</div>
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.8, color: '#555555', margin: 0 }}>
          Weekend-accessible from Dehradun. Forest trails, limestone caves, waterfalls. Easy to moderate
          difficulty. Ideal for first-time trekkers, families, and those combining a trek with a{' '}
          <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>wellness retreat</Link>.
          No high-altitude exposure.
        </p>
      </div>

      {/* Sankri */}
      <div style={{
        background: '#ffffff', border: '1px solid #e5e7eb',
        borderTop: '2px solid #64748b',
        borderRadius: '8px', padding: '1.5rem',
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <Link href="/treks/location/sankri" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 500,
            color: 'var(--color-primary)', textDecoration: 'none',
          }}>Sankri →</Link>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#999999', marginTop: '0.2rem' }}>western Garhwal · 3,500–3,800 m</div>
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.8, color: '#555555', margin: 0 }}>
          Multi-day alpine treks including Kedarkantha (the classic winter snow summit) and Har Ki Dun
          (the contemplative valley trek). Moderate to challenging difficulty. The best winter trekking
          base in Uttarakhand.
        </p>
      </div>

      {/* Garhwal interior */}
      <div style={{
        background: '#ffffff', border: '1px solid rgba(15,118,110,0.25)',
        borderTop: '2px solid var(--color-primary)',
        borderRadius: '8px', padding: '1.5rem',
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 500, color: '#111111',
          }}>Garhwal Interior</span>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#999999', marginTop: '0.2rem' }}>Lohajung & Joshimath · 3,800–4,800 m</div>
        </div>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.8, color: '#555555', margin: 0 }}>
          The highest altitude routes in Uttarakhand trekking. Glacier lakes, summit climbs, Nanda Devi
          panoramas. Multi-day commitments (4–7 days on trail). The choice when you want genuine
          high-Himalayan exposure without crossing into mountaineering territory.
        </p>
      </div>

    </div>
  </div>
</section>

{/* ── HOW TO PLAN ──────────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Planning</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
    }}>How to Plan a Garhwal Himalaya Trek</h2>

    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
      {[
        {
          label: 'Getting there.',
          body: <>Both Lohajung and Joshimath are reached via Rishikesh, which itself connects to Delhi by train (4–5 hours) or road (5–6 hours). From Rishikesh, Joshimath is a 9–10 hour drive; Lohajung is approximately 10 hours. Most guided groups arrange shared transport from Rishikesh or Haridwar.</>
        },
        {
          label: 'Duration.',
          body: <>Plan for the full trek duration plus 2 travel days each way. A Brahmatal trek is a 7–8 day commitment door-to-door from Delhi. Roopkund requires 10–11 days. Build in a buffer day for weather delays — Garhwal roads are mountain roads, and flexibility with dates makes the logistics less stressful.</>
        },
        {
          label: 'Fitness preparation.',
          body: <>For Brahmatal and Kuari Pass, 3–4 weeks of daily cardio (5 km jogs, stair climbing, or cycling) is sufficient. For Roopkund and Pangarchulla, 6–8 weeks of structured preparation including hill walking with a loaded pack, core strength work, and ideally a prior trek above 3,500 metres.</>
        },
        {
          label: 'Guided vs independent.',
          body: <>All four Garhwal treks are best done with guided operators. The routes are remote, rescue infrastructure is limited, and weather can change rapidly above 3,500 metres. Guided treks include permits, camping equipment, meals, safety protocols, and local expertise that is difficult to replicate independently.</>
        },
      ].map((item, i, arr) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0 1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'rgba(15,118,110,0.12)',
              border: '2px solid var(--color-primary)',
              flexShrink: 0, marginTop: '0.22rem',
            }} />
            {i < arr.length - 1 && (
              <span style={{
                width: '1px', flex: 1, minHeight: '1.5rem', marginTop: '4px',
                background: 'linear-gradient(to bottom, rgba(15,118,110,0.2), rgba(15,118,110,0.04))',
              }} />
            )}
          </div>
          <div style={{ paddingBottom: i < arr.length - 1 ? '1.75rem' : '0' }}>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>{item.label}</strong>{' '}{item.body}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

{/* ── CHOOSING YOUR ROUTE ──────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Decide</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '1rem',
    }}>Choosing Your Garhwal Route</h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Not sure which route fits your experience? We have built two detailed comparison guides that break down the real differences:
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>

      {/* Moderate */}
      <Link href="/treks/brahmatal-vs-kuari-pass" style={{ textDecoration: 'none' }}>
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderTop: '2px solid var(--color-primary)',
          borderRadius: '8px', padding: '1.5rem',
          transition: 'box-shadow 0.2s',
          cursor: 'pointer',
        }}>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 600, opacity: 0.7, marginBottom: '0.5rem' }}>Moderate treks</div>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111111', marginBottom: '0.6rem', lineHeight: 1.4 }}>
            Brahmatal vs Kuari Pass — which moderate Garhwal trek? →
          </div>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.75, color: '#666666', margin: 0 }}>
            Covers the frozen lake versus panoramic ridge decision. If this is your first trek in the region, start here.
          </p>
        </div>
      </Link>

      {/* Challenging */}
      <Link href="/treks/roopkund-vs-pangarchulla" style={{ textDecoration: 'none' }}>
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderTop: '2px solid #e65100',
          borderRadius: '8px', padding: '1.5rem',
          cursor: 'pointer',
        }}>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#e65100', fontWeight: 600, opacity: 0.8, marginBottom: '0.5rem' }}>Challenging treks</div>
          <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111111', marginBottom: '0.6rem', lineHeight: 1.4 }}>
            Roopkund vs Pangarchulla — expedition or summit? →
          </div>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.75, color: '#666666', margin: 0 }}>
            Compares the high-altitude mystery lake expedition with the demanding peak climb. For experienced trekkers who have already completed a moderate Garhwal route.
          </p>
        </div>
      </Link>
    </div>

    {/* Progression path */}
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderLeft: '3px solid var(--color-primary)',
      borderRadius: '8px',
      padding: '1.25rem 1.5rem',
    }}>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>The progression path:</strong>{' '}
        Most trekkers move through Garhwal in stages — a{' '}
        <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>moderate snow trek from Lohajung</Link>{' '}
        or a{' '}
        <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>spring ridge walk from Joshimath</Link>{' '}
        builds the altitude confidence needed for the{' '}
        <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>challenging routes above 4,500 metres</Link>.
      </p>
    </div>

  </div>
</section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Share your experience level and preferred dates. We will recommend the right Garhwal route."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

       {/* ── FAQs ─────────────────────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>FAQs</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
    }}>Frequently Asked Questions</h2>

    <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

  </div>
</section>

        {/* ── EXPLORE MORE LINKS ───────────────────────────────────── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  marginBottom: '0',
}}>
  <style>{`
    .explore-link {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.75rem; padding: 0.95rem 1.25rem;
      text-decoration: none; background: #ffffff;
      transition: background 0.15s;
    }
    .explore-link:hover { background: #f7f9f7; }
  `}</style>

  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Keep Exploring</span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
    }}>Explore More Treks</h2>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      {[
        { href: '/treks/brahmatal-vs-kuari-pass', label: 'Brahmatal vs Kuari Pass — Moderate Trek Comparison' },
        { href: '/treks/roopkund-vs-pangarchulla', label: 'Roopkund vs Pangarchulla — Challenging Trek Comparison' },
        { href: '/treks/location/lohajung', label: 'Treks from Lohajung' },
        { href: '/treks/location/joshimath', label: 'Treks from Joshimath' },
        { href: '/treks/winter-treks-uttarakhand', label: 'Winter Treks in Uttarakhand' },
        { href: '/treks/summer-treks-uttarakhand', label: 'Summer Treks in Uttarakhand' },
        { href: '/treks/beginner-treks-uttarakhand', label: 'Beginner Treks in Uttarakhand' },
        { href: '/treks/location/chakrata', label: 'Weekend Treks from Chakrata' },
        { href: '/treks/best-treks-in-uttarakhand', label: 'Best Treks in Uttarakhand — Master Guide' },
        { href: '/treks/garhwal-himalayas/fitness-guide', label: '8-Week Fitness Guide for Garhwal Treks' },
        { href: '/treks/garhwal-himalayas/packing-checklist', label: 'Packing Checklist — Print-Ready Gear List' },
      ].map((item, i, arr) => {
        const isLastOdd = arr.length % 2 !== 0 && i === arr.length - 1;
        const isBottomRow = i >= arr.length - (arr.length % 2 === 0 ? 2 : 1);
        const isRightCol = i % 2 === 1;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="explore-link"
            style={{
              borderBottom: isBottomRow && !isLastOdd ? 'none' : i === arr.length - 1 ? 'none' : '1px solid #e5e7eb',
              borderRight: isRightCol || isLastOdd ? 'none' : '1px solid #e5e7eb',
              gridColumn: isLastOdd ? 'span 2' : 'span 1',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.84rem', fontWeight: 300,
              color: '#333333', lineHeight: 1.5,
            }}>{item.label}</span>
            <span style={{
              color: 'var(--color-primary)', fontSize: '0.82rem',
              fontWeight: 400, flexShrink: 0, opacity: 0.7,
            }}>→</span>
          </Link>
        );
      })}
    </div>

  </div>
</section>

      </article>
    </TrackedPage>
  );
}
