'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────
   HIGH-END AGENCY REDESIGN MOCKUP – pbix.pl
   ────────────────────────────────────────────────────────────── */

const springConfig = { type: 'spring', stiffness: 100, damping: 20 };
const easeOutCurve = cubicBezier(0.32, 0.72, 0, 1);

export default function RedesignMockup() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      {/* ─── NAVBAR (Premium Glass Floating) ─── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max rounded-full px-8 py-3 backdrop-blur-xl bg-white/80 border border-zinc-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-12">
          <div className="font-bold text-lg tracking-tight">pbix.pl</div>
          <div className="hidden md:flex gap-8 text-sm text-zinc-600">
            {['Szkolenia', 'Projekty', 'FAQ'].map(item => (
              <motion.a
                key={item}
                href="#"
                className="relative group"
                whileHover={{ color: '#1e9953' }}
                transition={{ duration: 0.3 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ml-4 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Kontakt
          </motion.button>
        </div>
      </nav>

      {/* ─── HERO SECTION (Asymmetric, Premium Typography) ─── */}
      <section className="min-h-[100dvh] pt-32 pb-24 px-6 md:px-12 flex items-center relative overflow-hidden">
        {/* Animated background blur shapes */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-40 w-60 h-60 rounded-full bg-gradient-to-tr from-emerald-50/30 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutCurve }}
          >
            <div className="inline-block mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-500 px-3 py-1 rounded-full bg-zinc-100">
                Szkolenia dla profesjonalistów
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-8 tracking-tight">
              Zamień dane
              <span className="block mt-3 text-emerald-600">w wartość</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-10 max-w-xl">
              Power BI, Excel, SQL i VBA. Szkolenia prowadzone przez certyfikowanego trenera Microsoft z ponad 7 latami doświadczenia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                Poznaj szkolenia
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full border-2 border-zinc-300 text-zinc-950 font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                Napisz do mnie
              </motion.button>
            </div>

            {/* Stats under CTA */}
            <div className="mt-16 grid grid-cols-2 gap-8 pt-8 border-t border-zinc-200/50">
              {[
                { number: '4,000+', label: 'godzin szkoleniowych' },
                { number: '4,500+', label: 'przeszkolonych pracowników' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Element (Floating Card Grid) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOutCurve, delay: 0.2 }}
            className="relative h-96 md:h-full"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              {/* Large card – top left */}
              <motion.div
                className="col-span-1 row-span-2 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-white p-8 border border-zinc-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-100 mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-zinc-950 mb-2">Power BI</h3>
                <p className="text-sm text-zinc-600">Dashboardy od A do Z</p>
              </motion.div>

              {/* Top right */}
              <motion.div
                className="rounded-[2rem] bg-white p-6 border border-zinc-200/50 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.06)]"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-100 mb-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">SQL</p>
              </motion.div>

              {/* Bottom right cards */}
              <motion.div
                className="rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-[0_20px_40px_-15px_rgba(30,153,83,0.3)]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              >
                <div className="font-bold mb-1 text-sm">7+ lat</div>
                <p className="text-xs text-emerald-100">doświadczenia MCT</p>
              </motion.div>

              <motion.div
                className="rounded-[2rem] bg-white p-6 border border-zinc-200/50 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.06)]"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              >
                <div className="text-2xl font-bold text-emerald-600 mb-1">Excel</div>
                <p className="text-xs text-zinc-500">VBA & formulas</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SPECIALIZATIONS (Bento Grid – Asymmetric) ─── */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Specjalizacje</span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 leading-none tracking-tight">
              Czego nauczę
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {/* Large card – col-span-2 row-span-2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-700 p-10 text-white shadow-[0_20px_40px_-15px_rgba(30,153,83,0.25)] group cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white/15 mb-6 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">Power BI</h3>
                  <p className="text-emerald-100 leading-relaxed">Od surowych danych do interaktywnych dashboardów. Model danych, DAX, publikacja w chmurze.</p>
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  Odkryj więcej
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Small cards */}
            {[
              { title: 'Excel', desc: 'VBA, Power Query, analiza danych' },
              { title: 'SQL', desc: 'Zapytania, bazy relacyjne' },
              { title: 'Wizualizacja', desc: 'Wykresy, prezentacje, storytelling' }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
                viewport={{ once: true }}
                className="rounded-[2rem] bg-white p-8 border border-zinc-200/50 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)] group hover:border-emerald-200/70 hover:shadow-[0_20px_40px_-15px_rgba(30,153,83,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 mb-4 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-zinc-950">{card.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENTS MARQUEE (Enhanced) ─── */}
      <section className="py-24 px-6 md:px-12 border-t border-zinc-200/50">
        <div className="max-w-7xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center tracking-tight"
          >
            Zaufali mi
          </motion.h2>
        </div>

        {/* Marquee – subtle gradient background */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-white via-emerald-50/30 to-white p-12 border border-zinc-200/30">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {['Volkswagen', 'OLX', 'Lufthansa', 'Żabka', 'Unilever', 'PepsiCo', 'Zoetis'].map((client, i) => (
              <div key={i} className="flex-shrink-0 text-zinc-400 font-semibold opacity-60 hover:opacity-100 transition-opacity">
                {client}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {['Volkswagen', 'OLX', 'Lufthansa', 'Żabka', 'Unilever', 'PepsiCo', 'Zoetis'].map((client, i) => (
              <div key={`dup-${i}`} className="flex-shrink-0 text-zinc-400 font-semibold opacity-60">
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE (Card Grid) ─── */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Dlaczego ja</span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 leading-none tracking-tight">
              Nie zwyczajne szkolenie
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Zero presji',
                desc: 'Pytaj o wszystko, tyle razy ile potrzebujesz. Szkolenie, nie egzamin.'
              },
              {
                title: 'Przykłady biznesowe',
                desc: 'Żadnych sztucznych zadań. Każde ćwiczenie bazuje na realnych przypadkach.'
              },
              {
                title: 'Natychmiastowe zastosowanie',
                desc: 'Metody, które wdrożysz już następnego dnia. Wiedza gotowa do użycia.'
              },
              {
                title: 'Indywidualne podejście',
                desc: 'Dostosowuję tempo i zakres do Twojego poziomu. Nikt nie zostanie sam.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="group rounded-[2rem] bg-white p-10 border border-zinc-200/50 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)] hover:border-emerald-200/70 hover:shadow-[0_20px_40px_-15px_rgba(30,153,83,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-zinc-950">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (Slider with Micro-interactions) ─── */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-br from-white via-emerald-50/20 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Opinie</span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 leading-none tracking-tight">
              Co mówią uczestnicy
            </h2>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* ─── CTA SECTION (Premium) ─── */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-gradient-to-br from-emerald-600 to-emerald-700 p-16 md:p-24 text-center text-white shadow-[0_25px_50px_-12px_rgba(30,153,83,0.3)]"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Porozmawiajmy o Twoim szkoleniu
            </h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Ustalmy zakres, termin i dostosujemy zajęcia dokładnie do Twoich potrzeb.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white text-emerald-600 font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Skontaktuj się teraz
            </motion.button>

            <div className="mt-12 pt-8 border-t border-white/20 text-emerald-100 text-sm">
              4,500+ przeszkolonych pracowników • Certyfikat MCT
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-200/50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
          <div>© 2025 Radosław Sobczak • pbix.pl • kontakt@pbix.pl</div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="tel:+48573195404" className="hover:text-emerald-600 transition-colors">
              +48 573 195 404
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Polityka prywatności</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL CAROUSEL – Micro-interaction Component
   ────────────────────────────────────────────────────────────── */

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      text: 'Szkolenie zupełnie zmieniło mój sposób pracy z danymi. Praktyczne przykłady, zero teorii bez sensu.',
      author: 'Anna Kowalski',
      role: 'Data Analyst',
      company: 'E-commerce Tech'
    },
    {
      text: 'Najlepsze szkolenie z Power BI, jakie miałem. Radek wyjaśnia kompleksowe zagadnienia w prosty sposób.',
      author: 'Marek Lewandowski',
      role: 'Finance Manager',
      company: 'Manufacturing Corp'
    },
    {
      text: 'Wiedza, którą zdobyłem, mogłem wdrożyć już dzień po szkoleniu. Bardzo praktyczne.',
      author: 'Katarzyna Nowak',
      role: 'Business Analyst',
      company: 'Consulting Group'
    }
  ];

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] bg-white p-12 md:p-14 border border-zinc-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-bold text-zinc-950 mb-8 leading-tight italic">
            "{testimonials[active].text}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <div>
              <div className="font-semibold text-zinc-950">{testimonials[active].author}</div>
              <div className="text-sm text-zinc-600">
                {testimonials[active].role} • {testimonials[active].company}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex gap-3 justify-center">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active
                    ? 'w-8 bg-emerald-600'
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
