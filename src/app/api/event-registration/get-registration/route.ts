import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust path if needed

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transaction_uuid = searchParams.get('transaction_uuid');

  if (!transaction_uuid) {
    return NextResponse.json({ error: 'Missing transaction_uuid' }, { status: 400 });
  }

  const registration = await prisma.eventRegistration.findUnique({
    where: { transaction_uuid },
  });

  if (!registration) {
    return NextResponse.json({ error: 'No registration found' }, { status: 404 });
  }

  return NextResponse.json(registration);
}
