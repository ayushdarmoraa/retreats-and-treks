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

const PATH = '/is-a-meditation-retreat-worth-it';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Is a Meditation Retreat Worth It? An Honest Assessment | Retreats And Treks',
    description:
      'Is a meditation retreat worth the time and money? An honest look at who benefits, who doesn\'t, what to expect, and how to decide if now is the right time.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Is a Meditation Retreat Worth It? An Honest Assessment',
      description: 'Who should (and shouldn\'t) attend a meditation retreat. An honest guide.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Is a Meditation Retreat Worth It? An Honest Assessment'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How much does a meditation retreat cost?',
    answer:
      'Costs vary enormously — from free Vipassana courses to luxury retreats at $5,000+. Himalayan retreats typically range from ₹15,000 to ₹60,000 depending on duration, location, and level of accommodation. The question is not whether you can afford the retreat. It is whether you can afford not to address whatever brought you to this page.',
  },
  {
    question: 'What if I try a retreat and hate it?',
    answer:
      'Most people dislike the first day. The restlessness, boredom, and discomfort of day one are universal. If you leave on day one, you will conclude retreats are not for you. If you stay through day two, the experience typically transforms. For first-timers, a 3-day retreat in a gentle environment like Chakrata minimises this risk — it is short enough to be manageable and supported enough that discomfort is held.',
  },
  {
    question: 'Can I just use a meditation app instead?',
    answer:
      'Apps are tools for daily practice. A retreat is a fundamentally different experience — sustained depth, environmental immersion, and the removal of all distracting input. You can maintain and build on retreat experiences with an app afterward, but an app cannot replicate what 3–10 days of full immersion provides. They are complementary, not substitutes.',
  },
  {
    question: 'Is a retreat worth it if I have never meditated?',
    answer:
      'Often, yes. Many first-time meditators report that a retreat was the thing that made meditation "click" — because the environment and sustained practice create depth that 10-minute daily sessions cannot. If you are curious but have not been able to sustain a daily practice, a short retreat (3 days) may be exactly what you need. The retreat teaches you what meditation actually is, not just what it looks like.',
  },
  {
    question: 'How do I know if I am ready for a meditation retreat?',
    answer:
      'If you are asking this question, you are likely ready. Readiness is not about meditation experience — it is about willingness: willingness to be uncomfortable, to follow a schedule, and to spend time with your own mind without distraction. The only genuine contraindications are active psychotic disorders, recent severe trauma requiring stabilisation, or substance dependence requiring medical supervision. For everyone else, the question is not readiness — it is timing.',
  },
];

export default function IsAMeditationRetreatWorthItPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Is a Meditation Retreat Worth It?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is a Meditation Retreat Worth It? An Honest Assessment',
    description:
      'An honest look at who benefits from meditation retreats, who does not, what retreats actually provide, and whether the investment is worth it.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2025-12-15',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'Is It Worth It?' }]} />

      <article>
        <header className="fade-in" style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Is a Meditation Retreat Worth It? An Honest Assessment
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            This is the question underneath all the other questions. Before &ldquo;where&rdquo;
            and &ldquo;how long&rdquo; and &ldquo;which type,&rdquo; the real question is: will
            this actually matter? Will it change something? Or will it just be an expensive
            weekend where I sit with my eyes closed?
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The honest answer: it depends on where you are and what you are willing to bring to
            it. This page gives you the complete picture &mdash; the doubts, the reality, the
            costs, and the evidence &mdash; so you can make a clear decision.
          </p>
        </header>

        {/* ── SECTION 1: DOUBTS ─────────────────────────────────── */}
        <section className="fade-in" style={sectionStyle}>
          <h2 style={h2Style}>The Doubts You Probably Have Right Now</h2>
          <p style={proseStyle}>
            If you are reading this page, you are not looking for spiritual platitudes. You are
            looking for honest information because you are weighing a real decision. Here are
            the doubts we hear most often &mdash; and what we know about each one.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            &ldquo;I&rsquo;m not sure I can sit still for that long.&rdquo;
          </h3>
          <p style={proseStyle}>
            Almost nobody can, at first. The restlessness on day one is universal. Even experienced
            meditators find the first 12 hours of a retreat uncomfortable. The difference between
            a retreat and sitting at home is that the retreat holds you through it &mdash; the
            schedule continues, the bell rings, and you sit again. The sitting itself teaches
            you how to sit. By day two, most people find the body has settled in ways they did
            not expect. Read{' '}
            <Link href="/what-happens-to-your-mind-in-silence" style={{ color: 'var(--color-primary)' }}>what happens to your mind in silence</Link>
            {' '}for the stage-by-stage experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            &ldquo;I can just meditate at home.&rdquo;
          </h3>
          <p style={proseStyle}>
            You can. And you should. But home practice and retreat practice are different
            categories of experience &mdash; not different amounts of the same thing. At home,
            you meditate for 10&ndash;30 minutes inside an environment designed for activity:
            your phone is nearby, your to-do list is in the next room, your identity as a busy
            person is intact. A retreat removes all of that. You do not just meditate more. You
            meditate inside a different psychic environment &mdash; one where the usual escapes
            are not available and depth becomes the only direction.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            &ldquo;What if nothing happens?&rdquo;
          </h3>
          <p style={proseStyle}>
            Something always happens. It may not be what you expected &mdash; and that is often
            the point. The mind has a habit of defining &ldquo;result&rdquo; in terms of dramatic
            experience: visions, breakthroughs, emotional catharsis. The actual results of a
            retreat are usually subtler and more durable: you sleep better. Your reactions slow
            down. You notice things about your own patterns that were invisible before. You
            return to daily life with a different relationship to stress. These are not
            spectacular. They are also not nothing.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            &ldquo;I can&rsquo;t afford to take time off work.&rdquo;
          </h3>
          <p style={proseStyle}>
            Consider what the time is costing you now. If you are running on chronic stress,
            fragmented attention, and poor sleep, you are already losing productive hours every
            day to a diminished nervous system. A 3-day retreat is a smaller time investment
            than most people lose in a single month to stress-related inefficiency. The question
            is not whether you can afford 3 days. It is whether you can afford 3 more months
            of the current mode.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            &ldquo;I&rsquo;m not spiritual or religious.&rdquo;
          </h3>
          <p style={proseStyle}>
            Neither are most of our participants. A meditation retreat is not a religious event.
            It is a structured period of attentional training in a low-stimulus environment.
            The practices are evidence-based: focused attention, open monitoring, body scanning.
            The framework is psychological and neuroscientific, not theological. You do not need
            to believe in anything to benefit from reducing cortisol, strengthening prefrontal
            function, and regulating your nervous system.
          </p>
        </section>

        <PrimaryCTA
        
          label="Talk to Us Honestly"
          subtext="Not sure if a retreat is right for you? Describe where you are — we'll give you an honest answer."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        {/* ── SECTION 2: WHAT RETREATS ACTUALLY PROVIDE ─────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What a Meditation Retreat Actually Provides</h2>
          <p style={proseStyle}>
            Retreats are not about learning meditation techniques &mdash; you can learn those
            from a book or an app. What a retreat provides is something no other format can:
            the conditions under which meditation actually works at depth.
          </p>

          <p style={proseStyle}>
            <strong>Sustained immersion.</strong> Depth requires duration. A 20-minute daily
            sit barely gets past the initial settling phase. A full day of practice reaches
            layers of the mind that short sessions cannot access. By day three of a retreat,
            the nervous system enters a state that most people have not experienced since
            childhood &mdash; calm without sleepiness, alert without agitation. This is not
            relaxation. It is a regulated nervous system operating at baseline.
          </p>

          <p style={proseStyle}>
            <strong>Environmental removal.</strong> Every notification, every conversation, every
            minor decision drains a small amount of attentional energy. A retreat removes them
            all. The meals are planned. The schedule is set. There is nothing to decide, nothing
            to respond to, nothing to perform. This removal is what allows the deep processing
            described in retreat accounts like{' '}
            <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>this five-day silence experience</Link>
            {' '}and{' '}
            <Link href="/my-7-day-meditation-retreat-in-zanskar" style={{ color: 'var(--color-primary)' }}>this Zanskar programme report</Link>.
          </p>

          <p style={proseStyle}>
            <strong>Facilitated containment.</strong> The structure of a retreat &mdash; the bells,
            the sessions, the schedule &mdash; acts as a container that holds you through
            difficulty. Without it, most people quit when the discomfort of day one or two
            arises. With it, the resistance becomes workable. Our{' '}
            <Link href="/facilitators" style={{ color: 'var(--color-primary)' }}>facilitators</Link>
            {' '}are trained to recognise when someone is struggling and to provide exactly
            enough support without interfering with the process.
          </p>

          <p style={proseStyle}>
            <strong>Physical environment.</strong> Where you meditate matters. The neurological
            effects of old-growth forest, mountain altitude, clean air, and natural acoustic
            environments are measurable. Cortisol drops faster. Sleep deepens sooner. Attention
            restores more completely. A retreat in the{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata deodar forest</Link>
            {' '}or the{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar highlands</Link>
            {' '}provides environmental benefits that no urban meditation studio can replicate.
            Read about the specific{' '}
            <Link href="/benefits-of-meditation-retreat" style={{ color: 'var(--color-primary)' }}>benefits of a meditation retreat</Link>.
          </p>

          <p style={proseStyle}>
            <strong>A reference point.</strong> Perhaps the most lasting thing a retreat provides
            is not a skill or a state but a memory: the memory of what your mind is like when
            it is not being constantly driven by input. That memory becomes a quiet standard
            that you carry into daily life &mdash; a felt sense of what is possible when the
            noise is removed.
          </p>
        </section>

        {/* ── SECTION 3: WHO SHOULD GO ──────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Who Should Go</h2>
          <p style={proseStyle}>
            A meditation retreat is worth it for a wider range of people than most imagine. You
            do not need to be a meditator. You do not need to be &ldquo;spiritual.&rdquo; You
            need to be willing to sit with yourself. Here are the profiles we see benefit most:
          </p>

          <p style={proseStyle}>
            <strong>People carrying chronic stress.</strong> Not acute crisis &mdash; chronic,
            low-grade, always-on stress that holidays do not resolve. If you return from
            vacations still tired, still wired, still reactive &mdash; the problem is not
            rest. It is nervous system dysregulation. A retreat addresses the system, not the
            symptoms. See{' '}
            <Link href="/stress-relief-retreats" style={{ color: 'var(--color-primary)' }}>stress relief retreats</Link>.
          </p>

          <p style={proseStyle}>
            <strong>Professionals approaching or recovering from burnout.</strong> Burnout is
            not tiredness. It is a nervous system that has been running in sympathetic
            activation for so long that it has forgotten how to downregulate. A retreat provides
            the extended, structured downtime that the system needs to reset. A 7-day retreat
            produces more measurable recovery than a 2-week holiday because it removes the
            inputs maintaining the stress response. Read about{' '}
            <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>burnout recovery retreats</Link>.
          </p>

          <p style={proseStyle}>
            <strong>People in life transitions.</strong> Divorce, career change, bereavement,
            retirement, becoming a parent. Transitions require processing space that daily life
            does not provide. In the noise of work, family, and obligation, the real questions
            &mdash; who am I now? what do I actually want? &mdash; get buried. A retreat
            creates the quiet in which these questions can be heard. Read{' '}
            <Link href="/why-people-go-to-meditation-retreats" style={{ color: 'var(--color-primary)' }}>why people actually go to retreats</Link>.
          </p>

          <p style={proseStyle}>
            <strong>Experienced meditators who have plateaued.</strong> If your daily practice
            feels flat, mechanical, or routine, the problem is almost certainly insufficient
            depth. A retreat breaks through practice plateaus because it provides the duration
            that daily sits cannot. Many long-term meditators describe their first multi-day
            retreat as &ldquo;the moment practice became real.&rdquo;
          </p>

          <p style={proseStyle}>
            <strong>Curious beginners.</strong> Counterintuitively, a retreat is often the best
            way to start meditating &mdash; not because it is gentle (it is not) but because
            it shows you what meditation actually is before your habits have a chance to dilute
            it. A{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link>
            {' '}gives beginners enough structure and support to have a genuine experience
            without being overwhelmed.
          </p>

          <p style={proseStyle}>
            <strong>Digital professionals.</strong> If your screen time exceeds 6 hours daily,
            your attention has been systematically fragmented. A retreat is the most efficient
            way to restore attentional capacity &mdash; more effective than a &ldquo;digital
            detox holiday&rdquo; because it combines environment removal with structured
            attention training. See{' '}
            <Link href="/digital-detox-retreat" style={{ color: 'var(--color-primary)' }}>digital detox retreats</Link>
            {' '}or read{' '}
            <Link href="/a-week-without-my-phone-digital-detox" style={{ color: 'var(--color-primary)' }}>one participant's account</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Find Your Retreat"
          subtext="Tell us what you're seeking — we'll recommend the right programme, duration, and location."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        {/* ── SECTION 4: WHO SHOULD NOT GO ──────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Who Should Not Go (Honestly)</h2>
          <p style={proseStyle}>
            We turn away more people than most retreat centres. Not because we are exclusive, but
            because we believe in honesty about when a retreat is not the right intervention.
            A retreat is not worth it &mdash; and may be counterproductive &mdash; in these
            situations:
          </p>

          <p style={proseStyle}>
            <strong>You are in acute psychological crisis.</strong> Active suicidal ideation,
            psychotic episodes, severe untreated depression, or recent traumatic events
            requiring stabilisation are contraindications for extended silent retreat. The
            reduction of external stimulation can intensify internal experience, which is
            therapeutic for most people but potentially destabilising when the system is
            already overwhelmed. If this describes you, please seek professional support
            first.
          </p>

          <p style={proseStyle}>
            <strong>You want a scenic holiday with a wellness label.</strong> A retreat is not
            a spa. It is structured, disciplined, and frequently uncomfortable &mdash; especially
            in the first two days. If what you actually want is beautiful scenery, good food,
            and relaxation, book a{' '}
            <Link href="/retreat-vs-vacation" style={{ color: 'var(--color-primary)' }}>holiday</Link>.
            {' '}Both are valid choices. They are not the same choice.
          </p>

          <p style={proseStyle}>
            <strong>You are attending for someone else.</strong> A partner, a therapist, a
            friend, or a social media trend told you to go. If the motivation is not your own,
            the retreat will feel like endurance rather than exploration. Wait until you want
            to go.
          </p>

          <p style={proseStyle}>
            <strong>You have fixed expectations of specific outcomes.</strong> &ldquo;I will
            achieve inner peace.&rdquo; &ldquo;I will solve this specific problem.&rdquo;
            &ldquo;I will feel bliss.&rdquo; Retreats with predetermined outcomes tend to
            produce frustration rather than insight. The most beneficial attitude is open
            curiosity: I will show up, follow the schedule, and notice what happens.
          </p>

          <p style={proseStyle}>
            <strong>You have active substance dependence.</strong> Withdrawal symptoms and
            craving in a remote environment without medical support is dangerous. Stabilise
            with appropriate clinical help first.
          </p>
        </section>

        {/* ── SECTION 5: COST VS BENEFIT ────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Real Cost vs. Benefit</h2>
          <p style={proseStyle}>
            Cost is the most common objection and the easiest to address with numbers.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The Financial Cost
          </h3>
          <p style={proseStyle}>
            A 3-day Himalayan retreat typically costs ₹15,000&ndash;₹30,000 (US$175&ndash;$350),
            including accommodation, meals, and facilitation. A 7-day programme ranges from
            ₹30,000&ndash;₹60,000. For international visitors, our all-inclusive retreats are
            a fraction of the cost of comparable programmes in Bali, Thailand, or Europe &mdash;
            often 60&ndash;80% less for equivalent or superior quality.
          </p>
          <p style={proseStyle}>
            Compare this to the cost of a typical holiday: flights, hotels, restaurants,
            activities. A week-long beach holiday often exceeds ₹1,00,000. The retreat costs
            less and provides something the holiday cannot: lasting neurological and
            psychological change.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The Time Cost
          </h3>
          <p style={proseStyle}>
            Three days. That is the minimum meaningful investment. You use more time than that
            scrolling social media in a typical month. A{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link>
            {' '}fits into a long weekend. A{' '}
            <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day programme</Link>
            {' '}uses one week of annual leave. The time cost is real but modest relative to
            the potential return.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The Measurable Return
          </h3>
          <p style={proseStyle}>
            Research published in Psychoneuroendocrinology found that a 7-day silent retreat
            reduced salivary cortisol by 23% on average, with effects persisting at 4-week
            follow-up. Frontiers in Psychology meta-analyses show retreat-based meditation
            produces stronger attention improvements than daily practice alone, with effect
            sizes increasing with duration.
          </p>
          <p style={proseStyle}>
            In practical terms: better sleep for weeks afterward. Reduced emotional reactivity.
            Improved focus and decision quality. Greater resilience to daily stressors. One
            senior executive described a 7-day retreat as &ldquo;the most productive thing I
            did all year &mdash; by doing nothing.&rdquo; Read the full evidence on{' '}
            <Link href="/benefits-of-meditation-retreat" style={{ color: 'var(--color-primary)' }}>meditation retreat benefits</Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The Cost of Not Going
          </h3>
          <p style={proseStyle}>
            This is the calculation most people miss. If you are reading this page, something
            in your current mode of living is not working. The stress, the fragmented attention,
            the sense of disconnection, the feeling that there must be more &mdash; these do
            not resolve themselves. They compound. The cost of not addressing them is measured
            in months and years of diminished quality of life, strained relationships, impaired
            professional performance, and deteriorating health markers.
          </p>
          <p style={proseStyle}>
            A retreat is not a luxury. For many people, it is the most efficient available
            intervention for a problem that will otherwise worsen.
          </p>
        </section>

        {/* ── SECTION 6: HOW TO MINIMISE RISK ───────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>How to Minimise Risk and Maximise Value</h2>
          <p style={proseStyle}>
            If you have decided that a retreat might be worth trying, here is how to make the
            decision low-risk and high-return:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Start with 3 days.</strong> A{' '}
              <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link>
              {' '}is enough to move through the resistance stage and into genuine settling.
              It is the minimum effective dose for a meaningful experience.
            </li>
            <li>
              <strong>Choose a supported environment.</strong>{' '}
              <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
              {' '}is our most gentle location &mdash; accessible, forested, and designed for
              first-time retreatants.
            </li>
            <li>
              <strong>Choose the right type.</strong>{' '}
              <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to choose a meditation retreat</Link>
              {' '}&mdash; not all formats suit all people.
            </li>
            <li>
              <strong>Prepare properly.</strong> Read our{' '}
              <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>preparation guide</Link>
              . Most first-retreat disappointment comes from mismatched expectations, not from
              the retreat itself.
            </li>
            <li>
              <strong>Talk to us first.</strong> We will tell you honestly whether we think a
              retreat is the right step for you right now. We have turned people away when the
              timing was wrong. We will do the same for you if it is.
            </li>
          </ul>
        </section>

        <PrimaryCTA
          label="Explore Retreats"
          subtext="See our programmes by duration, type, and location — or tell us what you're seeking and we'll recommend."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Your Low-Risk Entry"
          description="Three days in the Chakrata deodar forest. Guided sessions, small group, gentle schedule. Enough to know if retreat practice is for you."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
            { label: 'Explore Chakrata', href: '/locations/chakrata' },
            { label: 'See all dates', href: '/retreat-calendar' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
            { label: 'A Week Without My Phone — Digital Detox', href: '/a-week-without-my-phone-digital-detox' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/benefits-of-meditation-retreat" style={{ color: 'var(--color-primary)' }}>Benefits</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/what-to-expect-at-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>What to Expect</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/what-happens-to-your-mind-in-silence" style={{ color: 'var(--color-primary)' }}>The Psychology of Silence</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
