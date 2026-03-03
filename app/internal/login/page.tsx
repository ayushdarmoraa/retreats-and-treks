/**
 * /internal/login — Operator Login
 *
 * Simple password form. No tracking, no indexing.
 * Sets HttpOnly secure cookie on success, redirects to dashboard.
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login — Internal',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
