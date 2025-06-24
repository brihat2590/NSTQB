import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { error } from 'console';

// GET: List all certified testers (optionally with pagination)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const testers = await prisma.certifiedTesters.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { certificationDate: 'desc' },
  });

  const total = await prisma.certifiedTesters.count();
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({ data: testers, totalPages, currentPage: page });
}

// POST: Create a new certified tester
export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    certificateNumber,
    certificateBody,
    examProvider,
    certification,
    countryOfIssue,
    certificationDate,
  } = body;

  try {
    const newTester = await prisma.certifiedTesters.create({
      data: {
        name,
        certificateNumber,
        certificateBody,
        examProvider,
        certification,
        countryOfIssue,
        certificationDate: new Date(certificationDate),
      },
    });

    return NextResponse.json({message:newTester}, { status: 201 });
  } catch (err:any) {
    return NextResponse.json({ error: err.message,
        
     }, { status: 500 });
  }
}
