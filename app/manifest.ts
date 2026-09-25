import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'pbix.pl – Radosław Sobczak',
    short_name: 'pbix.pl',
    description: 'Szkolenia Power BI, Excel i SQL dla firm.',
    start_url: '/',
    display: 'browser',
    background_color: '#fbfcfb',
    theme_color: '#0b0d0c',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
