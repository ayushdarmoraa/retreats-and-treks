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

const PATH = '/silent-retreat-vs-digital-detox';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Silent Retreat vs Digital Detox — Which Do You Need? | Retreats And Treks',
    description:
      'The real differences between a silent meditation retreat and a digital detox retreat — what each provides, who benefits most, and how to choose the right format for your situation.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Silent Retreat vs Digital Detox — Which Do You Need?',
      description: 'Silent retreat or digital detox? A clear comparison to help you choose the right format.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Silent Retreat vs Digital Detox — Which Do You Need?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a digital detox the same as a silent retreat?',
    answer:
      'No. A digital detox removes devices and screens. A silent retreat removes speech, social interaction, and often reading and writing as well. Digital detox retreats may include conversation, group activities, and nature excursions. Silent retreats involve sustained meditation practice in periods of complete verbal silence. The digital detox addresses screen dependency. The silent retreat addresses the deeper layer — the mind\'s dependency on all forms of external stimulation.',
  },
  {
    question: 'Which is easier — a digital detox or a silent retreat?',
    answer:
      'A digital detox is generally easier because you retain social connection, conversation, and activity. The challenge is limited to device withdrawal, which typically resolves within 48 hours. A silent retreat removes more layers of stimulation, which can surface deeper psychological material. For a first experience, a digital detox retreat provides a gentler entry.',
  },
  {
    question: 'Can I do a digital detox and silent retreat at the same time?',
    answer:
      'All of our silent retreats are inherently digital detoxes — devices are surrendered at the beginning. But a digital detox retreat is not necessarily silent. If you want the full experience of both, a silent retreat provides it. If you want device-free time with the option to talk and socialise, a dedicated digital detox retreat is the better choice.',
  },
  {
    question: 'How long should a digital detox retreat be?',
    answer:
      'Three days is the minimum for meaningful neurological reset. Research shows that the dopamine system, sleep architecture, and attentional capacity begin to normalise after 48–72 hours without screens. A 7-day retreat produces deeper restoration. For severe screen dependency (8+ hours daily), longer formats provide more lasting results.',
  },
  {
    question: 'Will I get withdrawal symptoms without my phone?',
    answer:
      'Yes, for most people. Phantom vibrations, compulsive pocket-checking, anxiety about missing messages, and boredom are universal in the first 24–48 hours. These symptoms are real — they reflect neurological dependency on intermittent dopamine stimulation. They pass. By day three, most participants report a clarity and calm they did not know was available to them.',
  },
];

export default function SilentRetreatVsDigitalDetoxPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'Silent Retreat vs Digital Detox', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Silent Retreat vs Digital Detox — Which Do You Need?',
    description: 'A comparison of silent retreats and digital detox retreats to help you choose the right format.',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Silent Retreats', href: '/silent-retreats' }, { name: 'Silent Retreat vs Digital Detox' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Silent Retreat vs Digital Detox: Which Do You Actually Need?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Both involve stepping away from the noise. Both promise a reset. But they work
            on different layers of the problem. A digital detox addresses your relationship
            with technology. A silent retreat addresses your relationship with your own mind.
            Here is how to know which one you need &mdash; or whether you need both.
          </p>
        </header>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What a Digital Detox Retreat Provides</h2>
          <p style={proseStyle}>
            A digital detox retreat removes screens, devices, and digital connectivity. You
            surrender your phone at the beginning and get it back at the end. The goal is to
            break the cycle of compulsive screen use, restore attentional capacity, and
            reconnect with offline experience.
          </p>
          <p style={proseStyle}>
            During a digital detox, you typically retain the ability to speak, socialise, and
            participate in group activities. Programmes often include nature walks, journaling,
            group discussions, creative activities, and unstructured free time. The experience
            is social and active &mdash; you are disconnecting from devices, not from people.
          </p>
          <p style={proseStyle}>
            Read{' '}
            <Link href="/a-week-without-my-phone-digital-detox" style={{ color: 'var(--color-primary)' }}>one participant&rsquo;s account of a week-long digital detox</Link>
            {' '}for the raw experience. See{' '}
            <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>digital detox retreat programmes</Link>.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What a Silent Retreat Provides</h2>
          <p style={proseStyle}>
            A silent retreat removes speech, social interaction, reading, writing, and all
            digital input. Noble silence means no talking, no eye contact, no gestures. You
            spend extended periods in seated meditation, walking practice, and stillness.
          </p>
          <p style={proseStyle}>
            The silence goes deeper than a digital detox because it removes the next layer of
            stimulation: language itself. Without the ability to narrate, explain, or
            communicate your experience, you encounter the mind in its raw state. This is
            where the profound psychological shifts occur &mdash; the ones described in{' '}
            <Link href="/what-happens-to-your-mind-in-silence" style={{ color: 'var(--color-primary)' }}>the neuroscience of silence</Link>.
          </p>
          <p style={proseStyle}>
            Read{' '}
            <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>what one person learned during five days of silence</Link>
            . See{' '}
            <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>silent retreat programmes</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Not sure which format is right? Tell us what you're dealing with — we'll be honest about what will help."
          vertical="retreat"
          category="silence-vs-detox"
          sourcePath={PATH}
        />

        <section style={sectionStyle}>
          <h2 style={h2Style}>Side-by-Side Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Dimension</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Digital Detox</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Silent Retreat</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['What is removed', 'Screens and devices', 'Speech, devices, reading, social interaction'],
                  ['Social contact', 'Maintained — conversation and group activities', 'Removed — noble silence'],
                  ['Primary practice', 'Nature, journaling, unstructured time', 'Seated meditation, walking practice, stillness'],
                  ['Psychological depth', 'Moderate — addresses screen dependency', 'Deep — addresses mental habits and emotional patterns'],
                  ['Difficulty', 'Moderate — device withdrawal peaks at 48 hours', 'High — silence reveals deeper layers of discomfort'],
                  ['Best duration', '3–7 days', '3–10 days'],
                  ['Who it suits', 'Anyone with screen fatigue or attention fragmentation', 'Those seeking deep inner work and nervous system reset'],
                  ['Preparation needed', 'Minimal', 'Some — see preparation guide'],
                ].map(([dim, detox, silent]) => (
                  <tr key={dim} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>{dim}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{detox}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{silent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Choose a Digital Detox When&hellip;</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>Your primary issue is screen time, phone dependency, or attention fragmentation</li>
            <li>You want to disconnect from devices but still socialise and talk</li>
            <li>You are not interested in meditation but want a technology-free reset</li>
            <li>You want a gentler first experience before attempting silence</li>
            <li>You are a digital professional and need a structured break from constant connectivity</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Choose a Silent Retreat When&hellip;</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You want to go deeper than device removal &mdash; you want to meet your own mind</li>
            <li>You are carrying unprocessed stress, grief, or emotional weight that needs space</li>
            <li>You have a meditation practice and want sustained depth</li>
            <li>You are recovering from{' '}
              <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>burnout</Link>
              {' '}and need a complete nervous system reset</li>
            <li>You have done a digital detox before and are ready for the next level</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>The Best of Both: Silent Retreats Include Digital Detox</h2>
          <p style={proseStyle}>
            Every silent retreat we offer is inherently a digital detox &mdash; devices are
            surrendered at the start. You get the benefits of both: freedom from screens
            and the deeper freedom from speech and social performance. If you are drawn to
            both formats, the silent retreat gives you everything the digital detox provides
            plus the additional depth of verbal silence.
          </p>
          <p style={proseStyle}>
            The reverse is not true: a digital detox retreat does not include the
            psychological benefits of silence. If you are specifically seeking meditation
            depth and inner exploration, the silent format is the more complete choice.
          </p>
        </section>

        <FeaturedRetreat
          title="3-Day Silent Retreat — Digital Detox Included"
          description="Surrender your phone, enter silence, and discover what your mind does when left alone. Forest setting, small group, skilled facilitation."
          links={[
            { label: 'View programme', href: '/3-day-silent-retreat' },
            { label: 'Digital detox retreats', href: '/digital-detox-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'A Week Without My Phone — Digital Detox Story', href: '/a-week-without-my-phone-digital-detox' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Silent Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>Digital Detox Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/vipassana-vs-meditation-retreat" style={{ color: 'var(--color-primary)' }}>Vipassana vs Meditation Retreat</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
