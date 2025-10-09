import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const REQUIRED_FIELDS = ['fullName', 'email', 'phone', 'carMake', 'carModel', 'carYear', 'mileage'];

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    throw new Error('Email service is not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const payload: Record<string, string> = {};
    for (const field of REQUIRED_FIELDS) {
      const value = formData.get(field)?.toString().trim();
      if (!value) {
        return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
      }
      payload[field] = value;
    }

    const optionalFields = ['city', 'condition', 'askingPrice', 'additionalDetails'];
    for (const field of optionalFields) {
      const value = formData.get(field)?.toString().trim();
      if (value) payload[field] = value;
    }

    const images = formData.getAll('images') as File[];
    if (!images.length) {
      return NextResponse.json({ message: 'Please attach at least one vehicle image.' }, { status: 400 });
    }

    const attachments = await Promise.all(
      images.map(async (file, index) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          filename: file.name || `vehicle-image-${index + 1}`,
          content: Buffer.from(arrayBuffer),
          contentType: file.type || 'application/octet-stream'
        };
      })
    );

    const transporter = getTransporter();

    const htmlMessage = `
      <h2>New Sell Your Car Submission</h2>
      <p><strong>Name:</strong> ${payload.fullName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      ${payload.city ? `<p><strong>City:</strong> ${payload.city}</p>` : ''}
      <p><strong>Vehicle:</strong> ${payload.carMake} ${payload.carModel} (${payload.carYear})</p>
      <p><strong>Mileage:</strong> ${payload.mileage}</p>
      ${payload.condition ? `<p><strong>Condition:</strong> ${payload.condition}</p>` : ''}
      ${payload.askingPrice ? `<p><strong>Asking price:</strong> ${payload.askingPrice}</p>` : ''}
      ${payload.additionalDetails ? `<p><strong>Additional details:</strong><br/>${payload.additionalDetails.replace(/\n/g, '<br/>')}</p>` : ''}
    `;

    await transporter.sendMail({
      to: 'amit.aditaya99@gmail.com',
      from: process.env.SMTP_FROM || payload.email,
      replyTo: payload.email,
      subject: `Sell your car enquiry - ${payload.carMake} ${payload.carModel}`,
      text: `New sell enquiry from ${payload.fullName} (${payload.email})\nPhone: ${payload.phone}\n${payload.city ? `City: ${payload.city}\n` : ''}Vehicle: ${payload.carMake} ${payload.carModel} (${payload.carYear})\nMileage: ${payload.mileage}\n${payload.condition ? `Condition: ${payload.condition}\n` : ''}${payload.askingPrice ? `Asking price: ${payload.askingPrice}\n` : ''}${payload.additionalDetails ? `\nAdditional details:\n${payload.additionalDetails}` : ''}`,
      html: htmlMessage,
      attachments
    });

    return NextResponse.json({ message: 'Submission received.' });
  } catch (error) {
    console.error('Sell enquiry submission failed', error);
    const message = error instanceof Error ? error.message : 'Unable to process your request.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
