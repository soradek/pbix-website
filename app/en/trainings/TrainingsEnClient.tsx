'use client';

import SzkoleniasClient from '@/app/szkolenia/SzkoleniasClient';

export default function TrainingsEnClient({ initialCategory }: { initialCategory?: string }) {
  return <SzkoleniasClient lang="en" initialCategory={initialCategory} />;
}
