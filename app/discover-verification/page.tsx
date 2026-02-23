import { Metadata } from 'next';
import { getAllLocationContent } from '@/content/locations';

export const metadata: Metadata = {
  title: 'Verification — Internal',
  robots: { index: false, follow: false },
};

export default function DiscoverOtherLocationsVerification() {
  const allLocations = getAllLocationContent();
  
  return (
    <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Discover Other Locations Verification</h1>
      
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Verifying that each location page correctly shows all OTHER locations
      </p>

      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0e0e0' }}>
            <th style={{ border: '1px solid #999', padding: '1rem', textAlign: 'left' }}>Current Location</th>
            <th style={{ border: '1px solid #999', padding: '1rem', textAlign: 'left' }}>Shows on "Discover Other Locations"</th>
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
                <td style={{ border: '1px solid #999', padding: '1rem', fontWeight: 'bold' }}>
                  {currentLoc.name}
                </td>
                <td style={{ border: '1px solid #999', padding: '1rem' }}>
                  {otherLocs}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h2>Test Each Location Page</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allLocations.map((loc) => (
            <li key={loc.id} style={{ marginBottom: '0.5rem' }}>
              <a href={`/retreats/${loc.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                /retreats/{loc.id}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
        <h3>✅ Expected Behavior</h3>
        <ul>
          <li>Each location page has a "🗺️ Discover Other Locations" section</li>
          <li>Section appears BEFORE the final WhatsApp CTA</li>
          <li>Shows all 4 other locations (excludes current)</li>
          <li>Each location card shows: name + land descriptor + "Explore [Name] →" link</li>
          <li>Links point to /retreats/[location-id]</li>
          <li>Cards are responsive grid (auto-fit columns)</li>
        </ul>
      </div>
    </main>
  );
}
