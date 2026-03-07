/**
 * FACILITATOR PROFILES — The people who lead our retreats
 * ─────────────────────────────────────────────────────────
 * Facilitator trust signals are high-impact for retreat booking conversion.
 * Each profile links to their primary retreat services and locations.
 *
 * Schema: schema.org/Person (generated on facilitator pages)
 */

export interface Facilitator {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly metaDescription: string;
  readonly bio: string;
  readonly background: readonly string[];
  readonly approach: string;
  readonly specialisations: readonly string[];
  /** Service slugs this facilitator leads */
  readonly retreatSlugs: readonly string[];
  /** Location IDs where this facilitator operates */
  readonly locationIds: readonly string[];
  readonly yearsExperience: number;
  readonly qualifications: readonly string[];
}

const FACILITATORS: Facilitator[] = [
  {
    slug: 'arjun-mehta',
    name: 'Arjun Mehta',
    title: 'Meditation & Silence Facilitator',
    metaDescription:
      'Arjun Mehta leads meditation and silent retreat programs across Zanskar, Chakrata, and Munsiyari. 12 years of practice. Trained in Vipassana and Zen traditions.',
    bio:
      'Arjun began his meditation practice in 2014 after leaving a decade-long career in enterprise technology. What started as stress management became a sustained inquiry into attention, silence, and the structure of mind. He trained in Vipassana at Dhamma Bodhi in Bodh Gaya and spent two years at a Zen centre in Kyoto before returning to India to lead retreats in the Himalayas.',
    background: [
      'Former enterprise technology consultant (10 years)',
      'Vipassana training at Dhamma Bodhi, Bodh Gaya',
      'Two years of residential Zen practice in Kyoto, Japan',
      'Leading Himalayan meditation retreats since 2019',
    ],
    approach:
      'Arjun teaches meditation as attention training rather than spiritual practice. His sessions are structured, direct, and free from esoteric language. He believes the mountains are the best meditation teacher — his role is to remove the obstacles that prevent people from hearing them.',
    specialisations: ['Meditation retreats', 'Silent retreats', 'Digital detox programs'],
    retreatSlugs: ['meditation-and-silence'],
    locationIds: ['zanskar', 'chakrata', 'munsiyari'],
    yearsExperience: 12,
    qualifications: [
      'Certified Vipassana teacher (Dhamma Bodhi lineage)',
      'Zen meditation instructor (Kyoto Zen Centre)',
      'Wilderness first aid certification',
    ],
  },
  {
    slug: 'kavya-sharma',
    name: 'Kavya Sharma',
    title: 'Yoga & Movement Facilitator',
    metaDescription:
      'Kavya Sharma leads yoga and movement retreat programs in Rishikesh and Chakrata. 15 years of teaching. Trained in Hatha, Vinyasa, and therapeutic yoga.',
    bio:
      'Kavya grew up in Rishikesh, where yoga was not a career choice but a family inheritance. She began teaching at 19 and has spent fifteen years refining her understanding of how physical movement creates psychological space. Her teaching integrates traditional Hatha foundations with contemporary movement science.',
    background: [
      'Born and raised in Rishikesh',
      'Teaching yoga since age 19 (15 years)',
      '500-hour Hatha Yoga certification (Parmarth Niketan)',
      'Therapeutic yoga training with emphasis on trauma-informed practice',
    ],
    approach:
      'Kavya teaches yoga as a conversation between body and attention. Her sessions are challenging but never punishing. She adapts in real time to the group — reading posture, breathing patterns, and energy levels the way a musician reads a room. Beginners feel held. Advanced practitioners find depth.',
    specialisations: ['Yoga retreats', 'Movement therapy', 'Breathwork'],
    retreatSlugs: ['yoga-and-movement'],
    locationIds: ['rishikesh', 'chakrata'],
    yearsExperience: 15,
    qualifications: [
      '500-hour Yoga Teacher Training (Parmarth Niketan, Rishikesh)',
      'Therapeutic Yoga Certification (IAYT-affiliated)',
      'Trauma-informed yoga training',
    ],
  },
  {
    slug: 'nidhi-rawat',
    name: 'Nidhi Rawat',
    title: 'Burnout Recovery & Rest Facilitator',
    metaDescription:
      'Nidhi Rawat leads burnout recovery and rest retreat programs in Chakrata and Sankri. Clinical psychology background. 8 years facilitating recovery programs.',
    bio:
      'Nidhi trained as a clinical psychologist before recognising that the most effective recovery work does not happen in a clinic. It happens when you remove someone from the environment that is causing the damage. She designs retreat programs that combine evidence-based recovery protocols with environmental immersion — structured rest, not passive rest.',
    background: [
      'M.Phil Clinical Psychology (NIMHANS, Bangalore)',
      'Three years in hospital-based burnout and anxiety treatment',
      'Transitioned to retreat-based recovery programs in 2018',
      'Facilitating Himalayan recovery retreats since 2019',
    ],
    approach:
      'Nidhi does not lead retreats with positivity or inspiration. She leads with precision. Her programs are structured around nervous system recovery — breathing protocols, sleep architecture restoration, and cognitive load reduction. The Himalayan environment provides the containment. She provides the tools.',
    specialisations: ['Burnout recovery', 'Stress management', 'Digital detox', 'Rest programs'],
    retreatSlugs: ['burnout-recovery', 'rest-and-reset'],
    locationIds: ['chakrata', 'sankri'],
    yearsExperience: 8,
    qualifications: [
      'M.Phil Clinical Psychology (NIMHANS)',
      'Certified Somatic Experiencing Practitioner',
      'Breathwork facilitator training',
    ],
  },
  {
    slug: 'tenzin-dorje',
    name: 'Tenzin Dorje',
    title: 'Himalayan Retreat & Trek Guide',
    metaDescription:
      'Tenzin Dorje leads retreat programs and guided treks in Zanskar and Munsiyari. Born in Ladakh. 20 years of mountain experience.',
    bio:
      'Tenzin was born in the Zanskar valley. He grew up walking the same passes that retreat and trek participants now travel. His knowledge of the Trans-Himalayan landscape is not academic — it is lived. He has spent twenty years guiding people through the mountains, first as a trekking guide, then as a retreat facilitator who understood that the landscape itself is the teacher.',
    background: [
      'Born and raised in Zanskar valley, Ladakh',
      'Professional mountain guide since 2006',
      'Trained in wilderness medicine and high-altitude safety',
      'Retreat facilitation training with emphasis on nature immersion',
    ],
    approach:
      'Tenzin leads with the landscape. His retreat sessions happen on ridges, beside rivers, and in monastery courtyards. He speaks slowly, moves deliberately, and knows when to be quiet. Participants describe him as someone who makes the mountains accessible without making them smaller.',
    specialisations: ['Mountain meditation', 'Trek and retreat hybrids', 'High-altitude retreats', 'Nature immersion'],
    retreatSlugs: ['meditation-and-silence'],
    locationIds: ['zanskar', 'munsiyari'],
    yearsExperience: 20,
    qualifications: [
      'Certified mountain guide (Indian Mountaineering Foundation)',
      'Wilderness first responder certification',
      'Basic Life Support — high altitude environments',
    ],
  },
  {
    slug: 'sunaina-bhat',
    name: 'Sunaina Bhat',
    title: 'Sound Healing & Creative Retreat Facilitator',
    metaDescription:
      'Sunaina Bhat leads sound healing and creative retreat programs in Chakrata. Trained in Tibetan singing bowls and gong therapy. 10 years of practice.',
    bio:
      'Sunaina discovered sound healing through a chance encounter with a Tibetan singing bowl practitioner in Dharamsala. That single experience redirected a career in graphic design toward something she could not explain but could not ignore. She spent three years training in Nepal and India — singing bowls, gong therapy, and overtone chanting — before beginning to lead retreats in 2016.',
    background: [
      'Former graphic designer (7 years)',
      'Sound healing training in Kathmandu and Dharamsala',
      'Tibetan singing bowl certification (Nepal Sound Healing Centre)',
      'Leading sound healing retreats since 2016',
    ],
    approach:
      'Sunaina works with sound as a physical medium, not a spiritual concept. Her sessions create vibration that participants feel in their bodies — chest, spine, skull. The mountain acoustics in Chakrata amplify this. She designs each session to take the group from stimulation to stillness, using resonance as the bridge.',
    specialisations: ['Sound healing', 'Singing bowl therapy', 'Creative retreats', 'Art and expression'],
    retreatSlugs: ['sound-healing', 'art-and-creative'],
    locationIds: ['chakrata'],
    yearsExperience: 10,
    qualifications: [
      'Certified Sound Healing Practitioner (Nepal Sound Healing Centre)',
      'Gong therapy training (Kundalini Research Institute)',
      'Trauma-informed facilitation certification',
    ],
  },
];

export const FACILITATOR_PROFILES: readonly Facilitator[] = FACILITATORS;

export function getFacilitator(slug: string): Facilitator | undefined {
  return FACILITATORS.find((f) => f.slug === slug);
}

export function getAllFacilitatorSlugs(): string[] {
  return FACILITATORS.map((f) => f.slug);
}

export function getFacilitatorsByRetreat(retreatSlug: string): Facilitator[] {
  return FACILITATORS.filter((f) => f.retreatSlugs.includes(retreatSlug));
}

export function getFacilitatorsByLocation(locationId: string): Facilitator[] {
  return FACILITATORS.filter((f) => f.locationIds.includes(locationId));
}
