import ArticleSchema from '@/components/ArticleSchema';

/**
 * Wrapper that conditionally injects Article JSON-LD for retreat guide pages.
 * Excludes journey pages (`/retreats/journeys/*`) which use TouristTrip schema.
 */
export default function AutoArticleSchema({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  if (!path.startsWith('/retreats')) return null;
  if (path.startsWith('/retreats/journeys')) return null;

  return (
    <ArticleSchema
      title={title}
      description={description}
      path={path}
      datePublished={datePublished}
    />
  );
}
