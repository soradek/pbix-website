import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { projectsEn, projectsPl } from '@/data/projects';
import s from './home.module.css';
import PageHero from './PageHero';
import HomeFinalCta from './HomeFinalCta';
import ProjectVisual from './ProjectVisuals';
import ReportEmbed from './ReportEmbed';
import { RollingLink } from './RollingButton';
import { FadeIn, SectionHead } from './motion';
import { ROUTES, type Lang } from './lang';

const REPORT_SRC =
  'https://app.powerbi.com/view?r=eyJrIjoiYTQ1MmFiZWQtZjNmNC00MGUzLWE1OWItMmZiOGFkYThlMTBlIiwidCI6Ijc0YjI1MTVjLTBmNGItNDAxZC04MTUwLTM0MzRiY2NlNjA0NyIsImMiOjl9';

const COPY = {
  pl: {
    title: 'Projekty Power BI',
    lead: 'Dane same w sobie nie tworzą wartości. Robią to raporty i dashboardy, na podstawie których ludzie podejmują lepsze decyzje.',
    cta: 'Porozmawiaj o swoim projekcie',
    seeReport: 'Zobacz raport na żywo',
    problem: 'Problem',
    solution: 'Rozwiązanie',
    result: 'Rezultat',
    liveTitle: 'Przykładowy raport, na żywo',
    liveSub: 'Raport e-commerce w Power BI. Klikaj, filtruj i przełączaj widoki, tak jak robią to moi klienci.',
    iframeTitle: 'Przykładowy raport Power BI: e-commerce',
    openReport: 'Otwórz raport na pełnym ekranie',
    loadingReport: 'Ładowanie raportu',
    casesTitle: 'Wybrane wdrożenia',
  },
  en: {
    title: 'Power BI projects',
    lead: 'Data alone does not create value. Reports and dashboards do, because people make better decisions based on them.',
    cta: 'Talk about your project',
    seeReport: 'See a live report',
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
    liveTitle: 'A sample report, live',
    liveSub: 'An e-commerce report in Power BI. Click, filter and switch views, just like my clients do.',
    iframeTitle: 'Sample Power BI report: e-commerce',
    openReport: 'Open the report full screen',
    loadingReport: 'Loading report',
    casesTitle: 'Selected implementations',
  },
};

export default function ProjectsView({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const projects = lang === 'en' ? projectsEn : projectsPl;

  return (
    <main className={s.page}>
      <Navbar />
      <PageHero title={t.title} lead={t.lead}>
        <div className={s.actions} style={{ marginTop: 28 }}>
          <RollingLink href={ROUTES[lang].contact} label={t.cta} variant="dark" />
          <RollingLink href="#raport" label={t.seeReport} variant="outline" arrow={false} />
        </div>
      </PageHero>

      <section className={`${s.onWhite} ${s.projectsSection}`}>
        <div className={s.container}>
          <SectionHead title={t.casesTitle} />
          <ol className={s.projectList}>
            {projects.map((p, i) => (
              <li key={p.title} className={`${s.project} ${i % 2 ? s.projectFlip : ''}`}>
                <FadeIn className={s.projectBody}>
                  <p className={`${s.mono} ${s.projectIndustry}`}>
                    <span className={s.projectIndex}>{String(i + 1).padStart(2, '0')}</span>
                    {p.industry}
                  </p>
                  <h2 className={s.projectTitle}>{p.title}</h2>
                  <dl className={s.projectFacts}>
                    <div>
                      <dt className={s.mono}>{t.problem}</dt>
                      <dd>{p.problem}</dd>
                    </div>
                    <div>
                      <dt className={s.mono}>{t.solution}</dt>
                      <dd>{p.solution}</dd>
                    </div>
                  </dl>
                  <div className={s.projectResult}>
                    <p className={`${s.mono} ${s.projectLabel} ${s.projectLabelAccent}`}>{t.result}</p>
                    <p className={s.projectResultText}>{p.result}</p>
                  </div>
                  <p className={`${s.mono} ${s.projectTags}`}>{p.tags.join(' · ')}</p>
                </FadeIn>
                <FadeIn className={s.projectVisualWrap} delay={0.1}>
                  <ProjectVisual index={i} lang={lang} />
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="raport" className={`${s.section} ${s.onInk}`}>
        <div className={s.container}>
          <SectionHead title={t.liveTitle} sub={t.liveSub} />
          <FadeIn className={s.reportFrame}>
            <ReportEmbed src={REPORT_SRC} title={t.iframeTitle} loadingLabel={t.loadingReport} />
          </FadeIn>
          <div className={s.reportActions}>
            <a className={`${s.btn} ${s.btnGhostDark}`} href={REPORT_SRC} target="_blank" rel="noopener noreferrer">
              {t.openReport} ↗
            </a>
          </div>
        </div>
      </section>

      <HomeFinalCta lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
