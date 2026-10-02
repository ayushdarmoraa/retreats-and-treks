import type { Inquiry } from './inquiries';
import { RETREAT_PROGRAM_EVENTS, YOGA_RETREAT_PRODUCTS, YOGA_TTC_PRODUCT } from '../config/retreatProgramEvents';

export type LeadTier = 'Hot' | 'Warm' | 'Nurture' | 'Early' | 'hot' | 'warm' | 'cold' | 'unscored';
export type YogaClassification = 'Weekend' | '5-Day' | '7-Day' | '10-Day' | 'Other location' | 'TTC' | 'Not sure' | '';
export type YogaSalesRoute = 'RISHIKESH_DIRECT' | 'RISHIKESH_ALTERNATIVE' | 'CUSTOM_DEMAND' | 'TTC_SALES' | 'HELP_ME_CHOOSE' | '';

export interface LeadScore {
  score: number;
  tier: LeadTier;
  signals: string[];
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
  return Boolean(selectedDeparture(inquiry));
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
  if (score >= 75) return 'Hot';
  if (score >= 50) return 'Warm';
  if (score >= 25) return 'Nurture';
  return 'Early';
}

function addSignal(signals: string[], label: string, points: number) {
  if (points > 0) signals.push(`${label}(+${points})`);
}

function timingPoints(inquiry: Inquiry): number {
  if (['0–30 days', 'Within 30 days', '0-30 days'].includes(inquiry.planningHorizon)) return 20;
  if (['31–90 days', '31-90 days'].includes(inquiry.planningHorizon)) return 15;
  if (['91–180 days', '91-180 days'].includes(inquiry.planningHorizon)) return 10;
  return 0;
}

function readinessPoints(inquiry: Inquiry): number {
  if (inquiry.bookingReadiness === 'Ready to book') return 20;
  if (['Likely', 'Fairly ready'].includes(inquiry.bookingReadiness)) return 15;
  if (inquiry.bookingReadiness === 'Researching') return 5;
  return 0;
}

function groupPoints(groupSize: string): number {
  if (groupSize === '1' || groupSize === '2' || groupSize === '1–2') return 3;
  if (groupSize === '3–4' || groupSize === '3-4' || groupSize === '3–5' || groupSize === '3-5' || groupSize === '5') return 7;
  if (groupSize === '6+' || groupSize === '9+') return 10;
  return 0;
}

function budgetPoints(inquiry: Inquiry): number {
  if (!inquiry.budget || inquiry.budget === 'Not sure yet') return 0;
  const selectedId = selectedProductId(inquiry);
  const product = YOGA_RETREAT_PRODUCTS.find((item) => item.id === selectedId);
  const price = isTtc(inquiry) ? YOGA_TTC_PRODUCT.fee?.amount : product?.price;
  if (price === undefined) return 0;
  if (inquiry.budget === '₹15–30k') return price <= 30000 ? 10 : 0;
  if (inquiry.budget === '₹30–60k') return price >= 30000 && price <= 60000 ? 10 : 0;
  if (inquiry.budget === '₹60k+') return price >= 60000 ? 10 : 0;
  return 0;
}

function scoreYogaInquiry(inquiry: Inquiry): LeadScore {
  let score = 0;
  const signals: string[] = [];
  const route = routeYogaIntent(inquiry);
  const classification = classifyYogaIntent(inquiry);

  const intentPoints = hasSpecificRishikeshProduct(inquiry) ? 20 : isTtc(inquiry) ? 20 : isCustomLocation(inquiry) || inquiry.product === 'Other location' ? 15 : inquiry.yogaInterest === 'Not sure' || inquiry.product === 'Not sure' ? 5 : 0;
  score += intentPoints;
  addSignal(signals, `intent:${classification || 'Not sure'}`, intentPoints);

  const departurePoints = hasSpecificDeparture(inquiry) ? 15 : 0;
  score += departurePoints;
  addSignal(signals, 'specific_departure', departurePoints);

  const timing = timingPoints(inquiry);
  score += timing;
  addSignal(signals, `timing:${inquiry.planningHorizon || 'unknown'}`, timing);

  const readiness = readinessPoints(inquiry);
  score += readiness;
  addSignal(signals, `readiness:${inquiry.bookingReadiness || 'unknown'}`, readiness);

  const duration = inquiry.duration && inquiry.duration !== 'Flexible' && inquiry.duration !== '28 days-TTC' ? 10 : 0;
  score += duration;
  addSignal(signals, 'specific_duration', duration);

  const experience = inquiry.yogaExperience === 'Beginner' ? 5 : ['Some experience', 'Experienced'].includes(inquiry.yogaExperience) ? 7 : 0;
  score += experience;
  addSignal(signals, `experience:${inquiry.yogaExperience || 'unknown'}`, experience);

  const group = groupPoints(inquiry.groupSize);
  score += group;
  addSignal(signals, `group_size:${inquiry.groupSize || 'unknown'}`, group);

  const budget = budgetPoints(inquiry);
  score += budget;
  addSignal(signals, `budget:${inquiry.budget || 'unknown'}`, budget);

  score = Math.min(score, 100);
  const recommendedProduct = getRecommendedProduct(inquiry, route);
  return {
    score,
    tier: getYogaLeadTier(score),
    signals,
    yogaClassification: classification,
    yogaSalesRoute: route,
    recommendedProduct,
    recommendedAlternative: getRecommendedAlternative(inquiry, route),
  };
}

function scoreLegacyInquiry(inquiry: Inquiry): LeadScore {
  let score = 0;
  const signals: string[] = [];
  const groupMap: Record<string, number> = { '1': 5, '2': 10, '3–4': 18, '5–8': 25, '9+': 30 };
  const budgetMap: Record<string, number> = { '₹15–30k': 8, '₹30–60k': 15, '₹60k+': 20, 'Not sure yet': 3 };
  const group = groupMap[inquiry.groupSize] ?? 0;
  const budget = budgetMap[inquiry.budget] ?? 0;
  if (group) { score += group; signals.push(`group_size:${inquiry.groupSize}(+${group})`); }
  if (inquiry.location) { score += 10; signals.push(`location:${inquiry.location}(+10)`); }
  if (inquiry.month) { score += 15; signals.push(`month:${inquiry.month}(+15)`); }
  if (inquiry.interestedIn === 'retreat') { score += 10; signals.push('vertical:retreat(+10)'); }
  else if (inquiry.interestedIn === 'trek') { score += 5; signals.push('vertical:trek(+5)'); }
  if (budget) { score += budget; signals.push(`budget:${inquiry.budget}(+${budget})`); }
  const premiumCategories = ['luxury', 'private', 'premium'];
  const highIntentCategories = ['seasonal', 'near-delhi', 'weekend'];
  if (premiumCategories.includes(inquiry.category)) { score += 15; signals.push(`category:${inquiry.category}(+15:premium)`); }
  else if (highIntentCategories.includes(inquiry.category)) { score += 8; signals.push(`category:${inquiry.category}(+8:high_intent)`); }
  else if (inquiry.category) { score += 3; signals.push(`category:${inquiry.category}(+3)`); }
  if (inquiry.source.includes('/journeys/')) { score += 12; signals.push('source:journey_page(+12)'); }
  else if (inquiry.source.includes('/retreats/') || inquiry.source.includes('/treks/')) { score += 7; signals.push('source:pillar_page(+7)'); }
  else if (inquiry.source.includes('/compare/')) { score += 10; signals.push('source:comparison_page(+10)'); }
  else if (inquiry.source === '/' || inquiry.source.includes('/blog/')) { score += 2; signals.push('source:top_funnel(+2)'); }
  score = Math.min(score, 100);
  if (inquiry.yogaInterest) signals.push(`yoga_interest:${inquiry.yogaInterest}`);
  if (inquiry.yogaInterest && inquiry.phone.trim()) signals.push('yoga_contact_number:provided');
  if (inquiry.duration) signals.push(`duration:${inquiry.duration}`);
  if (inquiry.preferredDate) signals.push(`preferred_date:${inquiry.preferredDate}`);
  if (inquiry.yogaExperience) signals.push(`yoga_experience:${inquiry.yogaExperience}`);
  if (inquiry.bookingReadiness) signals.push(`booking_readiness:${inquiry.bookingReadiness}`);
  const tier: LeadTier = score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold';
  return { score, tier, signals, yogaClassification: '', yogaSalesRoute: '', recommendedProduct: '', recommendedAlternative: '' };
}

export function classifyYogaInquiry(inquiry: Inquiry): YogaClassification {
  return isYogaInquiry(inquiry) ? classifyYogaIntent(inquiry) : '';
}

export function routeYogaInquiry(inquiry: Inquiry): YogaSalesRoute {
  return isYogaInquiry(inquiry) ? routeYogaIntent(inquiry) : '';
}

export function scoreInquiry(inquiry: Inquiry): LeadScore {
  return isYogaInquiry(inquiry) ? scoreYogaInquiry(inquiry) : scoreLegacyInquiry(inquiry);
}
