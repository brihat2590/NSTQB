import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const members = await prisma.boardMembers.findMany({
    orderBy: { order: 'asc' }, // 👈 sort by order
  });

  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const body = await req.json();

  const count = await prisma.boardMembers.count();

  const newMember = await prisma.boardMembers.create({
    data: {
      name: body.name,
      title: body.title,
      linkedInUrl: body.linkedInUrl,
      imageUrl: body.imageUrl,
      category: body.category ?? 'BOARD',
      order: count,
    },
  });

  return NextResponse.json(newMember, { status: 201 });
}
