import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const siteUrl = 'https://pbix.pl';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Szkolenia Power BI, Excel, SQL | Radosław Sobczak – Certyfikowany Trener Microsoft (MCT)',
    template: '%s | pbix.pl – Radosław Sobczak',
  },
  description:
    'Certyfikowany Trener Microsoft (MCT) Radosław Sobczak. Szkolenia z Power BI, Excel, SQL i VBA dla firm. Ponad 4 500 przeszkolonych pracowników, 7 lat doświadczenia. Szkolenia stacjonarne i online w całej Polsce.',
  keywords: [
    'Power BI szkolenie',
    'szkolenia Excel',
    'SQL szkolenie',
    'VBA szkolenie',
    'Power Query szkolenie',
    'DAX szkolenie',
    'Radosław Sobczak',
    'pbix.pl',
    'MCT trener',
    'Microsoft Certified Trainer',
    'szkolenia z danych',
    'analityka biznesowa szkolenie',
    'szkolenia firmowe Power BI',
    'certyfikat Power BI',
  ],
  authors: [{ name: 'Radosław Sobczak', url: siteUrl }],
  creator: 'Radosław Sobczak',
  publisher: 'pbix.pl',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'pbix.pl – Radosław Sobczak',
    title: 'Szkolenia Power BI, Excel, SQL | Radosław Sobczak MCT',
    description:
      'Certyfikowany Trener Microsoft (MCT). Praktyczne szkolenia z Power BI, Excel, SQL i VBA dla firm. Ponad 4 500 przeszkolonych pracowników, 7 lat doświadczenia. Zamów szkolenie dla swojego zespołu.',
    images: [
      {
        url: 'https://pbix.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Radosław Sobczak – Certyfikowany Trener Microsoft Power BI, Excel, SQL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szkolenia Power BI, Excel, SQL | Radosław Sobczak MCT',
    description:
      'Certyfikowany Trener Microsoft (MCT). Praktyczne szkolenia z Power BI, Excel, SQL i VBA dla firm. Ponad 4 500 przeszkolonych pracowników.',
    images: ['https://pbix.pl/og-image.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Structured Data – Person + Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  name: 'Radosław Sobczak',
                  url: siteUrl,
                  jobTitle: 'Microsoft Certified Trainer (MCT)',
                  description: 'Certyfikowany Trener Microsoft specjalizujący się w szkoleniach z Power BI, Excel, SQL i VBA.',
                  sameAs: ['https://www.linkedin.com/in/radoslawsobczak'],
                  knowsAbout: ['Power BI', 'Microsoft Excel', 'SQL', 'VBA', 'Power Query', 'DAX'],
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'pbix.pl',
                  url: siteUrl,
                  description: 'Specjalistyczne szkolenia z Power BI, Excel, SQL i VBA.',
                  founder: {
                    '@type': 'Person',
                    name: 'Radosław Sobczak',
                  },
                  areaServed: 'PL',
                  knowsLanguage: ['pl', 'en'],
                },
                {
                  '@type': 'WebSite',
                  url: siteUrl,
                  name: 'pbix.pl',
                  description: 'Szkolenia Power BI, Excel, SQL, VBA – Radosław Sobczak MCT',
                  inLanguage: 'pl-PL',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: `${siteUrl}/szkolenia?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, background: '#ffffff', color: '#1d1d1f', fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
