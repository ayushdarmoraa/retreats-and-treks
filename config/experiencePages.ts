/**
 * EXPERIENCE PAGES REGISTRY
 * Problem-based / intent-based retreat hub pages (Axis 2 — Experience Authority)
 * Each entry generates a top-funnel page that cross-links to locations.
 */

import type { LocationId } from '@/config/locations';

export interface ExperienceLocationAngle {
  readonly locationId: LocationId;
  readonly heading: string;
  readonly description: string;
}

export interface ExperienceDeepSection {
  readonly heading: string;
  readonly body: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export interface ExperiencePage {
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly whoIsThisFor: readonly string[];
  readonly whatToExpect: readonly string[];
  /** Retreat service slugs this experience maps to */
  readonly retreatServiceSlugs: readonly string[];
  /** Location-specific angles — each becomes a card with a deep link */
  readonly locationAngles: readonly ExperienceLocationAngle[];
  /** Closing narrative */
  readonly closingNarrative: string;
  /** Optional deep-content sections for pillar pages targeting top-3 rankings */
  readonly deepContent?: readonly ExperienceDeepSection[];
  /** Optional first-person story page links for trust-building */
  readonly storyLinks?: readonly { readonly href: string; readonly label: string }[];
  /** NEW SEO VISUAL ASSETS */
  readonly heroImage?: string;
  readonly heroImageAlt?: string;
}

export const EXPERIENCE_PAGES: readonly ExperiencePage[] = [
  // ── 1. Meditation Retreats ────────────────────────────────────────────────
  {
    slug: 'meditation-retreats',
    title: 'Meditation Retreats in the Himalayas | Retreats And Treks',
    h1: 'Meditation Retreats in the Himalayas',
    metaDescription:
      'Guided meditation retreats in quiet Himalayan locations — Zanskar, Chakrata, Rishikesh. Small groups, deep silence, experienced teachers. Find the right setting for your practice.',
    heroImage: '/Images/whyhimalaya/meditation.webp',
    heroImageAlt: 'Person meditating quietly in the Himalayas',
    intro:
      'A meditation retreat is not a holiday with meditation added. It is a deliberate container — silence, structure, guidance — where your mind can settle beneath its habitual noise. The Himalayas offer something that retreat centres in cities cannot: altitude that naturally slows thought, forests and valleys that absorb distraction, and a tradition of contemplative practice stretching back millennia. We run meditation retreats across three distinct Himalayan locations, each offering different conditions for practice.',
    whoIsThisFor: [
      'People seeking to establish or deepen a meditation practice',
      'Experienced practitioners wanting extended silence in a supported setting',
      'Those recovering from overstimulation, decision fatigue, or mental overwhelm',
      'Anyone drawn to contemplative practice in a mountain environment',
    ],
    whatToExpect: [
      'Structured daily practice — morning, afternoon, and evening sessions',
      'Guided instruction for all experience levels',
      'Extended periods of noble silence',
      'Natural environments that support rather than distract from practice',
      'Small groups (maximum 12) ensuring personal attention',
    ],
    retreatServiceSlugs: ['meditation-and-silence'],
    locationAngles: [
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Monastery Silence at 3,500m',
        description:
          'The most remote and immersive option. Zanskar\'s monastic lineage — Phugtal, Karsha, Stongde — carries centuries of meditation practice. At 3,500 metres, the reduced oxygen naturally slows the thinking mind. For serious practitioners or those seeking genuine separation from the world.',
      },
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Silence at 2,000m',
        description:
          'Dense Himalayan forest with no tourist noise. The acoustic environment is non-commercial — just birdsong, wind, and your own breath. Easily accessible from Dehradun yet genuinely remote once you arrive. Ideal for first-time retreatants or those seeking gentle depth.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Ganges Tradition',
        description:
          'India\'s yoga capital carries a living lineage of meditation practice. The energy of the Ganges and the accumulated spiritual weight of the place create a unique environment. Best for those who draw energy from tradition, community, and sacred geography.',
      },
    ],
    closingNarrative:
      'The right meditation retreat is not the most expensive or the most famous — it is the one where the environment matches what your nervous system needs right now. If you are unsure which location suits your practice, reach out. We will help you choose based on your experience level, intention, and what kind of silence you are seeking.',
    deepContent: [
      {
        heading: 'What Is a Meditation Retreat?',
        body: 'A meditation retreat is a structured period — typically three to ten days — spent in deliberate silence, daily practice, and guided instruction, away from the routines and responsibilities of ordinary life. Unlike a meditation workshop or class, a retreat creates a continuous container where practice deepens through sustained immersion rather than isolated sessions.\n\nThe core elements are consistent across traditions: multiple daily sittings, periods of walking meditation, teacher guidance or dharma talks, noble silence (no conversation, devices, or reading), simple meals, and early wake-up times. The structure is not arbitrary — it is designed to let the mind settle beneath its habitual activity.\n\nWhat surprises most first-time retreatants is how much happens beneath the surface. The first day is often restless. The second day is often harder. By the third day, something begins to shift — habitual thought patterns weaken, sensory awareness sharpens, and a deeper quality of attention emerges. This is why retreat duration matters. A weekend gives you a taste. Five to seven days allows genuine transformation. Ten days or more is where the most profound shifts occur.',
        image: '/Images/retreat/services/meditation.webp',
        imageAlt: 'Deep meditation practice overlooking the valley',
      },
      {
        heading: 'Types of Meditation Retreats',
        body: 'Not all meditation retreats are the same, and choosing the wrong type can undermine the experience.\n\n**Silent retreats** maintain noble silence throughout — no talking, no eye contact, no devices. These are the deepest form of retreat and are best for those ready to meet their own mind without distraction. Our silent retreats in Chakrata and Zanskar follow this format.\n\n**Guided meditation retreats** include regular instruction, dharma talks, and teacher interaction. The silence is maintained during practice but broken during teaching periods. These suit beginners or those who benefit from verbal guidance alongside practice.\n\n**Somatic and movement-based retreats** integrate walking meditation, gentle yoga, breathwork, and body awareness with seated practice. These work well for people who carry tension in the body or who find prolonged sitting difficult.\n\n**Trek-and-meditation retreats** combine multi-day Himalayan trekking with meditation sessions at camp. The physical exertion becomes preparation for stillness — the body tires, the mind quiets, and meditation happens naturally. These are unique to mountain environments.\n\n**Burnout recovery retreats** use meditation as one tool within a broader framework of rest, somatic release, and nature immersion. These are designed for people whose exhaustion is too deep for meditation alone.',
      },
      {
        heading: 'Why the Himalayas Are Ideal for Meditation',
        body: 'The Himalayas have been the geography of contemplative practice for thousands of years — not because of marketing, but because the environment itself supports the work of meditation in ways that cannot be replicated elsewhere.\n\n**Altitude and awareness.** At 2,000–3,500 metres, reduced oxygen naturally slows cognitive processing. The thinking mind — the part of you that plans, worries, and narrates — becomes quieter with less effort. This is not a mystical claim; it is a physiological response to altitude that experienced meditators recognise immediately.\n\n**Acoustic isolation.** Mountain valleys and dense forest absorb sound in ways that urban or coastal environments cannot. The silence in Chakrata\'s deodar forest or Zanskar\'s river valley is not the absence of noise — it is a positive quality, thick and alive, that supports rather than competes with practice.\n\n**Tradition and accumulated practice.** The Himalayas carry centuries of contemplative lineage — from Zanskar\'s Buddhist monasteries to Rishikesh\'s yoga ashrams. Whether or not you subscribe to the idea that places hold spiritual energy, there is a practical benefit: the infrastructure, teachers, and cultural context for meditation are deeply established.\n\n**Separation from habitual life.** Remote mountain locations physically remove you from the cues that maintain your daily patterns — commute, notifications, social obligations. This separation is not escapism. It is a strategic disruption that allows new patterns of attention to emerge.',
        image: '/Images/whyhimalaya/nature.webp',
        imageAlt: 'The deep pristine nature of the Himalayas perfectly suited for meditation',
      },
      {
        heading: 'A Sample Retreat Day',
        body: 'While each retreat adapts to its location and tradition, a typical daily structure looks like this:\n\n**5:30 AM** — Wake up. No alarm; the rhythm establishes itself within two days.\n**6:00 AM** — Morning sitting meditation (45 minutes). The mind is fresh, the forest is waking.\n**7:00 AM** — Walking meditation. Slow, deliberate movement — often outdoors among trees or along a mountain path.\n**7:30 AM** — Breakfast in silence. Simple food, eaten with attention.\n**9:00 AM** — Guided meditation or dharma talk (60 minutes). Instruction suited to participants\' experience levels.\n**10:30 AM** — Sitting meditation (45 minutes).\n**12:00 PM** — Lunch. The main meal of the day.\n**1:00–3:00 PM** — Rest period. Sleep, journal, walk — no structured activity.\n**3:00 PM** — Afternoon sitting (45 minutes).\n**4:00 PM** — Walking meditation or gentle movement practice.\n**5:00 PM** — Tea.\n**6:00 PM** — Evening sitting meditation (45 minutes).\n**7:00 PM** — Light dinner.\n**8:00 PM** — Optional evening reflection or early rest.\n\nThe structure is not rigid — it serves the practice, not the other way around. Times are approximate. What matters is the rhythm: sit, walk, eat, rest, repeat. By day three, the body knows the schedule without checking.',
      },
      {
        heading: 'Benefits of a Meditation Retreat',
        body: 'The benefits of a meditation retreat extend well beyond the days spent in practice. Research published in journals including Psychiatry Research, Psychoneuroendocrinology, and Frontiers in Psychology consistently confirms measurable changes following sustained meditation.\n\n**Neurological changes.** Extended meditation has been shown to reduce activity in the default mode network — the brain regions associated with mind-wandering, rumination, and self-referential thinking. After a seven-day retreat, practitioners show measurably reduced cortisol levels and increased prefrontal cortex activity.\n\n**Stress physiology.** A retreat breaks the chronic stress cycle by removing the environmental triggers that maintain it. The combination of silence, altitude, nature immersion, and structured rest allows the nervous system to shift from sympathetic (fight/flight) to parasympathetic (rest/digest) dominance.\n\n**Attention and clarity.** Sustained practice improves the capacity for focused attention. Retreatants consistently report enhanced ability to concentrate, reduced reactivity to distractions, and a clearer relationship with their own thought patterns — effects that persist for weeks to months after the retreat ends.\n\n**Emotional regulation.** The process of sitting with difficult emotions — without acting on them, suppressing them, or analysing them — builds a capacity that transfers directly to daily life. Retreatants often describe a greater ability to respond rather than react to challenging situations.\n\n**Perspective and proportion.** Perhaps the most consistently reported benefit: a retreat recalibrates your sense of what matters. Distance from daily urgencies reveals which concerns are real and which are habitual. This clarity of proportion is often more valuable than any specific meditation insight.',
      },
      {
        heading: 'Frequently Asked Questions About Meditation Retreats',
        body: '**Do I need prior meditation experience?**\nNo. Our Chakrata and Rishikesh retreats are designed for all experience levels, with guided instruction from the first session. Zanskar retreats are recommended for those with some prior practice due to the altitude and remoteness.\n\n**What if I can\'t sit still for long periods?**\nRetreats include walking meditation, gentle movement, and rest periods alongside seated practice. The schedule is designed to accommodate the body\'s needs. Many people who cannot sit still in daily life find that the retreat environment changes this completely.\n\n**Is a meditation retreat religious?**\nNo. While some of our locations carry Buddhist or Hindu heritage, the retreats themselves are non-denominational. The practices are rooted in contemplative tradition but do not require any religious affiliation or belief.\n\n**What should I bring?**\nComfortable clothing for meditation, warm layers (temperatures drop at altitude), a journal, and any personal medication. Specific packing lists are provided after booking. Leave devices at home or expect them to be stored during the retreat.\n\n**How do I choose between 3, 5, 7, or 10 days?**\nThree days is a meaningful reset — enough to experience genuine silence. Five to seven days allows the mind to settle beneath habitual patterns. Ten days is standard for Vipassana-style retreats and where the deepest shifts occur. If in doubt, five days is the best balance between depth and accessibility.\n\n**What happens after the retreat?**\nGuidance on maintaining practice at home is provided during the closing session. The transition from retreat silence to daily life deserves care — most teachers recommend a gradual return rather than an immediate dive back into activity.',
      },
    ],
    storyLinks: [
      { href: '/my-7-day-meditation-retreat-in-zanskar', label: 'My 7-Day Meditation Retreat in Zanskar — A First-Person Account' },
      { href: '/what-i-learned-from-a-silent-retreat', label: 'What I Learned from a Silent Retreat' },
    ],
  },

  // ── 2. Silent Retreats ────────────────────────────────────────────────────
  {
    slug: 'silent-retreats',
    title: 'Silent Retreats in the Himalayas | Retreats And Treks',
    h1: 'Silent Retreats in the Himalayas',
    metaDescription:
      'Extended silent retreats in the Indian Himalayas — Chakrata, Zanskar, Munsiyari. No tourist noise, no phones, no small talk. Just you, the land, and the silence that lives beneath everything.',
    heroImage: '/Images/retreat/services/meditation.webp',
    heroImageAlt: 'Immersion into deep silence in the Himalayan forest',
    intro:
      'Silence is not the absence of sound. It is the presence of something deeper — a quality of attention that only emerges when the habitual noise stops. Most people have never experienced genuine silence. Not the uncomfortable quiet of a paused conversation, but the thick, living silence of a Himalayan forest or a sealed mountain valley where the only sound is your own awareness. Our silent retreats create containers for this experience. Not as deprivation, but as nourishment.',
    whoIsThisFor: [
      'People who have never experienced extended silence and feel drawn to it',
      'Those in overstimulated careers or lifestyles seeking neurological reset',
      'Meditation practitioners wanting to deepen through sustained quiet',
      'Anyone who suspects that what they need most is permission to stop talking',
    ],
    whatToExpect: [
      'Noble silence maintained throughout — no conversation, no devices, no reading',
      'Structured days with meditation, walking, meals, and rest',
      'Natural environments where silence is supported by landscape, not enforced by rules',
      'Guidance available when needed, but space respected',
      'Small groups where shared silence creates connection without words',
    ],
    retreatServiceSlugs: ['meditation-and-silence', 'rest-and-reset'],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Where Silence Lives Naturally',
        description:
          'The forests around Chakrata create an acoustic environment where silence is not practised — it is the default. No tourist traffic, no temple bells, no commerce. At 2,000 metres, the forest density absorbs human sound. This is the most accessible location for a first silent retreat.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Geological Silence',
        description:
          'In Zanskar, the silence is not just auditory — it is geological. A valley sealed by mountains, 230 km from the nearest city, where the rock formations are 500 million years old. This is silence with weight. For those who have experienced quiet before and need something deeper.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Alpine Silence',
        description:
          'High-altitude meadows facing the Panchachuli peaks. The silence here is expansive — open sky, vast views, thin air. Less enclosed than Chakrata, less extreme than Zanskar. Good for those seeking stillness with an element of physical spaciousness.',
      },
    ],
    closingNarrative:
      'Silence is not something you achieve. It is something you enter. The right location makes entering easier. If you have never done a silent retreat, Chakrata is a gentle beginning. If you have and need more, Zanskar will hold you. Reach out and we will help you find the right container.',
    deepContent: [
      {
        heading: 'What Happens During a Silent Retreat',
        body: 'A silent retreat is not simply a meditation retreat with a rule against talking. It is a fundamentally different experience — one where the entire field of communication shifts.\n\nNoble silence means no conversation, no eye contact intended to communicate, no devices, no reading, and no writing (except personal journalling). The external world of language and social performance is suspended.\n\nWhat fills the space is surprising. The first 12–24 hours are often uncomfortable. The mind, accustomed to constant verbal interaction, searches for stimulation and finds none. Restlessness, boredom, and sometimes anxiety arise. This is normal and expected.\n\nBy the second day, something begins to change. Without the need to formulate responses, opinions, or social performances, the mind begins to slow. Sensory perception sharpens — you notice sounds, textures, and internal sensations that were previously drowned by the noise of language.\n\nBy day three or four, many retreatants describe a quality of attention that feels qualitatively different from anything they have experienced. Thoughts still arise, but they have less urgency. Emotions surface and pass without needing to be narrated or resolved. A deeper layer of awareness — quieter, more spacious, less reactive — becomes accessible.\n\nThe retreat ends with a gradual return to speech. This transition is handled carefully — most teachers recommend beginning with simple, functional communication before engaging in complex conversation. The sensitivity developed during silence deserves protection.',
        image: '/Images/retreat/services/yoga_retreat.webp',
        imageAlt: 'Finding stillness without words in the mountains',
      },
      {
        heading: 'Types of Silence Practices',
        body: 'Not all silent retreat formats are identical. Understanding the differences helps you choose the right one.\n\n**Vipassana-style silence** is the most rigorous form — ten days of complete noble silence following S.N. Goenka\'s tradition or similar frameworks. No talking, no eye contact, no devices, minimal teacher interaction. The technique is body scanning and breath observation. This is a powerful but demanding practice.\n\n**Zen sesshin** follows a structured schedule of sitting and walking meditation (zazen and kinhin) in silence. Teacher interviews (dokusan) occur during the retreat, breaking silence briefly in a formal context. The style emphasises posture, breath, and direct pointing.\n\n**Contemplative Christian silence** draws on the monastic tradition of lectio divina, centering prayer, and extended periods of quiet contemplation. Less technique-focused, more oriented toward divine encounter.\n\n**Nature-based silence** — the format we primarily use — integrates silent meditation with walking in natural environments, allowing the landscape to become part of the practice. This suits people who find rigid indoor formats difficult and who respond to environmental beauty and spaciousness.\n\n**Partial silence** maintains quiet during practice periods and mornings but allows limited conversation during meals or designated sharing circles. This is a gentler entry point and works well for first-time silent retreatants who may find complete silence overwhelming.',
      },
      {
        heading: 'The Psychological Effects of Silence',
        body: 'Extended silence produces measurable psychological and physiological changes that have been studied across multiple research traditions.\n\n**Reduced cortisol and stress hormones.** Within 48–72 hours of sustained silence, cortisol levels drop measurably. The absence of social performance pressure — the constant low-grade stress of communication — allows the adrenal system to stand down.\n\n**Default mode network quieting.** The brain\'s default mode network (DMN) — responsible for mind-wandering, self-referential thinking, and rumination — shows reduced activity during and after extended silence. This is the neurological correlate of what meditators describe as "the thinking mind becoming quiet."\n\n**Enhanced sensory processing.** Removing linguistic processing (conversation, reading, media) frees significant cognitive bandwidth. Retreatants consistently report heightened visual, auditory, and tactile sensitivity — colours appear more vivid, sounds more distinct, physical sensations more nuanced.\n\n**Emotional processing and release.** Without the option to talk about emotions, the psyche processes them differently — somatically rather than narratively. Emotions rise, are felt in the body, and pass. This bypasses the intellectual loops that normally maintain emotional patterns.\n\n**Temporal perception shifts.** Without conversation and schedule-checking, the experience of time changes. Days that feel interminable on the first morning begin to expand and slow. By mid-retreat, clock time becomes largely irrelevant. This shift in temporal perception is one of the most commonly reported and valued effects.',
      },
    ],
    storyLinks: [
      { href: '/what-i-learned-from-a-silent-retreat', label: 'What I Learned from a Silent Retreat — 5 Days Without Speaking' },
      { href: '/my-7-day-meditation-retreat-in-zanskar', label: 'My 7-Day Meditation Retreat in Zanskar' },
    ],
  },

  // ── 3. Yoga Retreats ──────────────────────────────────────────────────────
  {
    slug: 'yoga-retreats',
    title: 'Yoga Retreats in the Himalayas | Retreats And Treks',
    h1: 'Yoga Retreats in the Himalayas',
    metaDescription:
      'Himalayan yoga retreats in Rishikesh, Zanskar, and Sankri. Small-group practice with experienced teachers — asana, pranayama, meditation. Movement meets mountain silence.',
    heroImage: '/Images/retreat/services/yoga_retreat.webp',
    heroImageAlt: 'Group performing morning yoga outdoors in the Himalayas',
    intro:
      'A yoga retreat in the Himalayas is not the same as a yoga class in a city studio. The altitude changes your breath. The mountain air changes your nervous system. The absence of urban noise changes what you hear inside your own body. We offer yoga retreats that honour this difference — not yoga tourism, but genuine practice in environments where the land participates in the work. Morning practice as light arrives. Evening practice as the mountains darken. The space between is yours.',
    whoIsThisFor: [
      'Yoga practitioners of all levels seeking to deepen their relationship with practice',
      'People wanting to reconnect body and breath in a natural setting',
      'Those seeking a physically grounded retreat rather than purely meditative',
      'Anyone curious about yoga as a path to presence, not performance',
    ],
    whatToExpect: [
      'Daily asana practice — morning and evening sessions',
      'Pranayama (breathwork) tailored to altitude and environment',
      'Meditation integrated with physical practice',
      'Free afternoons for rest, walking, or personal practice',
      'Experienced teachers who prioritise presence over precision',
    ],
    retreatServiceSlugs: ['yoga-and-movement'],
    locationAngles: [
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — The Yoga Capital',
        description:
          'Rishikesh carries the living tradition of yoga — from the ashrams along the Ganges to the morning practice that happens spontaneously on every ghat. This is where yoga lives in India. The energy of the river and the accumulated practice of this place create conditions that studio settings cannot replicate.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Yoga at Altitude',
        description:
          'Yoga at 3,500 metres is fundamentally different. Every breath is conscious. Every pose demands presence. The altitude strips away autopilot and returns you to your own body. For experienced practitioners wanting to transform their practice through environmental challenge.',
      },
      {
        locationId: 'sankri',
        heading: 'Sankri — Mountain Yoga',
        description:
          'A high-altitude basecamp surrounded by peaks and forests. Yoga here integrates with trekking and mountain movement. Good for those who want physical practice in a setting that demands it — where the body is both the instrument and the terrain.',
      },
    ],
    closingNarrative:
      'The Himalayas are not a backdrop for yoga — they are a participant. The altitude, the quiet, the temperature, the light — all of these shape what happens on the mat. If you are choosing between locations, consider what your practice needs: tradition (Rishikesh), altitude challenge (Zanskar), or mountain integration (Sankri). We can help you decide.',
  },

  // ── 4. Burnout Recovery Retreats ──────────────────────────────────────────
  {
    slug: 'burnout-recovery-retreats',
    title: 'Burnout Recovery Retreats in the Himalayas | Retreats And Treks',
    h1: 'Burnout Recovery Retreats',
    metaDescription:
      'Himalayan burnout recovery retreats for professionals, founders, and remote workers. Not productivity optimisation — genuine recalibration in Chakrata, Zanskar, Munsiyari, and Sankri.',
    heroImage: '/Images/retreat/services/rest.webp',
    heroImageAlt: 'Peaceful retreat environment for deep rest and recovery',
    intro:
      'Burnout is not tiredness. It is the collapse of meaning. You have given everything — to work, to others, to systems that promised reciprocity — and the transaction feels fundamentally broken. Sleep does not fix it. Holidays do not fix it. Another productivity system will not fix it. What fixes burnout is genuine stopping. Not a weekend off. Not a spa. But a real, extended encounter with stillness in a place remote enough that your nervous system has no choice but to release what it has been holding.',
    whoIsThisFor: [
      'Professionals, founders, and leaders who have hit genuine burnout',
      'Remote workers experiencing chronic exhaustion and disconnection',
      'Anyone feeling numb, cynical, or unable to access their own values',
      'People whose careers have outpaced their capacity for meaning',
    ],
    whatToExpect: [
      'Somatic work to release what the body has been carrying',
      'Structured rest — not entertainment, not distraction',
      'Small groups of people who understand what burnout actually is',
      'Nature immersion as a nervous system intervention',
      'Space to process without pressure to produce answers',
      'Gradual return of meaning, not forced optimism',
    ],
    retreatServiceSlugs: ['burnout-recovery', 'rest-and-reset'],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Accessible Recovery',
        description:
          'Close enough to civilisation to reach comfortably, remote enough that once you arrive, you have genuinely left. The dense forest creates natural nervous system regulation. Two thousand metres of altitude gently slows the thinking mind. This is the most accessible entry point for burnout recovery — no extreme conditions, just honest separation.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Radical Reset',
        description:
          'For burnout so deep that gentle environments are not enough. Zanskar is 230 km from Leh, through mountain passes, in a valley sealed by peaks. The remoteness is the medicine. When every familiar cue is stripped away, the nervous system has nowhere to hide. This is for those ready to be fundamentally recalibrated.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Alpine Perspective',
        description:
          'High-altitude meadows facing the Panchachuli range. The scale of the landscape teaches proportion — your problems become appropriately sized against 7,000-metre peaks. Good for professionals who need perspective alongside rest, and for those who process through walking and movement.',
      },
      {
        locationId: 'sankri',
        heading: 'Sankri — Recovery Through Movement',
        description:
          'Sometimes burnout needs the body to move before the mind can settle. Sankri offers burnout recovery combined with gentle trekking — walking through forests and valleys as a form of somatic release. For those who cannot sit still yet, but need to start somewhere.',
      },
    ],
    closingNarrative:
      'Burnout recovery is not a luxury. It is a necessity for anyone whose collapse of meaning has become the dominant feature of daily life. The right retreat environment depends on the depth of your burnout and your tolerance for remoteness. Reach out and describe where you are — we will recommend the right location and format without pressure.',
    deepContent: [
      {
        heading: 'Signs You Need a Burnout Recovery Retreat',
        body: 'Burnout develops gradually, which is why it is often misidentified as tiredness, laziness, or depression. The clinical signs — described in the WHO\'s ICD-11 classification — include three dimensions:\n\n**Energy depletion or exhaustion.** Not ordinary tiredness. This is the kind of exhaustion that sleep does not fix. You wake tired. Weekends do not restore you. Holidays provide temporary relief that evaporates within hours of returning to work.\n\n**Increased mental distance from your job.** Cynicism, emotional detachment, or feelings of ineffectiveness replace the engagement that once came naturally. You do the work, but the meaning is gone. Tasks that used to energise you now feel hollow.\n\n**Reduced professional efficacy.** The quality of your work declines despite effort. Concentration fragments. Decision-making becomes harder. Creative thinking — once a strength — feels like pushing through mud.\n\nBeyond the clinical dimensions, burnout manifests physically: chronic tension in shoulders and jaw, disrupted sleep, digestive issues, frequent illness, and a persistent sense of being on alert even when nothing demands it.\n\nIf you recognise three or more of these patterns, you have likely passed the point where rest alone will work. A burnout recovery retreat is not about relaxation — it is about creating the conditions for your nervous system to fundamentally recalibrate.',
        image: '/Images/retreats/chakrata/chakrataretreat4.webp',
        imageAlt: 'Resting completely in an isolated Himalayan environment',
      },
      {
        heading: 'How Nature Resets the Nervous System',
        body: 'The relationship between natural environments and nervous system regulation is well-documented in psychophysiology and environmental psychology.\n\n**Attention Restoration Theory** (Kaplan, 1995) demonstrates that natural environments restore directed attention — the cognitive resource that burnout depletes. Urban environments demand continuous directed attention (navigating traffic, processing billboards, monitoring social situations). Nature provides "soft fascination" — birdsong, moving water, dappled light — that engages attention without depleting it.\n\n**Autonomic nervous system regulation.** Exposure to forest environments measurably reduces cortisol, lowers blood pressure, and shifts the autonomic nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-restore) dominance. Japanese research on "shinrin-yoku" (forest bathing) consistently shows these effects within 15 minutes of forest immersion.\n\n**Altitude as intervention.** At 2,000–3,500 metres, the reduced oxygen naturally slows cognitive processing. The planning, worrying mind — the part of you that burnout has hijacked — becomes quieter with less effort. This is not suppression; it is a physiological shift that allows other modes of awareness to emerge.\n\n**Sensory recalibration.** Burnout narrows sensory awareness to threat-relevant stimuli (emails, deadlines, social obligations). Time in natural environments gradually widens the sensory field — you begin to notice colour, texture, temperature, and sound in ways that have been suppressed by chronic stress. This sensory widening is both a symptom and a cause of nervous system recalibration.\n\nThe Himalayas combine all four mechanisms: forest density, altitude, acoustic silence, and genuine remoteness from stress triggers. The recovery is not metaphorical — it is physiological.',
      },
      {
        heading: 'Burnout Recovery Frameworks',
        body: 'Effective burnout recovery follows a sequence — not a checklist. The stages typically unfold over three to ten days depending on the depth of burnout and the retreat environment.\n\n**Stage 1: Stopping (Days 1–2).** The most important and often the most difficult phase. Genuine stopping means no work, no devices, no problem-solving, no planning. For professionals accustomed to constant productivity, this feels wrong — irresponsible, wasteful, uncomfortable. That discomfort is the first sign that stopping is necessary. The body needs 24–48 hours to accept that the emergency is over.\n\n**Stage 2: Release (Days 2–4).** Once the system accepts that it can stop, stored tension begins to release. This often manifests as unexpected emotion — grief, frustration, or sadness that has been suppressed during the burnout period. Somatic work (breathwork, gentle movement, body awareness) supports this release without forcing it.\n\n**Stage 3: Settling (Days 3–6).** The nervous system finds a new baseline. Sleep deepens. Appetite normalises. The constant background hum of alertness quietens. Thinking becomes clearer — not sharper or faster, but more proportionate. Problems that felt overwhelming begin to seem appropriately sized.\n\n**Stage 4: Reconnection (Days 5–10).** Interest begins to return — not the manic interest of early burnout, but a quieter, more sustainable form. You remember what you actually care about. Values that were buried under obligation resurface. This stage cannot be rushed — it arrives when the system is ready.\n\n**Stage 5: Integration.** The final phase, which extends beyond the retreat itself. Guidance on maintaining the recovered state, setting boundaries, and recognising early warning signs helps prevent recurrence.',
      },
    ],
  },

  // ── 5. Spiritual Retreats ─────────────────────────────────────────────────
  {
    slug: 'spiritual-retreats',
    title: 'Spiritual Retreats in India — Himalayan Immersion | Retreats And Treks',
    h1: 'Spiritual Retreats in the Himalayas',
    metaDescription:
      'Authentic Himalayan spiritual retreats in Rishikesh, Zanskar, and Chakrata. Not spiritual tourism — genuine immersion in places where contemplative tradition is alive. Small groups, experienced guidance.',
    heroImage: '/Images/retreat/services/sound.webp',
    heroImageAlt: 'Immersion in a deep spiritual healing environment using sound bowls',
    intro:
      'A spiritual retreat is not a religious holiday. It is a deliberate encounter with the deeper layers of your own experience — facilitated by environment, silence, practice, and guidance. The Himalayas have been the geography of spiritual practice for thousands of years, not because of marketing, but because something about altitude, silence, and remoteness creates conditions where inner work deepens naturally. We offer spiritual retreats in three distinct Himalayan settings, each carrying a different quality of spiritual energy.',
    whoIsThisFor: [
      'People seeking a contemplative experience beyond religious affiliation',
      'Those drawn to spiritual practice but uncertain where to begin',
      'Experienced practitioners wanting immersion in a lineage environment',
      'Anyone feeling that their inner life needs attention, depth, or renewal',
    ],
    whatToExpect: [
      'Meditation, contemplation, and embodied practice',
      'Environments with living spiritual heritage — not manufactured',
      'Guidance from experienced practitioners, not performance',
      'Silence as the primary medium of experience',
      'Space for personal inquiry without dogma or obligation',
    ],
    retreatServiceSlugs: ['meditation-and-silence', 'sound-healing', 'yoga-and-movement'],
    locationAngles: [
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Living Tradition',
        description:
          'The spiritual weight of Rishikesh is not abstract — it is felt in the morning aarti on the Ganges, in the ashrams that have operated for generations, in the way the river itself carries a quality of attention. This is the place for those who draw spiritual nourishment from tradition, community, and sacred geography.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Monastic Immersion',
        description:
          'Zanskar\'s monasteries — Phugtal built into a cliff face, Karsha overlooking the valley — carry over a thousand years of Buddhist practice. The spiritual energy here is not curated for visitors. It exists because monks have practised in this valley since the 12th century. For those seeking depth that only time and devotion can create.',
      },
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Grounded Spirituality',
        description:
          'Chakrata is not a pilgrimage site. It has no famous temples or lineage centres. Its spirituality is of a different order — the kind that emerges when you spend time in dense forest at altitude and let the land itself become the teacher. For those who feel spiritual practice through nature rather than tradition.',
      },
    ],
    closingNarrative:
      'Spiritual retreats are as varied as the people who seek them. Some need tradition and lineage (Rishikesh). Some need monastic silence and deep time (Zanskar). Some need the simple, grounded encounter with forest and altitude (Chakrata). If you are unsure which path suits you, that uncertainty is itself a good sign — reach out and we will explore it with you.',
    deepContent: [
      {
        heading: 'What Is a Spiritual Retreat?',
        body: 'A spiritual retreat is a deliberate period of withdrawal from ordinary life — not to escape it, but to see it more clearly. Unlike a religious pilgrimage or a wellness holiday, a spiritual retreat creates conditions for inner inquiry: silence, simplicity, contemplative practice, and the guidance of experienced practitioners.\n\nThe Himalayas have hosted spiritual seekers for millennia — Buddhist monks in Zanskar, yogis in Rishikesh, Sufi contemplatives in Kashmir. This is not historical footnote; it is living tradition. The environments themselves carry an accumulated quality of practice that contemporary retreat centres in cities cannot replicate.\n\nA spiritual retreat may involve meditation, chanting, prayer, contemplation, yoga, walking practice, or simply sitting in silence. The form matters less than the intention: to move beneath the surface of habitual life and encounter something more essential.',
        image: '/Images/retreat/services/meditation.webp',
        imageAlt: 'A quiet spiritual moment facing the Himalayan peaks',
      },
      {
        heading: 'Spiritual Retreat vs Religious Retreat',
        body: 'This distinction matters. Religious retreats operate within a specific faith tradition — Catholic silent retreats, Vipassana courses, Zen sesshins. They assume (or require) adherence to particular beliefs, practices, and frameworks.\n\nOur spiritual retreats are non-denominational. They draw from multiple contemplative traditions without requiring allegiance to any. You do not need to be Buddhist to sit in a Zanskar monastery. You do not need to be Hindu to practise on the banks of the Ganges. What you need is genuine curiosity about your inner life and willingness to be still long enough to meet it.\n\nThat said, the spiritual power of place is real. Rishikesh carries centuries of devotional energy. Zanskar carries monastic discipline. Chakrata carries the wild spirituality of forest and altitude. We do not manufacture spiritual experience — we place you where it naturally arises.',
      },
    ],
  },

  // ── 6. Stress Relief Retreats ────────────────────────────────────────────
  {
    slug: 'stress-relief-retreats',
    title: 'Stress Relief Retreats in the Himalayas | Retreats And Treks',
    h1: 'Stress Relief Retreats in the Himalayas',
    metaDescription:
      'Himalayan stress relief retreats — somatic release, forest immersion, altitude reset. Chakrata, Zanskar, Munsiyari. Small groups, no performance pressure. Let the mountains do what holidays cannot.',
    heroImage: '/Images/retreat/services/rest.webp',
    heroImageAlt: 'Calm retreat surroundings to lower stress and rest the nervous system',
    intro:
      'Stress is not a mindset problem. It is a physiological state — cortisol locked in tissue, shallow breathing that has become habit, a nervous system running on alertness that no longer serves you. A weekend off does not fix this. A massage does not fix this. What fixes chronic stress is sustained exposure to an environment so different from your daily life that your body has no choice but to recalibrate. The Himalayas provide this at every altitude — in forest, in valley, in high meadow. Our stress relief retreats use the land itself as the primary intervention.',
    whoIsThisFor: [
      'People carrying chronic stress that rest alone has not resolved',
      'Professionals with high-responsibility roles who cannot "switch off"',
      'Anyone whose body holds tension even when the mind knows it should relax',
      'People for whom holidays feel like changing the scenery without changing the state',
    ],
    whatToExpect: [
      'Nature immersion as primary nervous system intervention',
      'Somatic work — breathwork, gentle movement, body awareness',
      'Structured rest that is not just "time off"',
      'Altitude and forest as physiological regulators',
      'No productivity framing — this is not a performance retreat',
      'Small groups (maximum 12) where shared experience reduces isolation',
    ],
    retreatServiceSlugs: ['rest-and-reset', 'burnout-recovery'],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Nervous System Reset',
        description:
          'Dense Himalayan forest at 2,000 metres absorbs noise and regulates the nervous system through natural sound patterns, clean air, and the absence of stimulation. Chakrata is 2.5 hours from Dehradun — accessible enough for a 3-day reset, remote enough to genuinely separate. The most gentle entry point for stress relief.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Deep Reset at Altitude',
        description:
          'When stress is so embedded that gentle environments bounce off it, Zanskar provides radical separation. 3,500 metres, 230 km from the nearest city, no phone signal. The altitude and remoteness force the nervous system to let go because there is nothing left to hold onto. For deep, chronic stress that needs a stronger container.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Perspective Through Landscape',
        description:
          'High-altitude meadows facing the Panchachuli peaks. The sheer scale of the landscape teaches proportion — stress patterns that feel overwhelming shrink against 7,000-metre summits. Good for people who need visual and spatial expansion alongside physiological rest.',
      },
    ],
    closingNarrative:
      'Stress relief is not about learning to manage stress better. It is about giving your nervous system an environment so different that the old patterns lose their grip. The mountain does this work — you only need to show up. Reach out and describe what your stress looks like. We will recommend the right environment.',
    deepContent: [
      {
        heading: 'Understanding Chronic Stress',
        body: 'Chronic stress is not just feeling pressured. It is a physiological state where the body\'s fight-or-flight system remains activated long after the original threat has passed. Cortisol — the stress hormone — remains elevated. Blood pressure stays high. Sleep becomes shallow. Digestion suffers. The immune system weakens.\n\nWhat makes chronic stress so damaging is that the body adapts to it. You stop noticing the tension in your shoulders, the shallow breathing, the disrupted sleep. The stressed state becomes your baseline — normal feels like emergency, and you no longer remember what calm actually is.\n\nStress relief retreats exist because this pattern cannot be broken from within the environment that created it. Changing your scenery for a weekend helps temporarily, but the pattern re-engages within hours of returning. What\'s needed is sustained exposure to an environment so physiologically different that the nervous system has no choice but to reset.',
        image: '/Images/retreat/services/rest.webp',
        imageAlt: 'Resting completely free of the demands of everyday stress',
      },
      {
        heading: 'The Science of Nature-Based Stress Relief',
        body: 'The therapeutic effect of natural environments on stress is documented across multiple research domains:\n\n**Cortisol reduction.** Studies published in Environmental Health and Preventive Medicine demonstrate that even 20 minutes of forest walking reduces cortisol by 12–16%. Multi-day forest immersion produces sustained reductions that persist for weeks after return.\n\n**Heart rate variability.** Natural environments increase heart rate variability (HRV) — the gold-standard biomarker for stress resilience. Higher HRV indicates a nervous system that can flexibly shift between alertness and rest. Urban environments typically suppress HRV.\n\n**Attention restoration.** Kaplan\'s Attention Restoration Theory (1995) shows that natural environments restore the directed attention that stress depletes, through mechanisms he calls "soft fascination" — the gentle engagement of birdsong, flowing water, and moving leaves.\n\n**Altitude effects.** At 2,000–3,000 metres, reduced oxygen naturally slows cognitive processing, reducing the rumination and worry that sustain stress patterns. The thinking mind becomes quieter with less effort.\n\nThe Himalayas combine forest density, altitude, acoustic silence, and genuine remoteness — all four mechanisms operating simultaneously. This is why a three-day mountain retreat produces stress relief that a week at a beach resort cannot match.',
      },
    ],
  },

  // ── 7. Anxiety Healing Retreat ─────────────────────────────────────────────
  {
    slug: 'anxiety-healing-retreat',
    title: 'Anxiety Healing Retreats in the Himalayas | Retreats And Treks',
    h1: 'Anxiety Healing Retreats in the Himalayas',
    metaDescription:
      'Himalayan retreats for anxiety healing — guided meditation, breathwork, forest immersion, altitude stillness. Chakrata, Zanskar, Munsiyari. Small groups, experienced guides. A space where anxiety can settle.',
    heroImage: '/Images/whyhimalaya/meditation.webp',
    heroImageAlt: 'Releasing anxiety through guided meditation and slow breathwork in nature',
    intro:
      'Anxiety is the mind running futures that have not happened. Over and over, relentlessly. No amount of rational understanding stops it — your body believes the emergency is real, even when some part of you knows it is not. Himalayan anxiety healing retreats work not through cognitive intervention but through environmental change. At altitude, breathing slows. In forest silence, the mind runs out of inputs to worry about. In genuine remoteness, the futures your anxiety invents lose connection to reality. The healing is not forced — it happens because the conditions for anxiety are removed.',
    whoIsThisFor: [
      'People living with chronic or generalised anxiety',
      'Those whose anxiety has become the background hum of daily life',
      'Anyone who has tried cognitive approaches and needs something somatic',
      'People seeking a container where anxiety can settle without judgement',
    ],
    whatToExpect: [
      'Breathwork designed to regulate the nervous system',
      'Forest and altitude immersion as natural anxiolytics',
      'Guided meditation for grounding and presence',
      'Structured days that reduce decision fatigue',
      'Space to feel anxious without needing to fix or perform',
      'Gentle somatic practices — walking, body scanning, restorative movement',
    ],
    retreatServiceSlugs: ['meditation-and-silence', 'rest-and-reset'],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Calm',
        description:
          'The acoustic environment of dense Himalayan forest is naturally regulating. No sudden noises, no urban stimulation, no social pressure. The forest holds you without demanding anything. For anxious people, this is gold — an environment that asks nothing while offering constant sensory reassurance through birdsong, tree canopy, and gentle altitude.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Confronting the Root',
        description:
          'Zanskar is for anxiety that runs deep and has not responded to gentle interventions. The radical remoteness — no phone, no escape routes, no comfortable distractions — forces the anxious mind to eventually exhaust itself. What remains is a quality of stillness that cannot be manufactured. This requires commitment and some prior retreat experience.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Spacious Stillness',
        description:
          'For people whose anxiety includes claustrophobia or constriction, Munsiyari offers the opposite — vast open meadows, enormous sky, 360-degree mountain views. The spaciousness is physically felt. Anxiety that contracts the body meets an environment that expands it. Moderate altitude, moderate remoteness, profound openness.',
      },
    ],
    closingNarrative:
      'Anxiety healing is not about eliminating anxiety forever. It is about showing your nervous system that there are environments where anxiety cannot sustain itself — and that you can access those environments when you need them. The Himalayas have been naturally providing this for anyone willing to go deep enough. Tell us about your experience and we will help you choose the right setting.',
    deepContent: [
      {
        heading: 'How Mountain Environments Reduce Anxiety',
        body: 'Anxiety is fundamentally a threat-detection system stuck in overdrive. The anxious brain scans for danger constantly, generating worst-case scenarios, interpreting ambiguous signals as threats, and maintaining a state of physiological readiness that was designed for predator evasion, not PowerPoint presentations.\n\nMountain environments interrupt this cycle through multiple mechanisms:\n\n**Reduced sensory threat signals.** In a forest at 2,000m altitude, there are no cars, no crowds, no sudden noises, no social situations requiring performance. The brain\'s threat-detection system receives dramatically fewer inputs to process, and gradually, it downregulates.\n\n**Breathing regulation.** At moderate altitude, breathing naturally deepens and slows. This activates the vagus nerve — the master regulator of the parasympathetic (calming) nervous system. Anxiety and slow, deep breathing are physiologically incompatible.\n\n**Grounding through sensory richness.** Forest environments provide constant, gentle sensory input — the texture of bark, the smell of pine, the sound of water, the feel of earth underfoot. This sensory grounding anchors attention in the present moment, interrupting the future-oriented rumination that drives anxiety.\n\n**Perspective through scale.** Mountain landscapes provide visual vastness — distant peaks, wide valleys, enormous sky. Research in environmental psychology shows that exposure to large natural vistas reduces self-focused rumination and shifts attention toward the larger world. Anxiety thrives on self-focus; mountains dissolve it.',
        image: '/Images/retreat/services/yoga_retreat.webp',
        imageAlt: 'Slowing down breathing in a beautiful Himalayan environment',
      },
      {
        heading: 'What to Expect at an Anxiety Healing Retreat',
        body: 'If you live with anxiety, the idea of a retreat may itself feel anxiety-provoking. Here is what actually happens:\n\n**The first day is the hardest.** Your anxiety will come with you. It does not disappear at the gate. Expect restlessness, phone-checking impulses, mental planning, and the familiar hum of low-level dread. This is completely normal and does not mean the retreat is not working.\n\n**Days 2–3: The body begins to settle.** Without the constant stimulation of urban life, the anxiety has less fuel. Breathing deepens without your effort. Sleep improves — often dramatically. Physical tension in the jaw, shoulders, and stomach begins to release. Many participants describe this as "the first time my body has felt safe in months."\n\n**Days 4–5: A different quality of mind.** The incessant mental chatter — the planning, worrying, catastrophising — loses volume. Moments of genuine calm appear. These are not forced or manufactured; they are the natural state that emerges when anxiety\'s fuel supply is cut off.\n\n**No pressure to perform healing.** You will not be asked to talk about your anxiety, share in groups, or demonstrate progress. The healing happens through environment, not effort. Your only job is to be in the mountain, eat the food, walk the trails, and let your nervous system do what it already knows how to do when the emergency stops.',
      },
    ],
  },

  // ── 8. Digital Detox Retreat ───────────────────────────────────────────────
  {
    slug: 'digital-detox-retreat',
    title: 'Digital Detox Retreats in the Himalayas | Retreats And Treks',
    h1: 'Digital Detox Retreats in the Himalayas',
    metaDescription:
      'Himalayan digital detox retreats — no phone signal, no Wi-Fi, no screens. Zanskar, Chakrata, Munsiyari. Reclaim your attention in mountain environments where disconnection is not a choice but a geography.',
    heroImage: '/Images/whyhimalaya/nature.webp',
    heroImageAlt: 'Immersion in nature far away from cell reception and screens',
    intro:
      'Digital detox is not about willpower. It is about environment. Any retreat can ask you to put your phone in a box. The Himalayas do something better — they take the signal away. In Zanskar, there is no phone coverage. In Chakrata\'s deep forest, screens feel absurd. In Munsiyari\'s high meadows, the landscape is so vivid that digital life loses its pull. Our digital detox retreats do not rely on rules. They rely on geography. When the infrastructure for distraction does not exist, you discover what your attention does when it has nowhere to scroll.',
    whoIsThisFor: [
      'People addicted to screens who cannot moderate through willpower alone',
      'Remote workers whose work-life boundary has completely dissolved',
      'Anyone who cannot remember the last time they went 24 hours without checking a device',
      'People who want to remember what their own attention feels like undirected',
    ],
    whatToExpect: [
      'No phone signal in many locations — detox by geography, not by willpower',
      'Structured analog days — walking, reading, journalling, conversation, practice',
      'The discomfort of the first 24 hours — and the relief of the second day',
      'Natural environments that command attention without demanding it',
      'Return to clarity, boredom (the productive kind), and genuine rest',
      'Guidance on building sustainable boundaries post-retreat',
    ],
    retreatServiceSlugs: ['meditation-and-silence', 'rest-and-reset'],
    locationAngles: [
      {
        locationId: 'zanskar',
        heading: 'Zanskar — No Signal, No Choice',
        description:
          'The most effective digital detox location in India. Zanskar has no reliable phone coverage, no Wi-Fi infrastructure, and is 230 km from the nearest connected city. You do not need willpower here — the geography does the work. Your phone becomes a camera, then a paperweight, then irrelevant. This is digital detox with no escape hatch.',
      },
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Withdrawal',
        description:
          'Patchy signal in town, none in the deep forest. Chakrata offers a gentler digital detox — you could technically reconnect, but the forest makes it feel pointless. The transition from device-dependency to presence happens naturally over 2-3 days. Accessible from Dehradun and ideal for a first experience of extended disconnection.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Altitude Separation',
        description:
          'Remote enough that connectivity is unreliable, scenic enough that you stop caring. Munsiyari takes 9 hours from the nearest railhead — by the time you arrive, digital life already feels distant. The combination of physical journey and environmental beauty creates natural separation from screen habits.',
      },
    ],
    closingNarrative:
      'Your attention is the most valuable thing you own, and for most of us, it has been colonised by algorithms. A Himalayan digital detox does not just pause the colonisation — it reminds you what your mind does when it belongs to you again. Reach out and we will help you find the right level of disconnection.',
    deepContent: [
      {
        heading: 'Why Digital Detox Requires Geography',
        body: 'The failure of most digital detox attempts comes down to one thing: willpower. Putting your phone in a drawer while sitting in your living room with Wi-Fi, your laptop, and a television is an exercise in sustained self-denial. It is exhausting and rarely lasts.\n\nGeographic digital detox works because it removes the infrastructure entirely. In Zanskar, there is no signal to resist. In Chakrata\'s deep forest, the phone becomes irrelevant not through discipline but through absence. When checking Instagram is physically impossible, the mental energy spent resisting it becomes available for other things — observation, conversation, rest, creative thought.\n\nThis is not a trivial distinction. Phone addiction operates through the same dopamine pathways as gambling — variable reward schedules that are nearly impossible to override through willpower alone. Geographic detox bypasses the reward system entirely. By day two, most participants report that the compulsive urge to check has faded. By day three, they cannot imagine why they want to go back.',
        image: '/Images/whyhimalaya/nature.webp',
        imageAlt: 'The natural world replacing the digital world',
      },
      {
        heading: 'What Happens When You Stop Scrolling for 72 Hours',
        body: 'The first 24 hours are uncomfortable. Phantom vibrations. Reaching for a pocket that holds nothing relevant. A persistent sense that you are missing something important. This is withdrawal — real, documented, and temporary.\n\n**Hours 6–12:** The restlessness peaks. You may feel bored, anxious, or irritable. This is your brain demanding its dopamine supply. Every digital detox retreat participant experiences this. It passes.\n\n**Hours 12–24:** The restlessness begins to fade. You start noticing things: the quality of light, the sound of wind, the texture of food. Your attention, freed from screens, begins to land on the physical world.\n\n**Hours 24–48:** Boredom transforms. What felt like emptiness begins to feel like spaciousness. Conversations become longer and more meaningful. You read for pleasure. You sit without needing entertainment. Sleep improves dramatically — blue light exposure drops to zero and melatonin production normalises.\n\n**Hours 48–72:** This is where the real discovery happens. Your mind, no longer fragmenting attention across apps and feeds, begins to operate in a different mode — sustained, focused, creative. Ideas arrive whole rather than in fragments. You remember things. You make connections. You think thoughts that are actually yours, not reactions to someone else\'s content.\n\n**Beyond 72 hours:** Participants describe a fundamental shift in their relationship with their own attention. The compulsion to check is replaced by curiosity about what attention does when it is truly free. Many describe this as the most valuable insight of the entire retreat.',
      },
    ],
    storyLinks: [
      { href: '/a-week-without-my-phone-digital-detox', label: 'A Week Without My Phone — A Digital Detox Story' },
      { href: '/what-i-learned-from-a-silent-retreat', label: 'What I Learned from a Silent Retreat' },
    ],
  },

  // ── 9. Healing Retreat Himalayas ──────────────────────────────────────────
  {
    slug: 'healing-retreat-himalayas',
    title: 'Healing Retreats in the Himalayas | Retreats And Treks',
    h1: 'Healing Retreats in the Himalayas',
    metaDescription:
      'Himalayan healing retreats — emotional, physical, spiritual. Forest bathing, altitude therapy, somatic release, meditation. Chakrata, Zanskar, Rishikesh, Munsiyari. Small groups, genuine care.',
    heroImage: '/Images/retreat/services/sound.webp',
    heroImageAlt: 'Therapeutic and emotional healing occurring in a supportive retreat environment',
    intro:
      'Healing is not a product you can buy. It is a process that requires the right conditions — safety, time, environment, and permission. The Himalayas have been a geography of healing for millennia because the land itself participates in the work. Clean air heals the lungs. Forest sound heals the nervous system. Altitude heals the cluttered mind. Silence heals the parts of you that have been buried under noise. Our healing retreats do not promise transformation. They provide conditions where healing becomes possible — and then they get out of the way.',
    whoIsThisFor: [
      'People recovering from grief, loss, or life transitions',
      'Those carrying emotional weight that has not been processed',
      'Anyone seeking physical rejuvenation through natural environments',
      'People who feel broken and need a place where that is acceptable',
      'Those drawn to healing but sceptical of commercial wellness promises',
    ],
    whatToExpect: [
      'Multi-dimensional healing — body, breath, attention, emotion',
      'Forest bathing and nature immersion as therapeutic interventions',
      'Somatic and breathwork practices',
      'Meditation and silence as containers for emotional processing',
      'Small groups where vulnerability is safe and shared',
      'No forced positivity — space for whatever needs to surface',
    ],
    retreatServiceSlugs: ['rest-and-reset', 'meditation-and-silence', 'yoga-and-movement'],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Gentle Healing in Forest',
        description:
          'The forests of Chakrata create a natural holding environment — enclosed, quiet, regulating. At 2,000 metres with no urban noise, the nervous system begins to settle within hours. Accessible from Dehradun, this is the most gentle and practical location for a first healing retreat. The land nurtures without overwhelming.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Deep Healing at Altitude',
        description:
          'Zanskar offers healing through radical separation from everything familiar. The monastery culture, the geological age of the valley, the altitude — all combine to create conditions where deep emotional material can surface and process. Not gentle, but thorough. For healing that requires going to the root.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Traditional Healing',
        description:
          'The spiritual tradition of Rishikesh carries healing modalities refined over centuries — yoga, Ayurveda, pranayama, chanting. The Ganges itself is considered healing. Good for those who draw strength from tradition, lineage, and the accumulated energy of a sacred place.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Healing Through Landscape',
        description:
          'The scale of the Panchachuli range teaches a kind of healing that comes from perspective — seeing your pain against the backdrop of something enormous and ancient. High-altitude meadows, clean thin air, and very few other humans. For those who heal through space, beauty, and the reminder of proportion.',
      },
    ],
    closingNarrative:
      'Healing cannot be rushed or forced. It requires an environment that is safe enough to let the armour down and patient enough to wait. If you are looking for a healing retreat, describe where you are honestly — what you are carrying, what you need. We will recommend the right place without pressure or promises.',
    deepContent: [
      {
        heading: 'What Is a Healing Retreat?',
        body: 'A healing retreat is not a hospital, not a spa, and not a wellness programme. It is a deliberate period — three to fourteen days — in a natural environment, with the explicit purpose of creating conditions where healing can happen. The healing may be emotional (grief, loss, trauma), physical (exhaustion, chronic tension, illness recovery), or spiritual (disconnection, meaninglessness, crisis of identity).\n\nWhat distinguishes a healing retreat from a holiday or a therapy programme is the role of environment. In a retreat, the natural landscape is not backdrop — it is active participant. Forest air heals the lungs. Mountain silence heals the nervous system. Altitude heals the overstimulated mind. The sound of water heals in ways that no human practitioner can replicate.\n\nOur retreats do not promise specific outcomes. We do not claim to cure illness or resolve trauma. What we provide are conditions — safety, silence, nature, time, care — where the body and mind can begin the healing they already know how to do when the obstacles are removed.',
        image: '/Images/retreats/chakrata/chakrataretreat3.webp',
        imageAlt: 'Safe, communal healing environment nestled in the mountains',
      },
      {
        heading: 'The Himalayan Healing Tradition',
        body: 'The Himalayas have been a geography of healing for millennia. This is not marketing — it is history.\n\n**Ayurvedic tradition** — the world\'s oldest medical system — considers the Himalayas the source of the most potent healing herbs. Tulsi, ashwagandha, and hundreds of medicinal plants grow in these mountains. The tradition of retreating to the mountains for healing predates recorded Indian history.\n\n**Buddhist healing practice** — Tibetan medicine, practised in the monasteries of Zanskar and Ladakh, treats illness as imbalance affecting body, speech, and mind simultaneously. The monastic retreat — extended periods of silence, practice, and altitude — is itself considered a healing modality.\n\n**Yoga therapeutic tradition** — Rishikesh has been the centre of yoga-based healing for over a century. The ashrams and practice centres there offer healing through posture, breath, and meditation — not as exercise, but as medicine for the whole person.\n\n**Nature cure tradition** — the Indian naturopathic movement has long recognised mountain environments as therapeutic. Clean air, clean water, altitude, and forest immersion are prescribed as treatments for a range of conditions from respiratory illness to chronic stress.\n\nOur retreats draw from these traditions without dogmatism. The specific practices vary by location and participant need. What remains constant is the principle: the right environment, given enough time, heals.',
      },
    ],
  },

  // ── 10. Creative Retreats ─────────────────────────────────────────────────
  {
    slug: 'creative-retreat',
    title: 'Creative Healing Retreat — Art & Yoga in the Himalayas | Retreats And Treks',
    h1: 'Creative Healing Retreat — Art & Yoga in the Himalayas',
    metaDescription:
      'Creative healing retreats combining painting, expressive arts, yoga, and emotional healing in the Himalayas. Mussoorie, Chakrata, Rishikesh, Zanskar, Sankri. Small groups, no experience needed.',
    heroImage: '/Images/retreat/services/art.webp',
    heroImageAlt: 'People engaging in expressive painting during a mountain art retreat',
    intro:
      'A creative retreat is not an art class transplanted into the mountains. It is a container where creativity becomes a doorway to emotional truth. You do not need to be an artist. You do not need talent or training. What you need is willingness — to pick up a brush, shape clay, move your body, or sit with a blank page and let something emerge that is genuinely yours.\n\nThe Himalayas amplify this process. Mountain light changes how you see colour. Forest silence removes the inner critic. Altitude thins the habitual thinking that blocks creative flow. We run art retreats across five distinct locations, each offering a different quality of creative inspiration — from the gentle forests of Chakrata to the raw geology of Zanskar.',
    whoIsThisFor: [
      'Anyone seeking to reconnect with their creative voice — no experience required',
      'People recovering from creative burnout, perfectionism, or self-censorship',
      'Those who want emotional healing through art rather than talk-based therapy',
      'Artists and writers seeking inspiration in a Himalayan environment',
      'Anyone drawn to painting, drawing, clay work, collage, or expressive movement',
    ],
    whatToExpect: [
      'Daily creative sessions — painting, drawing, clay, collage, nature sketching',
      'Facilitated guidance without performance pressure or grading',
      'Morning yoga or movement to connect body and creativity',
      'Afternoon unstructured creation time in natural settings',
      'Evening sharing circles (optional) for gentle witnessing',
      'Small groups (maximum 10) ensuring personal attention and safety',
    ],
    retreatServiceSlugs: ['art-and-creative'],
    locationAngles: [
      {
        locationId: 'mussoorie',
        heading: 'Mussoorie — Mountain Light & Aesthetic Beauty',
        description:
          'Mussoorie\'s cloud forests, colonial architecture, and sweeping valley views create a naturally aesthetic environment that awakens the visual sense. The light here changes throughout the day — soft mist in the morning, warm gold in the afternoon, dramatic cloud play in the evening. For painters and visual artists, the landscape itself becomes your primary teacher. The most accessible art retreat location, just 1.5 hours from Dehradun.',
      },
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Silence for Deep Creation',
        description:
          'The dense deodar forests of Chakrata create a natural studio without walls. No tourist noise, no commercial distractions — just the sound of wind, birdsong, and your own creative process. The silence removes the inner critic. At 2,200 metres, the forest canopy provides natural shelter for outdoor creation. Ideal for expressive arts, journalling, clay work, and the kind of creativity that requires safety and solitude.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Spiritual Art on the Ganges',
        description:
          'Rishikesh adds a devotional dimension to creative practice. The river, the chanting from nearby ashrams, and the accumulated spiritual weight of the place infuse creative work with depth. Art here becomes a form of prayer — painting the Ganges at dawn, sketching temple architecture, or simply sitting with colour and letting the sacred geography move through your hands.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Raw Landscapes for Bold Creation',
        description:
          'Zanskar\'s Trans-Himalayan geology — ancient rock formations, stark valleys, prayer flags against blue sky — demands bold creative response. The landscape does not invite pretty watercolours; it demands something primal. At 3,500 metres, the thinking mind slows and the creative impulse intensifies. For experienced retreatants or deployment radical creative breakthrough.',
      },
      {
        locationId: 'sankri',
        heading: 'Sankri — Mountain Village & Pastoral Simplicity',
        description:
          'Sankri sits in the Govind Wildlife Sanctuary, surrounded by pastoral mountain life — apple orchards, stone houses, river valleys. The simplicity of village life becomes creative material. Sketch journaling, landscape painting, and nature observation come naturally here. The 7-hour journey from Dehradun is itself a creative transition — leaving complexity behind.',
      },
    ],
    closingNarrative:
      'Creativity is not a luxury skill reserved for artists. It is your birthright — the part of you that makes, imagines, and expresses. Most of us have buried it under productivity, perfectionism, and the fear of not being good enough. A Himalayan art retreat does not teach you to create. It removes the conditions that stopped you. If you are drawn to this but unsure, reach out. We will help you choose the right location and format for wherever you are in your creative journey.',
    deepContent: [
      {
        heading: 'What Is an Art Retreat?',
        body: 'An art retreat is a structured period — typically five to fourteen days — spent in deliberate creative practice, away from the productivity demands and self-criticism of daily life. Unlike an art class or workshop, a retreat creates a continuous creative container where your authentic voice can emerge through sustained immersion.\n\nThe core elements are: daily creative sessions (painting, drawing, clay work, collage, or mixed media), facilitated guidance without grading or performance pressure, periods of unstructured creation time, nature immersion, group sharing, and rest. The structure is not about producing polished work — it is about recovering your relationship with creative expression.\n\nWhat surprises most participants is that the art itself is secondary. The real work is emotional. When you pick up a brush with no expectation of being good, what comes out is authentic — and authenticity is therapeutic. Repressed emotions surface through colour and form. The inner critic, denied its usual power, gradually quiets. By day three, most participants report a shift: from performing creativity to actually being creative.',
        image: '/Images/retreat/services/art.webp',
        imageAlt: 'Painting classes set organically into an outdoor mountain setting',
      },
      {
        heading: 'Emotional Healing Through Art',
        body: 'Art therapy is one of the oldest forms of human healing — cave paintings, ritual masks, devotional sculpture. The therapeutic power of creative expression is well-documented in clinical research published in journals including The Arts in Psychotherapy, Art Therapy, and the Journal of Clinical Psychology.\n\n**Bypassing verbal defences.** Many emotional experiences resist verbal processing. Trauma, grief, and complex feelings often cannot be talked through because the verbal mind introduces analysis, judgment, and intellectualisation. Visual and tactile creation bypasses these defences entirely — the hands know what the mouth cannot say.\n\n**Externalising internal states.** Putting emotion onto paper, canvas, or clay creates a therapeutic distance. What was overwhelming when trapped inside becomes manageable when it exists outside you as a visible form. You can look at it, modify it, add to it, or simply witness it.\n\n**The body-creativity connection.** Creative expression engages the body in ways that seated therapy cannot. The physical act of mixing paint, shaping clay, or moving charcoal across paper activates sensorimotor pathways that connect emotion to physical release. This is why art retreats include movement — yoga, walking, dance — alongside seated creation.\n\n**Flow state as healing.** Extended creative immersion produces flow — the psychological state where self-consciousness dissolves, time distorts, and action and awareness merge. Flow is inherently therapeutic because it interrupts the default mode network, the brain region associated with rumination, self-criticism, and anxiety.',
      },
    ],
    storyLinks: [
      { href: '/a-week-without-my-phone-digital-detox', label: 'A Week Without My Phone — Finding Creativity in Stillness' },
    ],
  },
] as const;

/**
 * Get an experience page by slug
 */
export function getExperiencePage(slug: string): ExperiencePage | undefined {
  return EXPERIENCE_PAGES.find((p) => p.slug === slug);
}

/**
 * Get all experience page slugs (for sitemap / static params)
 */
export function getAllExperiencePageSlugs(): string[] {
  return EXPERIENCE_PAGES.map((p) => p.slug);
}
