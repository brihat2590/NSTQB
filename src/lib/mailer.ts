import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function escapeHtml(text: string = ''): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ✅ Convert ISO date to human-readable string using native JS
function formatDateToDay(isoDate: string): string {
  const date = new Date(isoDate);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
}

export async function sendExamRegistrationSuccessEmail(
  email: string,
  firstName: string,
  lastName: string
) {

  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${BASE_URL}/api/exam-date`, {
    cache: 'no-store',
  });
  const schedules = await res.json();

  const firstSchedule = schedules?.[0];
  const examDateISO = firstSchedule?.examDate;
  const location = firstSchedule?.location;

  const formattedDate = examDateISO ? formatDateToDay(examDateISO) : 'To Be Announced';
  const examLocation = location || 'To Be Announced';

  await transporter.sendMail({
    from: `"NSTQB" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your ISTQB Exam Registration is Complete',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #1E90FF;">ISTQB Exam Registration Confirmed</h2>
        <p>Dear ${safeFirstName} ${safeLastName},</p>
        <p>Your registration for the ISTQB CTFL exam has been successfully completed.</p>
        <p><strong>Exam Date:</strong> ${formattedDate}</p>
        <p><strong>Location:</strong> ${examLocation}</p>
        <br />
        <p>If you have any questions, feel free to contact us at <a href="mailto:info@nstqb.org">info@nstqb.org</a>.</p>
        <p>Best regards,<br />NSTQB Team</p>
      </div>
    `,
  });
}
export async function sendExamRegistrationAcknowledgement(
  email: string,
  firstName: string,
  lastName: string
) {
  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  await transporter.sendMail({
    from: `"NSTQB" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your ISTQB Exam Registration Has Been Received',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #1E90FF;">Exam Registration Received</h2>
        <p>Dear ${safeFirstName} ${safeLastName},</p>
        <p>Thank you for registering for the ISTQB exam. We have successfully received your submission.</p>
        <p>Our administrators will review your registration and supporting documents shortly. You will receive another email once your registration has been approved and completed.</p>
        <br />
        <p>If you have any questions in the meantime, please contact us at <a href="mailto:info@nstqb.org">info@nstqb.org</a>.</p>
        <p>Best regards,<br />NSTQB Team</p>
      </div>
    `,
  });
}

export async function sendExamRegistrationAdminNotification(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  companyName?: string
) {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const adminUrl = `${BASE_URL}/registration-admin`;
  if (!process.env.ADMIN_USER) {
    console.warn('[mailer] ADMIN_USER env var is not set; falling back to info@nstqb.org');
  }
  const adminUser = process.env.ADMIN_USER || 'info@nstqb.org';
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCompanyName = escapeHtml(companyName || 'N/A');

  await transporter.sendMail({
    from: `"NSTQB System" <${process.env.EMAIL_USER}>`,
    to: adminUser,
    subject: `New ISTQB Exam Registration — ${safeFirstName} ${safeLastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #FF8C00;">New Exam Registration Submitted</h2>
        <p>A new ISTQB exam registration has been submitted and is awaiting review.</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeFirstName} ${safeLastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeCompanyName}</td>
          </tr>
        </table>
        <br />
        <p><a href="${adminUrl}" style="background-color: #1E90FF; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Admin Panel</a></p>
      </div>
    `,
  });
}

export async function sendExamRejectionEmail(
  email: string,
  firstName: string,
  lastName: string,
  remarks: string
) {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeRemarks = escapeHtml(remarks);
  

  await transporter.sendMail({
    from: `"NSTQB" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Update on Your ISTQB Exam Registration',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #DC3545;">Exam Registration Update</h2>
        <p>Dear ${safeFirstName} ${safeLastName},</p>
        <p>Thank you for your interest in registering for the ISTQB exam. Unfortunately, your registration could not be approved at this time.</p>
        <p><strong>Admin Remarks:</strong></p>
        <blockquote style="border-left: 4px solid #DC3545; padding-left: 15px; margin: 15px 0; color: #555; font-style: italic;">
          ${safeRemarks}
        </blockquote>
        <p>If you have any questions or need to correct your registration details, please reply to this email or contact us at <a href="mailto:info@nstqb.org">info@nstqb.org</a>.</p>
        <br />
        <p>Best regards,<br />NSTQB Team</p>
      </div>
    `,
  });
}

export async function sendEventRegistrationConfirmation(
  email: string,
  name: string,
  eventTitle: string,
  eventDate: Date | string | null | undefined,
  eventLocation: string,
  paymentMethod: 'FREE' | 'QR' | 'HAMROPAY' = 'FREE'
) {
  const safeEventTitle = escapeHtml(eventTitle);
  const safeName = escapeHtml(name);
  let formattedDate = 'To Be Announced';
  if (eventDate) {
    try {
      formattedDate = formatDateToDay(new Date(eventDate).toISOString());
    } catch {
      formattedDate = String(eventDate);
    }
  }

  let paymentInstructions = '';
  let subject = `Registration Confirmed — ${safeEventTitle}`;

  if (paymentMethod === 'QR') {
    paymentInstructions = `
      <div style="background-color: #FFF3CD; border: 1px solid #FFEBA8; padding: 15px; border-radius: 5px; margin-top: 15px; color: #856404;">
        <strong>Payment Instructions:</strong><br />
        Please scan the QR code on the payment page to complete your payment, and reply to this email with your <strong>payment screenshot</strong> (or send it to <a href="mailto:info@nstqb.org">info@nstqb.org</a>) to verify and confirm your spot.
      </div>
    `;
  } else if (paymentMethod === 'HAMROPAY') {
    subject = `Registration Pending Payment — ${safeEventTitle}`;
    paymentInstructions = `
      <div style="background-color: #D1ECF1; border: 1px solid #BEE5EB; padding: 15px; border-radius: 5px; margin-top: 15px; color: #0C5460;">
        <strong>Payment Status:</strong> Pending<br />
        Please complete your payment via HamroPay to fully confirm your spot. If you have already completed the transaction, your status will update automatically shortly.
      </div>
    `;
  } else {
    paymentInstructions = `
      <div style="background-color: #D4EDDA; border: 1px solid #C3E6CB; padding: 15px; border-radius: 5px; margin-top: 15px; color: #155724;">
        This is a free event. Your registration is complete and your spot is confirmed!
      </div>
    `;
  }

  await transporter.sendMail({
    from: `"NSTQB" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #1E90FF;">Event Registration</h2>
        <p>Dear ${safeName},</p>
        <p>We are pleased to inform you that your registration request for the event <strong>${safeEventTitle}</strong> has been received.</p>
        <p><strong>Event Details:</strong></p>
        <ul>
          <li><strong>Event:</strong> ${safeEventTitle}</li>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Location:</strong> ${eventLocation}</li>
        </ul>
        ${paymentInstructions}
        <br />
        <p>If you have any questions or require support, please contact us at <a href="mailto:info@nstqb.org">info@nstqb.org</a>.</p>
        <p>Best regards,<br />NSTQB Team</p>
      </div>
    `,
  });
}
