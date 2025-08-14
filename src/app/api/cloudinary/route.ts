import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  console.log("request received to cloudinary route");
  const formData = await req.formData();
  const file = formData.get('screenShot') as File;
  let screenshotUrl = '';
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'exam_screenshots' }, (err, res) => {
        if (err) reject(err);
        resolve(res);
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
    
  };

  const created = await prisma.examRegistration.create({ data });

  return NextResponse.json({ success: true, created });
}
