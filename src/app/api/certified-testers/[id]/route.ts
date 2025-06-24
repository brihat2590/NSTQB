import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// UPDATE tester
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updateData = {
    ...body,
    ...(body.certificationDate && { 
      certificationDate: new Date(body.certificationDate) 
    })
  };

  try {
    const updated = await prisma.certifiedTesters.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(updated);  
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE tester
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.certifiedTesters.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
