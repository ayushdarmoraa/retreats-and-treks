'use client';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fullBleed?: boolean; // true = section poore viewport width tak fail jaye (container ke bahar bhi)
  id?: string;
}

export default function Section({
  children,
  className = '',
  style,
  fullBleed = true,
}: SectionProps) {
  const bleedStyle: React.CSSProperties = fullBleed
    ? { width: '100vw', marginLeft: 'calc(-50vw + 50%)' }
    : {};

  return (
    <section
      className={`relative overflow-hidden ${fullBleed ? '' : 'w-full'} ${className}`}
      style={{ ...bleedStyle, ...style }}
    >
      {children}
    </section>
  );
}
