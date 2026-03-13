/**
 * Central Schema @id references.
 *
 * Every JSON-LD entity on the site uses these IDs so search engines
 * can link Organization ↔ WebSite ↔ Article ↔ BreadcrumbList into
 * a single connected entity graph instead of isolated schemas.
 */

export const SCHEMA_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.retreatsandtreks.com';

export const schemaIds = {
  organization: `${SCHEMA_SITE_URL}#organization`,
  website: `${SCHEMA_SITE_URL}#website`,
  breadcrumbs: (path: string) => `${SCHEMA_SITE_URL}${path}#breadcrumbs`,
  article: (path: string) => `${SCHEMA_SITE_URL}${path}#article`,
  blogPosting: (path: string) => `${SCHEMA_SITE_URL}${path}#blogposting`,
};
