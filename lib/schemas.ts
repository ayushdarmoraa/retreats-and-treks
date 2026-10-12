/**
 * Zod Validation Schemas — Single source of truth
 *
 * All API input validation runs through these schemas.
 * Types are inferred from schemas — no separate interface needed.
 */

import { z } from 'zod/v4';

// ── Shared enums ────────────────────────────────────────────

export const LeadTierEnum = z.enum(['Hot', 'Warm', 'Nurture', 'Early', 'hot', 'warm', 'cold', 'unscored']);
export const LeadStatusEnum = z.enum(['open', 'replied', 'closed', 'booked']);
export const InterestEnum = z.enum(['trek', 'retreat', '']);
export const VerticalEnum = z.enum(['retreat', 'trek', '']);

export const BudgetEnum = z.enum([
  '',
  '₹15–30k',
  '₹30–60k',
  '₹60k+',
  'Not sure yet',
]);

export const YogaInterestEnum = z.enum(['', 'Yoga Retreat', 'Yoga TTC', 'Not sure']);
export const YogaDurationEnum = z.enum(['', 'Weekend', '5 days', '7 days', '10 days', '28 days-TTC', 'Flexible']);
export const YogaExperienceEnum = z.enum(['', 'Beginner', 'Some experience', 'Experienced', 'Teacher']);
export const BookingReadinessEnum = z.enum(['', 'Exploring', 'Planning', 'Ready to book', 'Likely', 'Fairly ready', 'Researching']);

// ── Inquiry submission schema ───────────────────────────────

export const InquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(200, 'Name too long'),
  email: z
    .string()
    .trim()
    .max(320, 'Email too long')
    .email('Enter a valid email address')
    .or(z.literal(''))
    .optional()
    .default(''),
  phone: z
    .string()
    .trim()
    .min(1, 'WhatsApp number is required')
    .max(20, 'Phone too long'),
  yogaInterest: YogaInterestEnum.optional().default(''),
  product: z.string().trim().max(200).optional().default(''),
  productId: z.string().trim().max(100).optional().default(''),
  departureId: z.string().trim().max(150).optional().default(''),
  planningHorizon: z.string().trim().max(50).optional().default(''),
  interestedIn: InterestEnum.optional().default(''),
  location: z.string().trim().max(200).optional().default(''),
  month: z.string().trim().max(50).optional().default(''),
  preferredDate: z.string().trim().max(100).optional().default(''),
  groupSize: z.string().trim().max(20).optional().default(''),
  budget: BudgetEnum.optional().default(''),
  duration: z.string().trim().max(100).optional().default(''),
  yogaExperience: YogaExperienceEnum.optional().default(''),
  experience: z.string().trim().max(100).optional().default(''),
  bookingReadiness: BookingReadinessEnum.optional().default(''),
  source: z.string().trim().max(500).optional().default(''),
  vertical: z.string().trim().max(50).optional().default(''),
  category: z.string().trim().max(100).optional().default(''),
  trek: z.string().trim().max(100).optional().default(''),
  age: z.union([
    z.number().int().min(0).max(120),
    z.string().trim().regex(/^\d{1,3}$/),
  ]).optional(),
  originCity: z.string().trim().max(200).optional(),
  originCountry: z.string().trim().max(100).optional(),
  interest: z.string().trim().max(200).optional(),
  preferredTiming: z.string().trim().max(100).optional(),
  destination: z.string().trim().max(200).optional(),
  departure: z.string().trim().max(200).optional(),
  departureDate: z.string().trim().max(100).optional(),
  additionalRequest: z.string().trim().max(4000).optional(),
  message: z.string().trim().max(4000).optional(),
  enquiry: z.string().trim().max(4000).optional(),
  locationId: z.string().trim().max(100).optional(),
  pageTitle: z.string().trim().max(300).optional(),
  conversionSessionId: z.string().trim().max(200).optional(),
  firstLandingPage: z.string().trim().max(500).optional(),
  lastLandingPage: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(1000).optional(),
  firstUtm: z.record(z.string(), z.string()).optional(),
  lastUtm: z.record(z.string(), z.string()).optional(),
  firstTouchAt: z.string().datetime({ offset: true }).optional(),
  lastTouchAt: z.string().datetime({ offset: true }).optional(),
  ctaId: z.string().trim().max(200).optional(),
  ctaLabel: z.string().trim().max(200).optional(),
  ctaPosition: z.string().trim().max(100).optional(),
  ctaVariant: z.string().trim().max(100).optional(),
  website: z.string().optional(),
  submissionToken: z.string().uuid().optional(),
  _t: z.union([z.number(), z.string()]).optional(),
}).superRefine((inquiry, context) => {
  const phone = inquiry.phone ?? '';
  const digits = phone.replace(/\D/g, '');
  if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    context.addIssue({ code: 'custom', path: ['phone'], message: 'Enter a valid international phone number' });
  }
});

export type InquiryInput = z.infer<typeof InquirySchema>;

// ── Status update schema ────────────────────────────────────

export const StatusUpdateSchema = z.object({
  status: LeadStatusEnum,
});

export type StatusUpdateInput = z.infer<typeof StatusUpdateSchema>;

// ── Leads query params schema ───────────────────────────────

export const LeadsQuerySchema = z.object({
  tier: z.string().optional(),
  status: z.string().optional(),
  vertical: z.string().optional(),
  q: z.string().max(200).optional(),
  sort: z.enum(['score', 'date']).optional().default('date'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
});

export type LeadsQueryInput = z.infer<typeof LeadsQuerySchema>;

// ── UUID param schema ───────────────────────────────────────

export const UUIDSchema = z.string().uuid('Invalid ID format');
