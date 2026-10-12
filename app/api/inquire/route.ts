/**
 * Inquiry Submission API — POST /api/inquire
 *
 * Keeps legacy enquiry fields optional while enriching valid requests with
 * server-verified context, scoring, routing, persistence, and conversion data.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateIdempotencyKey,
  insertInquiry,
  normalizeCanonicalLeadTier,
  type Inquiry,
} from '@/lib/inquiries';
import { sendInquiryEmails } from '@/lib/email';
import { logConversionEvent, type ConversionEvent } from '@/lib/conversion-events';
import { isBotUserAgent, isGlobalRateLimited, isRateLimited, hashIp } from '@/lib/rate-limit';
import { routeInquiry, scoreInquiry } from '@/lib/lead-scoring';
import { InquirySchema, YogaDurationEnum, YogaExperienceEnum } from '@/lib/schemas';
import { canonicalPageTypeFromPath, resolveConversionContext } from '@/lib/conversion-foundation';
import { ALL_TREKS } from '@/content/treks';
import { ALL_RETREAT_FORMATS } from '@/content/retreats';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import { getLocation } from '@/config/locations';
import { RETREAT_PROGRAM_EVENTS, YOGA_RETREAT_PRODUCTS, YOGA_TTC_PRODUCT } from '@/config/retreatProgramEvents';
import { getRegisteredTrekDeparture } from '@/config/departures';
import type { LeadTier } from '@/lib/lead-scoring';

export const runtime = 'nodejs';

const MIN_FILL_TIME_MS = 2_000;
const BASE_URL = 'https://www.retreatsandtreks.com';
const ART_RETREAT_SERVICE_SLUGS = new Set([
  'art-and-creative',
  'trek-and-paint',
  'weekend-art-retreat',
]);

interface PersistedInquiry {
  status: 'inserted' | 'duplicate' | 'conflict';
  inquiryId: string;
  leadReference: string | null;
}

interface InquireDependencies {
  insertInquiry: typeof insertInquiry;
  sendInquiryEmails: typeof sendInquiryEmails;
  logConversionEvent: typeof logConversionEvent;
  now: () => number;
  isRateLimited: typeof isRateLimited;
  isGlobalRateLimited: typeof isGlobalRateLimited;
  isBotUserAgent: typeof isBotUserAgent;
}

type ProductContext = {
  id: string;
  name: string;
  vertical: string;
  category: string;
  locationId?: string;
  duration?: string;
};

type ResolvedDeparture = {
  kind: 'program' | 'trek';
  slug: string;
  productId?: string;
  serviceSlug: string;
  locationId: string;
  locationName: string;
  label: string;
  startDate: string;
  endDate: string;
  month: string;
  durationDays: number;
};

const defaultDependencies: InquireDependencies = {
  insertInquiry,
  sendInquiryEmails,
  logConversionEvent,
  now: Date.now,
  isRateLimited,
  isGlobalRateLimited,
  isBotUserAgent,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

function getSourcePath(source: string): string {
  try {
    return new URL(source || '/', BASE_URL).pathname || '/';
  } catch {
    return '/';
  }
}

function getProductContext(id: string): ProductContext | undefined {
  if (id === YOGA_TTC_PRODUCT.id) {
    return {
      id: YOGA_TTC_PRODUCT.id,
      name: YOGA_TTC_PRODUCT.name,
      vertical: 'yoga',
      category: 'ttc',
    };
  }

  const yogaProduct = YOGA_RETREAT_PRODUCTS.find((product) => product.id === id);
  if (yogaProduct) {
    return {
      id: yogaProduct.id,
      name: yogaProduct.name,
      vertical: 'yoga',
      category: 'yoga',
      locationId: yogaProduct.locationId,
      duration: `${yogaProduct.durationDays} days`,
    };
  }

  const trek = ALL_TREKS.find((item) => item.slug === id);
  if (trek) {
    return {
      id: trek.slug,
      name: trek.title,
      vertical: 'trek',
      category: trek.trekType,
      locationId: trek.locationId,
      duration: trek.duration,
    };
  }

  const retreat = ALL_RETREAT_FORMATS.find((item) => item.slug === id);
  if (retreat) {
    const vertical = retreat.retreatType === 'Yoga' ? 'yoga' : retreat.retreatType === 'Art' ? 'art' : 'retreat';
    return {
      id: retreat.slug,
      name: retreat.title,
      vertical,
      category: retreat.retreatType,
      locationId: retreat.locationId,
      duration: retreat.duration,
    };
  }

  if (ART_RETREAT_SERVICE_SLUGS.has(id)) {
    const artService = getRetreatServiceBySlug(id);
    if (artService) {
      return {
        id: artService.slug,
        name: artService.title,
        vertical: 'art',
        category: artService.slug,
      };
    }
  }
}

function getProductFromPath(path: string): ProductContext | undefined {
  const segments = path.split('/').filter(Boolean);
  if (path === '/yoga-teacher-training') return getProductContext(YOGA_TTC_PRODUCT.id);
  if (segments[0] === 'treks') {
    const trek = ALL_TREKS.find((item) => segments.includes(item.slug));
    return trek ? getProductContext(trek.slug) : undefined;
  }
  if (segments[0] === 'retreats' || segments[0] === 'journeys') {
    const retreat = ALL_RETREAT_FORMATS.find((item) => segments.includes(item.slug));
    return retreat ? getProductContext(retreat.slug) : undefined;
  }
}

function resolveProduct(input: {
  path: string;
  productId: string;
  trek: string;
  departureId: string;
}): { product?: ProductContext; departure?: ResolvedDeparture } {
  const routeProduct = getProductFromPath(input.path);
  const suppliedProduct = getProductContext(input.productId) ?? getProductContext(input.trek);
  const trekDeparture = input.departureId
    ? getRegisteredTrekDeparture(input.departureId, input.productId || input.trek || routeProduct?.id)
    : undefined;
  const candidateDeparture = RETREAT_PROGRAM_EVENTS.find((event) =>
    event.slug === input.departureId &&
    (ART_RETREAT_SERVICE_SLUGS.has(event.serviceSlug)
      ? event.endDate >= new Date().toISOString().slice(0, 10)
      : event.startDate >= new Date().toISOString().slice(0, 10)),
  );
  const isArtDeparture = Boolean(
    candidateDeparture &&
    ART_RETREAT_SERVICE_SLUGS.has(candidateDeparture.serviceSlug),
  );
  const departure: ResolvedDeparture | undefined = trekDeparture
    ? {
      kind: 'trek',
      slug: trekDeparture.id,
      productId: trekDeparture.trek.slug,
      serviceSlug: trekDeparture.trek.slug,
      locationId: suppliedProduct?.locationId || routeProduct?.locationId || '',
      locationName: getLocation(suppliedProduct?.locationId || routeProduct?.locationId || '')?.name || '',
      label: `${trekDeparture.trek.trekName} — ${trekDeparture.departure.dateRange}`,
      startDate: trekDeparture.departure.startDate,
      endDate: trekDeparture.departure.endDate,
      month: trekDeparture.departure.startDate.slice(5, 7),
      durationDays: Number.parseInt(trekDeparture.trek.duration, 10) || 0,
    }
    : candidateDeparture && (candidateDeparture.productId || isArtDeparture)
      ? { ...candidateDeparture, kind: 'program' }
      : undefined;
  const departureProduct = isArtDeparture && departure
    ? getProductContext(departure.serviceSlug) ?? {
      id: departure.serviceSlug,
      name: departure.label,
      vertical: 'art',
      category: departure.serviceSlug,
      ...(departure.locationName !== 'TBA' ? { locationId: departure.locationId } : {}),
      duration: `${departure.durationDays} days`,
    }
    : departure?.productId
      ? getProductContext(departure.productId)
      : undefined;
  const product = routeProduct ?? suppliedProduct ?? departureProduct;

  if (departure && product && (
    departure.productId === product.id ||
    (isArtDeparture && departure.serviceSlug === product.id)
  )) {
    return { product, departure };
  }
  return { product };
}

function resolveLocation(
  locationId: string,
  destination: string,
  location: string,
  product?: ProductContext,
  departure?: ResolvedDeparture,
) {
  const isUnlocatedArtDeparture = Boolean(
    departure &&
    ART_RETREAT_SERVICE_SLUGS.has(departure.serviceSlug) &&
    departure.locationName === 'TBA',
  );
  const productLocation = !isUnlocatedArtDeparture && product?.locationId
    ? getLocation(product.locationId)
    : undefined;
  if (departure && ART_RETREAT_SERVICE_SLUGS.has(departure.serviceSlug) && departure.locationName !== 'TBA') {
    return getLocation(departure.locationId) ?? productLocation;
  }
  if (productLocation) return productLocation;

  const suppliedLocation = [locationId, destination, location]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .map((value) => getLocation(value) ?? undefined)
    .find(Boolean);
  return suppliedLocation;
}

function pageVertical(path: string): string {
  const pageType = canonicalPageTypeFromPath(path);
  if (pageType.startsWith('trek_')) return 'trek';
  if (pageType.startsWith('yoga_')) return 'yoga';
  if (pageType.startsWith('art_')) return 'art';
  if (pageType.startsWith('retreat_')) return 'retreat';
  return '';
}

function normalizeGroupSize(value: string): string {
  const candidate = value.trim();
  const match = candidate.match(/^(\d{1,2})(?:\s*[–-]\s*(\d{1,2})|\+)?$/);
  if (!match) return '';
  if (match[2] && Number(match[2]) < Number(match[1])) return '';
  return candidate;
}

function conversionFields(context: ReturnType<typeof resolveConversionContext>) {
  const field = (key: string) => {
    const value = context.attribution.firstUtm?.[key as keyof typeof context.attribution.firstUtm];
    return typeof value === 'string' ? value : undefined;
  };
  const lastField = (key: string) => {
    const value = context.attribution.lastUtm?.[key as keyof typeof context.attribution.lastUtm];
    return typeof value === 'string' ? value : undefined;
  };

  return {
    conversionSessionId: context.attribution.conversionSessionId,
    firstLandingPage: context.attribution.firstLandingPage,
    lastLandingPage: context.attribution.lastLandingPage,
    pageTitle: context.page.title,
    pageType: context.page.type,
    ctaId: context.cta.id,
    ctaPosition: context.cta.position,
    ctaLabel: context.cta.label,
    ctaVariant: context.cta.variant,
    referrer: context.attribution.referrer,
    firstUtmSource: field('utm_source'),
    firstUtmMedium: field('utm_medium'),
    firstUtmCampaign: field('utm_campaign'),
    firstUtmTerm: field('utm_term'),
    firstUtmContent: field('utm_content'),
    firstUtmId: field('utm_id'),
    lastUtmSource: lastField('utm_source'),
    lastUtmMedium: lastField('utm_medium'),
    lastUtmCampaign: lastField('utm_campaign'),
    lastUtmTerm: lastField('utm_term'),
    lastUtmContent: lastField('utm_content'),
    lastUtmId: lastField('utm_id'),
    firstTouchAt: context.attribution.firstTouchAt,
    lastTouchAt: context.attribution.lastTouchAt,
  };
}

function writeEventBestEffort(
  dependencies: InquireDependencies,
  event: ConversionEvent,
): Promise<void> {
  return dependencies.logConversionEvent(event).catch(() => {
    console.error(`[API:Inquire] Conversion event write failed: ${event.eventType}`);
  });
}

export function createInquirePostHandler(
  overrides: Partial<InquireDependencies> = {},
): (request: NextRequest) => Promise<NextResponse> {
  const dependencies = { ...defaultDependencies, ...overrides };

  return async function POST(request: NextRequest): Promise<NextResponse> {
    const ipHash = hashIp(getClientIp(request));
    const userAgent = request.headers.get('user-agent') || '';
    let parsedBody: unknown;

    try {
      parsedBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, code: 'invalid_request', error: 'Request body must be valid JSON.' },
        { status: 400 },
      );
    }

    if (!isRecord(parsedBody)) {
      return NextResponse.json(
        { success: false, code: 'invalid_request', error: 'Request body must be a JSON object.' },
        { status: 400 },
      );
    }

    const rawSource = typeof parsedBody.source === 'string' ? parsedBody.source : '';
    const validation = InquirySchema.safeParse({
      ...parsedBody,
      additionalRequest: parsedBody.additionalRequest || parsedBody.message || parsedBody.enquiry,
    });
    if (!validation.success) {
      const issue = validation.error.issues[0];
      void writeEventBestEffort(dependencies, {
        eventType: 'inquiry_validation_failed',
        sourceUrl: rawSource,
        ipHash,
        meta: { field: issue?.path.join('.') || 'unknown', message: issue?.message || 'Invalid input' },
      });
      return NextResponse.json(
        { success: false, code: 'validation_error', error: issue?.message || 'Invalid input.' },
        { status: 400 },
      );
    }

    const body = validation.data;
    if (dependencies.isBotUserAgent(userAgent) || body.website?.trim()) {
      void writeEventBestEffort(dependencies, {
        eventType: 'inquiry_spam_blocked',
        sourceUrl: body.source,
        ipHash,
        userAgent,
        meta: { reason: body.website?.trim() ? 'honeypot' : 'bot_ua' },
      });
      return NextResponse.json(
        { success: false, code: 'spam_rejected', error: 'Unable to process this enquiry.' },
        { status: 403 },
      );
    }

    const formLoadedAt = Number(body._t) || 0;
    if (formLoadedAt > 0 && Date.now() - formLoadedAt < MIN_FILL_TIME_MS) {
      void writeEventBestEffort(dependencies, {
        eventType: 'inquiry_spam_blocked',
        sourceUrl: body.source,
        ipHash,
        userAgent,
        meta: { reason: 'too_fast' },
      });
      return NextResponse.json(
        { success: false, code: 'spam_rejected', error: 'Unable to process this enquiry.' },
        { status: 403 },
      );
    }

    if (dependencies.isGlobalRateLimited() || dependencies.isRateLimited(ipHash, 5, 60_000)) {
      void writeEventBestEffort(dependencies, {
        eventType: 'inquiry_spam_blocked',
        sourceUrl: body.source,
        ipHash,
        userAgent,
        meta: { reason: 'rate_limit' },
      });
      return NextResponse.json(
        { success: false, code: 'rate_limited', error: 'Too many requests. Please wait a minute.' },
        { status: 429 },
      );
    }

    const sourcePath = getSourcePath(body.source);
    const { product, departure } = resolveProduct({
      path: sourcePath,
      productId: body.productId,
      trek: body.trek,
      departureId: body.departureId,
    });
    const isArtDeparture = Boolean(departure && ART_RETREAT_SERVICE_SLUGS.has(departure.serviceSlug));
    const isArtPage = pageVertical(sourcePath) === 'art';
    const location = resolveLocation(body.locationId || '', body.destination || '', body.location, product, departure);
    const isYogaFinderContext = sourcePath.replace(/\/+$/, '') === '/find-your-retreat'
      && body.vertical === 'yoga'
      && body.category === 'yoga-finder';
    const vertical = product?.vertical || pageVertical(sourcePath) || (isYogaFinderContext ? 'yoga' : '');
    const category = isArtDeparture
      ? departure?.serviceSlug || ''
      : isArtPage && ART_RETREAT_SERVICE_SLUGS.has(body.category)
        ? body.category
        : product?.category || (isYogaFinderContext ? 'yoga-finder' : '');
    const experienceOptions = new Set<string>([
      ...YogaExperienceEnum.options,
      ...ALL_TREKS.map((trek) => trek.difficulty),
      'Intermediate',
      'Advanced',
    ]);
    const experience = experienceOptions.has(body.experience || '')
      ? body.experience
      : experienceOptions.has(body.yogaExperience)
        ? body.yogaExperience
        : '';
    const validDurations = new Set<string>([
      ...YogaDurationEnum.options,
      ...ALL_TREKS.map((trek) => trek.duration),
      ...ALL_RETREAT_FORMATS.map((retreat) => retreat.duration),
    ]);
    const duration = isArtDeparture && departure
      ? `${departure.durationDays} days`
      : product?.duration || (validDurations.has(body.duration) ? body.duration : '');
    const groupSize = normalizeGroupSize(body.groupSize);

    const context = resolveConversionContext({
      pagePath: sourcePath,
      pageType: isYogaFinderContext ? 'finder' : isArtDeparture ? 'art_product' : undefined,
      pageTitle: product?.name || body.pageTitle,
      vertical,
      category,
      ctaId: body.ctaId,
      ctaLabel: body.ctaLabel,
      ctaPosition: body.ctaPosition,
      ctaVariant: body.ctaVariant,
      productId: product?.id,
      productName: product?.name,
      experience,
      locationId: location?.id,
      locationName: location?.name,
      duration,
      departureId: departure?.slug,
      departureDate: departure?.startDate,
      conversionSessionId: body.conversionSessionId,
      attribution: {
        firstLandingPage: body.firstLandingPage,
        lastLandingPage: body.lastLandingPage,
        referrer: body.referrer,
        firstUtm: body.firstUtm,
        lastUtm: body.lastUtm,
        firstTouchAt: body.firstTouchAt,
        lastTouchAt: body.lastTouchAt,
      },
    });

    const inquiry: Inquiry = {
      name: body.name,
      email: body.email || null,
      phone: body.phone,
      age: body.age === undefined ? null : Number(body.age),
      originCity: body.originCity || null,
      originCountry: body.originCountry || null,
      interest: body.interest || body.interestedIn || body.yogaInterest || null,
      preferredTiming: body.preferredTiming || body.planningHorizon || body.month || null,
      destination: context.location.name || null,
      departure: departure?.slug || null,
      departureDate: departure?.startDate || null,
      additionalRequest: body.additionalRequest || null,
      yogaInterest: body.yogaInterest,
      product: context.product.name || '',
      productId: context.product.id || '',
      departureId: context.departure.id || '',
      planningHorizon: body.planningHorizon,
      interestedIn: body.interestedIn,
      location: context.location.name || '',
      month: body.month,
      preferredDate: departure?.startDate || body.preferredDate,
      groupSize,
      budget: body.budget,
      duration: context.duration || '',
      yogaExperience: body.yogaExperience,
      experience,
      bookingReadiness: body.bookingReadiness,
      yogaClassification: '',
      yogaSalesRoute: '',
      recommendedProduct: '',
      recommendedAlternative: '',
      source: body.source,
      vertical: context.page.vertical || '',
      category: context.page.category || '',
      trek: product?.vertical === 'trek' ? product.id : '',
      timestamp: new Date().toISOString(),
      ...conversionFields(context),
    };

    const leadIntelligence = scoreInquiry(inquiry);
    inquiry.yogaClassification = leadIntelligence.yogaClassification;
    inquiry.yogaSalesRoute = leadIntelligence.yogaSalesRoute;
    inquiry.recommendedProduct = leadIntelligence.recommendedProduct;
    inquiry.recommendedAlternative = leadIntelligence.recommendedAlternative;
    inquiry.canonicalLeadTier = normalizeCanonicalLeadTier(leadIntelligence.tier) ?? undefined;
    inquiry.salesRoute = leadIntelligence.routing;
    inquiry.idempotencyKey = body.submissionToken
      ? `client:${body.submissionToken.toLowerCase()}`
      : generateIdempotencyKey(inquiry, dependencies.now());

    const requiredSubmissionEvents: ConversionEvent[] = [
      {
        eventType: 'lead_submitted',
        conversionSessionId: inquiry.conversionSessionId,
        sourceUrl: inquiry.source,
        pagePath: context.page.path,
        pageType: context.page.type,
        vertical: inquiry.vertical,
        category: inquiry.category,
        ctaId: inquiry.ctaId,
        ctaPosition: inquiry.ctaPosition,
        ctaLabel: inquiry.ctaLabel,
        ctaVariant: inquiry.ctaVariant,
        ipHash,
        userAgent,
        meta: {
          lead_score: leadIntelligence.score,
          lead_tier: leadIntelligence.tier,
          routing: leadIntelligence.routing,
          product_id: inquiry.productId,
          departure_id: inquiry.departureId,
          destination: inquiry.destination,
          duration: inquiry.duration,
          group_size: inquiry.groupSize,
          page_path: context.page.path,
        },
      },
      {
        eventType: 'inquiry_submitted',
        conversionSessionId: inquiry.conversionSessionId,
        sourceUrl: inquiry.source,
        pagePath: context.page.path,
        pageType: context.page.type,
        vertical: inquiry.vertical,
        category: inquiry.category,
        ctaId: inquiry.ctaId,
        ctaPosition: inquiry.ctaPosition,
        ctaLabel: inquiry.ctaLabel,
        ctaVariant: inquiry.ctaVariant,
        ipHash,
        userAgent,
        meta: { lead_tier: leadIntelligence.tier },
      },
    ];

    let persisted: PersistedInquiry;
    try {
      persisted = await dependencies.insertInquiry(
        inquiry,
        leadIntelligence.score,
        leadIntelligence.tier,
        requiredSubmissionEvents,
      );
    } catch {
      console.error('[API:Inquire] Lead persistence failed');
      return NextResponse.json(
        { success: false, code: 'persistence_error', error: 'Unable to save your enquiry. Please try again.' },
        { status: 500 },
      );
    }

    if (persisted.status === 'duplicate') {
      inquiry.leadReference = persisted.leadReference;
      return NextResponse.json({
        success: true,
        duplicate: true,
        ...(persisted.leadReference ? { leadReference: persisted.leadReference } : {}),
      });
    }
    if (persisted.status === 'conflict') {
      return NextResponse.json(
        {
          success: false,
          code: 'idempotency_conflict',
          error: 'This enquiry changed after submission. Please submit the updated details again.',
        },
        { status: 409 },
      );
    }

    inquiry.leadReference = persisted.leadReference;
    void dependencies.sendInquiryEmails(
      inquiry,
      leadIntelligence.tier as LeadTier,
      leadIntelligence.score,
      routeInquiry(inquiry),
    ).then((emailResult) => writeEventBestEffort(dependencies, {
      eventType: emailResult.sent ? 'inquiry_email_sent' : 'inquiry_email_failed',
      inquiryId: persisted.inquiryId,
      sourceUrl: inquiry.source,
      meta: emailResult.error ? { reason: 'send_failed' } : undefined,
    })).catch(() => {
      console.error('[API:Inquire] Notification dispatch failed');
      void writeEventBestEffort(dependencies, {
        eventType: 'inquiry_email_failed',
        inquiryId: persisted.inquiryId,
        sourceUrl: inquiry.source,
      });
    });

    return NextResponse.json({
      success: true,
      ...(persisted.leadReference ? { leadReference: persisted.leadReference } : {}),
    });
  };
}

export const POST = createInquirePostHandler();
