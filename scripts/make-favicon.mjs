// Regenerates app/favicon.ico (16/32/48 px PNG frames) from the brand mark:
// a green "x" (the accent letter of the pbix logo) on the site ink.
// Run: node scripts/make-favicon.mjs
import { writeFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

async function png(size) {
  const res = new ImageResponse(
    h('div', {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0d0c',
        borderRadius: Math.round(size * 0.22),
        color: '#2fbf6d',
        fontSize: Math.round(size * 0.92),
        fontWeight: 700,
        lineHeight: 1,
        paddingBottom: Math.round(size * 0.12),
      },
    }, 'x'),
    { width: size, height: size },
  );
  return Buffer.from(await res.arrayBuffer());
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));

// ICO container with embedded PNGs
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
const entries = [];
let offset = 6 + 16 * images.length;
images.forEach((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] % 256, 0);
  e.writeUInt8(sizes[i] % 256, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  entries.push(e);
});
writeFileSync(new URL('../app/favicon.ico', import.meta.url), Buffer.concat([header, ...entries, ...images]));
console.log('favicon.ico written', images.map(b => b.length));
