export type CategoryTone = { bg: string; fg: string; ink: string };

export const CATEGORY_COLORS: Record<string, CategoryTone> = {
  Wszystkie: { bg: '#0b0d0c', fg: '#fbfcfb', ink: '#0b0d0c' },
  'Power BI': { bg: '#F2C811', fg: '#0b0d0c', ink: '#7A6200' },
  Excel: { bg: '#217346', fg: '#fbfcfb', ink: '#217346' },
  SQL: { bg: '#35A7E8', fg: '#0b0d0c', ink: '#0E6BA8' },
  'Wizualizacja danych': { bg: '#D35230', fg: '#fbfcfb', ink: '#B8401F' },
};

const ALIASES: Record<string, string> = {
  Wizualizacja: 'Wizualizacja danych',
  'Data visualization': 'Wizualizacja danych',
  'Data Visualization': 'Wizualizacja danych',
  All: 'Wszystkie',
};

export function toneFor(category: string): CategoryTone {
  return CATEGORY_COLORS[ALIASES[category] ?? category] ?? CATEGORY_COLORS.Wszystkie;
}
