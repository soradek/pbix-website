import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// HTML-escape all user input before embedding in email templates
function esc(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const MAX = { name: 120, email: 254, phone: 30, training: 120, form: 40, message: 4000 } as const;

function isValidEmail(v: string): boolean {
  return v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export async function POST(req: NextRequest) {
  // Reject oversized bodies early
  const cl = req.headers.get('content-length');
  if (cl && Number(cl) > 20_000) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { type, name, email, phone, training, form, message, honeypot } = body;

  // Honeypot — bots fill hidden fields; silently accept to avoid fingerprinting
  if (honeypot) {
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  // Field type and length enforcement
  const fields: Record<string, unknown> = { name, email, phone, training, form, message };
  for (const [key, val] of Object.entries(fields)) {
    if (val !== undefined && val !== '') {
      if (typeof val !== 'string') return NextResponse.json({ ok: false }, { status: 400 });
      const limit = MAX[key as keyof typeof MAX];
      if (val.length > limit) return NextResponse.json({ ok: false }, { status: 400 });
    }
  }

  const nameStr     = str(name);
  const emailStr    = str(email);
  const phoneStr    = str(phone);
  const trainingStr = str(training);
  const formStr     = str(form);
  const messageStr  = str(message);
  const isZapisy    = type === 'zapisy';

  // Server-side required fields
  if (!nameStr || !emailStr || !isValidEmail(emailStr)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isZapisy && !messageStr) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // HTML-escape everything before embedding in email
  const safeName     = esc(nameStr);
  const safeEmail    = esc(emailStr);
  const safePhone    = esc(phoneStr);
  const safeTraining = esc(trainingStr);
  const safeForm     = esc(formStr);
  const safeMessage  = esc(messageStr).replace(/\n/g, '<br>');

  const subject = isZapisy
    ? `Zgłoszenie na szkolenie: ${safeTraining || 'nie wybrano'}`
    : `Wiadomość od ${safeName}`;

  const html = isZapisy
    ? `<h2>Nowe zgłoszenie na szkolenie</h2>
       <p><strong>Imię i nazwisko:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       <p><strong>Szkolenie:</strong> ${safeTraining || '–'}</p>
       <p><strong>Forma:</strong> ${safeForm || '–'}</p>
       <p><strong>Dodatkowe informacje:</strong><br>${safeMessage || '–'}</p>`
    : `<h2>Nowa wiadomość z formularza kontaktowego</h2>
       <p><strong>Imię i nazwisko:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       <p><strong>Telefon:</strong> ${safePhone || '–'}</p>
       <p><strong>Szkolenie:</strong> ${safeTraining || '–'}</p>
       <p><strong>Wiadomość:</strong><br>${safeMessage}</p>`;

  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.error('SMTP_HOST env var is not set');
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Radosław Sobczak" <${process.env.SMTP_USER}>`,
      to: `"Radosław Sobczak" <${process.env.SMTP_USER}>`,
      replyTo: `"${nameStr.replace(/"/g, "'")}" <${emailStr}>`,
      subject,
      html,
    });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    // Log server-side only — never expose SMTP details to the client
    console.error('SMTP send failed:', (err as Error)?.message ?? 'unknown');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
