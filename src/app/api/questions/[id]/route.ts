import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: {params:Promise<{id:string}>}) {
  const {id}=await params;
  const {
    chapter,
    type,
    question,
    options,
    correctAnswer,
    correctAnswers,
    explanation,
    setId,
  } = await req.json();

  

  const updated = await prisma.question.update({
    where: { id:Number(id) },
    data: {
      chapter,
      type,
      question,
      options,
      correctAnswer,
      correctAnswers,
      explanation,
      setId,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: {params:Promise<{id:string}>}) {
  const {id} = await params;
  await prisma.question.delete({ where: { id:Number(id)} });
  return NextResponse.json({ success: true });
}
