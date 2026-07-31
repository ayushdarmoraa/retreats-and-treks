'use client';

interface SectionHeadingProps {
  eyebrow: string;
  title: string; // ONLY STRING - no React.ReactNode
  description?: React.ReactNode;
  accent?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  accent,
  className = '',
}: SectionHeadingProps) {
  // Safety check - agar title missing/undefined/string nahi hai toh crash mat karo
  if (!title || typeof title !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('SectionHeading: "title" prop is missing or not a string:', title);
    }
    return null;
  }

  // Last word extract karo
  const words = title.trim().split(' ');
  const lastWord = words.pop() || '';
  const restTitle = words.join(' ');

  return (
    <div className={`text-center mb-12 ${className}`}>
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="w-9 h-px bg-teal-700/30" />
        <span className="text-[0.65rem] tracking-[0.35em] uppercase text-gray-500 font-medium">
          {eyebrow}
        </span>
        <span className="w-9 h-px bg-teal-700/30" />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-geist-sans), sans-serif",
          fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
          fontWeight: 200,
          letterSpacing: '-0.03em',
          color: '#1a1814',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {restTitle}{' '}
        <span
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontWeight: 200,
            color: '#0f766e',
          }}
        >
          {lastWord}
        </span>
      </h2>
      {description && (
        <p
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
            color: '#6b7280',
            fontWeight: 300,
            marginTop: '0.75rem',
            letterSpacing: '0.01em',
          }}
          className="max-w-2xl mx-auto"
        >
          {description}
        </p>
      )}
    </div>
  );
}