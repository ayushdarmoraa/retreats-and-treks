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
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <style>{`
        .bc-inner {
          max-width: 64rem;
          margin: 0 auto;
          padding: 0.75rem var(--space-md, 1.5rem);
          display: flex;
          align-items: center;
          gap: 0;
        }
        .bc-sep {
          margin: 0 0.5rem;
          color: #cccccc;
          font-size: 0.7rem;
          user-select: none;
        }
        .bc-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          color: #999999;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .bc-link:hover { color: var(--color-primary); }
        .bc-current {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #444444;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
      `}</style>

      <div className="bc-inner">
        {items.map((item, index) => (
          <span key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              <span className="bc-sep" aria-hidden="true">/</span>
            )}
            {item.href ? (
              <Link href={item.href} className="bc-link">
                {item.name}
              </Link>
            ) : (
              <span className="bc-current">{item.name}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}