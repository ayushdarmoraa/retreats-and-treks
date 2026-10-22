import assert from 'node:assert/strict';
import test from 'node:test';

import { ITINERARY_PAGES } from './itineraryPages';

test('Yoga itinerary metadata describes the published page presentation', () => {
  const yogaPages = ITINERARY_PAGES.filter((page) => page.experienceSlug === 'yoga-retreats');
  assert.ok(yogaPages.length > 0);

  for (const page of yogaPages) {
    if (page.locationName === 'Rishikesh') {
      assert.equal(page.contentPresentation, 'yoga-practice-overview');
      assert.match(page.seoTitle, /Practice Overview/);
      assert.match(page.h1, /Practice Overview/);
      assert.match(page.metaDescription, /not a date-specific schedule/i);
    } else {
      assert.equal(page.contentPresentation, 'yoga-booking-checklist');
      assert.match(page.seoTitle, /Booking Checklist/);
      assert.match(page.h1, /Booking Checklist/);
      assert.match(page.metaDescription, /on-request Yoga retreat/i);
    }

    assert.doesNotMatch(page.seoTitle, /itinerary/i);
    assert.doesNotMatch(page.h1, /itinerary/i);
    assert.doesNotMatch(page.metaDescription, /daily schedule/i);
  }

  const nonYogaPage = ITINERARY_PAGES.find((page) => page.experienceSlug !== 'yoga-retreats');
  assert.ok(nonYogaPage);
  assert.equal(nonYogaPage.contentPresentation, undefined);
  assert.match(nonYogaPage.metaDescription, /daily schedule/i);
});
