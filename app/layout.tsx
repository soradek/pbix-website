import type { Metadata } from 'next';
import { geist, geistMono } from '@/app/fonts';
import { headers } from 'next/headers';
import './globals.css';
import TrackingScripts from '@/components/TrackingScripts';
import Preloader from '@/components/Preloader';
import GA4Router from '@/components/GA4Router';
import CookieBanner from '@/components/CookieBanner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ORGANIZATION_ID, postalAddressSchema } from '@/lib/business';


const siteUrl = 'https://www.pbix.pl/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Szkolenia AI, Power BI, Excel, SQL | Radosław Sobczak – Certyfikowany Trener Microsoft (MCT)',
    // Pages set their own full title (with the "| pbix.pl" suffix)
    template: '%s',
  },
  description:
    'Szkolenia Power BI, Excel i VBA dla firm. Ponad 4 500 przeszkolonych pracowników, ocena 4,92/5. Stacjonarnie, online i po angielsku.',
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
      'Szkolenia Power BI, Excel i VBA dla firm. Ponad 4 500 przeszkolonych pracowników, ocena 4,92/5. Stacjonarnie, online i po angielsku.',
    images: [
      {
        url: 'https://www.pbix.pl/og.jpg',
        secureUrl: 'https://www.pbix.pl/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Radosław Sobczak – Certyfikowany Trener Microsoft Power BI, Excel, SQL',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szkolenia AI, Power BI, Excel, SQL | Radosław Sobczak MCT',
    description:
      'Szkolenia Power BI, Excel i VBA dla firm. Ponad 4 500 przeszkolonych pracowników, ocena 4,92/5. Stacjonarnie, online i po angielsku.',
    images: ['https://www.pbix.pl/og.jpg'],
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
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Hide the server-rendered cookie banner before first paint when consent is already stored */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{localStorage.getItem('pbix_consent_v1')&&document.documentElement.classList.add('has-consent')}catch(e){}",
          }}
        />
        {/* Facebook / Messenger app id (Next.js metadata API doesn't expose fb:*) */}
        <meta property="fb:app_id" content="966242223397117" />
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
                  email: 'kontakt@pbix.pl',
                  jobTitle: 'Microsoft Certified Trainer (MCT)',
                  description: 'Certyfikowany Trener Microsoft specjalizujący się w szkoleniach z Power BI, Excel, SQL i VBA.',
                  sameAs: ['https://www.linkedin.com/in/radoslawsobczak'],
                  knowsAbout: ['Power BI', 'Microsoft Excel', 'SQL', 'VBA', 'Power Query', 'DAX'],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'kontakt@pbix.pl',
                    contactType: 'customer service',
                    availableLanguage: ['Polish', 'English'],
                  },
                },
                {
                  '@type': 'EducationalOrganization',
                  '@id': ORGANIZATION_ID,
                  name: 'pbix.pl',
                  url: siteUrl,
                  email: 'kontakt@pbix.pl',
                  description: 'Specjalistyczne szkolenia z Power BI, Excel, SQL i VBA.',
                  founder: {
                    '@type': 'Person',
                    name: 'Radosław Sobczak',
                  },
                  areaServed: 'PL',
                  address: postalAddressSchema(),
                  knowsLanguage: ['pl', 'en'],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'kontakt@pbix.pl',
                    contactType: 'customer service',
                    availableLanguage: ['Polish', 'English'],
                  },
                },
                {
                  '@type': 'WebSite',
                  url: siteUrl,
                  name: 'pbix.pl',
                  description: 'Szkolenia Power BI, Excel, SQL, VBA – Radosław Sobczak MCT',
                  inLanguage: 'pl-PL',
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`} style={{ margin: 0 }}>
        <Preloader />
        <TrackingScripts />
        <GA4Router />
        <CookieBanner />
{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
