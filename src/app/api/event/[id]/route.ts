import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
  });

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(event);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { title, description, date, imageUrl, isPaid, price, slug } =
    await request.json();
  const { id } = await params;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date: new Date(date),
        imageUrl,
        isPaid,
        price: isPaid ? price : null,
        slug,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating event' },
      { status: 400 }
    );
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } =await params;
  
    try {
      await prisma.event.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("DELETE error:", error);
      return NextResponse.json({ error: "Error deleting event" }, { status: 400 });
    }
  }
