declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const metadata: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    category: string;
    readingTime: string;
    coverImage?: string;
    relatedTrainingSlug?: string;
    keywords?: string[];
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
