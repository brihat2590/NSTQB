import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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

  if (
    !chapter || !type || !question || !Array.isArray(options) ||
    (type === 'single' && typeof correctAnswer !== 'number') ||
    (type === 'multiple' && !Array.isArray(correctAnswers)) ||
    !explanation || typeof setId !== 'number'
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const created = await prisma.question.create({
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

  return NextResponse.json(created);
}

export async function GET() {
  const questions = await prisma.question.findMany({ include: { set: true } });
  return NextResponse.json(questions);
}
