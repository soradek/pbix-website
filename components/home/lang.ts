export type Lang = 'pl' | 'en';

export const ROUTES = {
  pl: {
    trainings: '/szkolenia',
    training: (slug: string) => `/szkolenia/${slug}`,
    category: (category: string) => `/szkolenia?kategoria=${encodeURIComponent(category)}`,
    contact: '/kontakt',
    projects: '/projekty',
  },
  en: {
    trainings: '/en/trainings',
    training: (slug: string) => `/en/trainings/${slug}`,
    category: (category: string) => `/en/trainings?category=${encodeURIComponent(category)}`,
    contact: '/en/contact',
    projects: '/en/projects',
  },
} as const;
