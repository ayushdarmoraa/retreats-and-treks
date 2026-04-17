/**
 * ART & CREATIVE RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const artAndCreativeRetreat = {
  slug: 'art-and-creative',
  title: 'Creative Healing Retreat',
  oneLineEssence: 'Emotional healing through art & yoga in a container designed for authentic expression.',

  /* ── Visual Assets ── */
  heroImage: '/Images/art-retreat/hero.webp',
  heroAlt: 'Creative healing retreat in the Himalayas — painting and yoga with mountain views in Uttarakhand',
  signatureImage: '/Images/art-retreat/signature.webp',
  signatureAlt: 'Himalayan ridgeline at dawn — creative retreat landscape in Uttarakhand',
  signatureQuote: `Creativity is not what you produce. It's what you allow to emerge.`,
  galleryImages: [
    { src: '/Images/art-retreat/yoga-morning.webp', alt: 'Morning yoga session during art retreat in the Himalayan mountains' },
    { src: '/Images/art-retreat/art-supplies.webp', alt: 'Watercolor painting supplies at a creative healing retreat in India' },
    { src: '/Images/art-retreat/sharing-circle.webp', alt: 'Evening sharing circle at a Himalayan creative retreat' },
    { src: '/Images/art-retreat/solo-sketching.webp', alt: 'Solo sketching on a hilltop during a creative retreat in Uttarakhand' },
  ],

  keyHighlights: ['Art & Yoga', 'Himalayan Setting', 'No Experience Needed', '3–7 Days'],

  description: `\
Creative Healing Retreat is for anyone seeking emotional healing through art & yoga — reconnecting with the part of themselves that makes, creates, and imagines. You do not need experience. You do not need talent. You need only curiosity and a willingness to create without judgment.

This retreat combines expressive arts with gentle yoga and nature immersion to create a healing container where creativity becomes a doorway to emotional truth. Whether that expression comes through painting, writing, movement, music, or forms you discover in the process — the work is about unfettering what wants to emerge.

Days are structured to create flow. Mornings offer yoga and creative instruction or prompt-based exploration. Afternoons are free creation time. Evenings bring gentle sharing and reflection.

By the end, you will have created work that is authentically yours. More importantly, you will have remembered that creativity is your natural state — and experienced the emotional healing that authentic expression makes possible.`,

  idealIf: [
    'You feel creatively blocked and want to reconnect with spontaneous expression',
    'You are drawn to art but have never given yourself permission to create freely',
    'You want emotional healing through creative practice rather than talk-based therapy',
    'You need a retreat that combines stillness (yoga) with active self-expression (art)',
    'You want to immerse yourself in Himalayan nature as part of your creative process',
  ],

  whatMakesItUnique: {
    intro: 'This is not an art class. It is a healing container where creativity is the modality — and the Himalayas are the co-facilitator.',
    points: [
      { title: 'Creativity as Healing', description: 'Expression replaces analysis. You don\'t talk through your feelings — you paint, write, sculpt, and move them. The art is the therapy.' },
      { title: 'No Performance Pressure', description: 'There are no critiques, no grades, no audience. Your work exists for you alone. This removes the single biggest barrier to authentic creation.' },
      { title: 'Multi-Medium Freedom', description: 'Painting, writing, collage, movement, music — you choose. You can switch mediums daily. The work is about your voice, not technical skill in any one form.' },
      { title: 'Nature as Collaborator', description: 'The Himalayan landscape is not backdrop — it is active participant. Morning light, mountain silence, and forest sounds enter your creative process directly.' },
    ],
  },

  experiences: [
    { title: 'Morning Creative Sessions', description: 'Each morning begins with a prompt, technique, or theme offered by the facilitator. You explore through your chosen medium — drawing, painting, writing, collage, or whatever calls you. Guidance is available. Judgment is not.' },
    { title: 'Mountain Sketching & Plein Air', description: 'Weather permitting, we take art materials outdoors. Sketch the ridgeline. Paint the valley light. Write to the sound of wind through deodar trees. The mountain becomes your subject and your teacher.' },
    { title: 'Evening Sharing Circles', description: 'Evenings are gentle. If you wish to show your work and receive presence for it, there is that invitation. If you prefer to keep it private, that is equally honored. Sharing is witnessed — never critiqued.' },
    { title: 'Solo Creation Time', description: 'Afternoons are yours. The facilitator is available if guidance is needed, but the space is designed for uninterrupted creation. This is where the deeper work happens — in the quiet between structure.' },
  ],

  placesWeExplore: [
    { name: 'Ridge Viewpoints', description: 'Open sky, mountain panoramas, and the kind of light that makes you want to paint. These are our outdoor studio spaces.' },
    { name: 'Forest Trails', description: 'Quiet walks through deodar and oak forests. Many participants find that creative ideas arrive naturally during these unstructured walks.' },
    { name: 'The Retreat Verandah', description: 'Where most of the creative work happens. Open air, mountain views, and a long wooden table covered in art supplies. This is your creative home base.' },
  ],

  forNotFor: {
    for: [
      'Anyone seeking to reconnect with their creative voice',
      'People interested in exploration without performance pressure',
      'Those wanting a container for authentic self-expression',
      'Beginners and experienced artists alike',
    ],
    notFor: [
      'People seeking external validation or market-ready work',
      'Those uncomfortable with vulnerability or self-expression',
      'Anyone wanting technical mastery as the goal',
    ],
  },

  howItWorks: {
    rhythm: `\
Mornings begin with a prompt, technique, or theme offered by the facilitator. You explore through your chosen medium—drawing, writing, movement, collage, or whatever calls you.

Mid-morning brings a break. Tea, reflection, settling.

Afternoon is open creation time. This is your space. The facilitator is available if guidance is needed, but the work is entirely yours.

Evenings are gentle. Dinner, then optional sharing. If you wish to show your work and receive presence for it, there is that invitation. If you prefer to keep it private, that is equally honored.

Over the days, patterns emerge. What you needed to express becomes clear. The work deepens naturally.`,
  },

  whereItWorksBest: {
    primary: 'mussoorie' as const,
    primaryReason: 'The landscape itself is creative inspiration. Views, light, and aesthetic beauty amplify the inner creative impulse.',
    alsoWorks: ['chakrata', 'rishikesh'],
    contextByLocation: {
      mussoorie: 'Mountain vistas awaken aesthetic sense. The beauty around you invites creative response.',
      chakrata: 'Forest silence creates space for internal creativity to emerge without distraction.',
      rishikesh: 'Spiritual ground supports the vulnerability that authentic creation requires.',
      sankri: 'High altitude intensifies inner vision and imaginative clarity.',
      munsiyari: 'Alpine beauty for profound creative solitude.',
    },
  },

  adaptability: `\
Art & Creative welcomes all mediums. If you have a practice, bring it. If you wish to explore something new, we will support that. The work is about your voice, not the medium.

Solo retreat offers undistracted creation. Group retreats create a field of creative support and gentle witnessing. Pair retreats deepen shared creative exploration.`,

  invitation: `\
Emotional healing through art & yoga begins when you give yourself permission to create without judgment. We create the conditions — you do the emergence. Come heal through creativity with us.`,
} as const;
