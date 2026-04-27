import type { ComponentType } from 'react';

import Post1, { metadata as meta1 } from '@/content/blog/5-bledow-w-dax.mdx';
import Post2, { metadata as meta2 } from '@/content/blog/power-query-vs-vba.mdx';
import Post3, { metadata as meta3 } from '@/content/blog/jak-przygotowac-zespol-do-power-bi.mdx';

export type BlogCategory =
  | 'Power BI'
  | 'Excel'
  | 'SQL'
  | 'Wizualizacja'
  | 'AI'
  | 'Produktywność';

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
  readingTime: string;
  coverImage?: string;
  relatedTrainingSlug?: string;
  keywords?: string[];
}

export interface BlogPost extends BlogPostMeta {
  Component: ComponentType;
}

const allPosts: BlogPost[] = [
  { ...(meta1 as BlogPostMeta), Component: Post1 },
  { ...(meta2 as BlogPostMeta), Component: Post2 },
  { ...(meta3 as BlogPostMeta), Component: Post3 },
];

export function getAllPosts(): BlogPost[] {
  return [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getCategories(): BlogCategory[] {
  const set = new Set<BlogCategory>();
  for (const p of allPosts) set.add(p.category);
  return Array.from(set);
}
