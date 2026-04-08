import { RETREAT_REVIEWS } from '@/content/reviews';
import { REVIEW_BLOG_TOPICS } from '@/content/blogTemplates/reviewBlogs';

export interface ReviewBlogTopic {
  slug: string;
  title: string;
  clusterPage: string;
  moneyPage: string;
  retreatSlugs: string[];
}

export function generateReviewBlog(topic: ReviewBlogTopic) {
  // Pull reviews for the given retreatSlugs
  const reviews = RETREAT_REVIEWS.filter(r => topic.retreatSlugs.includes(r.retreatSlug));

  // Select up to 3 review excerpts
  const reviewExcerpts = reviews.slice(0, 3).map(r =>
    `> "${r.reviewBody}" — ${r.participantName}`
  ).join('\n\n');

  // Generate blog content
  return `---\ntitle: "${topic.title}"\nslug: "${topic.slug}"\n---\n\n# ${topic.title}\n\n## Introduction\n\nDiscover what really happens at a ${topic.title.replace(/:.*$/, '')}. This post shares real participant stories and practical insights from Himalayan retreats.\n\n## What to Expect\n\nExpect a blend of guided meditation, nature immersion, and digital detox. Programs are designed for all levels, with supportive facilitators and a peaceful mountain setting.\n\n## Real Experiences\n\n${reviewExcerpts}\n\n## Outcomes\n\nParticipants report deep rest, mental clarity, and lasting transformation. Many return home with new tools for stress relief and self-awareness.\n\n## Internal Links\n\n- [Read more reviews](${topic.clusterPage})\n- [Explore retreats](${topic.moneyPage})\n`;
}
