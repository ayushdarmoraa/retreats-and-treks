'use client';

/**
 * Dashboard Error Boundary — catches errors in /internal/* routes.
 * Shows a simpler recovery UI for the admin panel.
 */

import { useEffect } from 'react';

export default function InternalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Dashboard:Error]', error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Dashboard Error
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          {error.message || 'An unexpected error occurred in the dashboard.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Retry
          </button>
          <a
            href="/internal/dashboard"
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            Reload Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
