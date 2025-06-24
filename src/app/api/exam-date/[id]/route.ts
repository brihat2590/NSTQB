import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updatedSchedule = await prisma.examSchedule.update({
    where: { id: params.id },
    data: {
      examTitle: body.examTitle,
      examDate: new Date(body.examDate),
      applicationPeriod: new Date(body.applicationPeriod),
      location: body.location,
    },
  });
  return NextResponse.json(updatedSchedule);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.examSchedule.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}
