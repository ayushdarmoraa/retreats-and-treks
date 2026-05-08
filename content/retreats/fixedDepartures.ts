type ArtRetreatSlug = 'art-and-creative' | 'trek-and-paint' | 'weekend-art-retreat' | 'yoga-and-movement';

export interface FixedDeparture {
  slug: ArtRetreatSlug;
  title: string;
  label: string;
  location: string;
  price: string;
  seats: number;
  startDate: Date;
  endDate: Date;
  dateText: string;
  durationText: string;
  whatsappText: string;
}

const INDIA_TIME_ZONE = 'Asia/Kolkata';

function getIndiaNow(): Date {
  const indiaDateString = new Intl.DateTimeFormat('en-CA', {
    timeZone: INDIA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return new Date(`${indiaDateString}T00:00:00+05:30`);
}

function getNthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, nth: number): Date {
  const date = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
  const firstDay = date.getUTCDay();
  const offset = (weekday - firstDay + 7) % 7;
  const dayOfMonth = 1 + offset + (nth - 1) * 7;

  return new Date(Date.UTC(year, monthIndex, dayOfMonth, 0, 0, 0));
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatDateRange(startDate: Date, endDate: Date): string {
  const sameMonth = startDate.getUTCMonth() === endDate.getUTCMonth();
  const startDay = startDate.getUTCDate();
  const endFormatter = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  if (sameMonth) {
    const monthYear = new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(endDate);

    return `${startDay}–${endDate.getUTCDate()} ${monthYear}`;
  }

  return `${endFormatter.format(startDate)} – ${endFormatter.format(endDate)}`;
}

function createDeparture(
  slug: ArtRetreatSlug,
  title: string,
  label: string,
  location: string,
  price: string,
  seats: number,
  startDate: Date,
  endDate: Date,
): FixedDeparture {
  const dateText = formatDateRange(startDate, endDate);
  const nights = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000));
  const days = nights + 1;
  const durationText = `${days} days / ${nights} nights`;

  return {
    slug,
    title,
    label,
    location,
    price,
    seats,
    startDate,
    endDate,
    dateText,
    durationText,
    whatsappText: `Hi, I want to book ${title} for ${dateText} in ${location}. Please share availability and booking details.`,
  };
}

export function getCurrentMonthArtFixedDepartures(now = getIndiaNow()): FixedDeparture[] {
  const year = now.getUTCFullYear();
  const monthIndex = now.getUTCMonth();

  const creativeStart = getNthWeekdayOfMonth(year, monthIndex, 1, 2); // 2nd Monday
  const trekPaintStart = getNthWeekdayOfMonth(year, monthIndex, 1, 3); // 3rd Monday
  const weekendStart = getNthWeekdayOfMonth(year, monthIndex, 5, 2); // 2nd Friday

  return [
    createDeparture(
      'art-and-creative',
      'Creative Healing Retreat',
      'Monthly creative healing retreat',
      'Rishikesh',
      'From ₹18,000',
      8,
      creativeStart,
      addDays(creativeStart, 6),
    ),
    createDeparture(
      'trek-and-paint',
      'Trek & Paint',
      'Monthly trek and paint retreat',
      'Chakrata',
      'From ₹22,000',
      10,
      trekPaintStart,
      addDays(trekPaintStart, 6),
    ),
    createDeparture(
      'weekend-art-retreat',
      'Weekend Art Retreat',
      'Monthly weekend art retreat',
      'Rishikesh',
      'From ₹14,000',
      10,
      weekendStart,
      addDays(weekendStart, 2),
    ),
    createDeparture(
      'yoga-and-movement',
      'Yoga Retreat',
      'Monthly yoga retreat with Sakshi',
      'Rishikesh',
      'From \u20B916,000',
      8,
      getNthWeekdayOfMonth(year, monthIndex, 1, 4), // 4th Monday
      addDays(getNthWeekdayOfMonth(year, monthIndex, 1, 4), 6),
    ),
  ];
}

export function getCurrentMonthArtFixedDeparture(slug: string): FixedDeparture | undefined {
  return getCurrentMonthArtFixedDepartures().find((departure) => departure.slug === slug);
}
