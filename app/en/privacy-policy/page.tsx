import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | pbix.pl',
  description: 'Privacy policy and information on personal data processing under the GDPR.',
  alternates: {
    canonical: 'https://www.pbix.pl/en/privacy-policy',
    languages: {
      'pl-PL': 'https://www.pbix.pl/polityka-prywatnosci',
      'en-US': 'https://www.pbix.pl/en/privacy-policy',
    },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />

      <article style={{ padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>
            Legal information
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 16px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#6e6e73', fontSize: '14px', margin: '0 0 48px' }}>
            Last updated: 28 April 2026
          </p>

          <Section title="Introduction">
            <p>
              This Privacy Policy describes how personal data is processed and protected for visitors of the
              <strong> www.pbix.pl</strong> website and users of services offered by the Controller — in particular
              trainings, consulting and educational materials.
            </p>
            <p>
              The document is based on Regulation (EU) 2016/679 of the European Parliament and of the Council of
              27 April 2016 (the General Data Protection Regulation, „GDPR"), the Polish Personal Data Protection
              Act of 10 May 2018, the Polish Act on Providing Services by Electronic Means of 18 July 2002, and the
              Polish Electronic Communications Act of 12 July 2024.
            </p>
          </Section>

          <Section title="§1. Definitions">
            <ul>
              <li><strong>Controller</strong> — the entity that determines the purposes and means of processing personal data, identified in §2.</li>
              <li><strong>Personal data</strong> — any information relating to an identified or identifiable natural person.</li>
              <li><strong>Processing</strong> — any operation performed on personal data (collection, storage, modification, disclosure, deletion, etc.).</li>
              <li><strong>GDPR</strong> — Regulation (EU) 2016/679 of 27 April 2016.</li>
              <li><strong>Website</strong> — the www.pbix.pl website together with its subdomains.</li>
              <li><strong>User</strong> — a natural person using the Website or the Controller's services.</li>
              <li><strong>Cookies</strong> — small data files stored on the User's device while using the Website.</li>
              <li><strong>Consent</strong> — a freely given, specific, informed and unambiguous indication of the data subject's wishes accepting the processing of their personal data.</li>
            </ul>
          </Section>

          <Section title="§2. Data Controller">
            <p>
              The Controller of your personal data is <strong>Radosław Sobczak</strong>, conducting sole-proprietor
              business under the name <strong>Radosław Sobczak Data Analysis</strong>, registered in Inowrocław, Poland,
              Tax ID (NIP): 5562743281, Statistical ID (REGON): 522321088.
            </p>
            <p>
              Contact for data protection matters:{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
            </p>
          </Section>

          <Section title="§3. Purposes and legal bases of processing">
            <ul>
              <li><strong>Responding to enquiries / contact requests</strong> — Art. 6(1)(b) GDPR (steps taken at the data subject's request prior to entering into a contract).</li>
              <li><strong>Performance of a training or consulting contract</strong> — Art. 6(1)(b) GDPR (contract performance).</li>
              <li><strong>Sending educational materials (lead magnet, level-test result)</strong> — Art. 6(1)(a) GDPR (consent).</li>
              <li><strong>Issuing invoices and keeping accounting records</strong> — Art. 6(1)(c) GDPR in conjunction with the Polish Accounting Act and the VAT Act.</li>
              <li><strong>Marketing of the Controller's own services to existing customers</strong> — Art. 6(1)(f) GDPR (legitimate interest in maintaining a business relationship).</li>
              <li><strong>Marketing of the Controller's own services to non-customers (newsletter, educational materials, commercial communication)</strong> — Art. 6(1)(a) GDPR (consent), in conjunction with Art. 398 of the Polish Electronic Communications Act and Art. 10(2) of the Polish Act on Providing Services by Electronic Means.</li>
              <li><strong>Establishing, exercising or defending legal claims</strong> — Art. 6(1)(f) GDPR (legitimate interest).</li>
              <li><strong>Statistics, traffic analysis and Website improvement (analytics cookies)</strong> — Art. 6(1)(a) GDPR (consent).</li>
              <li><strong>Remarketing (marketing cookies — Meta Pixel, LinkedIn Insight, Google Ads)</strong> — Art. 6(1)(a) GDPR (consent).</li>
              <li><strong>Ensuring the security of the Website and preventing abuse</strong> — Art. 6(1)(f) GDPR (legitimate interest).</li>
            </ul>
          </Section>

          <Section title="§4. Scope of data processed">
            <p>Depending on the form of contact and your activity on the Website, the Controller may process:</p>
            <ul>
              <li>first and last name,</li>
              <li>email address,</li>
              <li>phone number (if provided),</li>
              <li>company name and invoicing details (Tax ID, address) — in the event of a contract,</li>
              <li>contents of correspondence and enquiries,</li>
              <li>answers given in the level test (if you choose to take it),</li>
              <li>technical data: IP address, browser identifier and version, operating system, information on how the Website is used — collected through cookies only after your consent (except for strictly necessary cookies).</li>
            </ul>
            <p>
              Providing data is voluntary; however, failure to provide it may prevent the delivery of a specific
              service — for example responding to your enquiry or entering into a training contract.
            </p>
          </Section>

          <Section title="§5. Data retention periods">
            <ul>
              <li>Data from contact forms and pre-sale correspondence — up to <strong>3 years</strong> from the last contact, unless a contract is concluded.</li>
              <li>Data related to a training contract and accounting records — for the period required by tax and accounting law, i.e. <strong>5 years</strong> from the end of the calendar year in which the tax obligation arose.</li>
              <li>Newsletter or other marketing communication data — until consent is withdrawn.</li>
              <li>Data processed to establish or defend legal claims — for the limitation period under the Polish Civil Code.</li>
              <li>Analytics and marketing data (cookies) — according to the parameters of the given file, no longer than <strong>13 months</strong>; you may delete them at any time in your browser settings.</li>
            </ul>
          </Section>

          <Section title="§6. Recipients of data">
            <p>
              Your data may be entrusted to processors under Art. 28 GDPR or shared with other controllers only to
              the extent necessary and lawful:
            </p>
            <ul>
              <li><strong>Vercel Inc.</strong> (USA) — Website hosting,</li>
              <li><strong>Microsoft Corporation / Microsoft Ireland Operations Ltd.</strong> — Microsoft 365 services (mail, MS Forms — level test),</li>
              <li><strong>Google LLC / Google Ireland Ltd.</strong> — Google Tag Manager and Google Analytics (subject to consent for analytics cookies),</li>
              <li><strong>Meta Platforms Ireland Ltd.</strong> — Meta Pixel (subject to consent for marketing cookies),</li>
              <li><strong>LinkedIn Ireland Unlimited Company</strong> — LinkedIn Insight Tag (subject to consent for marketing cookies),</li>
              <li><strong>Public authorities, courts and law-enforcement bodies</strong> — only to the extent required by applicable law.</li>
            </ul>
          </Section>

          <Section title="§7. Transfers outside the European Economic Area">
            <p>
              Some recipients (including Vercel, Google, Meta, LinkedIn, Microsoft) process data in third countries
              outside the EEA, mainly in the USA. Transfers are made under Chapter V GDPR, in particular on the
              basis of:
            </p>
            <ul>
              <li>Standard Contractual Clauses approved by the European Commission (SCC) — Art. 46(2)(c) GDPR,</li>
              <li>Commission Implementing Decision (EU) 2023/1795 on the adequate protection ensured by the EU–US Data Privacy Framework — for entities certified under the DPF.</li>
            </ul>
            <p>
              You may obtain a copy of the safeguards applied by contacting{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
            </p>
          </Section>

          <Section title="§8. Your rights">
            <p>Under the GDPR you have the right to:</p>
            <ul>
              <li>access your data and obtain a copy (Art. 15 GDPR),</li>
              <li>rectification of inaccurate data (Art. 16 GDPR),</li>
              <li>erasure of data — the „right to be forgotten" (Art. 17 GDPR),</li>
              <li>restriction of processing (Art. 18 GDPR),</li>
              <li>data portability (Art. 20 GDPR),</li>
              <li>object to processing based on the Controller's legitimate interest (Art. 21 GDPR),</li>
              <li>withdraw consent at any time — without affecting the lawfulness of processing carried out before withdrawal (Art. 7(3) GDPR),</li>
              <li>lodge a complaint with the supervisory authority — the President of the Personal Data Protection Office (Prezes UODO), ul. Stawki 2, 00-193 Warsaw, Poland (Art. 77 GDPR).</li>
            </ul>
            <p>
              To exercise the above rights, write to{' '}
              <a href="mailto:kontakt@pbix.pl" style={linkStyle}>kontakt@pbix.pl</a>.
              The Controller will respond no later than one month after receiving the request, with a possible
              extension of up to two further months in justified cases (Art. 12(3) GDPR).
            </p>
          </Section>

          <Section title="§9. Cookies">
            <p>The Website uses three categories of cookies:</p>
            <ul>
              <li><strong>Strictly necessary</strong> — required for the basic operation of the Website (e.g. storing the cookie-consent choice, session). They do not require consent — basis: Art. 173(3)(2) of the Polish Electronic Communications Act.</li>
              <li><strong>Analytics</strong> — Google Tag Manager, Google Analytics. They help us understand how Users interact with the Website. They require consent.</li>
              <li><strong>Marketing</strong> — Meta Pixel, LinkedIn Insight Tag. They allow tailored advertising on other websites. They require consent.</li>
            </ul>
            <p>
              You give consent for each category in the banner shown on your first visit. You may change your
              choice at any time by clicking „Cookie settings" in the footer of the Website, or delete cookies in
              your browser settings.
            </p>
          </Section>

          <Section title="§10. Profiling and automated decision-making">
            <p>
              Your data is not subject to automated decision-making producing legal effects concerning you or
              similarly significantly affecting you (Art. 22 GDPR).
            </p>
            <p>
              Marketing and analytics cookies may be used for profiling for advertising purposes (e.g. tailoring
              communications); however, this does not result in automated decisions affecting your legal or
              financial situation. You have the right to object to such profiling at any time.
            </p>
          </Section>

          <Section title="§11. Data security">
            <p>
              The Controller applies technical and organisational measures appropriate to the risks and the
              category of data protected, in particular:
            </p>
            <ul>
              <li>encryption of connections at the transport layer (HTTPS/TLS),</li>
              <li>limiting access to systems to authorised persons,</li>
              <li>regular backups and infrastructure monitoring,</li>
              <li>concluding data-processing agreements (Art. 28 GDPR) with processors,</li>
              <li>verifying providers for GDPR compliance.</li>
            </ul>
            <p>
              In the event of a personal-data breach, the Controller follows the procedure under Art. 33–34 GDPR,
              including — where required — notifying the President of UODO and the data subjects.
            </p>
          </Section>

          <Section title="§12. Final provisions">
            <p>
              This Privacy Policy may be updated due to changes in law, technology or the Controller's business
              model. Material changes will be communicated visibly on the Website.
            </p>
            <p>
              Matters not covered by this Policy are governed by the GDPR, the Polish Personal Data Protection Act,
              the Polish Act on Providing Services by Electronic Means, and the Polish Electronic Communications Act.
            </p>
            <p style={{ color: '#6e6e73', fontSize: '13px', marginTop: '24px' }}>
              Effective from: 28 April 2026.
            </p>
            <p style={{ color: '#6e6e73', fontSize: '13px' }}>
              In case of any discrepancy between the Polish and English versions, the Polish version prevails.
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
