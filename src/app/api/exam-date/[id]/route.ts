import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  const{id}=await params;
  const updatedSchedule = await prisma.examSchedule.update({
    where: { id: id},
    data: {
      examTitle: body.examTitle,
      examDate: new Date(body.examDate),
      applicationPeriod: new Date(body.applicationPeriod),
      location: body.location,
    },
  });
  return NextResponse.json(updatedSchedule);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const{id}=await params;
  await prisma.examSchedule.delete({ where: { id: id } });
  return NextResponse.json({ message: 'Deleted' });
}
