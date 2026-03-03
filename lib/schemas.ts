/**
 * Zod Validation Schemas — Single source of truth
 *
 * All API input validation runs through these schemas.
 * Types are inferred from schemas — no separate interface needed.
 */

import { z } from 'zod/v4';

// ── Shared enums ────────────────────────────────────────────

export const LeadTierEnum = z.enum(['hot', 'warm', 'cold', 'unscored']);
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
    .email('Valid email is required')
    .max(320, 'Email too long'),
  interestedIn: InterestEnum.optional().default(''),
  location: z.string().trim().max(200).optional().default(''),
  month: z.string().trim().max(50).optional().default(''),
  groupSize: z.string().trim().max(20).optional().default(''),
  budget: BudgetEnum.optional().default(''),
  source: z.string().trim().max(500).optional().default(''),
  vertical: z.string().trim().max(50).optional().default(''),
  category: z.string().trim().max(100).optional().default(''),
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
