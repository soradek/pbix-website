import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: {
    default: 'pbix.pl – Szkolenia Power BI, Excel, SQL | Radosław Sobczak',
    template: '%s | pbix.pl',
  },
  description: 'Certyfikowany Trener Microsoft (MCT). Szkolenia z Power BI, Excel, SQL i VBA dla firm i indywidualnych uczestników. Ponad 3 500 przeszkolonych osób.',
  keywords: ['Power BI', 'szkolenia Excel', 'SQL szkolenie', 'Radosław Sobczak', 'pbix', 'MCT trainer'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#ffffff', color: '#1d1d1f', fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
