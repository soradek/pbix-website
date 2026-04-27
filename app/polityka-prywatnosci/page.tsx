import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Polityka prywatności | pbix.pl',
  description: 'Polityka prywatności i informacja o przetwarzaniu danych osobowych zgodnie z RODO.',
  alternates: { canonical: 'https://www.pbix.pl/polityka-prywatnosci' },
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
            Ostatnia aktualizacja: 27 kwietnia 2026
          </p>

          <Section title="1. Administrator danych">
            <p>
              Administratorem Twoich danych osobowych jest <strong>Radosław Sobczak</strong>, prowadzący działalność
              gospodarczą pod firmą pbix.pl, z siedzibą w [ADRES], NIP: [NIP], REGON: [REGON].
            </p>
            <p>Kontakt w sprawach związanych z przetwarzaniem danych: <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.</p>
          </Section>

          <Section title="2. Jakie dane przetwarzamy">
            <p>W zależności od formy kontaktu i działania na stronie możemy przetwarzać:</p>
            <ul>
              <li>imię i nazwisko,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu (jeśli zostanie podany),</li>
              <li>nazwę firmy (jeśli zostanie podana),</li>
              <li>treść wiadomości lub zapytania,</li>
              <li>dane techniczne: adres IP, identyfikator przeglądarki, dane o sposobie korzystania z serwisu (z plików cookies — tylko za Twoją zgodą).</li>
            </ul>
          </Section>

          <Section title="3. Cel i podstawa prawna przetwarzania">
            <ul>
              <li><strong>Odpowiedź na zapytanie ofertowe / kontakt</strong> — art. 6 ust. 1 lit. b RODO (działania zmierzające do zawarcia umowy).</li>
              <li><strong>Realizacja umowy szkoleniowej</strong> — art. 6 ust. 1 lit. b RODO.</li>
              <li><strong>Przesłanie materiałów edukacyjnych (lead magnet, test poziomujący)</strong> — art. 6 ust. 1 lit. a RODO (Twoja zgoda).</li>
              <li><strong>Wystawienie faktury i obowiązki rachunkowe</strong> — art. 6 ust. 1 lit. c RODO (obowiązek prawny — ustawa o rachunkowości, ustawa o VAT).</li>
              <li><strong>Marketing własnych usług</strong> — art. 6 ust. 1 lit. f RODO (uzasadniony interes administratora) lub art. 6 ust. 1 lit. a RODO (zgoda na newsletter / marketing elektroniczny).</li>
              <li><strong>Statystyki i ulepszanie strony (cookies analityczne)</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
              <li><strong>Cookies marketingowe (Meta Pixel, LinkedIn Insight)</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
            </ul>
          </Section>

          <Section title="4. Okres przechowywania">
            <ul>
              <li>Dane z formularzy kontaktowych — do 3 lat od ostatniego kontaktu, chyba że doszło do zawarcia umowy.</li>
              <li>Dane związane z umową szkoleniową — przez okres wymagany przepisami podatkowymi i rachunkowymi (5 lat od końca roku rozliczeniowego).</li>
              <li>Dane z newslettera / marketingu — do momentu wycofania zgody.</li>
              <li>Dane analityczne i marketingowe (cookies) — zgodnie z ustawieniami Twojej przeglądarki, maksymalnie 13 miesięcy.</li>
            </ul>
          </Section>

          <Section title="5. Odbiorcy danych">
            <p>Twoje dane mogą być przekazywane następującym kategoriom odbiorców (procesorom działającym na podstawie umów powierzenia):</p>
            <ul>
              <li><strong>Vercel Inc.</strong> — hosting strony,</li>
              <li><strong>Resend</strong> — wysyłka powiadomień e-mail,</li>
              <li><strong>Microsoft Corporation</strong> — narzędzia M365 (test poziomujący w MS Forms, e-mail biznesowy),</li>
              <li><strong>Google LLC</strong> — Google Tag Manager / Analytics (jeśli wyrazisz zgodę na cookies analityczne),</li>
              <li><strong>Meta Platforms Ireland Ltd.</strong> — Meta Pixel (jeśli wyrazisz zgodę na cookies marketingowe),</li>
              <li><strong>LinkedIn Ireland Unlimited Company</strong> — LinkedIn Insight Tag (jeśli wyrazisz zgodę na cookies marketingowe),</li>
              <li>biuro rachunkowe — w zakresie wystawiania faktur,</li>
              <li>organy państwowe — w zakresie wynikającym z przepisów prawa.</li>
            </ul>
          </Section>

          <Section title="6. Transfer danych poza EOG">
            <p>
              Część odbiorców (Resend, Vercel, Google, Meta, LinkedIn, Microsoft) ma siedzibę poza Europejskim Obszarem Gospodarczym
              (głównie w USA). Transfer odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję
              Europejską (SCC) oraz, w przypadku dostawców z USA, na podstawie Data Privacy Framework, gdzie ma to zastosowanie.
            </p>
          </Section>

          <Section title="7. Twoje prawa">
            <p>Zgodnie z RODO masz prawo do:</p>
            <ul>
              <li>dostępu do swoich danych i otrzymania ich kopii,</li>
              <li>sprostowania (poprawienia) danych,</li>
              <li>usunięcia danych („prawo do bycia zapomnianym"),</li>
              <li>ograniczenia przetwarzania,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania na podstawie uzasadnionego interesu,</li>
              <li>cofnięcia zgody w dowolnym momencie (cofnięcie nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej cofnięciem),</li>
              <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
            <p>Aby skorzystać z powyższych praw, napisz na <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.</p>
          </Section>

          <Section title="8. Pliki cookies">
            <p>Strona wykorzystuje trzy kategorie cookies:</p>
            <ul>
              <li><strong>Niezbędne</strong> — wymagane do podstawowego działania strony (np. zachowanie ustawień zgody na cookies). Nie wymagają zgody.</li>
              <li><strong>Analityczne</strong> — Google Tag Manager / Google Analytics. Pomagają zrozumieć, jak korzystasz ze strony. Wymagają zgody.</li>
              <li><strong>Marketingowe</strong> — Meta Pixel, LinkedIn Insight Tag. Pozwalają na wyświetlanie dopasowanych reklam poza stroną. Wymagają zgody.</li>
            </ul>
            <p>
              Zgodę na poszczególne kategorie cookies wyrażasz w banerze pojawiającym się przy pierwszej wizycie. Możesz w
              każdej chwili zmienić swój wybór, klikając „Ustawienia cookies" w stopce strony.
            </p>
          </Section>

          <Section title="9. Profilowanie i zautomatyzowane decyzje">
            <p>
              Twoje dane nie podlegają zautomatyzowanemu podejmowaniu decyzji wywołującemu skutki prawne. Cookies marketingowe
              służą do dopasowania komunikacji reklamowej, ale nie podejmują decyzji w Twoim imieniu.
            </p>
          </Section>

          <Section title="10. Bezpieczeństwo danych">
            <p>
              Stosujemy środki techniczne i organizacyjne adekwatne do ryzyka — m.in. szyfrowanie połączeń (HTTPS/TLS),
              ograniczony dostęp do systemów, regularne kopie zapasowe, monitorowanie nieautoryzowanego dostępu.
            </p>
          </Section>

          <Section title="11. Zmiany w polityce">
            <p>
              Polityka może być aktualizowana. Każda istotna zmiana zostanie zakomunikowana na stronie. Data ostatniej
              aktualizacji znajduje się na początku tego dokumentu.
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
