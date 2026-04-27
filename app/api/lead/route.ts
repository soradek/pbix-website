import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

interface Lead {
  name: string;
  email: string;
  company: string;
  source: string;
  date: string;
}

// In-memory rate limit (per server instance) — 5 requests / IP / hour
const rateMap = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

const ALLOWED_FILES = new Set(['lead-magnet.pdf', 'test-poziomujacy-excel.xlsx']);

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Zbyt wiele prób. Spróbuj za godzinę.' }, { status: 429 });
  }

  let body: { name?: string; email?: string; company?: string; source?: string; fileName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const company = (body.company ?? '').trim();
  const source = (body.source ?? '').trim();
  const fileName = (body.fileName ?? '').trim();

  if (!name || !email || !source || !fileName) {
    return NextResponse.json({ error: 'Brak wymaganych pól.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'Nieprawidłowy adres email.' }, { status: 400 });
  }
  if (name.length > 120 || email.length > 254 || company.length > 160 || source.length > 80) {
    return NextResponse.json({ error: 'Zbyt długie dane.' }, { status: 400 });
  }
  if (!ALLOWED_FILES.has(fileName)) {
    return NextResponse.json({ error: 'Nieznany materiał.' }, { status: 400 });
  }

  const lead: Lead = { name, email, company, source, date: new Date().toISOString() };

  // Append to data/leads.json
  try {
    const leadsPath = path.join(process.cwd(), 'data', 'leads.json');
    let leads: Lead[] = [];
    try {
      const content = await fs.readFile(leadsPath, 'utf-8');
      leads = JSON.parse(content);
      if (!Array.isArray(leads)) leads = [];
    } catch {
      // File doesn't exist yet — start with empty array
    }
    leads.push(lead);
    await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist lead:', err);
    // Don't fail the request — email may still go through
  }

  // Optional Resend notification
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: 'pbix.pl <onboarding@resend.dev>',
        to: 'kontakt@pbix.pl',
        replyTo: email,
        subject: `Nowy lead (${source}): ${name}`,
        text: [
          `Nowy lead ze strony pbix.pl`,
          ``,
          `Imię:   ${name}`,
          `Email:  ${email}`,
          `Firma:  ${company || '–'}`,
          `Źródło: ${source}`,
          `Plik:   ${fileName}`,
          `Data:   ${new Date().toLocaleString('pl-PL')}`,
        ].join('\n'),
      });
    } catch (err) {
      console.warn('Resend notification failed:', err);
    }
  } else {
    console.warn('RESEND_API_KEY not set — skipping email notification');
  }

  return NextResponse.json({ success: true, downloadUrl: `/downloads/${fileName}` });
}
