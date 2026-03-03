'use client';

/**
 * Global Error Boundary — catches unhandled errors in any route.
 *
 * Next.js App Router automatically wraps each route segment in a React
 * error boundary. This file is the root-level fallback.
 */

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ErrorBoundary] Unhandled error:', error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We hit an unexpected error. Please try again or come back later.
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
