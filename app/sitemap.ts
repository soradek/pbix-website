import { MetadataRoute } from 'next';
import { trainings } from '@/data/trainings';
import { getAllPosts } from '@/lib/blog';

const siteUrl = 'https://www.pbix.pl';

function hreflang(pl: string, en: string) {
  return { languages: { pl, en, 'x-default': pl } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const trainingPages = trainings.map(t => ({
    url: `${siteUrl}/szkolenia/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: hreflang(
      `${siteUrl}/szkolenia/${t.slug}`,
      `${siteUrl}/en/trainings/${t.slug}`,
    ),
  }));

  const enTrainingPages = trainings.map(t => ({
    url: `${siteUrl}/en/trainings/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: hreflang(
      `${siteUrl}/szkolenia/${t.slug}`,
      `${siteUrl}/en/trainings/${t.slug}`,
    ),
  }));

  return [
    // Polish
    {
      url: siteUrl,
      lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0,
      alternates: hreflang(siteUrl, `${siteUrl}/en`),
    },
    {
      url: `${siteUrl}/szkolenia`,
      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9,
      alternates: hreflang(`${siteUrl}/szkolenia`, `${siteUrl}/en/trainings`),
    },
    {
      url: `${siteUrl}/projekty`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8,
      alternates: hreflang(`${siteUrl}/projekty`, `${siteUrl}/en/projects`),
    },
    {
      url: `${siteUrl}/zapisy`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7,
      alternates: hreflang(`${siteUrl}/zapisy`, `${siteUrl}/en/register`),
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6,
      alternates: hreflang(`${siteUrl}/kontakt`, `${siteUrl}/en/contact`),
    },
    ...trainingPages,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7,
    },
    ...getAllPosts().map(p => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // English
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9,
      alternates: hreflang(siteUrl, `${siteUrl}/en`),
    },
    {
      url: `${siteUrl}/en/trainings`,
      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8,
      alternates: hreflang(`${siteUrl}/szkolenia`, `${siteUrl}/en/trainings`),
    },
    {
      url: `${siteUrl}/en/projects`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7,
      alternates: hreflang(`${siteUrl}/projekty`, `${siteUrl}/en/projects`),
    },
    {
      url: `${siteUrl}/en/register`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6,
      alternates: hreflang(`${siteUrl}/zapisy`, `${siteUrl}/en/register`),
    },
    {
      url: `${siteUrl}/en/contact`,
      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5,
      alternates: hreflang(`${siteUrl}/kontakt`, `${siteUrl}/en/contact`),
    },
    ...enTrainingPages,
  ];
}
