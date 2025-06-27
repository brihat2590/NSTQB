import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// UPDATE tester
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  const {id}=await params
  const updateData = {
    ...body,
    ...(body.certificationDate && { 
      certificationDate: new Date(body.certificationDate) 
    })
  };

  try {
    const updated = await prisma.certifiedTesters.update({
      where: { id: id },
      data: updateData,
    });
    return NextResponse.json(updated);  
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE tester
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id}=await params;
    await prisma.certifiedTesters.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
