import { Metadata } from 'next';
import Link from 'next/link';
import { getAllLocationContent } from '@/content/locations';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Verification — Internal',
  robots: { index: false, follow: false },
};

export default function DiscoverOtherLocationsVerification() {
  const allLocations = getAllLocationContent();
  
  return (
    <TrackedPage page="/verification" style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      
      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); }
        .med-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-table tr:last-child td { border-bottom: none; }
        .med-table tr:hover td { background: #f7f9f7; }

        .med-success-box { padding: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 18px; border-left: 4px solid #22c55e; }
        .med-success-box .med-h3 { color: #2B2A26; }
        .med-success-box .med-body { color: #4b5259; }
        .med-success-box .med-list { margin-top: 0.5rem; }

        .med-verification-hero { padding: 4rem 0; text-align: center; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-verification-hero .med-h1 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-verification-hero .med-h1 span { color: #0f766e; }
        .med-verification-hero .med-body { max-width: 520px; margin: 0 auto; }

        .med-test-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .med-test-link { display: inline-block; padding: 0.5rem 1rem; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-radius: 999px; color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.82rem; font-weight: 500; text-decoration: none; transition: all 0.2s; }
        .med-test-link:hover { background: rgba(15,118,110,0.06); border-color: #0f766e; transform: translateY(-2px); }
      `}</style>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Verification' }]} />

      {/* ── HERO ── */}
      <section className="med-shell med-section-white med-verification-hero">
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Internal Verification</span>
            <span className="med-eyebrow-line" />
          </div>
          <h1 className="med-h1">Discover Other Locations <span>Verification</span></h1>
          <p className="med-body">Verifying that each location page correctly shows all OTHER locations</p>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-table-wrap">
            <table className="med-table">
              <thead>
                <tr>
                  <th>Current Location</th>
                  <th>Shows on "Discover Other Locations"</th>
                </tr>
              </thead>
              <tbody>
                {allLocations.map((currentLoc) => {
                  const otherLocs = allLocations
                    .filter((loc) => loc.id !== currentLoc.id)
                    .map((loc) => loc.name)
                    .join(', ');

                  return (
                    <tr key={currentLoc.id}>
                      <td style={{ fontWeight: 600, color: '#2B2A26' }}>
                        {currentLoc.name}
                      </td>
                      <td>
                        {otherLocs}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TEST LINKS ── */}
      <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Test Each Location Page</span>
          </div>
          <h2 className="med-h2">Test Each <span>Location Page</span></h2>
          <div className="med-test-links" style={{ marginTop: '1.5rem' }}>
            {allLocations.map((loc) => (
              <a key={loc.id} href={`/retreats/${loc.id}`} className="med-test-link">
                /retreats/{loc.id}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS BOX ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-success-box">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" style={{ background: '#22c55e' }} />
              <span className="med-eyebrow-text" style={{ color: '#16a34a' }}>Expected Behavior</span>
            </div>
            <h3 className="med-h3">✅ Expected Behavior</h3>
            <ul className="med-list" style={{ marginTop: '0.5rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Each location page has a "🗺️ Discover Other Locations" section</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Section appears BEFORE the final WhatsApp CTA</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Shows all 4 other locations (excludes current)</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Each location card shows: name + land descriptor + "Explore [Name] →" link</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Links point to /retreats/[location-id]</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#22c55e' }} /></span>
                <span className="med-list-text">Cards are responsive grid (auto-fit columns)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}