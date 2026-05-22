import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

// HTML-escape user input before embedding in email
function esc(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function str(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function isValidEmail(v: string): boolean {
  return v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

interface AnswerRecord {
  questionId: number;
  area: string;
  points: 1 | 2 | 3;
}

interface AudytLead {
  date: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  score: number;
  level: string;
  answers: AnswerRecord[];
}

function getLevel(score: number): string {
  if (score <= 15) return 'Poziom 1 — Początek drogi';
  if (score <= 22) return 'Poziom 2 — W połowie drogi';
  return 'Poziom 3 — Zaawansowany';
}

function pointsBadge(p: number): string {
  if (p === 1) return '🔴 Poziom 1';
  if (p === 2) return '🟡 Poziom 2';
  return '🟢 Poziom 3';
}

export async function POST(req: NextRequest) {
  // Reject oversized bodies early
  const cl = req.headers.get('content-length');
  if (cl && Number(cl) > 32_000) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name     = str(body.name, 120);
  const company  = str(body.company, 160);
  const position = str(body.position, 120);
  const email    = str(body.email, 254);
  const phone    = str(body.phone, 30);
  const score    = typeof body.score === 'number' ? Math.max(0, Math.min(30, body.score)) : 0;
  const answers: AnswerRecord[] = Array.isArray(body.answers)
    ? (body.answers as AnswerRecord[]).slice(0, 10)
    : [];

  // Validate required fields (name & email required only when provided — form can be skipped)
  if (name && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const level = getLevel(score);

  // Persist lead to data/audyt-leads.json
  const lead: AudytLead = {
    date: new Date().toISOString(),
    name,
    company,
    position,
    email,
    phone,
    score,
    level,
    answers,
  };

  try {
    const leadsPath = path.join(process.cwd(), 'data', 'audyt-leads.json');
    let leads: AudytLead[] = [];
    try {
      const content = await fs.readFile(leadsPath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) leads = parsed;
    } catch {
      // File doesn't exist yet — start fresh
    }
    leads.push(lead);
    await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[audyt] Failed to persist lead:', err);
    // Continue — still attempt email notification
  }

  // Skip email if no SMTP configured
  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.warn('[audyt] SMTP_HOST not set — lead saved to file only');
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  // Build email HTML
  const safeName     = esc(name) || '(brak)';
  const safeCompany  = esc(company) || '(brak)';
  const safePosition = esc(position) || '–';
  const safeEmail    = esc(email) || '(brak)';
  const safePhone    = esc(phone) || '–';

  const answersHtml = answers
    .map(
      (a) =>
        `<tr>
          <td style="padding:6px 10px;border-bottom:1px solid #f0f0f2;font-size:13px;color:#1d1d1f;">${esc(a.area)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #f0f0f2;font-size:13px;text-align:right;">${pointsBadge(a.points)}</td>
        </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"><title>Nowy lead — Audyt raportowy</title></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Inter,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#003d20 0%,#1e9953 55%,#006633 100%);padding:32px 36px;">
      <p style="margin:0 0 8px;font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:2px;font-weight:600;">Nowy lead z quizu</p>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.8px;">Audyt dojrzałości raportowej</h1>
    </div>

    <!-- Score -->
    <div style="padding:24px 36px;background:#f5f5f7;border-bottom:1px solid rgba(0,0,0,0.06);display:flex;align-items:center;gap:16px;">
      <div style="font-size:40px;font-weight:800;color:#1e9953;letter-spacing:-1px;line-height:1;">${score}<span style="font-size:18px;color:#6e6e73;font-weight:500;">/30</span></div>
      <div>
        <div style="font-size:10px;color:#6e6e73;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:4px;">Wynik</div>
        <div style="font-size:15px;font-weight:700;color:#1d1d1f;">${esc(level)}</div>
      </div>
    </div>

    <!-- Contact -->
    <div style="padding:28px 36px;">
      <h2 style="font-size:13px;font-weight:700;color:#6e6e73;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;">Dane kontaktowe</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;font-size:13px;color:#6e6e73;width:120px;font-weight:600;">Imię</td><td style="padding:6px 0;font-size:14px;color:#1d1d1f;font-weight:600;">${safeName}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Firma</td><td style="padding:6px 0;font-size:14px;color:#1d1d1f;font-weight:600;">${safeCompany}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Stanowisko</td><td style="padding:6px 0;font-size:14px;color:#1d1d1f;">${safePosition}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Email</td><td style="padding:6px 0;font-size:14px;color:#1e9953;"><a href="mailto:${safeEmail}" style="color:#1e9953;">${safeEmail}</a></td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Telefon</td><td style="padding:6px 0;font-size:14px;color:#1d1d1f;">${safePhone}</td></tr>
      </table>
    </div>

    <!-- Answers breakdown -->
    ${
      answersHtml
        ? `<div style="padding:0 36px 28px;">
      <h2 style="font-size:13px;font-weight:700;color:#6e6e73;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;">Odpowiedzi wg obszarów</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f2;border-radius:12px;overflow:hidden;">
        ${answersHtml}
      </table>
    </div>`
        : ''
    }

    <!-- Footer -->
    <div style="padding:20px 36px;background:#f5f5f7;border-top:1px solid rgba(0,0,0,0.06);">
      <p style="margin:0;font-size:12px;color:#6e6e73;">PBIX.pl · Audyt quizu · ${new Date().toLocaleString('pl-PL')}</p>
    </div>
  </div>
</body>
</html>`;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"PBIX.pl Quiz" <${process.env.SMTP_USER}>`,
      to: `"Radosław Sobczak" <kontakt@pbix.pl>`,
      replyTo: email ? `"${name.replace(/"/g, "'")}" <${email}>` : undefined,
      subject: `Nowy lead — Audyt raportowy: ${name || 'anonimowy'} (${score}/30 pkt)`,
      html,
    });
  } catch (err) {
    console.error('[audyt] SMTP send failed:', (err as Error)?.message ?? 'unknown');
    // Don't fail the request — lead is already saved to file
  }

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
