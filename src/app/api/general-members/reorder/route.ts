import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { ids } = await req.json(); // expect { ids: string[] }

  try {
    for (let i = 0; i < ids.length; i++) {
      await prisma.generalMembers.update({
        where: { id: ids[i] },
        data: { order: i },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder:', error);
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
  }
}
