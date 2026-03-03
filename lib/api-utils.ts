/**
 * API Error Handling Utilities
 *
 * Standardized error wrapper for Next.js route handlers.
 * Converts Zod validation errors → 400 with field-level detail.
 * Catches all unhandled errors → 500 with masked message.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

type Handler = (req: NextRequest, ctx?: unknown) => Promise<NextResponse>;

/**
 * Wrap a route handler with structured error handling.
 *
 * - ZodError → 400 { error, field }
 * - Any other thrown error → 500 { error: 'Internal server error' }
 *
 * Route-specific try/catch still runs first — this only catches
 * what bubbles through unhandled.
 */
export function withErrorHandling(handler: Handler): Handler {
  return async (req: NextRequest, ctx?: unknown) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      // Zod validation error → structured 400
      if (err instanceof z.ZodError) {
        const issue = err.issues[0];
        return NextResponse.json(
          {
            error: issue?.message || 'Validation error',
            field: issue?.path?.join('.') || undefined,
          },
          { status: 400 },
        );
      }

      // Log with route context for debugging
      const route = `${req.method} ${req.nextUrl.pathname}`;
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[API:Error] ${route} —`, message);

      // Never leak internal details
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 },
      );
    }
  };
}
