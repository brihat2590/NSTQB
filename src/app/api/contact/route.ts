// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // ✅ use this for testing
      to: 'supermint1290@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
      <h1>New Contact Form Submission</h1>  
      <h1> From the NSTQB Contact For</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
