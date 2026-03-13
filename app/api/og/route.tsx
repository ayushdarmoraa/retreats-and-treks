import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Himalayan Retreats & Weekend Treks';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f3d2e 0%, #0f766e 100%)',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#a7f3d0',
            marginTop: 32,
            letterSpacing: 2,
          }}
        >
          RETREATS &amp; TREKS
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
