/**
 * /internal/dashboard — Operational Lead Dashboard
 *
 * Server component shell. Delegates to DashboardClient for interactivity.
 * Protected by robots noindex + env check in production.
 */

import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Lead Dashboard — Internal',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardClient />
    </main>
  );
}
