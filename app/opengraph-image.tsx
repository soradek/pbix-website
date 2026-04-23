import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Radosław Sobczak – Certyfikowany Trener Microsoft Power BI, Excel, SQL';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 80px 80px 92px',
          borderLeft: '12px solid #1e9953',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: '20px', color: '#1e9953', fontWeight: 700, letterSpacing: '3px', marginBottom: '28px' }}>
          PBIX.PL
        </div>
        <div style={{ display: 'flex', fontSize: '70px', fontWeight: 800, color: '#1d1d1f', lineHeight: 1.05, letterSpacing: '-3px', marginBottom: '4px' }}>
          Szkolenia Power BI,
        </div>
        <div style={{ display: 'flex', fontSize: '70px', fontWeight: 800, color: '#1d1d1f', lineHeight: 1.05, letterSpacing: '-3px', marginBottom: '36px' }}>
          Excel &amp; SQL
        </div>
        <div style={{ display: 'flex', fontSize: '26px', color: '#6e6e73' }}>
          Radosław Sobczak · Microsoft Certified Trainer (MCT)
        </div>
        <div style={{ display: 'flex', fontSize: '20px', color: '#aaaaaa', marginTop: '12px' }}>
          7 lat · 4 500+ przeszkolonych · ocena 4,8/5
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
