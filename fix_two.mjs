import sharp from 'sharp';
import fs from 'fs';

// ABB i OLX były niesłusznie zmniejszone do 44px — przywracam do 64px
// Skoro oryginalny plik (po poprzednim reprocessingu) ma już 44px,
// pobieramy surowe pliki jeszcze raz i robimy trim + resize do 64px.

const SOURCES = {
  'abb':  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/500px-ABB_logo.svg.png',
  'olx':  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/OLX_2019.svg/500px-OLX_2019.svg.png',
};

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

for (const [slug, url] of Object.entries(SOURCES)) {
  process.stdout.write(`  ${slug}... `);
  try {
    const raw = await fetchBuffer(url);
    const white = await convertToWhite(raw);
    const trimmed = await sharp(white).trim({ threshold: 10 }).toBuffer();
    const final = await sharp(trimmed).resize({ height: 64 }).png().toBuffer();
    fs.writeFileSync(`public/logos_temp/${slug}.png`, final);
    const meta = await sharp(`public/logos_temp/${slug}.png`).metadata();
    console.log(`OK → ${meta.width}x${meta.height}px`);
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
  }
}
