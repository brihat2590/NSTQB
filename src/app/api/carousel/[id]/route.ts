import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const updated = await prisma.carouselImage.update({
      where: { id: params.id },
      data: {
        url: body.url,
        title: body.title || '',
        description: body.description || '',
      },
    });
    return NextResponse.json(updated);
  }
  

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.carouselImage.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Deleted' });
}
