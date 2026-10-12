/**
 * Read-only conversion telemetry report.
 * Run with: node scripts/analytics-report.js
 *
 * Uses the durable conversion_events table. It intentionally reports only
 * aggregates and event context, never inquiry or event metadata payloads.
 */

async function run() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to read durable conversion analytics.');
  }

  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL);
  const [totals, byType, paths, sources, recent] = await Promise.all([
    sql`
      SELECT COUNT(*)::int AS total
      FROM conversion_events
      WHERE created_at >= now() - interval '30 days'
    `,
    sql`
      SELECT event_type, COUNT(*)::int AS count
      FROM conversion_events
      WHERE created_at >= now() - interval '30 days'
      GROUP BY event_type
      ORDER BY count DESC, event_type
    `,
    sql`
      SELECT page_path AS source_path,
        meta->>'destination_path' AS destination_path,
        COUNT(*)::int AS count
      FROM conversion_events
      WHERE created_at >= now() - interval '30 days'
        AND meta ? 'destination_path'
      GROUP BY page_path, meta->>'destination_path'
      ORDER BY count DESC
      LIMIT 10
    `,
    sql`
      SELECT page_path, COUNT(*)::int AS count
      FROM conversion_events
      WHERE created_at >= now() - interval '30 days'
        AND page_path IS NOT NULL
      GROUP BY page_path
      ORDER BY count DESC
      LIMIT 8
    `,
    sql`
      SELECT event_type, page_path, meta->>'destination_path' AS destination_path, created_at
      FROM conversion_events
      WHERE created_at >= now() - interval '30 days'
      ORDER BY created_at DESC, id DESC
      LIMIT 10
    `,
  ]);

  console.log('\nCONVERSION TELEMETRY REPORT — LAST 30 DAYS\n');
  console.log(`  Total durable events: ${totals[0]?.total ?? 0}\n`);

  console.log('  BY EVENT TYPE');
  for (const row of byType) console.log(`  ${String(row.count).padStart(5)}  ${row.event_type}`);

  console.log('\n  TOP CONVERSION PATHS');
  for (const row of paths) {
    console.log(`  ${String(row.count).padStart(5)}  ${row.source_path ?? '/'} → ${row.destination_path}`);
  }

  console.log('\n  TOP SOURCE PAGES');
  for (const row of sources) console.log(`  ${String(row.count).padStart(5)}  ${row.page_path}`);

  console.log('\n  RECENT EVENTS');
  for (const row of recent) {
    const timestamp = new Date(row.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`  [${timestamp}]  ${row.event_type}  ${row.page_path ?? '/'}  → ${row.destination_path ?? ''}`);
  }
}

run().catch(() => {
  console.error('Unable to read durable conversion analytics.');
  process.exitCode = 1;
});
