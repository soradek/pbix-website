import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

// Same mark as favicon.ico (green "x" from the pbix logo) so every browser tab and
// Android launcher shows one consistent icon; apple-icon carries the full wordmark
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
          borderRadius: 112,
          color: '#2fbf6d',
          fontSize: 470,
          fontWeight: 700,
          lineHeight: 1,
          paddingBottom: 60,
        }}
      >
        x
      </div>
    ),
    size,
  );
}
