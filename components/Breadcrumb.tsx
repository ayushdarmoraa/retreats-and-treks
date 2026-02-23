/**
 * Breadcrumb
 * Server component — renders visual breadcrumb navigation.
 * Must mirror BreadcrumbList JSON-LD schema exactly.
 */

import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontSize: '0.85rem',
        color: 'var(--color-muted)',
        marginBottom: 'var(--space-md)',
        lineHeight: 1.5,
      }}
    >
      {items.map((item, index) => (
        <span key={item.name}>
          {index > 0 && (
            <span style={{ margin: '0 0.4rem', opacity: 0.5 }} aria-hidden="true">
              /
            </span>
          )}
          {item.href ? (
            <Link href={item.href} style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ) : (
            <span style={{ color: 'var(--color-text)' }}>{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
