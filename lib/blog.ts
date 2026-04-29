import type { ComponentType } from 'react';

import Post1, { metadata as meta1 } from '@/content/blog/5-bledow-w-dax.mdx';
import Post2, { metadata as meta2 } from '@/content/blog/power-query-vs-vba.mdx';
import Post3, { metadata as meta3 } from '@/content/blog/jak-przygotowac-zespol-do-power-bi.mdx';
import Post4, { metadata as meta4 } from '@/content/blog/power-bi-vs-excel.mdx';
import Post5, { metadata as meta5 } from '@/content/blog/copilot-w-power-bi.mdx';
import Post6, { metadata as meta6 } from '@/content/blog/ai-w-excelu.mdx';
import Post7, { metadata as meta7 } from '@/content/blog/chatgpt-do-pisania-sql.mdx';
import Post8, { metadata as meta8 } from '@/content/blog/ai-w-prezentacjach-i-dashboardach.mdx';

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
  { ...(meta4 as BlogPostMeta), Component: Post4 },
  { ...(meta5 as BlogPostMeta), Component: Post5 },
  { ...(meta6 as BlogPostMeta), Component: Post6 },
  { ...(meta7 as BlogPostMeta), Component: Post7 },
  { ...(meta8 as BlogPostMeta), Component: Post8 },
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
