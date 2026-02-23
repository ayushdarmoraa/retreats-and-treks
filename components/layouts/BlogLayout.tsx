import { ReactNode } from 'react';

type BlogLayoutProps = {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  children: ReactNode;
};

export default function BlogLayout({
  title,
  description,
  publishedAt,
  readingTime,
  children,
}: BlogLayoutProps) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
        <small>
          {publishedAt} · {readingTime}
        </small>
      </header>

      <section>{children}</section>
    </article>
  );
}
