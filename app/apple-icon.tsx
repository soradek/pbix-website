import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Home-screen icon: the pbix wordmark with the green x, on the site ink
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0d0c',
          color: '#eef1ef',
          fontSize: 62,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        pbi<span style={{ color: '#2fbf6d' }}>x</span>
      </div>
    ),
    size,
  );
}
