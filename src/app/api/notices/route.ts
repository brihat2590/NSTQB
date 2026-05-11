import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get('active') === 'true';

  const where = activeOnly
    ? { published: true, endDate: { gte: new Date() } }
    : {};

  const notices = await prisma.notice.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(notices);
}

export async function POST(request: NextRequest) {
  const { title, content, fileUrl, fileName, published, endDate } = await request.json();
  try {
    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        published: published ?? true,
        endDate: new Date(endDate),
      },
    });
    return NextResponse.json(notice, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Error creating notice' }, { status: 400 });
  }
}
