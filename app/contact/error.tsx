'use client';

/**
 * Contact Page Error Boundary — catches errors in the inquiry form flow.
 * Provides helpful fallback with email contact as alternative.
 */

import { useEffect } from 'react';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Contact:Error]', error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Form Temporarily Unavailable
        </h2>
        <p className="text-gray-600 mb-6">
          Our form hit an error. You can reach us directly at{' '}
          <a
            href="mailto:hello@retreatsandtreks.com"
            className="text-green-700 underline font-medium"
          >
            hello@retreatsandtreks.com
          </a>{' '}
          instead.
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
        >
          Try the form again
        </button>
      </div>
    </div>
  );
}
