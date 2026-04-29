import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const alt = 'pbix.pl – artykuł na blogu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? 'pbix.pl – Power BI, Excel, SQL';
  const category = post?.category ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0f3a22 0%, #1e9953 100%)',
          color: '#ffffff',
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>pbix.pl</div>
            <div
              style={{
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: 4,
                opacity: 0.75,
                marginTop: 2,
              }}
            >
              Radosław Sobczak
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
              textTransform: 'uppercase',
              letterSpacing: 3,
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 70 ? 60 : 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: '100%',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>www.pbix.pl/blog</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 18,
              padding: '12px 22px',
              borderRadius: 999,
              background: '#ffffff',
              color: '#0f3a22',
              fontWeight: 600,
            }}
          >
            Microsoft Certified Trainer
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
