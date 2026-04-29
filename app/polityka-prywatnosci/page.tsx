import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Polityka prywatności | pbix.pl',
  description: 'Polityka prywatności i informacja o przetwarzaniu danych osobowych zgodnie z RODO.',
  alternates: {
    canonical: 'https://www.pbix.pl/polityka-prywatnosci',
    languages: {
      'pl-PL': 'https://www.pbix.pl/polityka-prywatnosci',
      'en-US': 'https://www.pbix.pl/en/privacy-policy',
    },
  },
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />

      <article style={{ padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>
            Informacja prawna
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 16px' }}>
            Polityka prywatności
          </h1>
          <p style={{ color: '#6e6e73', fontSize: '14px', margin: '0 0 48px' }}>
            Ostatnia aktualizacja: 28 kwietnia 2026
          </p>

          <Section title="Wstęp">
            <p>
              Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony danych osobowych osób
              odwiedzających serwis <strong>www.pbix.pl</strong> oraz korzystających z usług oferowanych przez
              Administratora — w szczególności szkoleń, konsultacji i materiałów edukacyjnych.
            </p>
            <p>
              Dokument został przygotowany w oparciu o Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679
              z 27 kwietnia 2016 r. (RODO), ustawę z 10 maja 2018 r. o ochronie danych osobowych, ustawę z 18 lipca
              2002 r. o świadczeniu usług drogą elektroniczną oraz ustawę z 12 lipca 2024 r. — Prawo komunikacji
              elektronicznej.
            </p>
          </Section>

          <Section title="§1. Definicje">
            <ul>
              <li><strong>Administrator</strong> — podmiot ustalający cele i sposoby przetwarzania danych osobowych, wskazany w §2.</li>
              <li><strong>Dane osobowe</strong> — wszelkie informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.</li>
              <li><strong>Przetwarzanie</strong> — operacja wykonywana na danych osobowych (zbieranie, przechowywanie, modyfikacja, ujawnianie, usuwanie itp.).</li>
              <li><strong>RODO</strong> — Rozporządzenie (UE) 2016/679 z 27 kwietnia 2016 r.</li>
              <li><strong>Serwis</strong> — strona internetowa www.pbix.pl wraz z subdomenami.</li>
              <li><strong>Użytkownik</strong> — osoba fizyczna korzystająca z Serwisu lub usług Administratora.</li>
              <li><strong>Pliki cookies</strong> — dane informatyczne zapisywane na urządzeniu Użytkownika podczas korzystania z Serwisu.</li>
              <li><strong>Zgoda</strong> — dobrowolne, konkretne, świadome i jednoznaczne wskazanie woli, którym osoba akceptuje przetwarzanie jej danych osobowych.</li>
            </ul>
          </Section>

          <Section title="§2. Administrator danych">
            <p>
              Administratorem Twoich danych osobowych jest <strong>Radosław Sobczak</strong>, prowadzący działalność
              gospodarczą pod firmą <strong>Radosław Sobczak Data Analysis</strong>, z siedzibą w Inowrocławiu,
              NIP: 5562743281, REGON: 522321088.
            </p>
            <p>
              Kontakt w sprawach związanych z przetwarzaniem danych osobowych:{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
            </p>
          </Section>

          <Section title="§3. Cele i podstawy prawne przetwarzania">
            <ul>
              <li><strong>Odpowiedź na zapytanie ofertowe / kontakt</strong> — art. 6 ust. 1 lit. b RODO (działania zmierzające do zawarcia umowy na żądanie osoby, której dane dotyczą).</li>
              <li><strong>Realizacja umowy szkoleniowej lub konsultacyjnej</strong> — art. 6 ust. 1 lit. b RODO (wykonanie umowy).</li>
              <li><strong>Przesłanie materiałów edukacyjnych (lead magnet, wynik testu poziomującego)</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
              <li><strong>Wystawianie faktur i prowadzenie ksiąg rachunkowych</strong> — art. 6 ust. 1 lit. c RODO w zw. z ustawą o rachunkowości oraz ustawą o VAT.</li>
              <li><strong>Marketing własnych usług kierowany do dotychczasowych klientów</strong> — art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora polegający na podtrzymaniu relacji handlowej).</li>
              <li><strong>Marketing własnych usług kierowany do osób, które nie są klientami (newsletter, materiały edukacyjne, komunikacja handlowa)</strong> — art. 6 ust. 1 lit. a RODO (zgoda) w zw. z art. 398 Prawa komunikacji elektronicznej oraz art. 10 ust. 2 ustawy o świadczeniu usług drogą elektroniczną.</li>
              <li><strong>Dochodzenie i obrona roszczeń</strong> — art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora).</li>
              <li><strong>Statystyki, analiza ruchu i ulepszanie Serwisu (cookies analityczne)</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
              <li><strong>Marketing remarketingowy (cookies marketingowe — Meta Pixel, LinkedIn Insight, Google Ads)</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
              <li><strong>Zapewnienie bezpieczeństwa Serwisu i przeciwdziałanie nadużyciom</strong> — art. 6 ust. 1 lit. f RODO (uzasadniony interes Administratora).</li>
            </ul>
          </Section>

          <Section title="§4. Zakres przetwarzanych danych">
            <p>W zależności od formy kontaktu i działań w Serwisie, Administrator może przetwarzać:</p>
            <ul>
              <li>imię i nazwisko,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu (jeśli zostanie podany),</li>
              <li>nazwę firmy oraz dane do faktury (NIP, adres) — w przypadku zawarcia umowy,</li>
              <li>treść korespondencji i zapytań,</li>
              <li>odpowiedzi udzielone w teście poziomującym (jeśli z niego skorzystasz),</li>
              <li>dane techniczne: adres IP, identyfikator i wersja przeglądarki, system operacyjny, dane o sposobie korzystania z Serwisu — pozyskiwane z plików cookies wyłącznie po wyrażeniu zgody (z wyjątkiem cookies niezbędnych).</li>
            </ul>
            <p>
              Podanie danych jest dobrowolne, jednak ich brak może uniemożliwić realizację konkretnej usługi —
              np. odpowiedź na zapytanie czy zawarcie umowy szkoleniowej.
            </p>
          </Section>

          <Section title="§5. Okres przechowywania danych">
            <ul>
              <li>Dane z formularzy kontaktowych i korespondencji ofertowej — do <strong>3 lat</strong> od ostatniego kontaktu, chyba że doszło do zawarcia umowy.</li>
              <li>Dane związane z umową szkoleniową i dokumenty rozliczeniowe — przez okres wymagany przepisami podatkowymi i rachunkowymi, tj. <strong>5 lat</strong> licząc od końca roku kalendarzowego, w którym powstał obowiązek podatkowy.</li>
              <li>Dane z newslettera lub innej komunikacji marketingowej — do momentu cofnięcia zgody.</li>
              <li>Dane przetwarzane w celu dochodzenia lub obrony roszczeń — przez okres przedawnienia roszczeń wynikający z Kodeksu cywilnego.</li>
              <li>Dane analityczne i marketingowe (pliki cookies) — zgodnie z parametrami danego pliku, maksymalnie <strong>13 miesięcy</strong>; możesz je usunąć w każdej chwili w ustawieniach przeglądarki.</li>
            </ul>
          </Section>

          <Section title="§6. Odbiorcy danych">
            <p>
              Twoje dane mogą być powierzane podmiotom przetwarzającym (procesorom) na podstawie art. 28 RODO
              oraz udostępniane innym administratorom wyłącznie w zakresie niezbędnym i zgodnym z prawem:
            </p>
            <ul>
              <li><strong>Vercel Inc.</strong> (USA) — hosting Serwisu,</li>
              <li><strong>Microsoft Corporation / Microsoft Ireland Operations Ltd.</strong> — usługi Microsoft 365 (poczta, MS Forms — test poziomujący),</li>
              <li><strong>Google LLC / Google Ireland Ltd.</strong> — Google Tag Manager i Google Analytics (po wyrażeniu zgody na cookies analityczne),</li>
              <li><strong>Meta Platforms Ireland Ltd.</strong> — Meta Pixel (po wyrażeniu zgody na cookies marketingowe),</li>
              <li><strong>LinkedIn Ireland Unlimited Company</strong> — LinkedIn Insight Tag (po wyrażeniu zgody na cookies marketingowe),</li>
              <li><strong>Organy państwowe, sądy i organy ścigania</strong> — wyłącznie w zakresie wynikającym z obowiązujących przepisów prawa.</li>
            </ul>
          </Section>

          <Section title="§7. Transfer danych poza Europejski Obszar Gospodarczy">
            <p>
              Część odbiorców (m.in. Vercel, Google, Meta, LinkedIn, Microsoft) przetwarza dane w państwach
              trzecich poza EOG, głównie w USA. Transfer odbywa się na zasadach określonych w rozdziale V RODO,
              tj. na podstawie:
            </p>
            <ul>
              <li>standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (SCC) — art. 46 ust. 2 lit. c RODO,</li>
              <li>decyzji wykonawczej Komisji (UE) 2023/1795 stwierdzającej odpowiedni stopień ochrony zapewnianej przez ramy ochrony danych UE–USA (EU–US Data Privacy Framework) — w zakresie podmiotów certyfikowanych w DPF.</li>
            </ul>
            <p>
              Kopię stosowanych zabezpieczeń możesz uzyskać kontaktując się pod adresem{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
            </p>
          </Section>

          <Section title="§8. Twoje prawa">
            <p>Zgodnie z RODO przysługuje Ci prawo do:</p>
            <ul>
              <li>dostępu do swoich danych i otrzymania ich kopii (art. 15 RODO),</li>
              <li>sprostowania (poprawienia) danych (art. 16 RODO),</li>
              <li>usunięcia danych — „prawo do bycia zapomnianym" (art. 17 RODO),</li>
              <li>ograniczenia przetwarzania (art. 18 RODO),</li>
              <li>przenoszenia danych (art. 20 RODO),</li>
              <li>wniesienia sprzeciwu wobec przetwarzania na podstawie uzasadnionego interesu Administratora (art. 21 RODO),</li>
              <li>cofnięcia zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem (art. 7 ust. 3 RODO),</li>
              <li>wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa (art. 77 RODO).</li>
            </ul>
            <p>
              Aby skorzystać z powyższych praw, napisz na{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
              Administrator udziela odpowiedzi w terminie nie dłuższym niż miesiąc od otrzymania żądania,
              z możliwością przedłużenia o kolejne dwa miesiące w uzasadnionych przypadkach (art. 12 ust. 3 RODO).
            </p>
          </Section>

          <Section title="§9. Pliki cookies">
            <p>Serwis wykorzystuje trzy kategorie plików cookies:</p>
            <ul>
              <li><strong>Niezbędne</strong> — wymagane do podstawowego działania Serwisu (np. zachowanie wyboru zgody na cookies, sesja). Nie wymagają zgody — podstawa: art. 173 ust. 3 pkt 2 Prawa komunikacji elektronicznej.</li>
              <li><strong>Analityczne</strong> — Google Tag Manager, Google Analytics. Pomagają zrozumieć, jak Użytkownicy korzystają z Serwisu. Wymagają zgody.</li>
              <li><strong>Marketingowe</strong> — Meta Pixel, LinkedIn Insight Tag. Umożliwiają wyświetlanie dopasowanych reklam w innych serwisach. Wymagają zgody.</li>
            </ul>
            <p>
              Zgodę na poszczególne kategorie cookies wyrażasz w banerze pojawiającym się przy pierwszej wizycie.
              Możesz w dowolnym momencie zmienić swój wybór, klikając „Ustawienia cookies" w stopce Serwisu,
              lub usunąć pliki cookies w ustawieniach przeglądarki.
            </p>
          </Section>

          <Section title="§10. Profilowanie i zautomatyzowane decyzje">
            <p>
              Twoje dane nie podlegają zautomatyzowanemu podejmowaniu decyzji wywołującemu wobec Ciebie skutki prawne
              lub w podobny sposób istotnie na Ciebie wpływającemu (art. 22 RODO).
            </p>
            <p>
              Cookies marketingowe i analityczne mogą być wykorzystywane do profilowania w celach reklamowych
              (np. dopasowanie komunikacji), jednak nie skutkuje to automatycznymi decyzjami wpływającymi na Twoją
              sytuację prawną lub finansową. Masz prawo wyrazić sprzeciw wobec takiego profilowania w dowolnym momencie.
            </p>
          </Section>

          <Section title="§11. Bezpieczeństwo danych">
            <p>
              Administrator stosuje środki techniczne i organizacyjne adekwatne do zagrożeń i kategorii danych
              objętych ochroną, w szczególności:
            </p>
            <ul>
              <li>szyfrowanie połączeń w warstwie transportowej (HTTPS/TLS),</li>
              <li>ograniczenie dostępu do systemów do osób upoważnionych,</li>
              <li>regularne kopie zapasowe i monitoring infrastruktury,</li>
              <li>zawieranie umów powierzenia przetwarzania (art. 28 RODO) z podmiotami przetwarzającymi,</li>
              <li>weryfikację dostawców pod kątem zgodności z RODO.</li>
            </ul>
            <p>
              W przypadku stwierdzenia naruszenia ochrony danych osobowych Administrator stosuje procedurę zgodną
              z art. 33–34 RODO, w tym — gdy jest to wymagane — zawiadamia Prezesa UODO oraz osoby, których dane
              dotyczą.
            </p>
          </Section>

          <Section title="§12. Postanowienia końcowe">
            <p>
              Polityka prywatności może być aktualizowana w związku ze zmianami przepisów prawa, technologii lub
              modelu działania Administratora. O istotnych zmianach Użytkownicy będą informowani w sposób
              widoczny w Serwisie.
            </p>
            <p>
              W sprawach nieuregulowanych niniejszą Polityką zastosowanie mają przepisy RODO, ustawy o ochronie
              danych osobowych, ustawy o świadczeniu usług drogą elektroniczną oraz Prawa komunikacji
              elektronicznej.
            </p>
            <p style={{ color: '#6e6e73', fontSize: '13px', marginTop: '24px' }}>
              Wersja obowiązująca od: 28 kwietnia 2026 r.
            </p>
          </Section>
        </div>
      </article>

      <Footer />
    </main>
  );
}

const linkStyle: React.CSSProperties = { color: '#1e9953', textDecoration: 'underline', textUnderlineOffset: '3px' };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.4px', margin: '0 0 16px' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', lineHeight: 1.75, color: '#1d1d1f' }}>
        {children}
      </div>
    </section>
  );
}
