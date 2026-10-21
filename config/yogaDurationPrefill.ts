import { getYogaRetreatProduct, type YogaRetreatProductId } from './retreatProgramEvents';

const YOGA_DURATION_PRODUCT_IDS: Readonly<Record<string, YogaRetreatProductId>> = {
  '5-day-yoga-retreat': 'yoga-rishikesh-5-day',
  '7-day-yoga-retreat': 'yoga-rishikesh-7-day',
  '10-day-yoga-retreat': 'yoga-rishikesh-10-day',
};

export function getYogaDurationPrefill(slug: string) {
  const productId = YOGA_DURATION_PRODUCT_IDS[slug];
  if (!productId) {
    return { productId: undefined, duration: undefined };
  }

  const product = getYogaRetreatProduct(productId);
  if (!product) {
    throw new Error(`Yoga duration product "${productId}" is missing from the product registry.`);
  }

  return {
    productId,
    duration: `${product.durationDays} days`,
  };
}
