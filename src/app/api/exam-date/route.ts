import { prisma } from '@/lib/prisma';
import { NextResponse,NextRequest } from 'next/server';

export async function GET() {
  const schedules = await prisma.examSchedule.findMany({
    orderBy: { examDate: 'asc' },
  });
  return NextResponse.json(schedules);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newSchedule = await prisma.examSchedule.create({
    data: {
      examTitle: body.examTitle,
      examDate: new Date(body.examDate),
      applicationPeriod: new Date(body.applicationPeriod),
      location: body.location,
    },
  });
  return NextResponse.json(newSchedule);
}
