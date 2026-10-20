import assert from 'node:assert/strict';
import test from 'node:test';
import { Children, isValidElement, type ElementType, type ReactElement, type ReactNode } from 'react';
import { getDurationPage, DURATION_PAGES } from '@/config/durationPages';
import PrimaryCTA from '@/components/PrimaryCTA';
import YogaCommercialSections from '@/components/YogaCommercialSections';
import YogaDepartureCalendar from '@/components/YogaDepartureCalendar';
import DurationHubPage from './DurationHubPage';

type InspectableElement = ReactElement<{ children?: ReactNode } & Record<string, unknown>>;

function findElementsByType(node: ReactNode, type: ElementType): InspectableElement[] {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode } & Record<string, unknown>>(child)) {
      return [];
    }

    const element: InspectableElement = child;
    const matchingElement = element.type === type ? [element] : [];
    return [...matchingElement, ...findElementsByType(element.props.children, type)];
  });
}

function renderDurationPage(slug: string): ReactNode {
  const page = getDurationPage(slug);
  assert.ok(page, `Expected duration page "${slug}" to exist.`);
  return DurationHubPage({ page });
}

test('Yoga duration pages pass the matching product context to CTAs and programme sections', () => {
  const expectedProducts = [
    { slug: '5-day-yoga-retreat', productId: 'yoga-rishikesh-5-day', duration: '5 days' },
    { slug: '7-day-yoga-retreat', productId: 'yoga-rishikesh-7-day', duration: '7 days' },
    { slug: '10-day-yoga-retreat', productId: 'yoga-rishikesh-10-day', duration: '10 days' },
  ];

  for (const { slug, productId, duration } of expectedProducts) {
    const tree = renderDurationPage(slug);
    const ctas = findElementsByType(tree, PrimaryCTA);
    const calendars = findElementsByType(tree, YogaDepartureCalendar);
    const commercialSections = findElementsByType(tree, YogaCommercialSections);

    assert.equal(ctas.length, 2, `${slug} should render both page CTAs`);
    for (const cta of ctas) {
      assert.equal(cta.props.productId, productId);
      assert.equal(cta.props.duration, duration);
      assert.equal(cta.props.sourcePath, `/${slug}`);
    }

    assert.equal(calendars.length, 1);
    assert.equal(calendars[0].props.productId, productId);
    assert.equal(commercialSections.length, 1);
    assert.equal(commercialSections[0].props.productId, productId);
  }
});

test('non-Yoga duration pages do not render Yoga product, calendar, or commercial context', () => {
  const nonYogaPages = DURATION_PAGES.filter((page) => !page.slug.includes('yoga'));

  assert.ok(nonYogaPages.length > 0);
  for (const page of nonYogaPages) {
    const tree = renderDurationPage(page.slug);
    const ctas = findElementsByType(tree, PrimaryCTA);

    assert.equal(ctas.length, 2, `${page.slug} should retain both page CTAs`);
    for (const cta of ctas) {
      assert.equal(cta.props.productId, undefined, `${page.slug} must not inherit a Yoga product`);
      assert.equal(cta.props.duration, undefined, `${page.slug} must not inherit a Yoga duration`);
    }
    assert.equal(findElementsByType(tree, YogaDepartureCalendar).length, 0);
    assert.equal(findElementsByType(tree, YogaCommercialSections).length, 0);
  }
});
