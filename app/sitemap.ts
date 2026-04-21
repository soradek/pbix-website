import { MetadataRoute } from 'next';
import { trainings } from '@/data/trainings';

const siteUrl = 'https://www.pbix.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const trainingPages = trainings.map(t => ({
    url: `${siteUrl}/szkolenia/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const enTrainingPages = trainings.map(t => ({
    url: `${siteUrl}/en/trainings/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    // Polish
    { url: siteUrl,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/szkolenia`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/zapisy`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/kontakt`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...trainingPages,
    // English
    { url: `${siteUrl}/en`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/en/trainings`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/en/register`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/en/contact`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...enTrainingPages,
  ];
}
