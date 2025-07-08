import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id}=await params;
  const blog = await prisma.blog.findUnique({ where: { id: id } });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { title, slug, imageUrl, content, summary } = await request.json();
  const{id}=await params;
  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: id },
      data: { title, slug, imageUrl, content, summary },
    });
    return NextResponse.json(updatedBlog);
  } catch {
    return NextResponse.json({ error: 'Error updating blog' }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const{id}=await params;
  try {
    await prisma.blog.delete({ where: { id: id } });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error deleting blog' }, { status: 400 });
  }
}
