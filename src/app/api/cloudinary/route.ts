import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import { sendExamRegistrationAcknowledgement, sendExamRegistrationAdminNotification } from '@/lib/mailer';

export async function POST(req: Request) {

  console.log("request received to cloudinary route");
  const formData = await req.formData();
  const file = formData.get('screenShot') as File;
  const examScheduleId = formData.get('examScheduleId') as string | null;

  if (!examScheduleId) {
    return NextResponse.json(
      { success: false, message: 'Please select an exam date.' },
      { status: 400 }
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const examSchedule = await prisma.examSchedule.findFirst({
    where: {
      id: examScheduleId,
      examDate: {
        gte: today,
      },
    },
  });

  if (!examSchedule) {
    return NextResponse.json(
      { success: false, message: 'Selected exam date is no longer available.' },
      { status: 400 }
    );
  }

  let screenshotUrl = '';
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'exam_screenshots' }, (err, res) => {
        if (err) reject(err);
        if (!res) reject(new Error('Cloudinary upload failed'));
        else resolve({ secure_url: res.secure_url });
      }).end(buffer);
    });
    screenshotUrl = uploadResult.secure_url;
  }

  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    designation: formData.get('designation') as string,
    phone: formData.get('phone') as string,
    citizenshipNumber: formData.get('citizenshipNumber') as string,
    companyName: (formData.get('companyName') as string) || '',
    screenShot: screenshotUrl,
    examScheduleId,

  };





  try {
    const created = await prisma.examRegistration.create({ data });
    try {
      await sendExamRegistrationAcknowledgement(created.email, created.firstName, created.lastName);
      await sendExamRegistrationAdminNotification(created.firstName, created.lastName, created.email, created.phone, created.companyName || '');
    }
    catch (err: any) {
      console.log("email error", err.message)

    }
    return NextResponse.json({ success: true, created });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' });
  }
}
