import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if(!id){
        return NextResponse.json({error:"Missing id parameter"},{status:400})
    }
  const body = await req.json();
  const updated = await prisma.boardMembers.update({
    where: { id: id },
    data: body,
  });
  return NextResponse.json(updated);
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if(!id){
        return NextResponse.json({error:"Missing id parameter"},{status:400})
    }
    await prisma.boardMembers.delete({ where: { id: id } });
    return NextResponse.json({ message: 'Deleted' });
  }
  