import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/trek-and-paint-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Trek and Paint in the Himalayas — Art on the Trail | Retreats And Treks',
    description:
      'Trek and paint in the Himalayas. Walk through mountain landscapes by morning, create art from what you saw by afternoon. Plein air painting, nature sketching, and land art on Himalayan trails.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Trek and Paint in the Himalayas',
      description: 'Walk through mountain landscapes by morning, create art from what you saw by afternoon.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Trek and Paint in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How do you carry art supplies on a trek?',
    answer:
      'We keep it simple. A pocket watercolour set, a hardback sketchbook, a few pencils, and a water brush fit in a hip bag or jacket pocket. Porters carry heavier supplies to camp. At each campsite, we set up a shared outdoor studio with additional materials. The constraint of a limited travel kit is actually beneficial — it forces simplicity and directness in the work.',
  },
  {
    question: 'Do I need to be fit for this?',
    answer:
      'Moderate fitness is sufficient. The treks are selected for steady gradients and scenic camping spots rather than technical difficulty. Daily walking is 4–6 hours at a comfortable pace with frequent stops for sketching and observation. If you can walk for 5 hours with a daypack, you are ready. We carry the art supplies.',
  },
  {
    question: 'Is this a trekking trip or an art retreat?',
    answer:
      'Both. Mornings are spent walking through Himalayan landscape. Afternoons at camp are dedicated creation time — painting, sketching, or working with natural materials gathered on the trail. The walking and the art feed each other. What you see on the trail becomes the subject of the afternoon work. The exhaustion from trekking quiets the inner critic.',
  },
  {
    question: 'What if I cannot draw?',
    answer:
      'The trail does not care whether you can draw. Nature sketching, land art, and texture rubbings require no drawing skill. Watercolour washes of mountain light are about colour and water, not line work. The facilitator meets you where you are. Some of the most striking work on these trips comes from people who have never held a paintbrush.',
  },
  {
    question: 'What mediums can I use on the trail?',
    answer:
      'Watercolour, ink, pencil, and charcoal travel well. At camp, we add clay (where available), collage materials, and natural found materials. Land art — arrangements of stone, leaf, branch, and water — requires no carried supplies at all. The mountain provides the materials.',
  },
];

export default function TrekAndPaintPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Trek and Paint in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Trek & Paint' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Trek and Paint in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Walk through a landscape in the morning. Paint it in the afternoon. This is
            the oldest relationship between art and place &mdash; moving through terrain
            with attention, then translating what you saw into colour, line, and form.
            The Himalayas provide subject matter that humbles and inspires in equal measure:
            mountain light that changes hourly, forest textures that reward close observation,
            valleys that demand you work larger than you normally would. This is not a trek
            with a painting workshop added. It is a single practice where walking and creating
            are inseparable.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who This Is For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Artists who want to paint landscapes from inside the landscape, not from photographs</li>
            <li>Trekkers who want a creative dimension to their mountain experience</li>
            <li>People who sketch on holidays and want a trip designed around that impulse</li>
            <li>Beginners who are curious about art but need the motivation of extraordinary scenery</li>
            <li>Anyone who feels the pull to create when surrounded by natural beauty</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Explore Trek + Paint"
          subtext="Tell us about your trekking level and creative interests. We'll match you with the right route and facilitator."
          vertical="retreat"
          category="trek-paint"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            A Typical Day
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <tbody>
                {[
                  '6:00 AM — Wake. Tea with a view.',
                  '6:30 AM — Morning stretch or yoga (15 min)',
                  '7:00 AM — Breakfast at camp',
                  '7:45 AM — Trail departs. Sketchbook in pocket.',
                  '9:30 AM — First observation stop. Quick sketches.',
                  '10:00 AM — Continue walking. Notice colour, light, texture.',
                  '12:00 PM — Arrive at next camp. Lunch.',
                  '1:30 PM — Rest or explore nearby.',
                  '2:30 PM — Outdoor studio time. Paint, draw, sculpt with found materials.',
                  '5:00 PM — Tea. Optional sharing of the day\'s work.',
                  '6:00 PM — Dinner.',
                  '7:30 PM — Journalling, star observation, or early sleep.',
                ].map((row) => {
                  const [time, ...rest] = row.split(' — ');
                  return (
                    <tr key={row} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.6rem 0.5rem', whiteSpace: 'nowrap', fontWeight: 500 }}>{time}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{rest.join(' — ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Art on the Trail
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Mountain art divides naturally into three modes, and a trek touches all of them:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Quick capture</strong> &mdash; 60-second sketches at trail stops. The view will not wait. Speed kills the inner critic.</li>
            <li><strong>Sustained work</strong> &mdash; afternoon studio time at camp. Translate the morning&rsquo;s observations into painting, drawing, or mixed media. The facilitator is available.</li>
            <li><strong>Land art</strong> &mdash; creation from found materials. Stone arrangements, leaf compositions, water patterns. These works exist for an hour and are photographed. The impermanence is the point.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where to Trek and Paint
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>
              <Link href="/art-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
              {' '}&mdash; forest trails through deodar canopy. Intimate scale, rich texture, filtered light. Best for nature studies and close observation.
            </li>
            <li>
              <Link href="/art-retreat-sankri" style={{ color: 'var(--color-primary)' }}>Sankri</Link>
              {' '}&mdash; classic Himalayan valley treks. Open meadows, snow-capped peaks, pastoral village life. Best for landscape painting and figurative sketching.
            </li>
            <li>
              <Link href="/art-retreat-mussoorie" style={{ color: 'var(--color-primary)' }}>Mussoorie</Link>
              {' '}&mdash; ridge-top walks with panoramic valley views. Colonial architecture, terraced hills. Best for plein air watercolour and architectural sketching.
            </li>
            <li>
              <Link href="/art-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh</Link>
              {' '}&mdash; riverside walks and temple trails. Cultural density, river light, sacred geometry. Best for mixed media and urban sketching.
            </li>
            <li>
              <Link href="/art-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>
              {' '}&mdash; Trans-Himalayan trails between monasteries. Stark mineral palette, extreme light, lunar landscape. Best for minimal and abstract work.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Trekking Improves the Art
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Physical exhaustion from walking is the best inner-critic suppressor available.
            After five hours on a mountain trail, the part of your brain that judges your
            work is too tired to interfere. What remains is directness &mdash; the impulse
            to capture what you saw before the light changes or the memory fades.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Artists who paint from photographs work with frozen moments. Artists who paint
            after walking through a landscape work with embodied memory &mdash; the temperature,
            the sound, the physical effort, the smell of pine or river stone. This embodied
            quality enters the work. The paintings are not more technically accomplished, but
            they are more alive.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)', background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)' }}>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            If you want a deeper creative experience, explore the{' '}
            <Link href="/creative-retreat" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Creative Healing Retreat</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Walk and Create With Us"
          subtext="Tell us your trekking experience and creative interests. We design the route and the art programme together."
          vertical="retreat"
          category="trek-paint"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/creative-retreat" style={{ color: 'var(--color-primary)' }}>Art Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/trek-and-meditate-himalayas" style={{ color: 'var(--color-primary)' }}>Trek & Meditate</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/himalayan-retreat-with-trekking" style={{ color: 'var(--color-primary)' }}>Retreat with Trekking</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>Best Treks</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
