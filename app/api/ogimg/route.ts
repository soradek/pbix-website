import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET() {
  const file = readFileSync(join(process.cwd(), 'public', 'og.jpg'));
  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
