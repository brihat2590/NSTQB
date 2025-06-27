import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } =await params;
  
  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  // const { id } = params;
  const body = await req.json();

  try {
    const updated = await prisma.carouselImage.update({
      where: { id },
      data: {
        url: body.url,
        title: body.title || '',
        description: body.description || '',
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } =await  params;
  
  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  

  try {
    await prisma.carouselImage.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
