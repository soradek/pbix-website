import type { Training } from './trainings';
import type { FAQItem } from './faq';

// Local landing pages targeting "<category> + Poznań". Program pages stay canonical
// for product queries; hubs only link to them with one sentence each.

export interface LocalHub {
  slug: string;
  category: Training['category'];
  /** Short name used in link labels, e.g. "Excel" */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  local: {
    title: string;
    paragraphs: string[];
    format: string;
    problemsTitle: string;
    problems: string[];
  };
  programsTitle: string;
  programs: { slug: string; summary: string }[];
  /** Testimonials from these companies are shown first */
  reviewsFirst: string[];
  showQuiz: boolean;
  faqTitle: string;
  faq: FAQItem[];
}

// Clients from Wielkopolska confirmed by the owner (slugs from data/clients.ts)
export const REGIONAL_CLIENT_SLUGS = [
  'volkswagen',
  'kimball',
  'aluplast',
  'top-farms',
  'osi-foodworks',
  'wsb',
  'unilever',
  'eurocash',
];

export const localHubs: LocalHub[] = [
  {
    slug: 'szkolenia-excel-poznan',
    category: 'Excel',
    name: 'Excel',
    metaTitle: 'Szkolenia Excel Poznań i Wielkopolska dla firm | pbix.pl',
    metaDescription:
      'Zamknięte szkolenia Excel dla zespołów w Poznaniu i Wielkopolsce: od podstaw po Power Query, VBA i AI. W siedzibie firmy lub online. Trener Microsoft MCT.',
    h1: 'Szkolenia Excel dla firm w Poznaniu i Wielkopolsce',
    lead: 'Zamknięte szkolenia dla jednego zespołu, w Waszej siedzibie albo online. Od podstaw arkusza po Power Query, VBA i pracę z AI.',
    local: {
      title: 'Excel w firmach z Wielkopolski',
      paragraphs: [
        'Szkolenia Excel prowadzę jako zamknięte warsztaty dla jednego zespołu: stacjonarnie w Waszej siedzibie w Poznaniu lub w innym mieście Wielkopolski, albo online na żywo przez Microsoft Teams lub Zoom. Pracujemy na sprzęcie uczestników, a na życzenie przywożę laptopy i projektor. Cenę ustalam za grupę, nie za osobę.',
        'Poziom i zakres dobieram do zespołu. W jednej firmie często potrzebne są dwie ścieżki: podstawy i tabele przestawne dla działów, które dopiero porządkują arkusze, oraz Power Query, VBA albo praca z AI dla osób, które co tydzień ręcznie składają ten sam raport.',
      ],
      format: 'Stacjonarnie w Poznaniu i w całej Wielkopolsce albo online na żywo. Grupa do 12 osób, cena za grupę.',
      problemsTitle: 'Z czym przychodzą zespoły',
      problems: [
        'Produkcja: zestawienia z systemu ERP, które co miesiąc trzeba ręcznie łączyć i czyścić przed raportem.',
        'Logistyka: pliki z tysiącami wierszy dostaw i stanów, w których formuły wyszukiwania spowalniają cały arkusz.',
        'Automotive: raporty jakości i harmonogramy, które przechodzą przez kilka działów i każdy przerabia je po swojemu.',
        'Handel: analizy sprzedaży według sklepów, regionów i produktów budowane co tydzień od nowa.',
        'Finanse: uzgadnianie danych z kilku źródeł i zamknięcie miesiąca oparte na kopiuj-wklej.',
      ],
    },
    programsTitle: 'Programy szkoleń Excel',
    programs: [
      { slug: 'excel-poziom-podstawowy', summary: 'Obsługa arkusza, podstawowe formuły, formatowanie danych i pierwsze tabele przestawne.' },
      { slug: 'excel-poziom-srednio-zaawansowany', summary: 'Funkcje wyszukiwania i logiczne, dynamiczne tabele przestawne i formatowanie warunkowe oparte na formułach.' },
      { slug: 'excel-poziom-zaawansowany', summary: 'Funkcje dynamiczne Excela 365, Power Query, Power Pivot i interaktywne dashboardy.' },
      { slug: 'excel-power-query', summary: 'Import, łączenie i przekształcanie danych z wielu źródeł bez kopiowania i bez makr.' },
      { slug: 'excel-vba', summary: 'Automatyzacja powtarzalnych zadań: od pierwszego makra po własne funkcje i formularze.' },
      { slug: 'excel-ai', summary: 'Chatboty i asystenci AI do pisania formuł, czyszczenia danych i automatyzacji pracy w Excelu.' },
    ],
    reviewsFirst: ['Boston Scientific', 'SWEGON Sp. z o.o.', 'ROCKWOOL Group', 'NRW Water'],
    showQuiz: true,
    faqTitle: 'Pytania o szkolenia Excel w Poznaniu',
    faq: [
      {
        q: 'Czy szkolenie Excel może odbyć się w naszej siedzibie w Poznaniu?',
        a: 'Tak. Szkolenia Excel prowadzę jako zamknięte warsztaty w siedzibie firmy, w Poznaniu i w innych miastach Wielkopolski. Domyślnie pracujemy na sprzęcie uczestników, a na życzenie przywożę laptopy dla całej grupy i projektor.',
      },
      {
        q: 'Czy prowadzisz szkolenia poza Poznaniem, np. w Kaliszu, Koninie, Pile czy Lesznie?',
        a: 'Tak. Szkolenia stacjonarne prowadzę w całej Wielkopolsce i w całej Polsce. Jeśli zespół pracuje w kilku lokalizacjach, szkolenie może odbyć się online na żywo, w tym samym warsztatowym formacie.',
      },
      {
        q: 'Jak dobrać poziom Excela, gdy w zespole są osoby o różnych umiejętnościach?',
        a: 'Zacznij od krótkiego quizu na tej stronie. Dla całego zespołu przygotowuję test poziomujący, a na jego podstawie proponuję jeden poziom albo podział na dwie grupy, np. poziom podstawowy i Power Query.',
      },
      {
        q: 'Jak ustalamy termin szkolenia?',
        a: 'Termin ustalam indywidualnie z każdą firmą. Napisz przez formularz, ile osób ma wziąć udział, jakie dni wchodzą w grę i czy wolicie szkolenie w siedzibie, czy online. Odpowiem z propozycją terminu i programu.',
      },
    ],
  },
  {
    slug: 'szkolenia-power-bi-poznan',
    category: 'Power BI',
    name: 'Power BI',
    metaTitle: 'Szkolenia Power BI Poznań i Wielkopolska dla firm | pbix.pl',
    metaDescription:
      'Zamknięte szkolenia Power BI, DAX i Power Query dla zespołów w Poznaniu i Wielkopolsce. W siedzibie firmy lub online. Certyfikowany Trener Microsoft (MCT).',
    h1: 'Szkolenia Power BI dla firm w Poznaniu i Wielkopolsce',
    lead: 'Zamknięte szkolenia dla jednego zespołu, w Waszej siedzibie albo online. Od modelu danych przez DAX po publikację raportów.',
    local: {
      title: 'Power BI w firmach z Wielkopolski',
      paragraphs: [
        'Szkolenia Power BI prowadzę jako zamknięte warsztaty dla jednego zespołu: w Waszym biurze w Poznaniu lub w innej lokalizacji w Wielkopolsce, albo online na żywo. Power BI Desktop jest bezpłatny, więc przed szkoleniem wystarczy go zainstalować. Jeśli trzeba, pomagam to przygotować.',
        'Najwięcej daje szkolenie zbudowane na danych, z którymi zespół pracuje na co dzień. Zaczynamy od modelu danych, bo od niego zależy, czy raport będzie szybki i czy liczby zgodzą się z systemem źródłowym. Potem DAX i publikacja w Power BI Service, żeby raport trafił do osób, które na jego podstawie podejmują decyzje.',
      ],
      format: 'Stacjonarnie w Poznaniu i w całej Wielkopolsce albo online na żywo. Grupa do 12 osób, cena za grupę.',
      problemsTitle: 'Z czym przychodzą zespoły',
      problems: [
        'Produkcja: wskaźniki przestojów, braków i wydajności liczone ręcznie w arkuszach z kilku zmian i linii.',
        'Logistyka: statusy dostaw i obłożenie magazynu, które powinny być widoczne na bieżąco, a nie w cotygodniowym pliku.',
        'Automotive: dane z kilku systemów (produkcja, jakość, ERP) do połączenia w jeden model.',
        'Handel: sprzedaż i marża według kanałów, z porównaniem rok do roku bez ręcznych przeliczeń.',
        'Finanse: raport zarządczy z budżetem i wykonaniem w jednym miejscu zamiast kilkunastu zakładek.',
      ],
    },
    programsTitle: 'Programy szkoleń Power BI',
    programs: [
      { slug: 'microsoft-power-bi', summary: 'Pełny proces pracy w Power BI: pobieranie i przekształcanie danych, wizualizacje i publikacja raportów.' },
      { slug: 'microsoft-power-query-powerbi', summary: 'Automatyczne pobieranie i czyszczenie danych z Excela, baz SQL i plików PDF w edytorze Power Query.' },
      { slug: 'microsoft-dax', summary: 'Miary, kolumny obliczeniowe i złożone wyrażenia DAX dla osób, które już pracują w Power BI.' },
    ],
    reviewsFirst: ['Toyota Material Handling Polska', 'AoV', 'Jit Team'],
    showQuiz: false,
    faqTitle: 'Pytania o szkolenia Power BI w Poznaniu',
    faq: [
      {
        q: 'Czy szkolenie Power BI może odbyć się w naszym biurze w Poznaniu?',
        a: 'Tak. Szkolenia Power BI prowadzę w siedzibie firmy, w Poznaniu i w innych miastach Wielkopolski. Uczestnicy potrzebują laptopów z zainstalowanym Power BI Desktop, który jest bezpłatny. Na życzenie przywożę laptopy dla całej grupy.',
      },
      {
        q: 'Czy możemy pracować na danych naszej firmy?',
        a: 'Tak. W programie dedykowanym buduję ćwiczenia na Waszych raportach i plikach. Zakres danych i sposób ich przygotowania ustalamy przed szkoleniem.',
      },
      {
        q: 'Od którego szkolenia zacząć: Power BI, Power Query czy DAX?',
        a: 'Dla zespołów, które zaczynają, najlepszy jest „Microsoft Power BI”: obejmuje cały proces i wprowadzenie do DAX. Szkolenie DAX zakłada podstawową znajomość Power BI Desktop. Power Query wybierz, jeśli najwięcej czasu zajmuje przygotowanie danych.',
      },
      {
        q: 'Co jeśli zespół pracuje w kilku oddziałach w Wielkopolsce?',
        a: 'Wtedy sprawdza się szkolenie online na żywo przez Microsoft Teams lub Zoom. Ma ten sam warsztatowy format co zajęcia w sali: praca na żywo i pytania w trakcie.',
      },
    ],
  },
  {
    slug: 'szkolenia-sql-poznan',
    category: 'SQL',
    name: 'SQL',
    metaTitle: 'Szkolenia SQL Poznań i Wielkopolska dla firm | pbix.pl',
    metaDescription:
      'Zamknięte szkolenia SQL Server dla analityków i zespołów biznesowych w Poznaniu i Wielkopolsce. W siedzibie firmy lub online. Trener Microsoft MCT.',
    h1: 'Szkolenia SQL dla firm w Poznaniu i Wielkopolsce',
    lead: 'Zamknięte szkolenie dla jednego zespołu, w Waszej siedzibie albo online. Zapytania SQL na potrzeby raportowania, bez doświadczenia programistycznego.',
    local: {
      title: 'SQL w firmach z Wielkopolski',
      paragraphs: [
        'Szkolenie SQL prowadzę jako zamknięty warsztat dla jednego zespołu: w Waszej siedzibie w Poznaniu lub w innym mieście Wielkopolski, albo online na żywo. Pracujemy w SQL Server Management Studio.',
        'To szkolenie dla analityków, kontrolerów i zespołów biznesowych, nie dla administratorów baz danych. Uczę pisania zapytań na potrzeby raportowania: pobierania, filtrowania, łączenia i grupowania danych, tak żeby nie czekać na każdy eksport z działu IT. Zapytanie SQL może też być źródłem danych dla raportu w Power BI albo w Excelu.',
      ],
      format: 'Stacjonarnie w Poznaniu i w całej Wielkopolsce albo online na żywo. Grupa do 12 osób, cena za grupę.',
      problemsTitle: 'Z czym przychodzą zespoły',
      problems: [
        'Produkcja: dane z systemów produkcyjnych, z których potrzebny jest tylko wycinek, a eksport zwraca wszystko.',
        'Logistyka: historia przesyłek i stanów w bazie zbyt dużej, żeby wygodnie analizować ją w Excelu.',
        'Automotive: łączenie tabel z danymi o częściach, dostawcach i reklamacjach.',
        'Handel: transakcje do zsumowania według okresów, sklepów i grup produktów.',
        'Finanse: dane do uzgodnienia między systemami bez ręcznego porównywania plików.',
      ],
    },
    programsTitle: 'Program szkolenia SQL',
    programs: [
      { slug: 'microsoft-sql-server', summary: 'SELECT od podstaw, grupowanie, JOIN, podzapytania i CTE oraz wprowadzenie do wydajności zapytań.' },
    ],
    reviewsFirst: [],
    showQuiz: false,
    faqTitle: 'Pytania o szkolenia SQL w Poznaniu',
    faq: [
      {
        q: 'Czy szkolenie SQL może odbyć się w naszej siedzibie w Poznaniu?',
        a: 'Tak. Szkolenie prowadzę w siedzibie firmy, w Poznaniu i w innych miastach Wielkopolski, albo online na żywo przez Microsoft Teams lub Zoom.',
      },
      {
        q: 'Kto z zespołu powinien wziąć udział w szkoleniu SQL?',
        a: 'Osoby, które regularnie potrzebują danych z bazy do raportów i analiz: analitycy, kontrolerzy, specjaliści BI i zespoły sprzedaży czy logistyki. Doświadczenie programistyczne nie jest potrzebne.',
      },
      {
        q: 'Jakie oprogramowanie trzeba przygotować?',
        a: 'Pracujemy w SQL Server Management Studio. Jeśli firma nie ma go na komputerach uczestników, pomogę przygotować środowisko przed szkoleniem albo przywiozę laptopy dla grupy.',
      },
      {
        q: 'Czy SQL przyda się zespołowi, który raportuje w Power BI lub Excelu?',
        a: 'Tak. Zapytanie SQL pozwala pobrać z bazy tylko potrzebne dane, już przefiltrowane i zgrupowane, a potem użyć ich jako źródła raportu w Power BI albo w Excelu.',
      },
    ],
  },
];

export function getHubBySlug(slug: string) {
  return localHubs.find(h => h.slug === slug);
}

/** Hub that lists a given program, for the link from program pages */
export function getHubForTraining(trainingSlug: string) {
  return localHubs.find(h => h.programs.some(p => p.slug === trainingSlug));
}
