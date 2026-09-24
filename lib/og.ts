// Shared social preview image. Next.js merges metadata shallowly, so any page that
// defines its own `openGraph` / `twitter` object must include these images itself,
// otherwise Facebook / Messenger / LinkedIn get no thumbnail.
export const OG_IMAGES = [
  {
    url: 'https://www.pbix.pl/og.jpg',
    secureUrl: 'https://www.pbix.pl/og.jpg',
    width: 1200,
    height: 630,
    alt: 'Radosław Sobczak – Certyfikowany Trener Microsoft Power BI, Excel, SQL',
    type: 'image/jpeg',
  },
];

export const TWITTER_IMAGES = ['https://www.pbix.pl/og.jpg'];
