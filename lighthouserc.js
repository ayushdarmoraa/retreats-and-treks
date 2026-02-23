/**
 * Lighthouse CI Configuration
 * https://github.com/GoogleChrome/lighthouse-ci
 *
 * Install globally or as a dev dependency:
 *   npm install -D @lhci/cli
 *
 * Run:
 *   npx lhci autorun
 *
 * Or integrate in CI pipeline before deployment.
 */

/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      /** Static site — run against built output directly */
      staticDistDir: './.next',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/retreats/himalayan-retreats',
        'http://localhost:3000/retreats/chakrata',
        'http://localhost:3000/blog',
        'http://localhost:3000/about',
      ],
      numberOfRuns: 1,
    },
    assert: {
      /**
       * Core Web Vitals + SEO thresholds
       *
       * Thresholds calibrated for a statically-rendered Next.js site.
       * Tighten over time as performance baseline improves.
       */
      assertions: {
        // Core Web Vitals
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],     // LCP < 2.5s (Good)
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],      // CLS < 0.1 (Good)
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],            // TBT < 200ms

        // Opportunity scores
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // SEO specifics
        'meta-description': ['error', { maxLength: 160 }],
        'link-text': 'warn',
        'is-crawlable': 'error',
        'structured-data': 'warn',

        // Bundle hygiene
        'unused-javascript': 'warn',
        'render-blocking-resources': 'warn',
      },
    },
    upload: {
      /** Change to 'lhci' and add serverBaseUrl for Lighthouse CI server */
      target: 'temporary-public-storage',
    },
  },
};
