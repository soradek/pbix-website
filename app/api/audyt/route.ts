import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

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
  return v.length > 0 && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function getLevel(score: number): string {
  if (score <= 15) return 'Początek drogi (poziom 1)';
  if (score <= 22) return 'W połowie drogi (poziom 2)';
  return 'Zaawansowany (poziom 3)';
}

function pointsBadge(p: number): string {
  if (p === 1) return '🔴 Poziom 1';
  if (p === 2) return '🟡 Poziom 2';
  return '🟢 Poziom 3';
}

interface AnswerRecord {
  questionId: number;
  area: string;
  points: 1 | 2 | 3;
}

export async function POST(req: NextRequest) {
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

  const email       = str(body.email, 254);
  const score       = typeof body.score === 'number' ? Math.max(0, Math.min(30, body.score)) : 0;
  const levelLabel  = str(body.level, 80) || getLevel(score);
  const completedAt = str(body.completedAt, 40) || new Date().toISOString();
  const answers: AnswerRecord[] = Array.isArray(body.answers)
    ? (body.answers as AnswerRecord[]).slice(0, 10)
    : [];

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  // Format completion time nicely
  let displayTime = completedAt;
  try {
    displayTime = new Date(completedAt).toLocaleString('pl-PL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {}

  // Persist to file
  try {
    const leadsPath = path.join(process.cwd(), 'data', 'audyt-leads.json');
    let leads: unknown[] = [];
    try {
      const content = await fs.readFile(leadsPath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) leads = parsed;
    } catch {}
    leads.push({ date: completedAt, email, score, level: levelLabel, answers });
    await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[audyt] Failed to persist lead:', err);
  }

  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.warn('[audyt] SMTP_HOST not set — lead saved to file only');
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  // Build answer breakdown rows (only when present)
  const answersHtml = answers.length
    ? `<tr><td colspan="2" style="padding:16px 0 8px;font-size:12px;font-weight:700;color:#6e6e73;text-transform:uppercase;letter-spacing:1.5px;">Wyniki wg obszarów</td></tr>
      ${answers.map((a) => `
        <tr>
          <td style="padding:5px 0;font-size:13px;color:#1d1d1f;">${esc(a.area)}</td>
          <td style="padding:5px 0;font-size:13px;text-align:right;">${pointsBadge(a.points)}</td>
        </tr>`).join('')}`
    : '';

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Inter,-apple-system,sans-serif;">
<div style="max-width:560px;margin:32px auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <div style="background:linear-gradient(135deg,#003d20 0%,#1e9953 55%,#006633 100%);padding:28px 32px;">
    <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:2px;font-weight:600;">Nowy kontakt z quizu</p>
    <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Audyt dojrzałości raportowej</h1>
  </div>

  <div style="padding:28px 32px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;width:110px;">Email</td>
        <td style="padding:6px 0;font-size:14px;font-weight:700;">
          <a href="mailto:${esc(email)}" style="color:#1e9953;text-decoration:none;">${esc(email) || '(nie podano)'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Wynik</td>
        <td style="padding:6px 0;font-size:14px;font-weight:700;color:#1d1d1f;">${score}/30 pkt — ${esc(levelLabel)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#6e6e73;font-weight:600;">Godzina</td>
        <td style="padding:6px 0;font-size:14px;color:#1d1d1f;">${esc(displayTime)}</td>
      </tr>
      ${answersHtml}
    </table>
  </div>

  <div style="padding:16px 32px;background:#f5f5f7;border-top:1px solid rgba(0,0,0,0.06);">
    <p style="margin:0;font-size:12px;color:#6e6e73;">PBIX.pl · Audyt quiz · ${new Date().toLocaleString('pl-PL')}</p>
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
      to: 'kontakt@pbix.pl',
      replyTo: email || undefined,
      subject: `Nowy kontakt z quizu: ${email || 'anonimowy'} — ${score}/30 pkt (${levelLabel})`,
      html,
    });
  } catch (err) {
    console.error('[audyt] SMTP send failed:', (err as Error)?.message ?? 'unknown');
  }

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
