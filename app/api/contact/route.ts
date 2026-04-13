import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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
    const result = await resend.emails.send({
      from: 'pbix.pl <noreply@pbix.pl>',
      to: ['radoslaw.sobczak@pbix.pl', 'kontakt@pbix.pl'],
      replyTo: email,
      subject,
      html,
    });
    console.log('Resend result:', JSON.stringify(result));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
