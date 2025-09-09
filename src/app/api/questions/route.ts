import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const {
      
      question,
      setId,
      options,
      correctAnswer,
      correctAnswers,
      explanation,
      type,
      image,
    } = await request.json();

    // Validation
    if ( !question || !setId || !options || !explanation || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (type === 'single' && (correctAnswer === undefined || correctAnswer < 0 || correctAnswer >= options.length)) {
      return NextResponse.json(
        { error: 'Invalid correct answer for single choice question' },
        { status: 400 }
      );
    }

    if (type === 'multiple' && (!Array.isArray(correctAnswers) || correctAnswers.length === 0)) {
      return NextResponse.json(
        { error: 'Multiple choice questions must have at least one correct answer' },
        { status: 400 }
      );
    }

    if (type === 'multiple' && correctAnswers.some((ans: number) => ans < 0 || ans >= options.length)) {
      return NextResponse.json(
        { error: 'Invalid correct answers for multiple choice question' },
        { status: 400 }
      );
    }

    // Filter out empty options
    const filteredOptions = options.filter((option: string) => option.trim().length > 0);
    if (filteredOptions.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 options are required' },
        { status: 400 }
      );
    }

    const questionData = await prisma.question.create({
      data: {
        
        question: question.trim(),
        setId: parseInt(setId),
        options: filteredOptions,
        correctAnswer: type === 'single' ? correctAnswer : null,
        correctAnswers: type === 'multiple' ? correctAnswers : [],
        explanation: explanation.trim(),
        type,
        image: image || null,
      },
      include: {
        set: {
          include: {
            questions: true,
          },
        },
      },
    });

    return NextResponse.json(questionData, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
