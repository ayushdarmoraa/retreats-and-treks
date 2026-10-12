import type { Inquiry } from './inquiries';
import { RETREAT_PROGRAM_EVENTS, YOGA_RETREAT_PRODUCTS, YOGA_TTC_PRODUCT } from '../config/retreatProgramEvents';
import { getRegisteredTrekDeparture } from '../config/departures';

export type LeadTier = 'Hot' | 'Warm' | 'Nurture' | 'Early' | 'hot' | 'warm' | 'nurture' | 'early' | 'cold' | 'unscored';
export type YogaClassification = 'Weekend' | '5-Day' | '7-Day' | '10-Day' | 'Other location' | 'TTC' | 'Not sure' | '';
export type YogaSalesRoute = 'RISHIKESH_DIRECT' | 'RISHIKESH_ALTERNATIVE' | 'CUSTOM_DEMAND' | 'TTC_SALES' | 'HELP_ME_CHOOSE' | '';

export interface LeadScore {
  score: number;
  tier: LeadTier;
  signals: string[];
  routing: string;
  yogaClassification: YogaClassification;
  yogaSalesRoute: YogaSalesRoute;
  recommendedProduct: string;
  recommendedAlternative: string;
}

const RISHIKESH_PRODUCT_IDS = new Set<string>(YOGA_RETREAT_PRODUCTS.map((product) => product.id));

const CUSTOM_LOCATIONS = new Set(['sankri', 'chakrata', 'zanskar', 'other', 'uttarakhand', 'munsiyari', 'mussoorie']);

function isYogaInquiry(inquiry: Inquiry): boolean {
  const source = `${inquiry.category} ${inquiry.source}`.toLowerCase();
  return inquiry.yogaInterest !== '' || inquiry.productId.startsWith('yoga-') || source.includes('yoga');
}

function isTtc(inquiry: Inquiry): boolean {
  return inquiry.yogaInterest === 'Yoga TTC' || inquiry.productId === 'yoga-ttc' || inquiry.product.toLowerCase().includes('teacher training');
}

function normalizedLocation(inquiry: Inquiry): string {
  return inquiry.location.trim().toLowerCase();
}

function selectedDeparture(inquiry: Inquiry) {
  return RETREAT_PROGRAM_EVENTS.find((event) => event.slug === inquiry.departureId && event.productId !== undefined);
}

function selectedProductId(inquiry: Inquiry): string {
  const departureProductId = selectedDeparture(inquiry)?.productId;
  if (departureProductId) return departureProductId;
  if (inquiry.productId) return inquiry.productId;
  if (inquiry.product === 'Other location' || inquiry.product === 'Not sure') return '';
  const productByLabel = YOGA_RETREAT_PRODUCTS.find((product) => inquiry.product.toLowerCase().startsWith(product.name.split(' in ')[0].toLowerCase()));
  if (productByLabel) return productByLabel.id;
  if (normalizedLocation(inquiry) === 'rishikesh') {
    return YOGA_RETREAT_PRODUCTS.find((product) => product.id === `yoga-rishikesh-${inquiry.duration.replace(' days', '-day')}` || (inquiry.duration === 'Weekend' && product.id === 'yoga-rishikesh-weekend'))?.id ?? '';
  }
  return '';
}

export function applyVerifiedDepartureContext(inquiry: Inquiry): Inquiry {
  const departure = selectedDeparture(inquiry);
  if (!departure || !departure.productId) return inquiry;
  const product = YOGA_RETREAT_PRODUCTS.find((item) => item.id === departure.productId);
  if (!product) return inquiry;
  return {
    ...inquiry,
    product: product.name,
    productId: product.id,
    location: departure.locationName,
    preferredDate: departure.startDate,
    month: departure.month,
    duration: product.id === 'yoga-rishikesh-weekend' ? 'Weekend' : `${product.durationDays} days`,
  };
}

function hasSpecificRishikeshProduct(inquiry: Inquiry): boolean {
  if (RISHIKESH_PRODUCT_IDS.has(selectedProductId(inquiry))) return true;
  if (inquiry.product === 'Other location' || inquiry.product === 'Not sure') return false;
  return normalizedLocation(inquiry) === 'rishikesh' && ['Weekend', '5 days', '7 days', '10 days'].includes(inquiry.duration);
}

function hasSpecificDeparture(inquiry: Inquiry): boolean {
  return Boolean(selectedDeparture(inquiry)) || Boolean(
    inquiry.departureId &&
    getRegisteredTrekDeparture(inquiry.departureId, inquiry.productId || inquiry.trek),
  );
}

function isCustomLocation(inquiry: Inquiry): boolean {
  return CUSTOM_LOCATIONS.has(normalizedLocation(inquiry));
}

function isExplicitCustomDemand(inquiry: Inquiry): boolean {
  return inquiry.product === 'Other location'
    || inquiry.category.toLowerCase().includes('custom')
    || (isCustomLocation(inquiry) && ['3–4', '3–5', '6+', '9+'].includes(inquiry.groupSize));
}

function productLabel(inquiry: Inquiry): string {
  if (isTtc(inquiry)) return YOGA_TTC_PRODUCT.name;
  const productId = selectedProductId(inquiry);
  const product = YOGA_RETREAT_PRODUCTS.find((item) => item.id === productId);
  if (product) return product.name;
  if (isCustomLocation(inquiry)) return `Custom Yoga Retreat in ${inquiry.location}`;
  return '';
}

function classifyYogaIntent(inquiry: Inquiry): YogaClassification {
  if (!isYogaInquiry(inquiry)) return '';
  if (isTtc(inquiry)) return 'TTC';
  if (isCustomLocation(inquiry) || inquiry.product === 'Other location') return 'Other location';
  const productId = selectedProductId(inquiry);
  if (productId === 'yoga-rishikesh-weekend' || inquiry.duration === 'Weekend') return 'Weekend';
  if (productId === 'yoga-rishikesh-5-day' || inquiry.duration === '5 days') return '5-Day';
  if (productId === 'yoga-rishikesh-7-day' || inquiry.duration === '7 days') return '7-Day';
  if (productId === 'yoga-rishikesh-10-day' || inquiry.duration === '10 days') return '10-Day';
  return 'Not sure';
}

function routeYogaIntent(inquiry: Inquiry): YogaSalesRoute {
  if (!isYogaInquiry(inquiry)) return '';
  if (isTtc(inquiry)) return 'TTC_SALES';
  if (hasSpecificDeparture(inquiry)) return 'RISHIKESH_DIRECT';
  if (isCustomLocation(inquiry) || inquiry.product === 'Other location') {
    return isExplicitCustomDemand(inquiry) ? 'CUSTOM_DEMAND' : 'RISHIKESH_ALTERNATIVE';
  }
  if (hasSpecificRishikeshProduct(inquiry)) return 'RISHIKESH_DIRECT';
  if (inquiry.yogaInterest === 'Not sure' || inquiry.product === 'Not sure' || (!inquiry.productId && !inquiry.duration && !inquiry.location)) return 'HELP_ME_CHOOSE';
  return 'HELP_ME_CHOOSE';
}

function getRecommendedProduct(inquiry: Inquiry, route: YogaSalesRoute): string {
  if (route === 'TTC_SALES') return YOGA_TTC_PRODUCT.name;
  if (route === 'HELP_ME_CHOOSE' && inquiry.yogaExperience === 'Beginner') return YOGA_RETREAT_PRODUCTS.find((product) => product.id === 'yoga-rishikesh-5-day')?.name ?? '';
  if (hasSpecificRishikeshProduct(inquiry)) return productLabel(inquiry);
  if (route === 'RISHIKESH_DIRECT') return productLabel(inquiry);
  if (route === 'CUSTOM_DEMAND' || route === 'RISHIKESH_ALTERNATIVE') return productLabel(inquiry);
  return YOGA_RETREAT_PRODUCTS.find((product) => product.id === 'yoga-rishikesh-5-day')?.name ?? '';
}

function getRecommendedAlternative(inquiry: Inquiry, route: YogaSalesRoute): string {
  if (route === 'RISHIKESH_ALTERNATIVE' || route === 'CUSTOM_DEMAND') {
    const durationProductId: Partial<Record<string, string>> = {
      Weekend: 'yoga-rishikesh-weekend',
      '5 days': 'yoga-rishikesh-5-day',
      '7 days': 'yoga-rishikesh-7-day',
      '10 days': 'yoga-rishikesh-10-day',
    };
    const alternativeId = durationProductId[inquiry.duration] ?? 'yoga-rishikesh-5-day';
    return YOGA_RETREAT_PRODUCTS.find((product) => product.id === alternativeId)?.name ?? YOGA_RETREAT_PRODUCTS[1].name;
  }
  return '';
}

export function getYogaLeadTier(score: number): LeadTier {
  if (score >= 75) return 'hot';
  if (score >= 50) return 'warm';
  if (score >= 25) return 'nurture';
  return 'early';
}

function addSignal(signals: string[], label: string, points: number) {
  if (points > 0) signals.push(`${label}(+${points})`);
}

function timingPoints(inquiry: Inquiry): number {
  const timing = `${inquiry.preferredTiming ?? ''} ${inquiry.planningHorizon} ${inquiry.month}`.toLowerCase();
  if (/\b(this month|within 30|0[–-]30 days?)\b/.test(timing)) return 20;
  if (/\b(next month|31[–-]60 days?)\b/.test(timing)) return 15;
  if (/\b(2[–-]3 months?|61[–-]90 days?|31[–-]90 days?)\b/.test(timing)) return 10;
  if (/\b(4[–-]6 months?|91[–-]180 days?)\b/.test(timing)) return 5;

  const monthName = inquiry.month.trim().toLowerCase();
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const requestedMonth = months.indexOf(monthName);
  if (requestedMonth >= 0) {
    const monthsAway = (requestedMonth - new Date().getMonth() + 12) % 12;
    if (monthsAway === 0) return 20;
    if (monthsAway === 1) return 15;
    if (monthsAway <= 3) return 10;
    if (monthsAway <= 6) return 5;
  }
  return 0;
}

function readinessPoints(inquiry: Inquiry): number {
  const readiness = `${inquiry.bookingReadiness} ${inquiry.experience ?? ''}`.toLowerCase();
  if (readiness.includes('ready to book')) return 20;
  if (readiness.includes('planning') || readiness.includes('likely') || readiness.includes('fairly ready')) return 15;
  if (readiness.includes('exploring') || readiness.includes('researching')) return 5;
  return 0;
}

function groupCount(groupSize: string): number {
  const match = groupSize.match(/\d+/g);
  if (!match) return 0;
  return Math.max(...match.map(Number));
}

function opportunityGroupPoints(groupSize: string): number {
  const range = groupSize.match(/^(\d+)\s*[–-]\s*(\d+)$/);
  if (range) {
    const upperBound = Number(range[2]);
    if (Number(range[1]) >= 10 || upperBound > 10) return 10;
    if (upperBound >= 6) return 8;
    if (upperBound >= 3) return 5;
    return 0;
  }

  const count = groupCount(groupSize);
  if (count >= 10) return 10;
  if (count >= 6) return 8;
  if (count >= 3) return 5;
  return 0;
}

export function routeInquiry(inquiry: Inquiry): string {
  const requestText = `${inquiry.interest ?? ''} ${inquiry.category} ${inquiry.additionalRequest ?? ''}`.toLowerCase();
  if (isTtc(inquiry)) return 'ttc';
  if (/\b(custom|private)\b/.test(requestText)) return 'custom_location';
  if (groupCount(inquiry.groupSize) >= 3 || /\b(group)\b/.test(requestText)) return 'group';
  if (inquiry.productId) return 'direct_product';
  if (inquiry.interestedIn === 'trek' || inquiry.vertical === 'trek') return 'trek';
  if (inquiry.yogaInterest || inquiry.vertical === 'yoga') return 'yoga';
  if (inquiry.vertical === 'art' || inquiry.category.toLowerCase().includes('art')) return 'art';
  if (isCustomLocation(inquiry)) return 'custom_location';
  return 'general';
}

function scoreUniversalInquiry(inquiry: Inquiry): LeadScore {
  const signals: string[] = [];
  let score = 0;
  const location = inquiry.destination || inquiry.location;
  const productPoints = inquiry.productId ? 20 : 0;
  const departurePoints = hasSpecificDeparture(inquiry) && Boolean(inquiry.departureDate) ? 15 : 0;
  const locationPoints = location ? 10 : 0;
  const genericInterest = inquiry.interest || inquiry.interestedIn || inquiry.yogaInterest;
  const genericInterestPoints = productPoints || departurePoints || locationPoints || !genericInterest ? 0 : 5;

  score += productPoints + departurePoints + locationPoints + genericInterestPoints;
  addSignal(signals, 'product', productPoints);
  addSignal(signals, 'verified_departure', departurePoints);
  addSignal(signals, 'location', locationPoints);
  addSignal(signals, 'generic_interest', genericInterestPoints);

  const timing = timingPoints(inquiry);
  const readiness = readinessPoints(inquiry);
  const durationPoints = inquiry.duration ? 5 : 0;
  const groupSpecificityPoints = inquiry.groupSize ? 5 : 0;
  const budgetPoints = inquiry.budget ? 5 : 0;
  const groupOpportunityPoints = opportunityGroupPoints(inquiry.groupSize);
  const customOpportunityPoints = /\b(custom|private|group)\b/i.test(`${inquiry.interest ?? ''} ${inquiry.category} ${inquiry.additionalRequest ?? ''}`) ? 10 : 0;

  score += timing + readiness + durationPoints + groupSpecificityPoints + budgetPoints + groupOpportunityPoints + customOpportunityPoints;
  addSignal(signals, 'timing', timing);
  addSignal(signals, 'readiness', readiness);
  addSignal(signals, 'duration', durationPoints);
  addSignal(signals, 'group_specificity', groupSpecificityPoints);
  addSignal(signals, 'budget', budgetPoints);
  addSignal(signals, 'group_opportunity', groupOpportunityPoints);
  addSignal(signals, 'custom_opportunity', customOpportunityPoints);

  score = Math.min(score, 100);
  const tier = getYogaLeadTier(score);
  const yogaSalesRoute = routeYogaIntent(inquiry);
  return {
    score,
    tier,
    signals,
    routing: routeInquiry(inquiry),
    yogaClassification: classifyYogaIntent(inquiry),
    yogaSalesRoute,
    recommendedProduct: getRecommendedProduct(inquiry, yogaSalesRoute),
    recommendedAlternative: getRecommendedAlternative(inquiry, yogaSalesRoute),
  };
}

export function classifyYogaInquiry(inquiry: Inquiry): YogaClassification {
  return isYogaInquiry(inquiry) ? classifyYogaIntent(inquiry) : '';
}

export function routeYogaInquiry(inquiry: Inquiry): YogaSalesRoute {
  return isYogaInquiry(inquiry) ? routeYogaIntent(inquiry) : '';
}

export function scoreInquiry(inquiry: Inquiry): LeadScore {
  return scoreUniversalInquiry(inquiry);
}
