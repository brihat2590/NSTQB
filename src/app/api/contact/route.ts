import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate all fields
    if (!name || !email || !subject || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_USER, // Use EMAIL_RECEIVER or ADMIN_EMAIL
      subject: `NSTQB Contact: ${subject}`, // Use subject from form
      text: `
You have a new message from NSTQB Website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
