import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    subject: '✅ Your ISTQB Exam Registration is Complete',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #1E90FF;">ISTQB Exam Registration Confirmed</h2>
        <p>Dear ${firstName} ${lastName},</p>
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
