import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const FOLDER = 'public/logos_temp';

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function convertToWhite(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);
  for (let i = 0; i < pixels.length; i += channels) {
    if (pixels[i + 3] > 10) {
      pixels[i] = 255; pixels[i + 1] = 255; pixels[i + 2] = 255;
    }
  }
  return sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .png()
    .toBuffer();
}

// Wersje z optycznym ograniczeniem wysokości (niektóre mają bardzo grube litery)
// Domyślna wysokość: 64px; override dla konkretnych logo
const HEIGHT_OVERRIDES = {
  'hitachi-energy':   44,  // bardzo grube "Hitachi Energy"
  'inditex':          44,  // duże litery INDITEX
};
const DEFAULT_HEIGHT = 64;

// --- 1. Pobierz VW emblem (samo kółko VW) ---
// 2. Pobierz nowy Żywiec
const REPLACE = [
  {
    slug: 'volkswagen',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/500px-Volkswagen_logo_2019.svg.png',
  },
  {
    slug: 'grupa-zywiec',
    url: 'https://www.oznakowanie-poziome.pl/wp-content/uploads/2025/05/zywiec.webp',
  },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Re-pobierz VW i Żywiec
console.log('Pobieranie VW emblem i nowego Zywiec...\n');
for (const item of REPLACE) {
  process.stdout.write(`  ${item.slug}... `);
  try {
    const buf = await fetchBuffer(item.url);
    const white = await convertToWhite(buf);
    fs.writeFileSync(path.join(FOLDER, `${item.slug}.png`), white);
    console.log('OK (surowy, przed trim)');
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
  }
  await sleep(500);
}

// --- 2. Reprocess wszystkich: trim + resize do target height ---
console.log('\nReprocess: trim + resize do docelowej wysokosci...\n');

const files = fs.readdirSync(FOLDER).filter(f => f.endsWith('.png'));

for (const f of files) {
  const slug = f.replace('.png', '');
  const targetH = HEIGHT_OVERRIDES[slug] ?? DEFAULT_HEIGHT;
  const filePath = path.join(FOLDER, f);

  process.stdout.write(`  ${f.padEnd(35)} → ${targetH}px... `);
  try {
    const buf = fs.readFileSync(filePath);

    // trim() usuwa transparentne piksele na krawędziach
    const trimmed = await sharp(buf)
      .trim({ threshold: 10 })
      .toBuffer();

    const resized = await sharp(trimmed)
      .resize({ height: targetH, withoutEnlargement: false })
      .png()
      .toBuffer();

    fs.writeFileSync(filePath, resized);
    const meta = await sharp(filePath).metadata();
    console.log(`${meta.width}x${meta.height}px`);
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
  }
}

console.log('\nGotowe! Sprawdz preview.html\n');
