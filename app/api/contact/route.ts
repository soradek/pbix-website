import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    await resend.emails.send({
      from: 'pbix.pl <noreply@pbix.pl>',
      to: 'kontakt@pbix.pl',
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
