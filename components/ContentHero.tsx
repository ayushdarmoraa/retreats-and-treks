import Image from 'next/image';
import { images, type SiteImage } from '@/lib/images';

/**
 * Path → hero-image mapping for standalone content pages.
 *
 * Every key is the canonical `PATH` constant from the page file.
 * When a page imports `<ContentHero path={PATH} />`, it resolves the
 * image from this map and renders a 240 px banner with gradient overlay.
 *
 * Add new pages here instead of adding image logic to each page file.
 */
const PAGE_HERO: Record<string, SiteImage> = {
  /* ── Core pages ─────────────────────────────────────────── */
  '/find-your-retreat':           images.heroes.retreatHero,
  '/retreat-calendar':            images.heroes.retreatHero,

  /* ── Retreat sub-pages (app/retreats/) ──────────────────── */
  '/retreats/best-retreat-in-uttarakhand':  images.heroes.valleyForest,
  '/retreats/luxury-himalayan-retreats':    images.heroes.alpineRidge,
  '/retreats/meditation-retreat-rishikesh': images.locations.rishikesh,
  '/retreats/meditation-retreat-uttarakhand': images.services.meditationService,
  '/retreats/retreat-cost-india':           images.heroes.retreatHero,
  '/retreats/retreats-near-delhi':          images.heroes.valleyForest,
  '/retreats/uttarakhand-retreats':         images.heroes.valleyForest,
  '/retreats/weekend-retreat-near-delhi':   images.services.weekendRetreat,
  '/retreats/yoga-retreat-rishikesh':       images.locations.rishikesh,
  '/retreats/yoga-retreat-uttarakhand':     images.services.yogaService,
  '/retreats/art':                          images.services.artCreative,

  /* ── Chakrata / Sankri specific retreat pages ───────────── */
  '/retreats/chakrata/meditation-retreat':  images.locations.chakrata,
  '/retreats/chakrata/yoga-retreat':        images.locations.chakrata,
  '/retreats/chakrata/weekend-retreat-from-dehradun': images.locations.chakrata,
  '/retreats/sankri/meditation-retreat':    images.locations.sankri,
  '/retreats/sankri/yoga-retreat':          images.locations.sankri,
  '/retreats/sankri/weekend-retreat':       images.locations.sankri,

  /* ── Meditation-focused articles ────────────────────────── */
  '/benefits-of-meditation-retreat':           images.services.meditationService,
  '/best-meditation-retreats-in-india':        images.services.meditationService,
  '/first-day-of-a-meditation-retreat':        images.journeys.meditation,
  '/first-meditation-retreat-tips':            images.journeys.meditation,
  '/how-long-should-a-meditation-retreat-be':  images.journeys.meditation,
  '/how-to-choose-a-meditation-retreat':       images.journeys.meditation,
  '/is-a-meditation-retreat-worth-it':         images.services.meditationService,
  '/meditation-retreat-and-trek':              images.heroes.alpineRidge,
  '/my-7-day-meditation-retreat-in-zanskar':   images.locations.zanskar,
  '/vipassana-vs-meditation-retreat':          images.journeys.meditation,
  '/what-to-expect-at-a-meditation-retreat':   images.journeys.meditation,
  '/why-people-go-to-meditation-retreats':     images.services.meditationService,

  /* ── Silent-retreat articles ────────────────────────────── */
  '/himalayan-silent-retreats':                images.journeys.stillness,
  '/how-hard-is-a-silent-retreat':             images.journeys.stillness,
  '/silent-retreat-vs-digital-detox':          images.journeys.stillness,
  '/what-happens-at-a-silent-retreat':         images.journeys.stillness,
  '/what-happens-to-your-mind-in-silence':     images.journeys.stillness,
  '/what-i-learned-from-a-silent-retreat':     images.journeys.stillness,

  /* ── Himalayan / location articles ──────────────────────── */
  '/benefits-of-himalayan-retreats':           images.heroes.himalayanSunrise,
  '/best-himalayan-retreats':                  images.heroes.himalayanSunrise,
  '/healing-retreat-himalayas':                images.heroes.valleyForest,

  /* ── Seasonal articles ──────────────────────────────────── */
  '/autumn-retreat-himalayas':                 images.heroes.valleyForest,
  '/spring-retreat-himalayas':                 images.heroes.valleyForest,
  '/summer-retreat-himalayas':                 images.heroes.alpineRidge,
  '/winter-retreat-himalayas':                 images.heroes.himalayanSunrise,

  /* ── Zanskar articles ───────────────────────────────────── */
  '/best-time-for-a-retreat-in-zanskar':       images.locations.zanskar,
  '/how-to-reach-zanskar-for-a-retreat':       images.locations.zanskar,
  '/why-zanskar-is-perfect-for-retreats':      images.locations.zanskar,

  /* ── Trek + retreat combination articles ────────────────── */
  '/himalayan-retreat-with-trekking':          images.heroes.alpineRidge,
  '/trek-and-meditate-himalayas':              images.heroes.alpineRidge,
  '/trek-and-paint-himalayas':                 images.services.artCreative,

  /* ── Practical / how-to guides ──────────────────────────── */
  '/how-to-prepare-for-a-retreat':             images.heroes.retreatHero,
  '/what-to-pack-for-a-retreat':               images.heroes.retreatHero,
  '/retreats-for-beginners':                   images.heroes.retreatHero,

  /* ── Experience / transformation articles ───────────────── */
  '/a-week-without-my-phone-digital-detox':    images.journeys.stillness,
  '/burnout-recovery-retreats':                images.services.burnoutRecovery,
  '/creative-retreat':                         images.services.artCreative,
  '/digital-detox-retreat':                    images.journeys.stillness,
  '/life-reset-retreat':                       images.services.restReset,
  '/personal-growth-retreat':                  images.heroes.retreatHero,
  '/self-discovery-retreat':                   images.heroes.retreatHero,
  '/spiritual-awakening-retreat':              images.journeys.meditation,
  '/stress-relief-retreats':                   images.services.restReset,

  /* ── Comparison articles ────────────────────────────────── */
  '/retreat-vs-therapy':                       images.heroes.retreatHero,
  '/retreat-vs-vacation':                      images.heroes.valleyForest,

  /* ── Trek hub / seasonal trek pages ─────────────────────── */
  '/treks/3-day-treks-uttarakhand':            images.treks.garhwal,
  '/treks/5-day-treks-uttarakhand':            images.treks.garhwal,
  '/treks/above-4000m-treks-uttarakhand':      images.treks.kedarkantha,
  '/treks/autumn-treks-uttarakhand':           images.treks.harKiDun,
  '/treks/spring-treks-uttarakhand':           images.treks.kuariPass,
  '/treks/summer-treks-uttarakhand':           images.treks.roopkund,
  '/treks/low-altitude-treks-uttarakhand':     images.treks.garhwal,
  '/treks/week-long-treks-uttarakhand':        images.treks.harKiDun,
  '/treks/trek-near-delhi':                    images.treks.garhwal,
  '/treks/trek-packages-uttarakhand':          images.treks.garhwal,
  '/treks/brahmatal-vs-kuari-pass':            images.treks.brahmatal,
  '/treks/garhwal-himalayas':                  images.treks.garhwal,
  '/treks/garhwal-himalayas/packing-checklist': images.treks.garhwal,

  /* ── Topics ─────────────────────────────────────────────── */
  '/topics/lifestyle':                         images.heroes.valleyForest,

  /* ── Other ──────────────────────────────────────────────── */
  '/facilitators':                             images.heroes.valleyForest,
};

interface ContentHeroProps {
  path: string;
}

export default function ContentHero({ path }: ContentHeroProps) {
  const image = PAGE_HERO[path];
  if (!image) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        overflow: 'hidden',
        borderRadius: '8px',
        marginBottom: 'var(--space-lg)',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
}
