import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'k19.unixstorm.org',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,   // STARTTLS na porcie 587 (Vercel blokuje port 465)
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, name, email, phone, training, form, message } = body;

  const isZapisy = type === 'zapisy';

  const subject = isZapisy
    ? `Zgłoszenie na szkolenie: ${training || 'nie wybrano'}`
    : `Wiadomość od ${name}`;

  const html = isZapisy
    ? `
      <h2>Nowe zgłoszenie na szkolenie</h2>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Szkolenie:</strong> ${training || '–'}</p>
      <p><strong>Forma:</strong> ${form || '–'}</p>
      <p><strong>Dodatkowe informacje:</strong><br>${message || '–'}</p>
    `
    : `
      <h2>Nowa wiadomość z formularza kontaktowego</h2>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || '–'}</p>
      <p><strong>Szkolenie:</strong> ${training || '–'}</p>
      <p><strong>Wiadomość:</strong><br>${message}</p>
    `;

  try {
    await transporter.sendMail({
      from: `"Formularz pbix.pl" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    const e = err as Record<string, unknown>;
    console.error('SMTP error:', {
      message:      e?.message,
      code:         e?.code,
      command:      e?.command,
      response:     e?.response,
      responseCode: e?.responseCode,
    });
    return NextResponse.json({ ok: false, error: String(e?.message ?? err) }, { status: 500 });
  }
}
