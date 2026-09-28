// Regenerates the social preview images (Open Graph / LinkedIn / Facebook / X) in the
// current site style. Output file names are versioned on purpose: social networks cache
// previews by image URL, so a new name forces them to fetch the new picture.
// Run: node scripts/make-og.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

export const OG_VERSION = '2026-09';

const portrait = `data:image/png;base64,${readFileSync(new URL('../public/radek-cutout.png', import.meta.url)).toString('base64')}`;

const COPY = {
  pl: {
    label: 'PBIX.PL · SZKOLENIA DLA FIRM',
    line1: 'Raporty, które',
    line2a: 'odświeżają się',
    line2b: 'same.',
    tools: 'Power BI · Excel · SQL · VBA',
    who: 'Radosław Sobczak · Certyfikowany Trener Microsoft',
  },
  en: {
    label: 'PBIX.PL · CORPORATE TRAINING',
    line1: 'Reports that',
    line2a: 'refresh',
    line2b: 'themselves.',
    tools: 'Power BI · Excel · SQL · VBA',
    who: 'Radosław Sobczak · Microsoft Certified Trainer',
  },
};

async function render(lang) {
  const t = COPY[lang];
  const res = new ImageResponse(
    h('div', {
      style: {
        width: '100%', height: '100%', display: 'flex', position: 'relative',
        background: '#0b0d0c', color: '#eef1ef', fontFamily: 'Geist',
        backgroundImage: 'linear-gradient(rgba(238,241,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(238,241,239,0.05) 1px, transparent 1px)',
        backgroundSize: '96px 40px',
      },
    },
      // soft green glow behind the portrait
      h('div', { style: { position: 'absolute', right: 40, bottom: -160, width: 560, height: 560, borderRadius: 280, background: 'rgba(47,191,109,0.16)', filter: 'blur(60px)' } }),
      h('img', { src: portrait, style: { position: 'absolute', right: 20, bottom: 0, height: 600, width: 372, objectFit: 'contain', objectPosition: 'bottom' } }),
      h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: 780, height: '100%' } },
        h('div', { style: { display: 'flex', fontSize: 20, letterSpacing: 4, color: '#2fbf6d' } }, t.label),
        h('div', { style: { display: 'flex', flexDirection: 'column', fontSize: 84, lineHeight: 1.02, letterSpacing: -4 } },
          h('div', { style: { display: 'flex' } }, t.line1),
          h('div', { style: { display: 'flex' } }, t.line2a, h('span', { style: { color: '#2fbf6d', marginLeft: 18 } }, t.line2b)),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          h('div', { style: { display: 'flex', fontSize: 30, color: '#eef1ef' } }, t.tools),
          h('div', { style: { display: 'flex', fontSize: 22, color: 'rgba(238,241,239,0.62)' } }, t.who),
        ),
      ),
    ),
    { width: 1200, height: 630 },
  );
  const buf = Buffer.from(await res.arrayBuffer());
  const file = `og-${OG_VERSION}-${lang}.png`;
  writeFileSync(new URL(`../public/${file}`, import.meta.url), buf);
  console.log(file, Math.round(buf.length / 1024) + ' KB');
}

await render('pl');
await render('en');
