import sharp from 'sharp';
import fs from 'fs';

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function convertToWhite(inputBuffer) {
  const { data, info } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);
  for (let i = 0; i < pixels.length; i += channels) {
    if (pixels[i + 3] > 10) { pixels[i] = 255; pixels[i+1] = 255; pixels[i+2] = 255; }
  }
  return sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .resize({ height: 48 }).png().toBuffer();
}

const url = 'https://cdn.freebiesupply.com/logos/large/2x/aluplast-logo-png-transparent.png';
console.log('Pobieranie aluplast z freebiesupply...');
const buf = await fetchBuffer(url);
const white = await convertToWhite(buf);
fs.writeFileSync('public/logos_temp/aluplast.png', white);
const meta = await sharp('public/logos_temp/aluplast.png').metadata();
console.log(`OK: ${meta.width}x${meta.height}px`);
