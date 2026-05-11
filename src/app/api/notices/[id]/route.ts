import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(notice);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, content, fileUrl, fileName, published, endDate } = await request.json();
  try {
    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title,
        content,
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        published,
        endDate: new Date(endDate),
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Error updating notice' }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error deleting notice' }, { status: 400 });
  }
}
