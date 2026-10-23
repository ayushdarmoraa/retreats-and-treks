import {
  type ConversionContext,
  type ConversionContextInput,
  resolveConversionContext,
} from './conversion-foundation';

export const DEFAULT_WHATSAPP_NUMBER = '+91 9760446101';

export interface BuildWhatsAppUrlOptions {
  destination?: string;
  context?: Partial<ConversionContext> | ConversionContextInput;
  message?: string;
  leadReference?: string;
  includeLeadReference?: boolean;
  groupSize?: string;
  timing?: string;
  name?: string;
  phone?: string;
  email?: string;
  retreatContext?: string;
  additionalNotes?: string;
}

function normalizePhoneNumber(value?: string): string {
  const source = (value ?? DEFAULT_WHATSAPP_NUMBER).replace(/\s+/g, '').replace(/[^\d+]/g, '');
  return source.replace(/^\+/, '');
}

function buildCustomerMessage({
  context,
  message,
  leadReference,
  groupSize,
  timing,
  name,
  phone,
  email,
  retreatContext,
  additionalNotes,
}: Pick<BuildWhatsAppUrlOptions, 'context' | 'message' | 'leadReference' | 'groupSize' | 'timing' | 'name' | 'phone' | 'email' | 'retreatContext' | 'additionalNotes'>): string {
  const resolvedContext = context
    ? ('page' in context && 'cta' in context && 'attribution' in context
        ? context
        : resolveConversionContext(context as ConversionContextInput))
    : resolveConversionContext();

  const product = resolvedContext.product?.name;
  const location = resolvedContext.location?.name;
  const duration = resolvedContext.duration;
  const departureDate = resolvedContext.departure?.date;

  const intro = message ?? `Hi, I’m interested${product ? ` in ${product}` : ' in planning a retreat'}. Please share the relevant details.`;

  const contextualParts = [
    ...(product ? [`Product: ${product}`] : []),
    ...(location ? [`Location: ${location}`] : []),
    ...(duration ? [`Duration: ${duration}`] : []),
    ...(departureDate ? [`Preferred date: ${departureDate}`] : []),
  ];

  if (timing && timing.trim()) contextualParts.push(`Timing: ${timing.trim()}`);
  if (groupSize && groupSize.trim()) contextualParts.push(`Group size: ${groupSize.trim()}`);

  const extras = new Set<string>();
  if (leadReference && leadReference.trim()) {
    extras.add(`Lead reference: ${leadReference.trim()}`);
  }

  const fullText = [intro, ...contextualParts, ...Array.from(extras)].join(' | ');
  const submittedDetails = [
    name?.trim() ? `Name: ${name.trim()}` : '',
    phone?.trim() ? `Phone: ${phone.trim()}` : '',
    email?.trim() ? `Email: ${email.trim()}` : '',
    retreatContext?.trim() && retreatContext.trim() !== '/' ? `Retreat: ${retreatContext.trim()}` : '',
    timing?.trim() ? `Preferred dates: ${timing.trim()}` : '',
    groupSize?.trim() ? `Group size: ${groupSize.trim()}` : '',
    additionalNotes?.trim() ? `Additional notes: ${additionalNotes.trim()}` : '',
    leadReference?.trim() ? `Lead reference: ${leadReference.trim()}` : '',
  ].filter(Boolean);

  if ([name, phone, email, retreatContext, additionalNotes].some((value) => value?.trim())) {
    return [intro, ...submittedDetails].join('\n').slice(0, 5000);
  }

  return fullText.slice(0, 1000);
}

export function buildWhatsAppUrl(options: BuildWhatsAppUrlOptions = {}): string {
  const destination = options.destination ?? DEFAULT_WHATSAPP_NUMBER;
  const normalizedDestination = normalizePhoneNumber(destination);
  const customerMessage = buildCustomerMessage(options);
  return `https://wa.me/${normalizedDestination}?text=${encodeURIComponent(customerMessage)}`;
}

export function buildCanonicalWhatsAppUrl(
  href: string | undefined,
  options: BuildWhatsAppUrlOptions = {},
): string {
  let legacyMessage: string | undefined;
  if (href && !options.message) {
    try {
      const parsedHref = new URL(href);
      const destination = normalizePhoneNumber(DEFAULT_WHATSAPP_NUMBER);
      if (
        parsedHref.protocol === 'https:' &&
        parsedHref.hostname === 'wa.me' &&
        parsedHref.pathname === `/${destination}`
      ) {
        legacyMessage = parsedHref.searchParams.get('text') || undefined;
      }
    } catch {
      legacyMessage = undefined;
    }
  }

  return buildWhatsAppUrl({
    ...options,
    destination: DEFAULT_WHATSAPP_NUMBER,
    ...(legacyMessage ? { message: legacyMessage, context: undefined } : {}),
  });
}

export function buildWhatsAppMessage(options: BuildWhatsAppUrlOptions = {}): string {
  return buildCustomerMessage(options);
}
