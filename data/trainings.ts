export interface TrainingModule {
  title: string;
  items: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PricingTier {
  maxPeople: number;
  price: number;
  priceLabel: string;
}

export interface Training {
  slug: string;
  title: string;
  category: 'Power BI' | 'Excel' | 'SQL' | 'Wizualizacja danych';
  duration: string;
  price: number;
  priceLabel: string;
  pricingTiers: PricingTier[];
  description: string;
  targetAudience: string[];
  benefits: string[];
  program: TrainingModule[];
  faq?: FAQItem[];
  prerequisites: string;
  language?: string;
}

export const trainings: Training[] = [
  {
    slug: 'microsoft-power-bi',
    title: 'Microsoft Power BI',
    category: 'Power BI',
    duration: '2 dni / 16 godzin',
    price: 5800,
    priceLabel: 'od 5 800 zł',
    pricingTiers: [
      { maxPeople: 5, price: 5800, priceLabel: '5 800 zł' },
      { maxPeople: 7, price: 7500, priceLabel: '7 500 zł' },
      { maxPeople: 10, price: 8500, priceLabel: '8 500 zł' },
    ],
    description: 'Szkolenie „Microsoft Power BI" to idealny start dla każdego, kto chce wejść w świat nowoczesnej analizy danych i dynamicznych raportów. Uczestnicy poznają pełen proces pracy z Power BI – od pobierania i przekształcania danych, przez budowanie czytelnych wizualizacji, aż po publikację raportów dostępnych online i na urządzeniach mobilnych. Kurs kładzie nacisk na praktykę, dzięki czemu już w trakcie zajęć uczestnicy tworzą własne raporty gotowe do wykorzystania w codziennej pracy.',
    targetAudience: [
      'Użytkownicy Power BI Desktop chcący rozwinąć umiejętności zaawansowanego modelowania i przetwarzania danych',
      'Analitycy potrzebujący efektywnych narzędzi do prowadzenia złożonych analiz i budowania rozbudowanych raportów',
      'Managerowie szukający praktycznych sposobów na szybką i intuicyjną analizę dużych wolumenów danych',
    ],
    benefits: [
      'Skuteczna analiza danych z wielu źródeł – integracja i czyszczenie danych z różnych systemów',
      'Projektowanie nowoczesnych wizualizacji – estetyczne i przejrzyste dashboardy',
      'Wprowadzenie do języka DAX – miary i kolumny obliczeniowe',
      'Dostępność raportów niezależnie od urządzenia – przeglądarka i aplikacje mobilne',
      'Publikowanie i współdzielenie analiz przez Power BI Service',
    ],
    program: [
      { title: 'Wprowadzenie do Power BI', items: ['Czym jest Power BI i jak działa', 'Kluczowe zalety wykorzystania narzędzia w analizie danych'] },
      { title: 'Import danych z różnych źródeł', items: ['Pobieranie danych z plików Excel, CSV i tekstowych', 'Łączenie danych z folderów i ich automatyczne aktualizacje'] },
      { title: 'Praca z relacjami między danymi', items: ['Automatyczne i ręczne tworzenie relacji', 'Zarządzanie relacjami – kierunki filtrowania, kardynalność', 'Organizacja i porządkowanie modeli danych'] },
      { title: 'Czyszczenie i przygotowanie danych – Power Query', items: ['Przegląd funkcji edytora zapytań', 'Przekształcenia kolumn i wierszy, zmiana typów danych', 'Scalanie i dzielenie danych', 'Operacja unpivot', 'Automatyczna konsolidacja danych z różnych źródeł'] },
      { title: 'Analiza danych i język DAX', items: ['Wprowadzenie do języka DAX – co to jest i do czego służy', 'Tworzenie obliczeń z użyciem kluczowych funkcji (CALCULATE, SUM, COUNT, DIVIDE)', 'Szybkie miary i własne kolumny obliczeniowe', 'Budowanie miar wspierających wizualizację', 'Tworzenie kalendarza dat do analiz czasowych'] },
      { title: 'Projektowanie przejrzystych wizualizacji', items: ['Konfiguracja widoku strony – rozmiar, układ i proporcje', 'Przegląd dostępnych wizualizacji i ich zastosowania', 'Filtrowanie na różnych poziomach (strona, raport, wizualizacja)', 'Zasady interakcji między wizualizacjami', 'Formatowanie i wyrównywanie obiektów'] },
      { title: 'Publikacja i udostępnianie raportów', items: ['Eksport i publikacja raportów w Power BI Online', 'Udostępnianie analiz dla użytkowników końcowych'] },
    ],
    faq: [
      { q: 'Dla kogo przeznaczone są szkolenia Power BI?', a: 'Szkolenia kieruję do analityków, finansistów, specjalistów ds. sprzedaży, kontrolerów i wszystkich, którzy pracują z danymi. Są dostępne zarówno dla osób zaczynających przygodę z Power BI, jak i tych chcących usystematyzować i pogłębić swoją wiedzę.' },
      { q: 'Czy muszę znać język DAX przed szkoleniem?', a: 'Nie. Podstawy DAX są integralną częścią szkolenia. W zaawansowanych modułach omawiamy złożone formuły i optymalizację – wszystko dostosowane do aktualnego poziomu uczestników.' },
      { q: 'Czy otrzymam materiały szkoleniowe?', a: 'Tak – każdy uczestnik otrzymuje prezentacje, zestawy ćwiczeń oraz pliki warsztatowe. Po szkoleniu udostępniam listę sprawdzonych źródeł do samodzielnej nauki.' },
    ],
    prerequisites: 'Mile widziana podstawowa znajomość MS Excel',
    language: 'polski lub angielski',
  },
  {
    slug: 'microsoft-dax',
    title: 'Microsoft DAX',
    category: 'Power BI',
    duration: '2 dni / 16 godzin',
    price: 6000,
    priceLabel: 'od 6 000 zł',
    pricingTiers: [
      { maxPeople: 5, price: 6000, priceLabel: '6 000 zł' },
      { maxPeople: 7, price: 7800, priceLabel: '7 800 zł' },
      { maxPeople: 10, price: 9000, priceLabel: '9 000 zł' },
    ],
    description: 'Szkolenie Microsoft DAX wprowadza uczestników w świat języka Data Analysis Expressions – narzędzia niezbędnego do budowania zaawansowanych modeli analitycznych w Power BI. Uczestnicy zdobędą umiejętność tworzenia precyzyjnych miar, kolumn obliczeniowych oraz złożonych wyrażeń, które pozwolą wyciągnąć z danych znacznie więcej niż standardowe wizualizacje.',
    targetAudience: [
      'Analitycy potrzebujący narzędzi do budowania rozbudowanych raportów i wielowymiarowych analiz',
      'Użytkownicy Power BI Desktop rozwijający umiejętności zaawansowanego modelowania danych',
      'Managerowie szukający efektywnych sposobów interpretacji dużych zbiorów danych',
    ],
    benefits: [
      'Głębokie zrozumienie mechanizmów języka DAX i jego roli w modelowaniu danych',
      'Samodzielne tworzenie analiz czasowych z funkcjami Time Intelligence',
      'Zabezpieczenie danych w raportach z użyciem Row Level Security (RLS)',
      'Parametryzacja obliczeń umożliwiająca dynamiczne scenariusze analityczne',
      'Dobre praktyki pisania czytelnego, wydajnego kodu DAX',
    ],
    program: [
      { title: 'Projektowanie struktury tabel i relacji', items: ['Tworzenie tabel słownikowych', 'Budowa tabeli dat (CALENDAR, CALENDARAUTO, FORMAT)', 'Kolumny kalkulowane i typy danych', 'Relacje aktywne i nieaktywne', 'Hierarchie i łączenie danych z wielu źródeł'] },
      { title: 'Szybkie miary', items: ['Gotowe obliczenia i ich rozbudowa', 'Przekształcanie szybkich miar w złożone wyrażenia DAX'] },
      { title: 'Najczęściej używane funkcje DAX', items: ['Funkcje agregujące: SUM, AVERAGE, MIN, MAX, RANKX', 'Zliczanie: COUNT, COUNTA, DISTINCTCOUNT', 'Wyszukiwanie: RELATED, LOOKUPVALUE', 'Obsługa wyjątków: DIVIDE, BLANK, SELECTEDVALUE'] },
      { title: 'Zmiana kontekstu danych', items: ['Funkcje CALCULATE i FILTER', 'Sterowanie zakresem: ALL, ALLEXCEPT, ALLSELECTED'] },
      { title: 'Time Intelligence – analiza czasowa', items: ['SAMEPERIODLASTYEAR, LASTMONTH', 'PARALLELPERIOD, DATESYTD, TOTALMTD', 'LASTNONBLANK – ostatnie znane wartości'] },
      { title: 'Logika warunkowa i dobre praktyki', items: ['Funkcje IF i SWITCH w miarach', 'Zmienne i parametry w DAX', 'Komentowanie i strukturyzowanie kodu', 'Optymalizacja wydajności wyrażeń'] },
      { title: 'Bezpieczeństwo danych (RLS)', items: ['Implementacja Row Level Security', 'Funkcje USERNAME i USERPRINCIPALNAME'] },
    ],
    prerequisites: 'Podstawowa znajomość MS Excel i Power BI',
  },
  {
    slug: 'microsoft-power-query-powerbi',
    title: 'Microsoft Power Query',
    category: 'Power BI',
    duration: '2 dni / 16 godzin',
    price: 3500,
    priceLabel: 'od 3 500 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3500, priceLabel: '3 500 zł' },
      { maxPeople: 7, price: 4300, priceLabel: '4 300 zł' },
      { maxPeople: 10, price: 5000, priceLabel: '5 000 zł' },
    ],
    description: 'Szkolenie Microsoft Power Query to kurs dla osób, które chcą w pełni zapanować nad procesem przygotowywania danych w Power BI. Uczestnicy poznają edytor Power Query od środka – nauczą się automatyzować pobieranie danych, czyścić je ze źródeł tak różnych jak Excel, bazy SQL czy pliki PDF, a także łączyć i przekształcać dane z wielu heterogenicznych źródeł bez ręcznej ingerencji.',
    targetAudience: [
      'Regularni użytkownicy Power BI szukający narzędzi do zaawansowanego przekształcania danych',
      'Osoby chcące zautomatyzować przygotowywanie danych z wielu heterogenicznych źródeł',
      'Analitycy pracujący z niekompletnymi lub nieustrukturyzowanymi zbiorami danych',
      'Wszyscy, którzy chcą wyeliminować ręczne czyszczenie danych z Excela',
    ],
    benefits: [
      'Swobodna obsługa edytora Power Query i wszystkich jego narzędzi transformacji',
      'Automatyzacja pobierania i łączenia danych z Excela, CSV, baz danych i plików PDF',
      'Skuteczne czyszczenie i ujednolicanie danych – uzupełnianie braków, grupowanie, scalanie',
      'Łączenie i analiza danych z folderów lokalnych oraz chmurowych',
      'Zrozumienie języka M i samodzielna modyfikacja kodu',
    ],
    program: [
      { title: 'Rola Power Query w Power BI', items: ['Omówienie procesu modelowania danych', 'Identyfikacja i analiza błędów przed edycją', 'Tabele referencyjne, słownikowe i kalendarze dat', 'Normalizacja i denormalizacja zbiorów'] },
      { title: 'Transformacje danych', items: ['Segmentacja i łączenie kolumn', 'Unpivot i pivot danych', 'Transpozycja tabel', 'Kolumny warunkowe i niestandardowe', 'Grupowanie i agregacja', 'Uzupełnianie brakujących wartości', 'Obsługa dat i ustawień regionalnych'] },
      { title: 'Import z różnych źródeł', items: ['Pliki tekstowe: Excel, CSV, TXT', 'Bazy danych relacyjne', 'Pliki PDF', 'Automatyczne łączenie plików o tej samej strukturze', 'Konsolidacja plików o różnych strukturach', 'Scalanie i rozdzielanie zapytań'] },
      { title: 'Zarządzanie zapytaniami', items: ['Ładowanie, odświeżanie, wyłączanie zapytań', 'Zapytania referencyjne i duplikaty', 'Grupowanie i organizacja środowiska pracy'] },
      { title: 'Funkcje i parametryzacja', items: ['Tworzenie własnych funkcji ze zmiennymi', 'Parametry w zapytaniach', 'Powtarzalne transformacje w pętli'] },
      { title: 'Język M – poziom zaawansowany', items: ['Struktura składni języka M', 'Ręczna edycja w edytorze zaawansowanym', 'Kluczowe funkcje i nieszablonowe rozwiązania'] },
    ],
    prerequisites: 'Podstawowa znajomość MS Excel i Power BI',
  },
  {
    slug: 'excel-poziom-podstawowy',
    title: 'MS Excel – Poziom podstawowy',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 3400,
    priceLabel: 'od 3 400 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3400, priceLabel: '3 400 zł' },
      { maxPeople: 7, price: 4400, priceLabel: '4 400 zł' },
      { maxPeople: 10, price: 5250, priceLabel: '5 250 zł' },
    ],
    description: 'Szkolenie MS Excel: Poziom podstawowy to solidny start dla każdego, kto chce nauczyć się Excela od podstaw i wykorzystać go w codziennej pracy. W ciągu dwóch dni uczestnicy opanują obsługę arkuszy, podstawowe formuły, formatowanie danych i tworzenie tabel przestawnych – wszystko na praktycznych przykładach z życia zawodowego.',
    targetAudience: [
      'Osoby zaczynające pracę z Excelem lub posiadające jedynie szczątkowe doświadczenie',
      'Pracownicy, którzy potrzebują umiejętności arkuszowych w codziennych obowiązkach',
      'Osoby przygotowujące się do kursów na poziomie średniozaawansowanym lub zaawansowanym',
      'Każdy, kto chce pracować sprawniej i bez stresu z danymi liczbowymi',
    ],
    benefits: [
      'Pewna obsługa arkuszy kalkulacyjnych – od struktury pliku po zarządzanie danymi',
      'Praktyczna znajomość podstawowych formuł: SUMA, ŚREDNIA, JEŻELI, WYSZUKAJ.PIONOWO',
      'Tworzenie czytelnych tabel i wykresów prezentujących dane w profesjonalny sposób',
      'Przygotowanie dokumentów do druku i eksportu w kilku prostych krokach',
      'Zestaw skrótów klawiaturowych, które znacząco przyspieszają codzienną pracę',
    ],
    program: [
      { title: 'Środowisko pracy w Excelu', items: ['Interfejs i wstążka – najważniejsze elementy', 'Zarządzanie skoroszytami i arkuszami', 'Poruszanie się i zaznaczanie danych', 'Podstawowe skróty klawiaturowe'] },
      { title: 'Wprowadzanie i formatowanie danych', items: ['Typy danych: liczby, tekst, daty', 'Formatowanie komórek i zakresów', 'Formatowanie warunkowe', 'Wstawianie grafik i kształtów'] },
      { title: 'Podstawowe formuły i funkcje', items: ['Operatory matematyczne i odwołania do komórek', 'Funkcje: SUMA, ŚREDNIA, MIN, MAX, ILE.LICZB', 'Funkcja JEŻELI i prosta logika warunkowa', 'Funkcja WYSZUKAJ.PIONOWO – podstawy'] },
      { title: 'Praca z tabelami i danymi', items: ['Sortowanie i filtrowanie danych', 'Tabele Excela (formatuj jako tabelę)', 'Wyszukiwanie i zamiana danych', 'Usuwanie duplikatów'] },
      { title: 'Tabele przestawne – wprowadzenie', items: ['Tworzenie prostej tabeli przestawnej', 'Grupowanie i filtrowanie w tabeli przestawnej', 'Podstawowe wykresy przestawne'] },
      { title: 'Drukowanie i eksport', items: ['Ustawienia strony i obszar wydruku', 'Nagłówki i stopki', 'Eksport do PDF'] },
    ],
    prerequisites: 'Brak – szkolenie od zera',
  },
  {
    slug: 'excel-poziom-srednio-zaawansowany',
    title: 'MS Excel – Poziom średniozaawansowany',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 3900,
    priceLabel: 'od 3 900 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3900, priceLabel: '3 900 zł' },
      { maxPeople: 7, price: 4800, priceLabel: '4 800 zł' },
      { maxPeople: 10, price: 5500, priceLabel: '5 500 zł' },
    ],
    description: 'Szkolenie MS Excel na poziomie średniozaawansowanym to kurs dla osób, które już znają podstawy arkusza kalkulacyjnego i chcą znacząco podnieść swoją efektywność. Uczestnicy opanują zaawansowane funkcje wyszukiwania i logiki, nauczą się tworzyć dynamiczne tabele przestawne oraz stosować formatowanie warunkowe oparte na formułach – umiejętności, które robią realną różnicę w codziennej pracy analitycznej.',
    targetAudience: [
      'Osoby, które ukończyły poziom podstawowy lub samodzielnie opanowały fundamenty Excela',
      'Pracownicy biurowi i analityczni regularnie korzystający z arkuszy kalkulacyjnych',
      'Specjaliści ds. finansów, sprzedaży i raportowania chcący zwiększyć produktywność',
      'Osoby przygotowujące się do szkolenia z poziomu zaawansowanego lub Power Query',
    ],
    benefits: [
      'Biegłe stosowanie funkcji XWYSZUKAJ, INDEKS i PODAJ.POZYCJĘ w miejsce przestarzałego WYSZUKAJ.PIONOWO',
      'Zagnieżdżanie funkcji logicznych – wielowarunkowe analizy z JEŻELI, ORAZ, LUB i JEŻELI.BŁĄD',
      'Sprawna obróbka tekstu funkcjami LEWY, PRAWY, ZNAJDŹ, PODSTAW i ZŁĄCZ.TEKST',
      'Zaawansowane tabele przestawne z grupowaniem, polami obliczeniowymi i fragmentatorami',
      'Formatowanie warunkowe oparte na formułach – dynamiczne podświetlanie danych',
    ],
    program: [
      { title: 'Zaawansowane funkcje wyszukiwania', items: ['WYSZUKAJ.PIONOWO z przybliżonym i dokładnym dopasowaniem', 'XWYSZUKAJ – nowoczesna alternatywa dla WYSZUKAJ.PIONOWO', 'INDEKS i PODAJ.POZYCJĘ – elastyczne wyszukiwanie dwukierunkowe', 'Obsługa błędów w funkcjach wyszukiwania z JEŻELI.BŁĄD'] },
      { title: 'Logika warunkowa i zagnieżdżanie funkcji', items: ['Złożone formuły JEŻELI z wieloma warunkami', 'Funkcje ORAZ i LUB jako warunki logiczne', 'Funkcja JEŻELI.BŁĄD i JEŻELI.ND do obsługi wyjątków', 'Zagnieżdżanie funkcji – budowanie złożonych formuł krok po kroku'] },
      { title: 'Funkcje tekstowe i daty', items: ['Ekstrakcja tekstu: LEWY, PRAWY, FRAGMENT.TEKSTU', 'Analiza i wyszukiwanie: DŁ, ZNAJDŹ, SZUKAJ.TEKST', 'Zastępowanie i łączenie: PODSTAW, USUŃ.ZBĘDNE.ODSTĘPY, ZŁĄCZ.TEKST', 'Funkcje dat: ROK, MIESIĄC, DZIEŃ, DNI.ROBOCZE, DATA.RÓŻNICA'] },
      { title: 'Zaawansowane tabele przestawne', items: ['Grupowanie dat i wartości liczbowych', 'Pola i elementy obliczeniowe', 'Fragmentatory i osie czasu jako interaktywne filtry', 'Wykresy przestawne połączone z tabelą', 'Odświeżanie danych i automatyzacja aktualizacji'] },
      { title: 'Formatowanie warunkowe z formułami', items: ['Reguły oparte na formułach – dynamiczne podświetlanie wierszy', 'Skale kolorów, paski danych i zestawy ikon', 'Formatowanie na podstawie wartości z innej komórki', 'Zarządzanie i edycja wielu reguł jednocześnie'] },
      { title: 'Sprawdzanie poprawności i ochrona danych', items: ['Listy rozwijane i ograniczenia wprowadzania danych', 'Komunikaty błędów i podpowiedzi dla użytkownika', 'Ochrona wybranych komórek, arkuszy i skoroszytów', 'Udostępnianie pliku z ograniczonym dostępem do edycji'] },
    ],
    prerequisites: 'Podstawowa znajomość MS Excel (poziom podstawowy lub równoważny)',
  },
  {
    slug: 'excel-poziom-zaawansowany',
    title: 'MS Excel – Poziom zaawansowany',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 4400,
    priceLabel: 'od 4 400 zł',
    pricingTiers: [
      { maxPeople: 5, price: 4400, priceLabel: '4 400 zł' },
      { maxPeople: 7, price: 5200, priceLabel: '5 200 zł' },
      { maxPeople: 10, price: 5800, priceLabel: '5 800 zł' },
    ],
    description: 'Szkolenie MS Excel na poziomie zaawansowanym to kurs dla doświadczonych użytkowników, którzy chcą w pełni wykorzystać możliwości nowoczesnego Excela. Program obejmuje funkcje dynamiczne i tablicowe z pakietu Excel 365, narzędzia Power Query i Power Pivot, zaawansowane analizy warunkowe oraz tworzenie interaktywnych dashboardów – wiedza, która realnie odróżnia sprawnego analityka od eksperta.',
    targetAudience: [
      'Doświadczeni użytkownicy Excela posiadający wiedzę z poziomu średniozaawansowanego',
      'Analitycy danych, kontrolerzy finansowi i specjaliści BI pracujący z dużymi zbiorami',
      'Osoby chcące budować profesjonalne dashboardy bezpośrednio w Excelu',
      'Specjaliści planujący rozszerzyć kompetencje o Power Query i Power Pivot',
    ],
    benefits: [
      'Swobodne korzystanie z funkcji dynamicznych: FILTRUJ, SORTUJ, UNIKATOWE, SEKWENCJA',
      'Automatyzacja pobierania i transformacji danych z Power Query bez pisania kodu',
      'Budowanie modeli danych z relacjami i miarami DAX w Power Pivot',
      'Tworzenie zaawansowanych dashboardów z dynamicznymi wykresami i segmentatorami',
      'Przeprowadzanie analizy wariantowej z Solverem, tabelami danych i szukaniem wyniku',
    ],
    program: [
      { title: 'Funkcje dynamiczne i tablicowe (Excel 365)', items: ['FILTRUJ – dynamiczne wyodrębnianie danych według warunków', 'SORTUJ i SORTUJ.WEDŁUG – elastyczne sortowanie wyników', 'UNIKATOWE – lista wartości bez powtórzeń', 'SEKWENCJA – generowanie serii liczbowych', 'Łączenie funkcji dynamicznych w zaawansowanych formułach'] },
      { title: 'Power Query w Excelu', items: ['Importowanie danych z plików, folderów i baz danych', 'Transformacje: czyszczenie, scalanie, unpivot kolumn', 'Automatyczna konsolidacja wielu plików o tej samej strukturze', 'Odświeżanie zapytań i parametryzacja połączeń', 'Przegląd języka M i edytor zaawansowany'] },
      { title: 'Power Pivot – modelowanie danych', items: ['Budowanie modelu z wielu tabel i relacji', 'Wprowadzenie do DAX: miary vs. kolumny kalkulowane', 'Funkcje agregujące i CALCULATE w Power Pivot', 'Tabele przestawne oparte na modelu danych', 'KPI i hierarchie w modelu Power Pivot'] },
      { title: 'Zaawansowane wykresy i dashboardy', items: ['Wykresy combo i wykresy z dwiema osiami', 'Dynamiczne wykresy z kontrolkami i segmentatorami', 'Dashboardy na jednym arkuszu – układ, estetyka, interakcja', 'Minicharts (wykresy przebiegu w czasie)', 'Eksport i prezentacja dashboardów'] },
      { title: 'Analiza wariantowa i optymalizacja', items: ['Szukaj wyniku – cel odwrotny w formułach', 'Tabele danych – analiza wrażliwości jednej i dwóch zmiennych', 'Menedżer scenariuszy – porównanie wariantów decyzyjnych', 'Solver – optymalizacja z ograniczeniami'] },
      { title: 'Makra nagrane – automatyzacja', items: ['Rejestrowanie makra i analiza wygenerowanego kodu VBA', 'Uruchamianie makr przyciskami i skrótami klawiszowymi', 'Edycja nagranego makra – proste modyfikacje', 'Bezpieczeństwo makr i zarządzanie zaufanymi plikami'] },
    ],
    prerequisites: 'Dobra znajomość MS Excel na poziomie średniozaawansowanym',
  },
  {
    slug: 'excel-vba',
    title: 'MS Excel VBA',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 5600,
    priceLabel: 'od 5 600 zł',
    pricingTiers: [
      { maxPeople: 5, price: 5600, priceLabel: '5 600 zł' },
      { maxPeople: 7, price: 7200, priceLabel: '7 200 zł' },
      { maxPeople: 10, price: 8000, priceLabel: '8 000 zł' },
    ],
    description: 'Szkolenie MS Excel VBA otwiera drzwi do prawdziwej automatyzacji pracy w arkuszach kalkulacyjnych. Uczestnicy poznają środowisko Visual Basic for Applications od pierwszej linii kodu – przez zmienne, pętle i logikę warunkową, aż po tworzenie własnych funkcji, formularzy użytkownika i reagowanie na zdarzenia Excela. Po szkoleniu powtarzalne zadania, które zajmowały godziny, będą wykonywane jednym kliknięciem.',
    targetAudience: [
      'Zaawansowani użytkownicy Excela szukający narzędzi do automatyzacji powtarzalnych czynności',
      'Analitycy i kontrolerzy chcący tworzyć własne funkcje i narzędzia raportowe',
      'Specjaliści IT i administratorzy danych pracujący z Excelem jako platformą operacyjną',
      'Osoby zainteresowane programowaniem bez wcześniejszego doświadczenia w kodowaniu',
    ],
    benefits: [
      'Samodzielne pisanie makr automatyzujących codzienne, powtarzalne zadania w Excelu',
      'Tworzenie własnych funkcji arkuszowych niedostępnych w standardowym Excelu',
      'Budowanie formularzy użytkownika do wygodnego wprowadzania i przetwarzania danych',
      'Obsługa błędów i tworzenie odpornego na awarie kodu VBA',
      'Reagowanie na zdarzenia arkusza – automatyczne działania przy zmianie danych',
    ],
    program: [
      { title: 'Środowisko VBA – pierwsze kroki', items: ['Edytor Visual Basic – okna, moduły, właściwości', 'Makra nagrywane a pisane ręcznie – różnice i możliwości', 'Uruchamianie kodu: przyciski, skróty, zdarzenia', 'Debugowanie – krok po kroku, punkty przerwania, okno Immediate'] },
      { title: 'Zmienne, typy danych i operatory', items: ['Deklarowanie zmiennych: Dim, As, Option Explicit', 'Typy danych: Integer, Long, Double, String, Boolean, Variant', 'Stałe (Const) i zmienne publiczne', 'Operatory matematyczne, porównania i logiczne'] },
      { title: 'Logika warunkowa', items: ['Instrukcja If...Then...Else i ElseIf', 'Select Case – czytelna alternatywa dla złożonych warunków', 'Zagnieżdżanie warunków i optymalizacja czytelności kodu'] },
      { title: 'Pętle – automatyzacja powtarzalnych operacji', items: ['For...Next – iteracja po zakresie liczbowym', 'For Each...Next – pętle po kolekcjach obiektów', 'Do While / Do Until – pętle warunkowe', 'Wychodzenie z pętli: Exit For, Exit Do'] },
      { title: 'Praca z obiektami Excela', items: ['Model obiektowy: Application, Workbook, Worksheet, Range', 'Odwołania do komórek: Cells, Range, Offset', 'Operacje na arkuszach: dodawanie, usuwanie, kopiowanie', 'Praca z wieloma skoroszytami jednocześnie'] },
      { title: 'Funkcje użytkownika i obsługa błędów', items: ['Tworzenie własnych funkcji (Function) dostępnych w arkuszu', 'Procedury Sub vs. Function – kiedy co stosować', 'On Error Resume Next, On Error GoTo – obsługa wyjątków', 'Przekazywanie parametrów do procedur i funkcji'] },
      { title: 'Formularze użytkownika i zdarzenia', items: ['Tworzenie UserForm – pola tekstowe, listy, przyciski', 'Powiązanie formularza z danymi arkusza', 'Zdarzenia arkusza: Worksheet_Change, Worksheet_Activate', 'Zdarzenia skoroszytu: Workbook_Open, Workbook_BeforeSave'] },
    ],
    prerequisites: 'Dobra znajomość MS Excel na poziomie zaawansowanym',
  },
  {
    slug: 'excel-power-query',
    title: 'MS Excel Power Query',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 3200,
    priceLabel: 'od 3 200 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3200, priceLabel: '3 200 zł' },
      { maxPeople: 7, price: 3900, priceLabel: '3 900 zł' },
      { maxPeople: 10, price: 4500, priceLabel: '4 500 zł' },
    ],
    description: 'Szkolenie MS Excel Power Query to kurs dla osób, które chcą raz na zawsze porzucić ręczne kopiowanie i wklejanie danych do Excela. Uczestnicy nauczą się importować, łączyć i przekształcać dane z różnych źródeł bezpośrednio w Excelu – bez makr, bez programowania, bez żmudnych operacji ręcznych. Power Query w Excelu to ta sama technologia co w Power BI, lecz dostępna natywnie w arkuszu.',
    targetAudience: [
      'Użytkownicy Excela na poziomie średniozaawansowanym lub zaawansowanym',
      'Osoby regularnie scalające raporty z wielu plików lub systemów do jednego arkusza',
      'Analitycy chcący zautomatyzować przygotowywanie danych bez znajomości VBA',
      'Specjaliści finansowi, HR i sprzedaży przetwarzający dane z ERP, CSV lub zewnętrznych baz',
    ],
    benefits: [
      'Automatyczne pobieranie i odświeżanie danych z plików, folderów, baz danych i stron WWW',
      'Czyszczenie i transformacja danych bez dotykania oryginalnych źródeł',
      'Łączenie wielu plików z folderu w jeden spójny raport jednym kliknięciem',
      'Scalanie i porównywanie danych z różnych tabel jak w bazie danych',
      'Podstawy języka M – edycja zapytań i tworzenie własnych przekształceń',
    ],
    program: [
      { title: 'Czym jest Power Query i dlaczego warto go znać', items: ['Power Query vs. ręczne kopiowanie – porównanie efektywności', 'Interfejs edytora zapytań w Excelu', 'Typy kroków i historia przekształceń', 'Ładowanie danych do tabeli, modelu lub tylko połączenia'] },
      { title: 'Import danych z różnych źródeł', items: ['Pliki Excel, CSV, TXT – import i odświeżanie', 'Foldery – automatyczne łączenie wielu plików', 'Bazy danych (SQL Server, Access) – połączenie i zapytanie', 'Strony WWW i pliki JSON – importowanie danych zewnętrznych'] },
      { title: 'Transformacje i czyszczenie danych', items: ['Usuwanie zbędnych wierszy i kolumn', 'Zmiana typów danych i ustawień regionalnych', 'Dzielenie i łączenie kolumn tekstowych', 'Uzupełnianie pustych komórek (Fill Down/Up)', 'Unpivot – zamiana kolumn na wiersze', 'Grupowanie i agregacja danych'] },
      { title: 'Scalanie i dołączanie zapytań', items: ['Merge (złączenie) – odpowiednik JOIN z baz danych', 'Append (dołączanie) – scalanie tabel o tej samej strukturze', 'Typy złączeń: lewe, prawe, wewnętrzne, pełne', 'Obsługa niezgodności schematów przy łączeniu plików'] },
      { title: 'Parametry i automatyzacja', items: ['Parametry w zapytaniach – dynamiczne ścieżki i wartości', 'Odświeżanie danych – ręczne i automatyczne przy otwarciu', 'Zapytania referencyjne i duplikaty – organizacja pracy', 'Eksport modelu zapytań do innego pliku'] },
      { title: 'Język M – edytor zaawansowany', items: ['Struktura wyrażeń w języku M', 'Ręczna edycja kroków w edytorze zaawansowanym', 'Tworzenie funkcji niestandardowych (Custom Functions)', 'Kluczowe funkcje M: Text.*, Date.*, List.*, Table.*'] },
    ],
    prerequisites: 'Dobra znajomość MS Excel (poziom średniozaawansowany lub wyższy)',
  },
  {
    slug: 'microsoft-sql-server',
    title: 'Microsoft SQL Server',
    category: 'SQL',
    duration: '2 dni / 16 godzin',
    price: 3900,
    priceLabel: 'od 3 900 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3900, priceLabel: '3 900 zł' },
      { maxPeople: 7, price: 4700, priceLabel: '4 700 zł' },
      { maxPeople: 10, price: 5500, priceLabel: '5 500 zł' },
    ],
    description: 'Szkolenie Microsoft SQL Server to praktyczny kurs pisania zapytań SQL dla analityków, specjalistów BI i wszystkich, którzy chcą sprawnie pobierać i analizować dane z relacyjnych baz danych. Uczestnicy poznają środowisko SQL Server Management Studio, opanują składnię SELECT od podstaw do podzapytań i wyrażeń CTE, a także nauczą się modyfikować dane i rozumieć podstawy wydajności zapytań.',
    targetAudience: [
      'Analitycy danych i specjaliści BI pobierający dane z baz na potrzeby raportów i dashboardów',
      'Użytkownicy Power BI i Excela chcący samodzielnie pisać zapytania do źródeł danych SQL',
      'Pracownicy działów finansowych, sprzedaży i operacji korzystający z danych z systemów ERP',
      'Osoby bez doświadczenia SQL, które chcą nauczyć się go od zera w kontekście biznesowym',
    ],
    benefits: [
      'Samodzielne pisanie zapytań SELECT pobierających dokładnie te dane, których potrzebujesz',
      'Łączenie wielu tabel za pomocą różnych typów JOIN – jak w profesjonalnym data warehousing',
      'Agregowanie i grupowanie danych z GROUP BY, HAVING i funkcjami okna',
      'Tworzenie czytelnych, modularnych zapytań z użyciem CTE (Common Table Expressions)',
      'Praktyczna znajomość DML – bezpieczne wstawianie, aktualizacja i usuwanie danych',
    ],
    program: [
      { title: 'Wprowadzenie do SQL Server i SSMS', items: ['Relacyjny model danych – tabele, klucze, relacje', 'Środowisko SQL Server Management Studio – nawigacja i skróty', 'Łączenie z bazą danych i przeglądanie struktury', 'Typy danych w SQL Server: liczbowe, tekstowe, daty, bit'] },
      { title: 'Podstawy SELECT – pobieranie danych', items: ['Składnia SELECT ... FROM ... WHERE', 'Filtrowanie: operatory porównania, BETWEEN, IN, LIKE, IS NULL', 'Sortowanie wyników: ORDER BY ASC/DESC', 'Aliasy kolumn i tabel – czytelność zapytań', 'Eliminacja duplikatów: DISTINCT'] },
      { title: 'Agregacja i grupowanie', items: ['Funkcje agregujące: SUM, COUNT, AVG, MIN, MAX', 'Grupowanie danych: GROUP BY', 'Filtrowanie grup: HAVING vs. WHERE – kiedy co stosować', 'COUNT(*) vs. COUNT(kolumna) – subtelne różnice'] },
      { title: 'Łączenie tabel (JOIN)', items: ['INNER JOIN – tylko pasujące rekordy', 'LEFT JOIN i RIGHT JOIN – zachowanie wszystkich rekordów', 'FULL OUTER JOIN – suma zbiorów', 'Łączenie wielu tabel w jednym zapytaniu', 'Złączenia na wielu warunkach i filtrowanie po JOIN'] },
      { title: 'Podzapytania i wyrażenia CTE', items: ['Podzapytania w klauzuli WHERE, FROM i SELECT', 'EXISTS i NOT EXISTS – sprawdzanie istnienia rekordów', 'WITH ... AS – Common Table Expressions dla czytelnych zapytań', 'Rekurencyjne CTE – hierarchie i struktury drzewiaste (wprowadzenie)'] },
      { title: 'Funkcje wbudowane i DML', items: ['Funkcje tekstowe: LEN, UPPER, LOWER, TRIM, CONCAT, SUBSTRING', 'Funkcje daty: GETDATE, YEAR, MONTH, DAY, DATEDIFF, DATEADD', 'Konwersja typów: CAST, CONVERT, TRY_CONVERT', 'INSERT INTO – wstawianie pojedynczych i wielu wierszy', 'UPDATE ... SET ... WHERE – bezpieczna aktualizacja danych', 'DELETE ... WHERE – usuwanie z warunkiem'] },
      { title: 'Widoki, indeksy i wydajność (wprowadzenie)', items: ['Widoki (Views) – hermetyzacja złożonych zapytań', 'Tworzenie i modyfikacja widoków', 'Czym są indeksy i jak wpływają na szybkość zapytań', 'Odczytywanie planu wykonania zapytania (Execution Plan) – podstawy'] },
    ],
    prerequisites: 'Brak wymagań technicznych – szkolenie dostępne dla osób bez doświadczenia z SQL',
  },
  {
    slug: 'excel-bi',
    title: 'MS Excel BI',
    category: 'Wizualizacja danych',
    duration: '2 dni / 16 godzin',
    price: 3900,
    priceLabel: 'od 3 900 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3900, priceLabel: '3 900 zł' },
      { maxPeople: 7, price: 4700, priceLabel: '4 700 zł' },
      { maxPeople: 10, price: 5500, priceLabel: '5 500 zł' },
    ],
    description: 'Szkolenie MS Excel BI pokazuje, że Excel potrafi znacznie więcej niż arkusz kalkulacyjny – to pełnoprawna platforma Business Intelligence dostępna bez dodatkowych licencji. Uczestnicy nauczą się łączyć Power Query, Power Pivot i zaawansowane wykresy w jeden spójny ekosystem, tworząc interaktywne dashboardy analityczne bezpośrednio w Excelu. To "Power BI w Excelu" – bez konieczności wdrażania osobnego narzędzia.',
    targetAudience: [
      'Zaawansowani użytkownicy Excela chcący tworzyć profesjonalne dashboardy analityczne',
      'Analitycy i kontrolerzy finansowi raportujący do zarządu bez dostępu do Power BI',
      'Specjaliści BI szukający sposobu na szybkie prototypowanie raportów w Excelu',
      'Firmy i działy chcące wdrożyć BI bez kosztów dodatkowych licencji i narzędzi',
    ],
    benefits: [
      'Pełne panowanie nad cyklem danych: import (Power Query) → model (Power Pivot) → raport',
      'Tworzenie relacyjnych modeli danych z wielu tabel bez WYSZUKAJ.PIONOWO',
      'Pisanie miar DAX w Power Pivot: obliczenia nieosiągalne zwykłymi formułami Excela',
      'Interaktywne dashboardy z fragmentatorami, osiami czasu i dynamicznymi wykresami',
      'Automatyczne odświeżanie danych – raport aktualny jednym kliknięciem',
    ],
    program: [
      { title: 'Architektura Excel BI – jak to działa razem', items: ['Power Query, Power Pivot i tabele przestawne jako jeden ekosystem', 'Kiedy Excel BI wystarcza, a kiedy potrzebny jest Power BI', 'Włączanie dodatków: Power Pivot i Power Query w różnych wersjach Excela', 'Projektowanie rozwiązania BI od zapytania do dashboardu'] },
      { title: 'Power Query – przygotowanie danych', items: ['Import z plików, folderów i baz danych', 'Transformacje: czyszczenie, typy danych, unpivot', 'Scalanie i dołączanie tabel', 'Parametryzacja połączeń i automatyczne odświeżanie'] },
      { title: 'Power Pivot – model danych i DAX', items: ['Ładowanie danych do modelu Power Pivot', 'Tworzenie relacji między tabelami – model gwiazdy', 'Miary DAX: SUM, CALCULATE, DIVIDE, DISTINCTCOUNT', 'Tabela dat i funkcje Time Intelligence', 'KPI – wskaźniki wizualne w Power Pivot'] },
      { title: 'Zaawansowane tabele i wykresy przestawne', items: ['Tabele przestawne oparte na modelu danych (nie arkuszu)', 'Pola i elementy obliczeniowe vs. miary DAX', 'Wykresy przestawne: combo, linia, słupkowy – dobór do danych', 'Minicharts (wykresy przebiegu w czasie) jako uzupełnienie tabeli'] },
      { title: 'Dashboardy – projektowanie i interakcja', items: ['Układ dashboardu: hierarchia informacji, zasady estetyki', 'Fragmentatory połączone z wieloma tabelami i wykresami', 'Osie czasu – filtrowanie danych według okresu', 'Dynamiczne tytuły i etykiety reagujące na filtry', 'Zabezpieczenie dashboardu przed przypadkową edycją'] },
      { title: 'Automatyzacja i utrzymanie', items: ['Odświeżanie wszystkich zapytań jednym kliknięciem', 'Zarządzanie połączeniami i aktualizacja źródeł danych', 'Dokumentowanie modelu dla innych użytkowników', 'Dobre praktyki nazewnictwa i organizacji modelu Excel BI'] },
    ],
    prerequisites: 'Dobra znajomość MS Excel (poziom zaawansowany lub ukończone szkolenie Power Query)',
  },
  {
    slug: 'powerpoint',
    title: 'MS PowerPoint',
    category: 'Wizualizacja danych',
    duration: '2 dni / 16 godzin',
    price: 2700,
    priceLabel: 'od 2 700 zł',
    pricingTiers: [
      { maxPeople: 5, price: 2700, priceLabel: '2 700 zł' },
      { maxPeople: 7, price: 3300, priceLabel: '3 300 zł' },
      { maxPeople: 10, price: 3900, priceLabel: '3 900 zł' },
    ],
    description: 'Szkolenie MS PowerPoint to kurs komunikacji wizualnej dla osób, które chcą, by ich prezentacje mówiły same za siebie. Uczestnicy nauczą się projektować spójne szablony firmowe, dobierać wykresy i układy do konkretnych danych, stosować animacje z umiarem oraz budować narrację slajdu, która prowadzi odbiorcę od pytania do odpowiedzi. Efekt: prezentacje, które wyglądają profesjonalnie i są skuteczne.',
    targetAudience: [
      'Menedżerowie i specjaliści regularnie prezentujący dane i raporty zarządowi lub klientom',
      'Analitycy przenoszący wyniki analiz z Excela do prezentacji PowerPoint',
      'Osoby tworzące materiały szkoleniowe, oferty handlowe i raporty cykliczne',
      'Wszyscy, których prezentacje są "poprawne", ale chcą je uczynić naprawdę przekonującymi',
    ],
    benefits: [
      'Spójny, profesjonalny wygląd każdej prezentacji dzięki wzorcom slajdów i motywom',
      'Umiejętność doboru właściwego wykresu do konkretnych danych i przekazu',
      'Tworzenie narracji wizualnej – prezentacja, która prowadzi odbiorcę krok po kroku',
      'Animacje i przejścia stosowane celowo, nie dekoracyjnie – uwaga tam, gdzie trzeba',
      'Znaczące przyspieszenie pracy dzięki szablonom, skrótom i technice wzorca slajdów',
    ],
    program: [
      { title: 'Zasady skutecznej komunikacji wizualnej', items: ['Hierarchia informacji na slajdzie – co widz widzi pierwsze', 'Zasada jednej myśli na slajd', 'Kolorystyka: kontrast, spójność, psychologia kolorów', 'Typografia w prezentacjach – czytelność ponad kreatywność', 'Czego unikać: bullet points, clipart, zbyt małe fonty'] },
      { title: 'Wzorzec slajdów i szablony firmowe', items: ['Widok wzorca slajdów – struktura i dziedziczenie układów', 'Tworzenie firmowego szablonu od zera', 'Umieszczanie logo, stopki i numeracji na wszystkich slajdach jednocześnie', 'Definiowanie stylów tekstu i motywu kolorów', 'Eksport szablonu do wielokrotnego użycia'] },
      { title: 'Wykresy i diagramy', items: ['Importowanie wykresów z Excela – łączenie na żywo', 'Wykresy natywne PowerPoint – kiedy lepsze od Excela', 'SmartArt – diagramy procesów, hierarchii i cykli', 'Edycja i formatowanie wykresów: etykiety, osie, kolory serii', 'Infografiki z ikon i kształtów wektorowych'] },
      { title: 'Animacje i przejścia', items: ['Przejścia między slajdami – które stosować, których unikać', 'Animacje wejścia, wyjścia i wyróżnienia obiektów', 'Oś czasu animacji – synchronizacja wielu obiektów', 'Animacja wykresu słupek po słupku – efekt narracyjny', 'Morph – płynne przejście między stanami slajdu'] },
      { title: 'Prezentacja narracyjna i storytelling', items: ['Struktura narracyjna: problem – analiza – rozwiązanie', 'Slajd tytułowy, przejściowy i podsumowujący jako elementy rytmu', 'Techniki angażowania odbiorcy podczas prezentacji', 'Tryb prezentera: notatki, podgląd, timer', 'Prezentacja zdalna – Teams, Zoom, udostępnianie ekranu'] },
      { title: 'Eksport, wideo i skróty', items: ['Eksport do PDF z zachowaniem jakości grafik', 'Zapis prezentacji jako wideo z narracją', 'Pakowanie prezentacji z czcionkami i multimediami', 'Najważniejsze skróty klawiaturowe PowerPoint', 'Format PPTX vs. PPSX – różnice i zastosowania'] },
    ],
    prerequisites: 'Podstawowa znajomość pakietu Microsoft Office',
  },
  {
    slug: 'excel-powerpoint-wizualizacja',
    title: 'MS Excel + PowerPoint – Wizualizacja danych',
    category: 'Wizualizacja danych',
    duration: '2 dni / 16 godzin',
    price: 3200,
    priceLabel: 'od 3 200 zł',
    pricingTiers: [
      { maxPeople: 5, price: 3200, priceLabel: '3 200 zł' },
      { maxPeople: 7, price: 3900, priceLabel: '3 900 zł' },
      { maxPeople: 10, price: 4500, priceLabel: '4 500 zł' },
    ],
    description: 'Szkolenie MS Excel + PowerPoint – Wizualizacja danych to kompletny kurs dla osób, które chcą opanować cały łańcuch wartości raportowania: od surowych danych w Excelu po gotową, przekonującą prezentację w PowerPoint. Uczestnicy poznają zasady doboru wykresów, spójność wizualną między narzędziami oraz techniki tworzenia raportów zarządczych, które są zarówno analitycznie rzetelne, jak i estetycznie profesjonalne.',
    targetAudience: [
      'Analitycy i kontrolerzy regularnie tworzący raporty zarządcze lub prezentacje dla klientów',
      'Specjaliści finansowi, sprzedażowi i operacyjni raportujący wyniki w cyklach tygodniowych lub miesięcznych',
      'Osoby chcące skrócić czas produkcji raportu od danych do gotowej prezentacji',
      'Wszyscy, dla których spójność wizualna i profesjonalizm materiałów ma znaczenie strategiczne',
    ],
    benefits: [
      'Znajomość zasad wizualizacji danych – właściwy wykres do właściwego pytania',
      'Pełny pipeline: dane w Excelu → dynamiczne wykresy → spójne slajdy w PowerPoint',
      'Oszczędność czasu dzięki połączeniu wykresów Excela z PowerPoint na żywo',
      'Spójność kolorystyczna i typograficzna między arkuszem a prezentacją',
      'Gotowy raport zarządczy stworzony od zera w trakcie szkolenia',
    ],
    program: [
      { title: 'Zasady wizualizacji danych', items: ['Dobór wykresu do pytania analitycznego: słupkowy, liniowy, kołowy, rozrzutu', 'Hierarchia informacji i zasada minimum atramentu', 'Kolory w wizualizacji: akcent, tło, skale dywergentne i sekwencyjne', 'Typografia w wykresach – etykiety, tytuły, osie', 'Najczęstsze błędy w wizualizacji i jak ich unikać'] },
      { title: 'Zaawansowane wykresy w Excelu', items: ['Wykresy combo – linia i słupek na jednym wykresie', 'Wykresy z dwiema osiami Y', 'Dynamiczne wykresy z tabelami Excela i segmentatorami', 'Wykresy kaskadowe (waterfall) i Gantta', 'Formatowanie serii danych, linii trendów i etykiet'] },
      { title: 'Dynamiczne łączenie Excela z PowerPoint', items: ['Wklejanie wykresu z łączem na żywo – aktualizacja jednym kliknięciem', 'Wklejanie jako obraz vs. obiekt OLE – kiedy co wybrać', 'Automatyczna aktualizacja wykresów przy odświeżaniu danych', 'Zarządzanie połączeniami i rozwiązywanie problemów z linkami'] },
      { title: 'Spójna oprawa wizualna raportu', items: ['Definicja palety kolorów spójnej w Excelu i PowerPoint', 'Wzorzec slajdów jako fundament spójności', 'Eksport motywu Excela do PowerPoint', 'Style wykresów i tabele formatowane zgodnie z identyfikacją wizualną', 'Fonty, marginesy i siatka jako elementy profesjonalizmu'] },
      { title: 'Raport zarządczy – projekt od A do Z', items: ['Struktura raportu: okładka, KPI, analizy szczegółowe, podsumowanie', 'Slajd KPI – duże liczby, trendy, odchylenia', 'Slajd narracyjny – łączenie wykresu z komentarzem', 'Tabela porównawcza z formatowaniem warunkowym', 'Eksport raportu do PDF i przygotowanie do dystrybucji'] },
      { title: 'Automatyzacja i utrzymanie cyklu raportowego', items: ['Szablony Excela z gotową strukturą danych', 'Szablony PowerPoint z zarezerwowanymi miejscami na wykresy', 'Skróty i techniki przyspieszające aktualizację raportu', 'Dokumentowanie procesu raportowego dla innych członków zespołu'] },
    ],
    prerequisites: 'Dobra znajomość MS Excel i podstawowa znajomość MS PowerPoint',
  },
  {
    slug: 'excel-ai',
    title: 'MS Excel AI – współpraca z chatbotami',
    category: 'Excel',
    duration: '2 dni / 16 godzin',
    price: 5500,
    priceLabel: 'od 5 500 zł',
    pricingTiers: [
      { maxPeople: 5, price: 5500, priceLabel: '5 500 zł' },
      { maxPeople: 7, price: 6300, priceLabel: '6 300 zł' },
      { maxPeople: 10, price: 7500, priceLabel: '7 500 zł' },
    ],
    description: 'Szkolenie MS Excel AI to intensywny, dwudniowy kurs dla osób, które chcą realnie przyspieszyć swoją pracę z Excelem dzięki narzędziom sztucznej inteligencji. Uczestnicy uczą się, jak skutecznie korzystać z chatbotów i asystentów AI do generowania formuł, czyszczenia danych i automatyzacji powtarzalnych zadań – bez konieczności zaawansowanej wiedzy technicznej. Program łączy praktyczne zastosowania AI z podstawami automatyzacji w Excelu, dzięki czemu efekty są widoczne już od pierwszego dnia.',
    targetAudience: [
      'Użytkownicy Excela na poziomie podstawowym i średniozaawansowanym',
      'Analitycy danych i specjaliści ds. raportowania szukający nowych narzędzi',
      'Pracownicy biurowi chcący zautomatyzować powtarzalne czynności',
      'Osoby, które słyszały o AI, ale nie wiedzą, jak praktycznie ją zastosować w pracy',
      'Menedżerowie i koordynatorzy pracujący na co dzień z arkuszami kalkulacyjnymi',
    ],
    benefits: [
      'Sprawne korzystanie z ChatGPT i Microsoft Copilot w codziennej pracy z Excelem',
      'Samodzielne generowanie i optymalizacja formuł przy wsparciu AI',
      'Automatyczne czyszczenie i ujednolicanie danych bez ręcznej edycji',
      'Tworzenie własnego chatbota dopasowanego do struktury arkusza',
      'Podstawy automatyzacji z makrami przy wsparciu asystenta AI',
      'Znaczne skrócenie czasu powtarzalnych zadań biurowych',
      'Gotowe do zastosowania umiejętności – od razu po szkoleniu',
    ],
    program: [
      { title: 'Wprowadzenie do AI w pracy z Excelem', items: ['Czym jest sztuczna inteligencja i jak zmienia pracę analityczną', 'Przegląd narzędzi AI: ChatGPT, Microsoft Copilot i inne', 'Dobre praktyki i zasady bezpieczeństwa przy korzystaniu z AI', 'Jak formułować polecenia (prompty), żeby uzyskać najlepsze wyniki'] },
      { title: 'Generowanie i optymalizacja formuł z AI', items: ['Tworzenie formuł na podstawie opisu w języku naturalnym', 'Diagnozowanie i naprawianie błędów w formułach z pomocą AI', 'Optymalizacja złożonych wyrażeń – od WYSZUKAJ.PIONOWO po XWYSZUKAJ', 'Zamiana manualnych obliczeń na automatyczne rozwiązania AI'] },
      { title: 'Czyszczenie i transformacja danych', items: ['Wykrywanie i usuwanie duplikatów, błędów i niespójności', 'Ujednolicanie formatów dat, liczb i tekstu', 'Automatyczne uzupełnianie braków i normalizacja zbiorów', 'AI jako asystent przy przygotowaniu danych do raportowania'] },
      { title: 'Analiza danych wspierana przez AI', items: ['Szybka eksploracja danych przy użyciu AI – pytania w języku naturalnym', 'Generowanie podsumowań i wniosków z arkuszy', 'Budowanie prostych raportów z podpowiedzią AI', 'Interpretacja wyników i walidacja odpowiedzi chatbota'] },
      { title: 'Tworzenie własnego chatbota w Excelu', items: ['Koncepcja chatbota i jego rola w środowisku arkusza', 'Definiowanie kontekstu i instrukcji dla asystenta AI', 'Dostosowanie chatbota do struktury danych i potrzeb biznesowych', 'Testowanie i iteracyjne doskonalenie rozwiązania'] },
      { title: 'Podstawy automatyzacji – makra i AI', items: ['Czym są makra i jak działają w Excelu', 'Nagrywanie pierwszego makra i analiza jego działania', 'Generowanie kodu automatyzacji przy wsparciu AI', 'Uruchamianie makr przyciskami i skrótami klawiszowymi'] },
      { title: 'Automatyzacja z AI – zaawansowane zastosowania', items: ['Tworzenie procedur automatyzujących wieloetapowe zadania', 'Analiza i modyfikacja gotowych rozwiązań z pomocą AI', 'Łączenie formuł, danych i automatyzacji w jednym procesie', 'Typowe pułapki i jak ich unikać przy pracy z AI'] },
      { title: 'Warsztaty praktyczne – scenariusze biznesowe', items: ['Praca na rzeczywistych zestawach danych z różnych branż', 'Budowa własnego mini-projektu łączącego AI i automatyzację', 'Prezentacja rozwiązań i dyskusja grupowa', 'Plan dalszego rozwoju i polecane źródła do samodzielnej nauki'] },
    ],
    faq: [
      { q: 'Czy muszę znać VBA przed szkoleniem?', a: 'Nie. Podstawy VBA są integralną częścią szkolenia. Omawiamy je krok po kroku, a narzędzia AI znacznie ułatwiają ich przyswojenie.' },
      { q: 'Jakich narzędzi AI dotyczy szkolenie?', a: 'Szkolenie obejmuje m.in. ChatGPT, Microsoft Copilot oraz inne narzędzia AI dostępne w ekosystemie Excela i pracy z danymi.' },
      { q: 'Czy otrzymam materiały szkoleniowe?', a: 'Tak – każdy uczestnik otrzymuje prezentacje, zestawy ćwiczeń oraz pliki warsztatowe. Po szkoleniu udostępniam listę sprawdzonych źródeł do samodzielnej nauki.' },
    ],
    prerequisites: 'Podstawowa znajomość MS Excel',
    language: 'polski lub angielski',
  },
];

export const trainingsByCategory = {
  'Power BI': trainings.filter(t => t.category === 'Power BI'),
  'Excel': trainings.filter(t => t.category === 'Excel'),
  'SQL': trainings.filter(t => t.category === 'SQL'),
  'Wizualizacja danych': trainings.filter(t => t.category === 'Wizualizacja danych'),
};

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find(t => t.slug === slug);
}
