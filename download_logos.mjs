import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TEMP_FOLDER = 'public/logos_temp';
fs.mkdirSync(TEMP_FOLDER, { recursive: true });

const COMPANIES = [
  // SVG z Wikimedia Commons (pobieranie jako SVG, sharp konwertuje na PNG)
  { name: 'Volkswagen Group Polska', slug: 'volkswagen',           url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Volkswagen_Group_Logo_2023.svg' },
  { name: 'OLX Group',               slug: 'olx',                 url: null }, // juz pobrane
  { name: 'Lufthansa',               slug: 'lufthansa',           url: null }, // juz pobrane
  { name: 'Coca-Cola',               slug: 'coca-cola',           url: null }, // juz pobrane
  { name: 'Zoetis',                  slug: 'zoetis',              url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Zoetis_logo.svg' },
  { name: 'Zabka',                   slug: 'zabka',               url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Zabka_logo_2020.svg' },
  { name: 'Unilever',                slug: 'unilever',            url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Unilever_text_logo.svg' },
  { name: 'INDITEX',                 slug: 'inditex',             url: null }, // juz pobrane
  { name: 'PepsiCo',                 slug: 'pepsico',             url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/PepsiCo_%282025%2C_wordmark%29.svg' },
  { name: 'Grupa Zywiec',            slug: 'grupa-zywiec',        url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Zywiec-logo.svg' },
  { name: 'Ringier Axel Springer',   slug: 'ringier-axel-springer', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ringier_Axel_Springer_logo_2023.svg/500px-Ringier_Axel_Springer_logo_2023.svg.png' },
  { name: 'NASK',                    slug: 'nask',                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/NASK_logo.svg/500px-NASK_logo.svg.png' },
  { name: 'ABB',                     slug: 'abb',                 url: null }, // juz pobrane
  { name: 'BD Becton Dickinson',     slug: 'becton-dickinson',    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/BD_%28company%29_logo.svg/500px-BD_%28company%29_logo.svg.png' },
  { name: 'Boston Scientific',       slug: 'boston-scientific',   url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Boston_Scientific_Logo.svg/500px-Boston_Scientific_Logo.svg.png' },
  { name: 'Hitachi Energy',          slug: 'hitachi-energy',      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hitachi_logo.svg/500px-Hitachi_logo.svg.png' },
  { name: 'Credit Suisse',           slug: 'credit-suisse',       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Credit_Suisse_Logo_2022.svg/500px-Credit_Suisse_Logo_2022.svg.png' },
  { name: 'Clariant',                slug: 'clariant',            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Clariant_Logo.svg/500px-Clariant_Logo.svg.png' },
  { name: 'Eurocash',                slug: 'eurocash',            url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Eurocash_logo.svg/960px-Eurocash_logo.svg.png' },
  { name: 'Nivea Beiersdorf',        slug: 'nivea',               url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Beiersdorf_Logo.svg/500px-Beiersdorf_Logo.svg.png' },
  { name: 'Aluplast',                slug: 'aluplast',            url: 'https://static.cdnlogo.com/logos/a/75/aluplast.svg' },
  { name: 'Kimball Electronics',     slug: 'kimball',             url: 'https://companieslogo.com/img/orig/KE_BIG.D-55db7c97.png?t=1742141486&download=true' },
  { name: 'Majorel',                 slug: 'majorel',             url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Majorel_Logo_2019.png' },
  { name: 'Top Farms',               slug: 'top-farms',           url: null }, // juz pobrane
  { name: 'OSI Foodworks Polska',    slug: 'osi-foodworks',       url: null }, // juz pobrane
  { name: 'Wyzsza Szkola Bankowa',   slug: 'wsb',                 url: 'https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/press_rooms/company_logos/1322/b5d820fd0c10830b1e683b5f1db8e9c9.png' },
];

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

async function convertToWhite(inputBuffer) {
  // Konwertuj do RGBA
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const a = pixels[i + 3];
    if (a > 10) {
      // Zamien na bialy
      pixels[i] = 255;     // R
      pixels[i + 1] = 255; // G
      pixels[i + 2] = 255; // B
      // alpha bez zmian
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width, height, channels },
  })
    .resize({ height: 48, withoutEnlargement: false })
    .png()
    .toBuffer();
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const failed = [];
let success = 0;

// Pomiń już pobrane pliki
const existingFiles = new Set(
  fs.readdirSync(TEMP_FOLDER).map(f => f.replace('.png', ''))
);

for (const company of COMPANIES) {
  // Pomiń jeśli juz mamy plik
  if (existingFiles.has(company.slug)) {
    console.log(`  ${company.slug}... SKIP (juz istnieje)`);
    success++;
    continue;
  }

  process.stdout.write(`  ${company.slug}... `);
  let ok = false;
  // 3 próby z narastającymi opóźnieniami
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const buf = await fetchBuffer(company.url);
      const whiteBuf = await convertToWhite(buf);
      const outPath = path.join(TEMP_FOLDER, `${company.slug}.png`);
      fs.writeFileSync(outPath, whiteBuf);
      process.stdout.write('OK\n');
      success++;
      ok = true;
      break;
    } catch (err) {
      if (attempt < 3) {
        process.stdout.write(`retry(${attempt})... `);
        await sleep(4000 * attempt);
      } else {
        process.stdout.write(`FAIL: ${err.message}\n`);
        failed.push(company.name);
      }
    }
  }
  // Czekaj chwilę między firmami żeby nie triggerować rate limit
  if (ok) await sleep(1500);
}

console.log(`\n[WYNIK] Pobrano: ${success}/${COMPANIES.length}`);
if (failed.length) {
  console.log('[FAILED]');
  failed.forEach(n => console.log(`  - ${n}`));
}
const files = fs.readdirSync(TEMP_FOLDER);
console.log(`\n[FOLDER] ${path.resolve(TEMP_FOLDER)}`);
console.log(`[PLIKI] ${files.length} plikow PNG`);
