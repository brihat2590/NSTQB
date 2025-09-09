import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching question sets...');
    const questionSets = await prisma.questionSet.findMany({
      include: {
        questions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`Found ${questionSets.length} question sets`);
    return NextResponse.json(questionSets);
  } catch (error) {
    console.error('Error fetching question sets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question sets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    console.log(`Creating question set: ${title}`);
    const questionSet = await prisma.questionSet.create({
      data: {
        title: title.trim(),
      },
      include: {
        questions: true,
      },
    });

    console.log(`Question set created with ID: ${questionSet.id}`);
    return NextResponse.json(questionSet, { status: 201 });
  } catch (error) {
    console.error('Error creating question set:', error);
    return NextResponse.json(
      { error: 'Failed to create question set' },
      { status: 500 }
    );
  }
}