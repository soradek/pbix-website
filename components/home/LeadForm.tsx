'use client';

import { useId, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trainings } from '@/data/trainings';
import { getTrainingEnContent, enPriceLabel } from '@/data/trainings-en';
import s from './home.module.css';
import { FadeIn, SplitHeading } from './motion';
import type { Lang } from './lang';

type Variant = 'contact' | 'register';
type Fields = { name: string; email: string; phone: string; training: string; form: string; message: string };

const COPY = {
  pl: {
    contact: {
      title: 'Napisz do mnie',
      lead: 'Opisz potrzeby swojego zespołu, a dobiorę szkolenie dopasowane do poziomu i celów Twojej firmy.',
      tipsTitle: 'Co warto napisać',
      tips: ['Ile osób weźmie udział', 'Z jakich narzędzi korzystacie na co dzień', 'Preferowany termin i forma: u Was albo online'],
      submit: 'Wyślij wiadomość',
    },
    register: {
      title: 'Zamów szkolenie dla zespołu',
      lead: 'Wypełnij formularz, skontaktuję się w ciągu 24 godzin, aby omówić szczegóły i dopasować program do potrzeb Twojego zespołu.',
      tipsTitle: 'Co dalej',
      tips: ['Odpisuję i ustalamy szczegóły', 'W razie potrzeby test poziomujący', 'Potwierdzamy termin i program'],
      submit: 'Wyślij zgłoszenie',
    },
    name: 'Imię i nazwisko', email: 'E-mail', phone: 'Telefon', training: 'Szkolenie', form: 'Preferowana forma',
    message: 'Wiadomość', extra: 'Dodatkowe informacje', optional: 'opcjonalnie', required: 'wymagane',
    namePh: 'Jan Kowalski', emailPh: 'jan@firma.pl', phonePh: '+48 600 000 000',
    messagePh: 'Opisz potrzeby zespołu, liczbę pracowników, preferowany termin…',
    extraPh: 'Liczba pracowników, preferowany termin, poziom zaawansowania zespołu…',
    pickTraining: 'Wybierz szkolenie', pickForm: 'Wybierz formę',
    forms: [['stacjonarnie', 'Stacjonarnie (u Was w firmie)'], ['online', 'Online (Teams / Zoom)'], ['bez-preferencji', 'Bez preferencji']],
    errName: 'Podaj imię i nazwisko', errEmail: 'Podaj poprawny adres e-mail', errMessage: 'Napisz wiadomość', errTraining: 'Wybierz szkolenie',
    sending: 'Wysyłanie…',
    sendError: 'Nie udało się wysłać formularza. Spróbuj ponownie albo napisz bezpośrednio na',
    orEmail: 'Wolisz e-mail?',
    doneTitle: 'Dziękuję, wiadomość dotarła.',
    doneText: 'Odpiszę na podany adres e-mail. Jeśli sprawa jest pilna, napisz też na',
    again: 'Wyślij kolejną wiadomość',
  },
  en: {
    contact: {
      title: 'Get in touch',
      lead: 'Describe your team’s needs and I will recommend the training best suited to your level and goals.',
      tipsTitle: 'Worth mentioning',
      tips: ['How many people will attend', 'Which tools you use day to day', 'Preferred date and format: on-site or online'],
      submit: 'Send message',
    },
    register: {
      title: 'Book a training for your team',
      lead: 'Fill in the form and I will get back to you within 24 hours to discuss the details and tailor the programme to your team.',
      tipsTitle: 'What happens next',
      tips: ['I reply and we agree the details', 'A skills test if needed', 'We confirm the date and programme'],
      submit: 'Send request',
    },
    name: 'Full name', email: 'Email', phone: 'Phone', training: 'Training', form: 'Preferred format',
    message: 'Message', extra: 'Additional information', optional: 'optional', required: 'required',
    namePh: 'John Smith', emailPh: 'john@company.com', phonePh: '+44 7700 900000',
    messagePh: 'Describe your team’s needs, number of participants, preferred date…',
    extraPh: 'Number of participants, preferred date, team skill level…',
    pickTraining: 'Select a training', pickForm: 'Select a format',
    forms: [['stacjonarnie', 'On-site (at your company)'], ['online', 'Online (Teams / Zoom)'], ['bez-preferencji', 'No preference']],
    errName: 'Enter your full name', errEmail: 'Enter a valid email address', errMessage: 'Write a message', errTraining: 'Select a training',
    sending: 'Sending…',
    sendError: 'The form could not be sent. Please try again or write directly to',
    orEmail: 'Prefer email?',
    doneTitle: 'Thank you, your message has arrived.',
    doneText: 'I will reply to the email address you provided. If it is urgent, you can also write to',
    again: 'Send another message',
  },
};

const EMAIL = 'kontakt@pbix.pl';

export default function LeadForm({ lang = 'pl', variant = 'contact' }: { lang?: Lang; variant?: Variant }) {
  const t = COPY[lang];
  const v = t[variant];
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [data, setData] = useState<Fields>({ name: '', email: '', phone: '', training: '', form: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const set = (f: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData(p => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
  };

  function validate() {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!data.name.trim()) e.name = t.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) e.email = t.errEmail;
    if (variant === 'contact' && !data.message.trim()) e.message = t.errMessage;
    if (variant === 'register' && !data.training) e.training = t.errTraining;
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Move focus to the first invalid field so keyboard and screen-reader users land on it
      const first = (Object.keys(errs) as (keyof Fields)[])[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    setLoading(true);
    setSendError(false);
    const { phone, form, ...rest } = data;
    const payload = variant === 'contact'
      ? { type: 'kontakt', ...rest, phone, honeypot }
      : { type: 'zapisy', ...rest, form, honeypot };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSubmitted(true);
      else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  }

  const label = (f: keyof Fields, text: string, required: boolean) => (
    <label htmlFor={id(f)} className={s.formLabel}>
      {text}
      <span className={s.formHint}>{required ? '' : t.optional}</span>
    </label>
  );
  const fieldProps = (f: keyof Fields) => ({
    id: id(f),
    name: f,
    value: data[f],
    onChange: set(f),
    className: s.formInput,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-err`) : undefined,
  });
  const error = (f: keyof Fields) =>
    errors[f] ? <p id={id(`${f}-err`)} className={s.formError}>{errors[f]}</p> : null;

  const trainingLabel = (slug: string, title: string, price: number, priceLabel: string) => {
    const name = lang === 'en' ? getTrainingEnContent(slug)?.title ?? title : title;
    if (variant !== 'register') return name;
    return `${name} · ${lang === 'en' ? enPriceLabel(price) : priceLabel}`;
  };

  return (
    <main className={s.page}>
      <Navbar />

      <section className={s.leadSection}>
        <div className={`${s.container} ${s.leadGrid}`}>
          <div className={s.leadIntro}>
            <SplitHeading as="h1" text={v.title} className={s.leadTitle} onMount />
            <FadeIn onMount delay={0.2} y={16}>
              <p className={s.leadLead}>{v.lead}</p>
              <p className={`${s.mono} ${s.leadTipsTitle}`}>{v.tipsTitle}</p>
              <ol className={s.leadTips}>
                {v.tips.map(tip => <li key={tip}>{tip}</li>)}
              </ol>
              <p className={s.leadEmail}>
                {t.orEmail} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            </FadeIn>
          </div>

          <FadeIn onMount delay={0.3} y={20}>
            {submitted ? (
              <div className={`${s.leadForm} ${s.leadDone}`} role="status">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <circle cx="28" cy="28" r="27" stroke="#1e9953" strokeWidth="2" />
                  <polyline points="17,29 25,37 40,20" stroke="#1e9953" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className={s.leadDoneTitle}>{t.doneTitle}</h2>
                <p className={s.leadLead}>{t.doneText} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
                <button
                  type="button"
                  className={`${s.btn} ${s.btnOutline}`}
                  onClick={() => { setSubmitted(false); setData({ name: '', email: '', phone: '', training: '', form: '', message: '' }); }}
                >
                  {t.again}
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} noValidate className={s.leadForm}>
              {/* Honeypot: hidden from people, bots fill it in */}
              <div className={s.srOnly} aria-hidden="true">
                <label htmlFor={id('hp')}>Website</label>
                <input id={id('hp')} type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
              </div>

              <div className={s.formRow}>
                <div className={s.formField}>
                  {label('name', t.name, true)}
                  <input {...fieldProps('name')} type="text" autoComplete="name" placeholder={t.namePh} maxLength={120} required />
                  {error('name')}
                </div>
                <div className={s.formField}>
                  {label('email', t.email, true)}
                  <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" placeholder={t.emailPh} maxLength={254} required />
                  {error('email')}
                </div>
              </div>

              {variant === 'contact' && (
                <div className={s.formField}>
                  {label('phone', t.phone, false)}
                  <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder={t.phonePh} maxLength={30} />
                </div>
              )}

              <div className={s.formField}>
                {label('training', t.training, variant === 'register')}
                <select {...fieldProps('training')} required={variant === 'register'}>
                  <option value="">{t.pickTraining}</option>
                  {trainings.map(tr => (
                    <option key={tr.slug} value={tr.slug}>{trainingLabel(tr.slug, tr.title, tr.price, tr.priceLabel)}</option>
                  ))}
                </select>
                {error('training')}
              </div>

              {variant === 'register' && (
                <div className={s.formField}>
                  {label('form', t.form, false)}
                  <select {...fieldProps('form')}>
                    <option value="">{t.pickForm}</option>
                    {t.forms.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                  </select>
                </div>
              )}

              <div className={s.formField}>
                {label('message', variant === 'contact' ? t.message : t.extra, variant === 'contact')}
                <textarea
                  {...fieldProps('message')}
                  rows={5}
                  maxLength={4000}
                  placeholder={variant === 'contact' ? t.messagePh : t.extraPh}
                  required={variant === 'contact'}
                />
                {error('message')}
              </div>

              <button type="submit" disabled={loading} className={`${s.btn} ${s.btnDark} ${s.btnFull} ${s.formSubmit}`}>
                {loading ? t.sending : v.submit}
              </button>
              {sendError && (
                <p className={s.formError} role="alert">
                  {t.sendError} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              )}
            </form>
            )}
          </FadeIn>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
