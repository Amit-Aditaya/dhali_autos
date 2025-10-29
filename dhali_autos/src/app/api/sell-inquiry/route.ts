import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const REQUIRED_FIELDS = ['fullName', 'email', 'phone', 'carMake', 'carModel', 'carYear', 'mileage'];

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Email service is not configured. Please set the RESEND_API_KEY environment variable.');
  }
  return new Resend(apiKey);
};

const getRecipients = () => {
  const recipientList = process.env.RESEND_SELL_INQUIRY_TO || 'amit.aditaya99@gmail.com';
  return recipientList
    .split(',')
    .map(address => address.trim())
    .filter(Boolean);
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
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name || `vehicle-image-${index + 1}`,
          content: buffer.toString('base64'),
          type: file.type || 'application/octet-stream'
        };
      })
    );

    const resend = getResendClient();
    const recipients = getRecipients();

    if (!recipients.length) {
      throw new Error('Email recipient is not configured. Please set RESEND_SELL_INQUIRY_TO.');
    }

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

    const { error } = await resend.emails.send({
      to: recipients,
      from: process.env.RESEND_FROM || 'Dhali Autos <onboarding@resend.dev>',
      reply_to: payload.email,
      subject: `Sell your car enquiry - ${payload.carMake} ${payload.carModel}`,
      text: `New sell enquiry from ${payload.fullName} (${payload.email})\nPhone: ${payload.phone}\n${payload.city ? `City: ${payload.city}\n` : ''}Vehicle: ${payload.carMake} ${payload.carModel} (${payload.carYear})\nMileage: ${payload.mileage}\n${payload.condition ? `Condition: ${payload.condition}\n` : ''}${payload.askingPrice ? `Asking price: ${payload.askingPrice}\n` : ''}${payload.additionalDetails ? `\nAdditional details:\n${payload.additionalDetails}` : ''}`,
      html: htmlMessage,
      attachments
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'Submission received.' });
  } catch (error) {
    console.error('Sell enquiry submission failed', error);
    const message = error instanceof Error ? error.message : 'Unable to process your request.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
