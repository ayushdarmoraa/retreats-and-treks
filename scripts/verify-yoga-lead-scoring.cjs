/* eslint @typescript-eslint/no-require-imports: off */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  module._compile(output, filename);
};

const { applyVerifiedDepartureContext, classifyYogaInquiry, getYogaLeadTier, scoreInquiry } = require('../lib/lead-scoring.ts');
const { getYogaRecommendation } = require('../lib/yoga-finder-recommendation.ts');
const { InquirySchema } = require('../lib/schemas.ts');

const base = (overrides = {}) => ({
  name: 'Test', email: 'test@example.com', phone: '9876543210', yogaInterest: 'Not sure',
  product: '', productId: '', departureId: '', planningHorizon: '', interestedIn: 'retreat',
  location: '', month: '', preferredDate: '', groupSize: '', budget: '', duration: '',
  yogaExperience: '', bookingReadiness: '', yogaClassification: '', yogaSalesRoute: '',
  recommendedProduct: '', recommendedAlternative: '', source: '/yoga-retreats', vertical: 'retreat',
  category: 'yoga-retreat', trek: '', timestamp: new Date().toISOString(), ...overrides,
});

const score = (overrides) => scoreInquiry(base(overrides));

assert.equal(score({}).score, 5, 'not sure intent');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: '5-Day Yoga Retreat', productId: 'yoga-rishikesh-5-day', location: 'Rishikesh' }).score, 20, 'specific product');
const productOnlyScore = score({ yogaInterest: 'Yoga Retreat', product: '5-Day Yoga Retreat', productId: 'yoga-rishikesh-5-day' }).score;
const selectedDepartureScore = score({ yogaInterest: 'Yoga Retreat', departureId: 'yoga-rishikesh-5-day-2026-10-12' }).score;
assert.equal(selectedDepartureScore - productOnlyScore, 15, 'specific departure increment');
assert.equal(score({ yogaInterest: 'Yoga TTC', product: 'Yoga Teacher Training', productId: 'yoga-ttc' }).score, 20, 'TTC');
assert.equal(score({ yogaInterest: 'Yoga Retreat', location: 'Sankri' }).score, 15, 'other location');
assert.equal(classifyYogaInquiry(base({ productId: 'yoga-rishikesh-weekend' })), 'Weekend');
assert.equal(classifyYogaInquiry(base({ productId: 'yoga-rishikesh-5-day' })), '5-Day');
assert.equal(classifyYogaInquiry(base({ productId: 'yoga-rishikesh-7-day' })), '7-Day');
assert.equal(classifyYogaInquiry(base({ productId: 'yoga-rishikesh-10-day' })), '10-Day');
assert.equal(classifyYogaInquiry(base({ productId: 'yoga-ttc' })), 'TTC');
assert.equal(classifyYogaInquiry(base({ location: 'Sankri' })), 'Other location');
assert.equal(classifyYogaInquiry(base()), 'Not sure');
assert.equal(score({ planningHorizon: '0–30 days' }).score, 25, '0-30 timing');
assert.equal(score({ planningHorizon: '31–90 days' }).score, 20, '31-90 timing');
assert.equal(score({ planningHorizon: '91–180 days' }).score, 15, '91-180 timing');
assert.equal(score({ bookingReadiness: 'Ready to book' }).score, 25, 'ready');
assert.equal(score({ bookingReadiness: 'Likely' }).score, 20, 'likely');
assert.equal(score({ bookingReadiness: 'Researching' }).score, 10, 'researching');
assert.equal(score({ duration: '5 days' }).score, 15, 'specific duration');
assert.equal(score({ yogaExperience: 'Beginner' }).score, 10, 'beginner');
assert.equal(score({ yogaExperience: 'Some experience' }).score, 12, 'some experience');
assert.equal(score({ yogaExperience: 'Experienced' }).score, 12, 'experienced');
assert.equal(score({ groupSize: '1' }).score, 8, 'group 1-2');
assert.equal(score({ groupSize: '3–4' }).score, 12, 'group 3-5');
assert.equal(score({ groupSize: '6+' }).score, 15, 'group 6+');
assert.equal(score({ yogaInterest: 'Yoga Retreat', productId: 'yoga-rishikesh-5-day', product: '5-Day Yoga Retreat', budget: '₹15–30k' }).score, 30, 'compatible budget');
assert.equal(score({ budget: 'Not sure yet' }).score, 5, 'unknown budget');
assert.equal(score({ yogaInterest: 'Yoga TTC', productId: 'yoga-ttc', product: 'Yoga Teacher Training', budget: '₹15–30k' }).score, 20, 'incompatible budget');

assert.equal(getYogaLeadTier(75), 'Hot');
assert.equal(getYogaLeadTier(50), 'Warm');
assert.equal(getYogaLeadTier(25), 'Nurture');
assert.equal(getYogaLeadTier(24), 'Early');
assert.equal(getYogaLeadTier(100), 'Hot');
assert.equal(score({ yogaInterest: 'Yoga Retreat', productId: 'yoga-rishikesh-10-day', product: '10-Day Yoga Retreat', departureId: 'yoga-rishikesh-10-day-2026-10-26', planningHorizon: '0–30 days', bookingReadiness: 'Ready to book', duration: '10 days', yogaExperience: 'Experienced', groupSize: '6+', budget: '₹60k+' }).score, 100, 'score cap');

assert.equal(score({ yogaInterest: 'Yoga Retreat', product: '5-Day Yoga Retreat', productId: 'yoga-rishikesh-5-day', location: 'Rishikesh' }).yogaSalesRoute, 'RISHIKESH_DIRECT');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: '7-Day Yoga Retreat', productId: 'yoga-rishikesh-7-day', location: 'Rishikesh' }).yogaSalesRoute, 'RISHIKESH_DIRECT');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: '5-Day Yoga Retreat', productId: 'yoga-rishikesh-5-day', departureId: 'dep' }).yogaSalesRoute, 'RISHIKESH_DIRECT');
assert.equal(score({ yogaInterest: 'Yoga Retreat', departureId: 'yoga-rishikesh-5-day-2026-10-12' }).yogaSalesRoute, 'RISHIKESH_DIRECT');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Sankri', groupSize: '6+' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Chakrata', groupSize: '6+' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Zanskar', groupSize: '6+' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({ yogaInterest: 'Yoga Retreat', productId: 'yoga-rishikesh-5-day', product: '5-Day Yoga Retreat', location: 'Rishikesh', groupSize: '1–2' }).yogaSalesRoute, 'RISHIKESH_DIRECT');
assert.equal(score({ yogaInterest: 'Yoga Retreat', productId: 'yoga-rishikesh-5-day', product: '5-Day Yoga Retreat', location: 'Sankri' }).yogaSalesRoute, 'RISHIKESH_ALTERNATIVE');
assert.equal(score({ yogaInterest: 'Yoga Retreat', location: 'Chakrata' }).yogaSalesRoute, 'RISHIKESH_ALTERNATIVE');
assert.equal(score({ yogaInterest: 'Yoga Retreat', location: 'Zanskar' }).yogaSalesRoute, 'RISHIKESH_ALTERNATIVE');
assert.equal(score({ yogaInterest: 'Yoga TTC', product: 'Yoga Teacher Training', productId: 'yoga-ttc' }).yogaSalesRoute, 'TTC_SALES');
assert.equal(score({ yogaInterest: 'Yoga Retreat', location: 'Sankri' }).yogaSalesRoute, 'RISHIKESH_ALTERNATIVE');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Sankri', groupSize: '6+' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Chakrata' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Zanskar' }).yogaSalesRoute, 'CUSTOM_DEMAND');
assert.equal(score({}).yogaSalesRoute, 'HELP_ME_CHOOSE');
assert.equal(score({ vertical: 'trek', interestedIn: 'trek', yogaInterest: '', category: 'trek', source: '/treks' }).yogaSalesRoute, '');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Sankri' }).recommendedAlternative, '5-Day Yoga Retreat in Rishikesh');
const requestedLocationInquiry = base({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Sankri' });
score(requestedLocationInquiry);
assert.equal(requestedLocationInquiry.location, 'Sankri', 'requested location is not overwritten');
assert.equal(score({ yogaInterest: 'Yoga Retreat', product: 'Other location', location: 'Sankri', duration: '7 days' }).recommendedAlternative, '7-Day Yoga Retreat in Rishikesh');
assert.equal(score({ yogaInterest: 'Yoga Retreat', yogaExperience: 'Beginner' }).recommendedProduct, '5-Day Yoga Retreat in Rishikesh');
assert.equal(applyVerifiedDepartureContext(base({ departureId: 'yoga-rishikesh-5-day-2026-10-12' })).preferredDate, '2026-10-12');
assert.equal(applyVerifiedDepartureContext(base({ departureId: 'yoga-rishikesh-5-day-2026-10-12' })).productId, 'yoga-rishikesh-5-day');
assert.equal(applyVerifiedDepartureContext(base({ departureId: 'unknown-departure' })).preferredDate, '');
const nonYoga = score({ vertical: 'trek', interestedIn: 'trek', yogaInterest: '', category: 'trek', source: '/treks/kedarkantha' });
assert.equal(nonYoga.score, 15, 'legacy non-Yoga scoring remains separate');
assert.equal(nonYoga.yogaSalesRoute, '', 'non-Yoga inquiries do not get a Yoga route');

const recommendation = (overrides) => getYogaRecommendation({ yogaType: 'retreat', yogaLocation: 'rishikesh', ...overrides });
assert.equal(getYogaRecommendation({ yogaType: 'ttc', yogaLocation: 'unsure' }).ttc, true, 'TTC finder result');
assert.equal(recommendation({ yogaDuration: 'Weekend' }).productId, 'yoga-rishikesh-weekend', 'Weekend finder result');
assert.equal(recommendation({ yogaDuration: '5 days' }).productId, 'yoga-rishikesh-5-day', '5-day finder result');
assert.equal(recommendation({ yogaDuration: '7 days' }).productId, 'yoga-rishikesh-7-day', '7-day finder result');
assert.equal(recommendation({ yogaDuration: '10 days' }).productId, 'yoga-rishikesh-10-day', '10-day finder result');
const sankriRecommendation = recommendation({ yogaLocation: 'sankri', yogaDuration: '5 days' });
assert.equal(sankriRecommendation.requestedLocation, 'sankri', 'custom request location preserved');
assert.equal(sankriRecommendation.custom, true, 'custom location recommendation');
assert.equal(recommendation({ yogaDuration: 'Weekend' }).productId, 'yoga-rishikesh-weekend', 'limited-time finder result');
assert.equal(recommendation({ yogaDuration: '7 days' }).productId, 'yoga-rishikesh-7-day', 'deeper immersion finder result');
assert.equal(recommendation({ yogaDuration: '10 days' }).productId, 'yoga-rishikesh-10-day', 'extended immersion finder result');
const beginnerUncertain = recommendation({ yogaDuration: 'Flexible', yogaExperience: 'Beginner' });
assert.equal(beginnerUncertain.productId, 'yoga-rishikesh-5-day', 'beginner uncertain recommendation');
assert.equal(beginnerUncertain.helpMeChoose, true, 'beginner uncertain stays help-me-choose');
const noPreference = getYogaRecommendation({ yogaType: 'unsure', yogaLocation: 'unsure', yogaDuration: 'Flexible', yogaExperience: 'Unsure' });
assert.equal(noPreference.productId, 'yoga-rishikesh-5-day', 'no preference recommended product');
assert.equal(noPreference.helpMeChoose, true, 'no preference route intent');

const lowInformationInquiry = InquirySchema.safeParse({
  name: 'Test User', phone: '9876543210', email: 'test@example.com',
  yogaInterest: 'Yoga Retreat', product: 'Not sure', productId: '', departureId: '',
  location: '', duration: '', preferredDate: '', month: '', yogaExperience: '',
  groupSize: '', budget: 'Not sure yet', bookingReadiness: '', planningHorizon: '',
  source: '/find-your-retreat?first_utm_source=first&utm_source=last', vertical: 'retreat', category: 'yoga-finder',
});
assert.equal(lowInformationInquiry.success, true, 'unknown qualification fields do not reject a valid lead');

console.log('Yoga lead scoring/routing matrix passed');