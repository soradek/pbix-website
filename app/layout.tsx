import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700'], display: 'swap' });

const siteUrl = 'https://www.pbix.pl';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Szkolenia AI, Power BI, Excel, SQL | Radosław Sobczak – Certyfikowany Trener Microsoft (MCT)',
    template: '%s | pbix.pl – Radosław Sobczak',
  },
  description:
    'Praktyczne szkolenia dla firm. Przekuj dane w wiedzę! Zamów szkolenie dla Twojego zespołu.',
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
    title: 'Szkolenia AI, Power BI, Excel, SQL | Radosław Sobczak MCT',
    description:
      'Praktyczne szkolenia dla firm. Przekuj dane w wiedzę! Zamów szkolenie dla Twojego zespołu.',
    images: [
      {
        url: 'https://www.pbix.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Radosław Sobczak – Certyfikowany Trener Microsoft Power BI, Excel, SQL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szkolenia AI, Power BI, Excel, SQL | Radosław Sobczak MCT',
    description:
      'Praktyczne szkolenia dla firm. Przekuj dane w wiedzę! Zamów szkolenie dla Twojego zespołu.',
    images: ['https://www.pbix.pl/og-image.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/';
  const lang = pathname.startsWith('/en') ? 'en' : 'pl';
  return (
    <html lang={lang}>
      <head>
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
      <body className={inter.className} style={{ margin: 0, background: '#ffffff', color: '#1d1d1f' }}>
        <CustomCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
