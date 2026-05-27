import sharp from 'sharp';
import fs from 'fs';

// Optyczne dopasowanie - logo z grubymi/dużymi literami zmniejszamy
// żeby wyglądały podobnie do cieńszych logotypów przy tej samej wysokości
const FIXES = {
  'hitachi-energy':  34,   // bardzo grube blokowe litery
  'inditex':         36,   // INDITEX wszystkie caps
  'abb':             38,   // ABB - 3 duże litery
  'nivea':           40,   // BEIERSDORF / NIVEA - grube caps
  'pepsico':         46,   // PepsiCo - duży font
};

// Aluplast - pobierz z freebiesupply jako SVG (ostry)
const ALUPLAST_URL = 'https://cdn.freebiesupply.com/logos/large/2x/aluplast-logo-svg-vector.svg';

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function convertToWhite(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8ClampedArray(data);
  for (let i = 0; i < pixels.length; i += info.channels) {
    if (pixels[i + 3] > 10) { pixels[i] = 255; pixels[i+1] = 255; pixels[i+2] = 255; }
  }
  return sharp(Buffer.from(pixels), { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png().toBuffer();
}

async function processLogo(slug, targetH, sourceUrl) {
  process.stdout.write(`  ${slug.padEnd(25)} → ${targetH}px... `);
  try {
    let buf;
    if (sourceUrl) {
      buf = await fetchBuffer(sourceUrl);
    } else {
      buf = fs.readFileSync(`public/logos_temp/${slug}.png`);
    }
    // Jeśli to SVG - nie konwertuj na biały jeszcze, najpierw rasteryzuj
    // sharp automatycznie obsługuje SVG
    const white = await convertToWhite(buf);
    const trimmed = await sharp(white).trim({ threshold: 10 }).toBuffer();
    const final = await sharp(trimmed).resize({ height: targetH }).png().toBuffer();
    fs.writeFileSync(`public/logos_temp/${slug}.png`, final);
    const meta = await sharp(`public/logos_temp/${slug}.png`).metadata();
    console.log(`${meta.width}x${meta.height}px`);
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
  }
}

console.log('Optyczne dopasowanie logo...\n');

// Napraw aluplast (nowe źródło - ostry SVG)
await processLogo('aluplast', 64, ALUPLAST_URL);

// Dopasuj optycznie grube logotypy
for (const [slug, h] of Object.entries(FIXES)) {
  await processLogo(slug, h, null);
}

console.log('\nGotowe!');
