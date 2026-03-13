import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';

interface ArticleSchemaProps {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Reusable Article JSON-LD schema component.
 * Drop into any guide/editorial page to add structured data:
 *
 *   <ArticleSchema
 *     title="Weekend Retreat Near Delhi"
 *     description="Escape the stress of city life…"
 *     path="/retreats/weekend-retreat-near-delhi"
 *   />
 */
export default function ArticleSchema({
  title,
  description,
  path,
  datePublished = '2025-01-01',
  dateModified,
}: ArticleSchemaProps) {
  const url = buildCanonicalUrl(path);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': schemaIds.article(path),
          headline: title,
          description,
          url,
          datePublished,
          dateModified: dateModified || datePublished,
          author: { '@id': schemaIds.organization },
          publisher: { '@id': schemaIds.organization },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
        }),
      }}
    />
  );
}
