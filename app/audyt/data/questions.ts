import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    area: 'Raportowanie produkcji',
    question: 'Jak wygląda comiesięczne raportowanie produkcji w Twojej firmie?',
    answers: [
      { label: 'Ręcznie zbieramy dane z Exceli i maili, raport budujemy od zera', points: 1 },
      { label: 'Eksportujemy dane z ERP do Excela, formatujemy pivot tables', points: 2 },
      { label: 'Dashboard aktualizuje się automatycznie, wystarczy otworzyć', points: 3 },
    ],
  },
  {
    id: 2,
    area: 'Źródła danych',
    question: 'Z ilu źródeł ręcznie zbieracie dane do raportów?',
    answers: [
      { label: '3 lub więcej — ERP, Excel, mail, pliki CSV, inne systemy', points: 1 },
      { label: 'Głównie ERP + Excel, czasem coś jeszcze', points: 2 },
      { label: 'Dane zaciągają się automatycznie z jednego pipeline\'u', points: 3 },
    ],
  },
  {
    id: 3,
    area: 'Czas raportowania',
    question: 'Ile czasu zajmuje przygotowanie miesięcznego raportu dla zarządu?',
    answers: [
      { label: '3–5 dni roboczych lub więcej', points: 1 },
      { label: '1–2 dni robocze', points: 2 },
      { label: 'Raport jest gotowy automatycznie następnego dnia', points: 3 },
    ],
  },
  {
    id: 4,
    area: 'Spójność danych',
    question: 'Czy zdarza się, że różne osoby raportują różne liczby z tych samych danych?',
    answers: [
      { label: 'Tak, regularnie — każdy ma swój Excel', points: 1 },
      { label: 'Czasem, ale staramy się to kontrolować', points: 2 },
      { label: 'Nie — mamy jedno źródło prawdy', points: 3 },
    ],
  },
  {
    id: 5,
    area: 'Wydajność produkcji',
    question: 'Jak szybko dowiadujesz się o problemach z wydajnością na produkcji?',
    answers: [
      { label: 'Po fakcie — na koniec zmiany lub przy tygodniowym rozliczeniu', points: 1 },
      { label: 'W ciągu kilku godzin — ktoś zgłasza telefonicznie lub przez Excela', points: 2 },
      { label: 'W czasie rzeczywistym — alert pojawia się automatycznie, gdy spada poniżej normy', points: 3 },
    ],
  },
  {
    id: 6,
    area: 'Kompetencje zespołu',
    question: 'Czy wiedza Twojego zespołu z zakresu Excela lub Power BI jest wystarczająca do samodzielnego raportowania?',
    answers: [
      { label: 'Nie — zespół korzysta z podstaw Excela, zaawansowane funkcje i Power BI są obce', points: 1 },
      { label: 'Częściowo — kilka osób daje radę, ale większość potrzebuje wsparcia', points: 2 },
      { label: 'Tak — zespół samodzielnie buduje raporty i dashboardy w Power BI', points: 3 },
    ],
  },
  {
    id: 7,
    area: 'Narzędzia BI',
    question: 'Czy Twoja firma korzysta z narzędzi BI (Power BI, Tableau, Qlik)?',
    answers: [
      { label: 'Nie — raportujemy wyłącznie w Excelu / na papierze', points: 1 },
      { label: 'Mamy licencje, ale mało kto z nich korzysta', points: 2 },
      { label: 'Tak, aktywnie używamy dashboardów BI na co dzień', points: 3 },
    ],
  },
  {
    id: 8,
    area: 'Raporty ad hoc',
    question: 'Co się dzieje, gdy zarząd prosi o niestandardowy raport?',
    answers: [
      { label: 'Ktoś buduje nowy arkusz od zera — trwa to godziny lub dni', points: 1 },
      { label: 'Modyfikujemy istniejący szablon, ale zajmuje to czas', points: 2 },
      { label: 'Filtrujemy istniejący dashboard lub dodajemy widok w minuty', points: 3 },
    ],
  },
  {
    id: 9,
    area: 'KPI dla zarządu',
    question: 'Jak zarząd monitoruje kluczowe wskaźniki firmy?',
    answers: [
      { label: 'Prezentacja PPT raz w miesiącu, budowana ręcznie', points: 1 },
      { label: 'Excel zbiorczy wysyłany mailem, z opóźnieniem kilku dni', points: 2 },
      { label: 'Dashboard zarządczy dostępny online, aktualizowany automatycznie', points: 3 },
    ],
  },
  {
    id: 10,
    area: 'Koszt raportowania',
    question: 'Czy wiecie, ile roboczogodzin miesięcznie kosztuje Was ręczne raportowanie?',
    answers: [
      { label: 'Nie, nigdy tego nie liczyliśmy', points: 1 },
      { label: 'Mamy przybliżone szacunki, ale nie precyzyjne', points: 2 },
      { label: 'Tak, monitorujemy i optymalizujemy ten czas', points: 3 },
    ],
  },
];
