export interface Project {
  industry: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
}

export const projectsPl: Project[] = [
  {
    industry: 'FMCG / Handel detaliczny',
    title: 'Dashboard sprzedażowy w czasie rzeczywistym',
    problem:
      'Zarząd otrzymywał ponad 30 raportów Excelowych tygodniowo. Każdy dział wysyłał własny plik, bez wspólnej definicji KPI. Nikt nie wiedział, które liczby są aktualne.',
    solution:
      'Jeden dashboard zamiast dziesiątek plików: dostępny przez link i aktualizowany automatycznie każdej nocy. Wszystkie wskaźniki zdefiniowane w jednym miejscu, dostępne z komputera, tabletu i telefonu.',
    result: '80% mniej czasu na raportowanie. Jeden widok dla całego zarządu, aktualizowany każdego ranka.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
  },
  {
    industry: 'Produkcja',
    title: 'Automatyzacja zamknięcia miesiąca',
    problem:
      'Zamknięcie miesiąca zajmowało dwa tygodnie ręcznego zbierania danych z SAP, arkuszy kalkulacyjnych i baz danych. Błędy kopiowania i opóźnione decyzje były normą.',
    solution:
      'Dane z trzech różnych systemów firmy spływają automatycznie do jednego raportu każdej nocy. Zamiast ręcznie zbierać i sklejać pliki, analitycy rano otwierają gotowe zestawienie.',
    result: 'Czas przygotowania raportu miesięcznego skrócony z 14 do 2 dni. Zero błędów wynikających z ręcznego kopiowania.',
    tags: ['Power BI', 'Power Query', 'SAP Connector', 'SQL Server'],
  },
  {
    industry: 'Handel detaliczny, 200+ sklepów',
    title: 'Platforma analityki HR',
    problem:
      'Brak jednego źródła danych o zatrudnieniu, rotacji i absencji w sieci ponad 200 sklepów. Każdy manager regionalny prowadził własnego Excela. Decyzje kadrowe były podejmowane bez danych.',
    solution:
      'Jeden raport z danymi o całej sieci, odświeżający się automatycznie co tydzień. Każdy manager widzi tylko swój region, bez dostępu do danych innych. Koniec z dziesiątkami osobnych arkuszy przesyłanych mailem.',
    result: 'Decyzje kadrowe oparte na danych. Wykryte wzorce rotacji pozwoliły obniżyć koszty rekrutacji w skali roku.',
    tags: ['Power BI', 'Power Query', 'Row Level Security', 'DAX'],
  },
  {
    industry: 'Finanse / Controlling',
    title: 'Jeden raport zamiast dziesiątek plików w obiegu',
    problem:
      'Każdy cykl raportowy wyglądał tak samo: analityk eksportuje dane z Excela, ręcznie uzupełnia dziesiątki slajdów w PowerPoint i wysyła je mailem do kilkunastu osób. Trzy dni później dochodzą nowe dane i cały proces zaczyna się od nowa. W skrzynkach krążą różne wersje tego samego raportu, a nikt nie wie, która jest aktualna.',
    solution:
      'Zamiast pliku w załączniku jeden raport dostępny przez link. Dane z Excela i systemu firmy odświeżają się automatycznie każdej nocy. Każdy odbiorca klika ten sam link i zawsze widzi bieżące liczby, niezależnie od tego, kiedy otworzy raport.',
    result:
      'Zero ręcznego uzupełniania slajdów. Koniec z pytaniem „którą wersją dysponujesz?”. Raport miesięczny, kwartalny czy roczny nie wymaga już dni ani tygodni przygotowań: załaduj nowe dane, odśwież, gotowe.',
    tags: ['Power BI', 'Power Query', 'Excel', 'Power BI Service'],
  },
];

export const projectsEn: Project[] = [
  {
    industry: 'FMCG / Retail',
    title: 'Real-time sales performance dashboard',
    problem:
      'Management received 30+ Excel reports every week. Each department sent its own file with its own KPI definitions. No one knew which numbers were current.',
    solution:
      'One dashboard instead of dozens of files: accessible via a link and updated automatically every night. All metrics defined in one place, available on any computer, tablet or phone.',
    result: '80% less time spent on reporting. One view for the entire board, updated every morning.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
  },
  {
    industry: 'Manufacturing',
    title: 'Month-end close automation',
    problem:
      'Closing the month took two weeks of manually gathering data from SAP, spreadsheets and databases. Copy-paste errors and delayed decisions were the norm.',
    solution:
      'Data from three different company systems flows automatically into one report every night. Instead of manually collecting and merging files, analysts open a ready report in the morning.',
    result: 'Monthly report preparation cut from 14 days to 2. Zero errors from manual copy-pasting.',
    tags: ['Power BI', 'Power Query', 'SAP Connector', 'SQL Server'],
  },
  {
    industry: 'Retail, 200+ stores',
    title: 'HR analytics platform',
    problem:
      'No single source of truth for headcount, turnover and absence data across a network of 200+ stores. Each regional manager kept their own Excel. Workforce decisions were made without data.',
    solution:
      'One report covering the entire network, refreshed automatically every week. Each manager sees only their own region, with no access to anyone else’s data. No more dozens of separate spreadsheets sent by email.',
    result: 'Workforce decisions backed by data. Identified turnover patterns reduced annual recruitment costs.',
    tags: ['Power BI', 'Power Query', 'Row Level Security', 'DAX'],
  },
  {
    industry: 'Finance / Controlling',
    title: 'One report instead of files circulating in inboxes',
    problem:
      'Every reporting cycle looked the same: an analyst exports data from Excel, manually fills in dozens of PowerPoint slides and emails them to fifteen people. Three days later new data arrives and the whole process starts again. Different versions of the same report float around in inboxes and no one knows which one is current.',
    solution:
      'Instead of a file attachment, one report accessible via a link. Data from Excel and the company system refreshes automatically every night. Every recipient clicks the same link and always sees the latest numbers, no matter when they open it.',
    result:
      'Zero manual slide updates. No more “which version do you have?”. Monthly, quarterly or annual reports no longer require days or weeks of preparation: load new data, refresh, done.',
    tags: ['Power BI', 'Power Query', 'Excel', 'Power BI Service'],
  },
];
