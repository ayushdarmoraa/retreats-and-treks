import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Retreats And Treks',
    description:
      'Read our blog to learn about trekking, wellness retreats, and Himalayan travel tips. Make informed decisions about your next adventure.',
    alternates: {
      canonical: buildCanonicalUrl('/blog'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <section>
        <h1>Our Blog</h1>
        <p>
          Explore articles about trekking, wellness retreats, and mountain experiences in the Himalayas.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Browse by Topic</h2>
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
          <li>
            <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
              Retreat Decision Guides
            </Link>
          </li>
          <li>
            <Link href="/topics/location-authority" style={{ color: 'var(--color-primary)' }}>
              Location Guides
            </Link>
          </li>
          <li>
            <Link href="/topics/trek-decision" style={{ color: 'var(--color-primary)' }}>
              Trek Guides
            </Link>
          </li>
          <li>
            <Link href="/topics/lifestyle" style={{ color: 'var(--color-primary)' }}>
              Lifestyle
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Recent Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Blog 1: Kedarkantha vs Har Ki Dun */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
            <h3>
              <Link href="/blog/kedarkantha-vs-har-ki-dun" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                Kedarkantha vs Har Ki Dun Trek: Which Peak Should You Climb?
              </Link>
            </h3>
            <p>
              Comparing two popular Himalayan treks from Sankri: Which one matches your ambition, fitness level, and mountain style?
            </p>
            <Link href="/blog/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              Read Article →
            </Link>
          </div>

          {/* Blog 2: Chakrata vs Sankri */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
            <h3>
              <Link href="/blog/chakrata-vs-sankri" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                Chakrata vs Sankri: Choose Your Himalayan Destination
              </Link>
            </h3>
            <p>
              Should you retreat in peaceful Chakrata or trek from the remote base of Sankri? Here's how to choose based on what you want.
            </p>
            <Link href="/blog/chakrata-vs-sankri" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              Read Article →
            </Link>
          </div>

          {/* Blog 3: Trek vs Retreat */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
            <h3>
              <Link href="/blog/trek-vs-retreat" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                Trek vs Retreat: Which Mountain Experience Is Right For You?
              </Link>
            </h3>
            <p>
              Not sure whether to climb a peak or find peace in the mountains? Learn the differences, and which one will transform you.
            </p>
            <Link href="/blog/trek-vs-retreat" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              Read Article →
            </Link>
          </div>

          {/* Blog 4: Is Weekend Retreat Worth It */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
            <h3>
              <Link href="/blog/is-weekend-retreat-worth-it" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                Is a Weekend Retreat Worth It? The Real Answer.
              </Link>
            </h3>
            <p>
              You have a limited weekend. Learn why a two-day mountain retreat can reset your mind and body more than you'd expect.
            </p>
            <Link href="/blog/is-weekend-retreat-worth-it" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              Read Article →
            </Link>
          </div>

          {/* Blog 5: Chakrata vs Mussoorie */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
            <h3>
              <Link href="/blog/chakrata-vs-mussoorie-weekend-trip" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
                Chakrata vs Mussoorie: Where to Spend Your Weekend Escape
              </Link>
            </h3>
            <p>
              Two Himalayan towns, two very different vibes. Find out which one fits your weekend escape better.
            </p>
            <Link href="/blog/chakrata-vs-mussoorie-weekend-trip" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              Read Article →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Subscribe for Mountain Stories</h2>
        <p>
          We share insights about mountain wellness, trekking preparation, and Himalayan travel. Get them in your inbox.
        </p>
        <p>Email subscription form coming soon.</p>
      </section>
    </main>
  );
}
