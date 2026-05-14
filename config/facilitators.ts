/**
 * FACILITATOR PROFILES — The people who lead our retreats
 * ─────────────────────────────────────────────────────────
 * Facilitator trust signals are high-impact for retreat booking conversion.
 * Each profile links to their primary retreat services and locations.
 *
 * Schema: schema.org/Person (generated on facilitator pages)
 */

import { facilitatorImageMap, type SiteImage } from '@/lib/images';

export interface Facilitator {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly image?: SiteImage;
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
    image: facilitatorImageMap['arjun-mehta'],
    metaDescription:
      'Arjun Mehta leads meditation and silent retreats across Zanskar, Chakrata, and Munsiyari, with 12 years of Vipassana and Zen practice.',
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
    slug: 'sakshi',
    name: 'Sakshi',
    title: 'Yoga Retreat & Movement Facilitator',
    image: facilitatorImageMap['sakshi'],
    metaDescription:
      'Sakshi leads yoga retreats, yoga teacher training, aerial yoga programs, and online yoga classes. 8 years of yoga teaching experience.',
    bio:
      'Sakshi has been teaching yoga for 8 years, guiding students through movement, breath, and mindful practice. Her work with Retreats and Treks brings together yoga retreats, teacher training pathways, aerial yoga programs, and online classes for people who want to begin, deepen, or continue their practice. Her facilitation is grounded in accessibility: helping students build a steady relationship with posture, breath, attention, and rest rather than treating yoga as performance.',
    background: [
      'Teaching yoga for 8 years',
      'Leads yoga retreats in Rishikesh and Himalayan retreat settings',
      'Guides yoga teacher training courses in Rishikesh, Thailand, and Bali',
      'Offers aerial yoga programs and classes in Rishikesh',
      'Offers online yoga classes for students who want regular guided practice from home',
      'Supports beginners who are entering yoga for the first time as well as returning students rebuilding consistency',
      'Integrates asana, pranayama, mindful movement, and rest into retreat-friendly practice formats',
    ],
    approach:
      'Sakshi teaches yoga as a steady relationship with the body, breath, and attention. Her sessions are accessible, grounding, and adaptive, supporting beginners as well as students who want to deepen their practice through retreats, teacher training, aerial yoga, or continued online classes. In retreat settings, she keeps the practice spacious and non-competitive, using movement, pranayama, stillness, and rest to help participants reconnect with their bodies without pressure.',
    specialisations: ['Yoga retreats', 'Yoga teacher training', 'Aerial yoga', 'Online yoga classes', 'Pranayama', 'Mindful movement'],
    retreatSlugs: ['yoga-and-movement'],
    locationIds: ['rishikesh', 'chakrata'],
    yearsExperience: 8,
    qualifications: [
      '8 years of yoga teaching experience',
    ],
  },
  {
    slug: 'nidhi-rawat',
    name: 'Nidhi Rawat',
    title: 'Burnout Recovery & Rest Facilitator',
    image: facilitatorImageMap['nidhi-rawat'],
    metaDescription:
      'Nidhi Rawat leads burnout recovery and rest retreats in Chakrata and Sankri, with clinical psychology training and 8 years of facilitation experience.',
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
    image: facilitatorImageMap['tenzin-dorje'],
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
    slug: 'chaitra-ram',
    name: 'Chaitra Ram',
    title: 'Artist & Art Therapist',
    image: facilitatorImageMap['chaitra-ram'],
    metaDescription:
      'Chaitra Ram leads art and creative healing retreats in Rishikesh and the Himalayas, blending art therapy, psychology, and 12 years of painting practice.',
    bio:
      'Chaitra Ram is an artist and art therapist from Mysore, Karnataka, now based in Rishikesh, where she has lived for the past seven years. Her work brings together painting, expressive art, psychology-informed reflection, and a grounded understanding of prana healing. She has spent twelve years developing her art and painting practice, and now guides creative spaces where guests can explore expression without judgment.',
    background: [
      'Artist from Mysore, Karnataka',
      'Based in Rishikesh for the past 7 years',
      'Graduate in psychology',
      '12 years of art and painting practice',
      'Experienced in prana healing and energy-awareness practices',
    ],
    approach:
      'Chaitra holds art as a reflective and therapeutic process rather than a performance. Her sessions are beginner-friendly, emotionally aware, and rooted in the belief that painting, colour, line, and image-making can help people access what words often cannot. She works gently with prompts, creative exercises, and open studio time so participants can create from honesty instead of pressure.',
    specialisations: ['Art therapy', 'Expressive painting', 'Creative healing', 'Beginner-friendly art', 'Prana healing'],
    retreatSlugs: ['art-and-creative', 'trek-and-paint', 'weekend-art-retreat'],
    locationIds: ['rishikesh', 'chakrata', 'mussoorie'],
    yearsExperience: 12,
    qualifications: [
      'Graduate in psychology',
      '12 years of art and painting practice',
      'Art therapy and expressive arts facilitation',
      'Prana healing practice',
    ],
  },
  {
    slug: 'sunaina-bhat',
    name: 'Sunaina Bhat',
    title: 'Sound Healing & Creative Retreat Facilitator',
    image: facilitatorImageMap['sunaina-bhat'],
    metaDescription:
      'Sunaina Bhat leads sound healing and creative retreats in Chakrata, with Tibetan singing bowl, gong therapy, and 10 years of practice.',
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
    retreatSlugs: ['sound-healing'],
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
