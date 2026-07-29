'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-sans text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 rounded-full';

  const variants = {
    primary:
      'px-8 py-3 bg-teal-700 text-white hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-700/25',
    secondary:
      'px-8 py-3 bg-white text-[#1a1814] border border-gray-200 hover:border-teal-700/30 hover:shadow-md',
    ghost:
      'px-6 py-2 bg-transparent text-gray-600 border border-gray-200/50 hover:border-teal-700/30 hover:text-teal-700',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
