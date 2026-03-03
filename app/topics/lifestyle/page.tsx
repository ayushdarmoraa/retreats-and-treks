import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';

const CANONICAL = '/topics/lifestyle';

export const metadata: Metadata = {
  title: 'Lifestyle & Himalayan Living',
  description:
    'Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and trek culture. How the Himalayas reshape how you live, not just where you visit.',
  alternates: {
    canonical: buildCanonicalUrl(CANONICAL),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Lifestyle & Himalayan Living — Retreats And Treks',
    description:
      'Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and trek culture.',
    url: buildCanonicalUrl(CANONICAL),
    type: 'website',
  },
};

export default function LifestyleTopicPage() {
  const posts = ALL_BLOG_POSTS.filter((post) => post.category === 'Lifestyle');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Topics', url: buildCanonicalUrl('/topics') },
    { name: 'Lifestyle & Himalayan Living', url: buildCanonicalUrl(CANONICAL) },
  ]);

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Topics', href: '/topics' },
          { name: 'Lifestyle & Himalayan Living' },
        ]}
      />

      {/* ── H1 ─────────────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          Lifestyle &amp; Himalayan Living
        </h1>
        <p style={{ lineHeight: 1.75, color: 'var(--color-muted)', fontSize: '1rem' }}>
          Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and
          trek culture — from people who keep returning to the mountains.
        </p>
      </header>

      {/* ── EDITORIAL BODY ─────────────────────────────────────────────────── */}

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Slow Living Is Not a Trend — It Is a Response
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          The phrase &ldquo;slow living&rdquo; has been absorbed into marketing language. But in the
          Himalayas, slowness is not an aesthetic. It is the only viable speed. Mountain roads take
          hours. Meals happen when fire heats water. Mornings begin when light arrives, not when an
          alarm sounds. This is not philosophy — it is physics. The terrain imposes a pace that urban
          life has systematically removed, and that pace turns out to be the one your nervous system
          was designed for.
        </p>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          People who spend even three days at altitude in places like{' '}
          <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>{' '}
          or{' '}
          <Link href="/retreats/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link>{' '}
          report the same thing: time changed shape. Not metaphorically — literally. The hours felt
          longer. Attention stabilised. The compulsive need to check, scroll, or produce
          diminished without effort. The environment did the work.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Mountain Lifestyle as a Practice, Not a Destination
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Living in or near mountains is not about escaping modern life. It is about recalibrating
          your relationship with it. The people who live year-round in Himalayan villages — in{' '}
          <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>Sankri</Link>,{' '}
          in the Johar Valley above Munsiyari, in the forest hamlets around Chakrata — do not
          romanticise their existence. They farm, cook, repair, endure cold, and deal with
          isolation. But they also sleep deeply, eat seasonally, move their bodies daily, and live
          within natural rhythms that most urban professionals have never experienced.
        </p>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Mountain lifestyle, as a concept worth exploring, is not about mimicking village life. It
          is about borrowing principles: reduce inputs. Move your body through terrain, not just on
          a treadmill. Eat what the season offers. Let silence exist without filling it. These are
          not radical ideas — they are ancient defaults that industrial life overrode.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Retreat Psychology: Why Stepping Away Works
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          The psychology of retreat is not complex: your brain cannot recalibrate inside the system
          that dysregulated it. Changing the environment — physically, sensorily, socially — is the
          minimum viable intervention for genuine cognitive reset. This is why a weekend at home
          rarely restores you the way a weekend in the forest does, even when both involve rest.
        </p>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Research on nature immersion converges on a consistent finding: approximately 72 hours in
          a genuinely different environment produces measurable changes in cortisol, attention span,
          and default-mode network activity. A{' '}
          <Link href="/blog/is-weekend-retreat-worth-it" style={{ color: 'var(--color-primary)' }}>
            weekend retreat
          </Link>{' '}
          hits this threshold. A{' '}
          <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
            five-day programme
          </Link>{' '}
          exceeds it. The question is not whether stepping away works — it is whether you will
          actually do it before burnout forces the decision.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Travel Mindset: Going Somewhere vs. Going Toward Something
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Most travel is consumption. You arrive, you see, you photograph, you leave. The place
          is backdrop. Himalayan travel — when done with intention — inverts this. You arrive, and
          the place works on you. The altitude shifts your physiology. The silence reorganises your
          attention. The difficulty of reaching{' '}
          <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>Sankri</Link>{' '}
          or{' '}
          <Link href="/retreats/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link>{' '}
          filters out casual visitors and ensures that arrival itself is an act of commitment.
        </p>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          The travel mindset we explore in these articles is directional, not recreational. It asks:
          what am I moving toward? Rest? Challenge? Clarity? Discomfort? The answer determines the
          destination. Someone seeking stillness belongs in{' '}
          <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>.
          Someone seeking transformation through difficulty belongs on a{' '}
          <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>
            glacier trek
          </Link>. Knowing the difference is the first act of intentional travel.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Trek Culture: What Walking in Mountains Actually Teaches
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Trekking is not hiking with a better view. Himalayan trek culture — the real culture, not
          the Instagram version — is built on preparation, respect for terrain, dependence on local
          knowledge, and acceptance that the mountain decides your schedule. A{' '}
          <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
            Kedarkantha summit push
          </Link>{' '}
          teaches you about your own limits. A{' '}
          <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
            Har Ki Dun valley traverse
          </Link>{' '}
          teaches you about patience and sustained effort over days. A{' '}
          <Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)' }}>
            Khaliya Top ascent
          </Link>{' '}
          teaches you that the view from the top is not the point — the walk getting there is.
        </p>
        <p style={{ lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
          Trek culture, at its best, is a practice of embodied presence. You cannot think about
          tomorrow when the trail demands your feet now. You cannot be distracted when altitude
          thins your air and sharpens your focus. These are not metaphors for mindfulness — they are
          the physical conditions that produce it.
        </p>
      </section>

      {/* ── POSTS LIST ─────────────────────────────────────────────────────── */}

      <section
        style={{
          marginBottom: 'var(--space-xl)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>
          Articles on Lifestyle &amp; Himalayan Living
        </h2>

        {posts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li
                key={post.slug}
                style={{
                  marginBottom: 'var(--space-lg)',
                  paddingBottom: 'var(--space-lg)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '1.05rem' }}
                >
                  {post.title}
                </Link>
                <p
                  style={{
                    margin: '0.35rem 0 0',
                    lineHeight: 1.65,
                    color: 'var(--color-muted)',
                    fontSize: '0.95rem',
                  }}
                >
                  {post.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ lineHeight: 1.75, color: 'var(--color-muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>
            Lifestyle articles are being developed. New perspectives on mountain living, retreat
            psychology, and intentional travel will appear here as they are published.
          </p>
        )}
      </section>

      {/* ── INTERNAL LINKS — TOPIC CROSS-NAVIGATION ────────────────────────── */}

      <section
        style={{
          marginBottom: 'var(--space-xl)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>
          Explore Other Topics
        </h2>
        <p style={{ lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          Each topic cluster covers a different dimension of the Himalayan retreat and trekking
          experience:
        </p>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2.2, fontSize: '0.95rem' }}>
          <li>
            <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
              Retreat Guides
            </Link>{' '}
            — Choosing between retreat formats, durations, and approaches
          </li>
          <li>
            <Link href="/topics/location-authority" style={{ color: 'var(--color-primary)' }}>
              Location Guides
            </Link>{' '}
            — Destination-specific planning for Chakrata, Sankri, Munsiyari, and Rishikesh
          </li>
          <li>
            <Link href="/topics/trek-decision" style={{ color: 'var(--color-primary)' }}>
              Trek Guides
            </Link>{' '}
            — Comparing Himalayan trekking routes, difficulty, and what each trail offers
          </li>
        </ul>
      </section>

      {/* ── CONTEXTUAL LINK — BROADER AUTHORITY ─────────────────────────────── */}

      <p style={{ lineHeight: 1.75, marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>
        For a complete overview of structured mountain-based programmes, visit our{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats guide
        </Link>
        .
      </p>

      <nav
        style={{
          marginTop: 'var(--space-lg)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <Link href="/blog" style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
          ← All articles
        </Link>
      </nav>
    </main>
  );
}
