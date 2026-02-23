import { ReactNode } from 'react';

type LandingLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function LandingLayout({
  title,
  description,
  children,
}: LandingLayoutProps) {
  return (
    <main>
      <header>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>

      <section>{children}</section>
    </main>
  );
}
