import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

// High-res icon for Android / PWA; favicon.ico stays for browser tabs
export default function Icon() {
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
          fontSize: 176,
          fontWeight: 600,
          letterSpacing: -8,
          borderRadius: 112,
        }}
      >
        pbi<span style={{ color: '#2fbf6d' }}>x</span>
      </div>
    ),
    size,
  );
}
