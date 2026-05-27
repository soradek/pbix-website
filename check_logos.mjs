import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folder = 'public/logos_temp';
const files = fs.readdirSync(folder).filter(f => f.endsWith('.png'));

console.log('Weryfikacja logotypow:\n');
let issues = 0;

for (const f of files) {
  const meta = await sharp(path.join(folder, f)).metadata();
  const hOk = meta.height === 48;
  const sizeKB = (fs.statSync(path.join(folder, f)).size / 1024).toFixed(1);
  const flag = !hOk || sizeKB < 0.5 ? '⚠' : '✓';
  console.log(`${flag} ${f.padEnd(35)} ${String(meta.width).padStart(4)}x${meta.height}px  ${sizeKB}KB`);
  if (!hOk || sizeKB < 0.5) issues++;
}

console.log(`\nPliki: ${files.length}, Problemy: ${issues}`);
