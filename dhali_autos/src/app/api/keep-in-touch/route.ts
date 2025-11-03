import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Email service is not configured. Please set the RESEND_API_KEY environment variable.');
  }
  return new Resend(apiKey);
};

const getRecipients = () => {
  const recipients = process.env.RESEND_KEEP_IN_TOUCH_TO;
  if (!recipients) {
    throw new Error('Email recipient is not configured. Please set RESEND_KEEP_IN_TOUCH_TO.');
  }
  const list = recipients
    .split(',')
    .map(address => address.trim())
    .filter(Boolean);

  if (!list.length) {
    throw new Error('Email recipient is not configured. Please set RESEND_KEEP_IN_TOUCH_TO.');
  }

  return list;
};

const buildMessage = (email: string) =>
  `${email} wants to keep in touch with Dhali Autos.`;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const resend = getResendClient();
    const recipients = getRecipients();

    const message = buildMessage(trimmedEmail);

    const { error } = await resend.emails.send({
      to: recipients,
      from: process.env.RESEND_FROM || 'Dhali Autos <onboarding@resend.dev>',
      subject: 'New keep in touch request',
      text: message,
      html: `<p>${message}</p>`
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'Thanks for reaching out.' });
  } catch (error) {
    console.error('Keep in touch submission failed', error);
    const message = error instanceof Error ? error.message : 'Unable to process your request.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
