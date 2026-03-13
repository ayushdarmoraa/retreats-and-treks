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

const PATH = '/a-week-without-my-phone-digital-detox';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'A Week Without My Phone — Digital Detox Retreat in the Himalayas',
    description:
      'What happens when you hand over your phone for 7 days in the Himalayas. A first-person account of a digital detox retreat — withdrawal, recalibration, and what changes when you return.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'A Week Without My Phone — Digital Detox Retreat',
      description:
        'What really happens when you disconnect for a week. A first-person digital detox story from the Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('A Week Without My Phone — Digital Detox Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What happens to your phone during a digital detox retreat?',
    answer:
      'You hand your phone to the facilitator at the start of the retreat. It is stored securely and returned at the end. You can request it for genuine emergencies. Most participants report that the moment of handover is the hardest part — everything after that is easier than expected.',
  },
  {
    question: 'How long does digital withdrawal last?',
    answer:
      'The phantom-phone sensations — reaching for it, feeling the impulse to check — typically peak on day one and fade significantly by day three. By day four, most participants report that the urge has been replaced by a sense of relief. The speed of this transition surprises almost everyone.',
  },
  {
    question: 'Will I miss important messages or calls?',
    answer:
      'Before the retreat, you notify key contacts of your absence. Emergency contact information is provided to your family or workplace. In the history of our retreats, the number of genuine emergencies requiring phone access has been very close to zero. What most people discover is that the world continues perfectly well without their constant availability.',
  },
  {
    question: 'Is a digital detox retreat just about phones?',
    answer:
      'Phones are the primary device, but the detox extends to all screens — laptops, tablets, e-readers. The goal is not anti-technology ideology; it is the removal of constant informational input so your nervous system can recalibrate. You can still use a watch, a headlamp, and a journal. The target is dopamine-driven distraction, not all technology.',
  },
  {
    question: 'What is the difference between a digital detox retreat and a silent retreat?',
    answer:
      'A silent retreat removes speech; a digital detox retreat removes screens and connectivity. They overlap significantly — most silent retreats are also phone-free. A dedicated digital detox retreat may include conversation, group activities, and nature-based experiences while maintaining the no-screen protocol. Both achieve nervous system downregulation through different pathways.',
  },
];

export default function DigitalDetoxStoryPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Digital Detox Retreat', url: buildCanonicalUrl('/digital-detox-retreat') },
    { name: 'A Week Without My Phone', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'A Week Without My Phone — Digital Detox Retreat in the Himalayas',
    description:
      'A first-person account of a 7-day digital detox retreat in the Himalayas.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2025-12-05',
    dateModified: '2026-03-01',
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

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Digital Detox Retreat', href: '/digital-detox-retreat' },
          { name: 'A Week Without My Phone' },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            A Week Without My Phone: What a Digital Detox Retreat Actually Feels Like
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
            A first-person account &middot; 7 days &middot; Chakrata, Uttarakhand &middot; 2,000m
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            My average screen time was eleven hours and forty-two minutes per day. I know this
            because my phone told me, weekly, in a notification I had learned to dismiss without
            reading. The irony of a device measuring the problem it creates was not lost on me.
            It was lost on my behaviour, though. I kept scrolling.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            A friend who had done a{' '}
            <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>digital detox retreat</Link>
            {' '}described it as &ldquo;the most boring and most important week of my life.&rdquo;
            I signed up the next day. Not because I was inspired. Because I was scared of how
            dependent I had become on a piece of glass.
          </p>
        </header>

        {/* ── THE HANDOVER ──────────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Handing Over the Phone</h2>
          <p style={proseStyle}>
            The retreat was in{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
            {' '}&mdash; a small Himalayan town at 2,000 metres, surrounded by old-growth deodar
            forest. Two and a half hours from Dehradun. Close enough to reach easily. Far enough
            that the world felt distant.
          </p>
          <p style={proseStyle}>
            After the orientation session, the facilitator collected phones. She placed them in
            a locked box and set the box on a shelf. &ldquo;You will see it every day,&rdquo;
            she said. &ldquo;That is intentional. You need to know it is safe. What you will
            discover is how quickly you stop needing it.&rdquo;
          </p>
          <p style={proseStyle}>
            The moment my phone left my hand, my body reacted before my mind caught up. A
            tightness in the chest. A phantom vibration in my pocket. My right hand, for the
            rest of that evening, kept moving to where the phone usually lived. I counted: it
            happened fourteen times before dinner. Fourteen unconscious reaches for a device
            that was already gone. That number told me everything I needed to know about why I
            was here.
          </p>
        </section>

        {/* ── DAY 1: PHANTOM PHONE ──────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 1 &mdash; Phantom Vibrations and the Urge to Check</h2>
          <p style={proseStyle}>
            The first morning without a phone was disorienting in a way that felt disproportionate
            to the actual loss. I had no alarm (a bell woke us). No weather check (I looked out
            the window). No news (the world, presumably, continued). No messages (my emergency
            contact list had been distributed before the retreat).
          </p>
          <p style={proseStyle}>
            What I noticed most acutely was the urge to document. Walking through the forest,
            encountering extraordinary light filtering through deodar branches, my first
            instinct was not to see it but to photograph it. The camera impulse — capture, share,
            move on — was so deeply embedded that experiencing something directly felt almost
            transgressive. Who sees a beautiful thing and just... sees it?
          </p>
          <p style={proseStyle}>
            The morning meditation session was challenging. Without the pre-session scroll
            (checking everything before sitting down to &ldquo;clear the deck&rdquo;), my mind
            had no sense of completion. There were unfinished loops everywhere — conversations
            un-replied to, articles half-read, a general ambient anxiety that something
            somewhere needed my attention. The facilitator named this: &ldquo;Your mind is
            running completion software. It will keep looking for closure on open loops. The
            loops will not close. Eventually, the software stops running.&rdquo;
          </p>
        </section>

        <PrimaryCTA
          label="Explore Digital Detox Retreats"
          subtext="Structured disconnection in Himalayan forest. 3 to 7 days. Groups of 12 or fewer."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        {/* ── DAY 2: WITHDRAWAL ─────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 2 &mdash; The Withdrawal Is Real</h2>
          <p style={proseStyle}>
            I want to describe day two honestly because most accounts of digital detox retreats
            skip this part: it was genuinely unpleasant. Not in a dramatic, crisis way. In an
            itchy, restless, low-grade way. My attention span, trained by years of scrolling,
            was approximately ninety seconds. I could not sit with a single thought for more
            than a minute before my mind demanded new input.
          </p>
          <p style={proseStyle}>
            Without a phone, there was nothing to switch to. No tab to open. No app to check.
            No quick hit of novelty. The boredom was exquisite. I paced. I organised my bag.
            I reorganised it. I stood at the window watching nothing happen in the forest, and
            the nothing felt unbearable.
          </p>
          <p style={proseStyle}>
            The afternoon was a forest walk — three hours moving through old-growth trees on a
            ridge trail. No headphones. No podcast. No music. Just footsteps and breath and
            the intermittent sound of birds I could not identify. Somewhere around hour two,
            the restlessness shifted. Not disappeared — shifted. My attention, starved of quick
            inputs, began to settle on slower ones. The texture of bark. The way light changed
            as clouds moved. The rhythm of my own walking. I was not entertained. I was present.
            The difference was massive.
          </p>
        </section>

        {/* ── DAY 3: THE TURN ───────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 3 &mdash; When the Craving Stops</h2>
          <p style={proseStyle}>
            I woke on day three and realised something had changed overnight. The phantom
            vibrations were gone. My hand had stopped reaching for my pocket. The background
            anxiety — the sense that something required checking — had faded to a whisper. In
            its place was a quality I can only describe as spaciousness. My mind had room.
          </p>
          <p style={proseStyle}>
            The meditation session that morning lasted an hour, and for the first time, it did
            not feel long. Without the neural chatter of unfinished digital loops, my attention
            was available. The breath was interesting. The sounds of the forest were interesting.
            My own emotional state was interesting. Not consumed by anxiety or planning — just
            available for observation.
          </p>
          <p style={proseStyle}>
            The facilitator explained the neuroscience: dopamine-driven reward loops — the
            cycles of check, receive, check again — require approximately 72 hours to
            downregulate without the stimulus. After three days, the compulsive quality of
            phone use fades because the reward pathway is no longer being reinforced. What
            remains is a cleaner baseline of attention. Not elevated. Not blissful. Just
            undistorted. This was the most surprising discovery of the retreat: my normal
            state of consciousness was distorted, and I had no reference point to recognise
            it until the distortion was removed.
          </p>
        </section>

        {/* ── DAY 4–5: DEPTH ────────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Days 4&ndash;5 &mdash; What You Find Without a Screen</h2>
          <p style={proseStyle}>
            With the craving gone, the retreat became something else entirely. Not a discipline.
            Not an endurance test. A different mode of living. I read a physical book — a novel
            I had been meaning to read for two years. I read for three hours without interruption.
            When did I last do that? Before smartphones, probably.
          </p>
          <p style={proseStyle}>
            Conversations with other participants deepened in a way I hadn&rsquo;t expected.
            Without the option of retreating to a screen, social interactions became longer,
            more sustained, and less performative. We talked about things that mattered —
            quietly, without the competitive energy of dinner-party conversation. One man
            described his relationship with work in terms I recognised painfully. A woman
            talked about raising children in an attention economy. These conversations would
            not have happened at this depth with phones available. The screen is always an
            exit door, and when it is removed, you stay in the room.
          </p>
          <p style={proseStyle}>
            Day five included a dawn trek to a ridge above Chakrata where the Himalayan snow
            peaks were visible in the distance. Twelve people standing in cold air watching the
            sun hit snow at 6,000 metres. No one photographed it. Not because of the rules —
            by day five, no one wanted to. The experience of seeing it directly was enough.
            Complete. Not needing to be captured, shared, or validated. Just witnessed.
          </p>
          <p style={proseStyle}>
            I stood there and thought: this is what my attention is for. Not for scrolling.
            For this. The insight was not intellectual. It was felt. And feelings, unlike
            thoughts, are harder to forget.
          </p>
        </section>

        <PrimaryCTA
          label="Plan a Digital Detox Retreat"
          subtext="Step away from the screen. Himalayan forest, small groups, guided reconnection."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        {/* ── DAY 6–7: RETURN ───────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Days 6&ndash;7 &mdash; Getting the Phone Back</h2>
          <p style={proseStyle}>
            On the morning of day six, the facilitator returned our phones. The ritual was
            deliberately low-key — no ceremony, no speech. She unlocked the box and placed them
            on a table. Take yours when you are ready.
          </p>
          <p style={proseStyle}>
            I watched myself pick it up. The screen lit with 847 notifications. 847. In seven
            days. I scrolled through the first page and felt something I did not expect: nothing.
            Not relief. Not urgency. Not the dopamine hit of catching up. Just a mild recognition
            that most of these notifications were noise. Promotional emails. App updates.
            Social media likes on posts I had forgotten writing. Perhaps six of the 847 were
            genuinely relevant.
          </p>
          <p style={proseStyle}>
            The drive back to Dehradun was quiet. Several participants kept their phones turned
            off for the journey. I checked mine, replied to the six messages that mattered,
            then put it in my bag. At the airport, I watched other travellers — heads down,
            scrolling, earbuds in, attention elsewhere. I had been that person a week ago. I
            would probably be that person again within a month. But for now, I could see it.
            That seeing is the retreat&rsquo;s lasting gift.
          </p>
        </section>

        {/* ── WHAT CHANGED ──────────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What Changed After I Got My Phone Back</h2>
          <p style={proseStyle}>
            Two months later, here is what stuck:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Screen time dropped 40%.</strong> Not through willpower or app blockers.
              Through changed preference. After seven days of undistorted attention, the scroll
              feels less appealing. The cost is visible now.
            </li>
            <li>
              <strong>Morning phone check eliminated.</strong> I charge the phone outside the
              bedroom. First hour of the day is phoneless. This single change improved my
              mornings more than any productivity hack I have tried.
            </li>
            <li>
              <strong>Deeper reading restored.</strong> I finished four books in the month
              after the retreat. I had finished one in the six months before.
            </li>
            <li>
              <strong>Better sleep.</strong> No screens for 90 minutes before bed. Not as a
              rule — as a preference. The retreat retrained the preference.
            </li>
            <li>
              <strong>An awareness of the cost.</strong> Every time I reach for the phone
              without intention, I notice it now. Not every time. But often enough to interrupt
              the loop. That awareness is the most durable outcome.
            </li>
          </ul>
        </section>

        {/* ── WHO THIS IS FOR ───────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Who Should Consider a Digital Detox Retreat</h2>
          <p style={proseStyle}>
            If you recognise yourself in any of these, a structured digital detox may help:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>Screen time above 6 hours daily (the average in India is 7.3 hours)</li>
            <li>Checking your phone within 5 minutes of waking</li>
            <li>Inability to read a book for more than 20 minutes without switching tasks</li>
            <li>A persistent sense that your attention is fragmented</li>
            <li>Sleeping poorly with a phone on the nightstand</li>
          </ul>
          <p style={proseStyle}>
            Our{' '}
            <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>digital detox retreats</Link>
            {' '}run 3 to 7 days in{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
            . For those wanting silence alongside disconnection, the{' '}
            <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>silent retreat format</Link>
            {' '}combines both. For maximum depth with complete environmental separation, consider
            the{' '}
            <Link href="/my-7-day-meditation-retreat-in-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar programme</Link>
            {' '}where disconnection is imposed by geography rather than choice.
          </p>
          <p style={proseStyle}>
            See our{' '}
            <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>burnout recovery retreats</Link>
            {' '}if your screen dependence is connected to chronic work stress, or our{' '}
            <Link href="/stress-relief-retreats" style={{ color: 'var(--color-primary)' }}>stress relief programmes</Link>
            {' '}for a broader approach to nervous system recalibration.
          </p>
        </section>

        <PrimaryCTA
          label="Start My Digital Detox"
          subtext="Tell us about your situation — we'll recommend the right format and duration."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Digital Detox Retreat in the Himalayas"
          description="Leave your devices behind. Structured disconnection in the Chakrata forest with guided practice, nature immersion, and complete digital silence."
          links={[
            { label: 'View programme', href: '/digital-detox-retreat' },
            { label: 'Explore Chakrata', href: '/locations/chakrata' },
            { label: 'See all dates', href: '/retreat-calendar' },
          ]}
        />

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>&larr; Digital Detox Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>Silent Retreat Story</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-vs-vacation" style={{ color: 'var(--color-primary)' }}>Retreat vs. Vacation</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
