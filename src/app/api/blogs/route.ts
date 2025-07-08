import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  const { title, slug, imageUrl, content, summary } = await request.json();
  try {
    const newBlog = await prisma.blog.create({
      data: { title, slug, imageUrl, content, summary },
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating blog' }, { status: 400 });
  }
}
