import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid set ID' },
        { status: 400 }
      );
    }
    

    const { title } = await request.json();

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    const updatedSet = await prisma.questionSet.update({
      where: { id: Number(id) },
      data: {
        title: title.trim(),
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(updatedSet);
  } catch (error) {
    console.error('Error updating question set:', error);
    return NextResponse.json(
      { error: 'Failed to update question set' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid set ID' },
        { status: 400 }
      );
    }

    console.log(`Attempting to delete question set with ID: ${id}`);

    // Check if the set exists and has questions
    const existingSet = await prisma.questionSet.findUnique({
      where: { id: Number(id) },
      include: { questions: true }
    });

    if (!existingSet) {
      return NextResponse.json(
        { error: 'Question set not found' },
        { status: 404 }
      );
    }

    console.log(`Found set: ${existingSet.title} with ${existingSet.questions.length} questions`);

    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // First, delete all questions in the set
      if (existingSet.questions.length > 0) {
        console.log(`Deleting ${existingSet.questions.length} questions...`);
        await tx.question.deleteMany({
          where: { setId: Number(id) }
        });
        console.log('Questions deleted successfully');
      }

      // Then delete the question set
      console.log('Deleting question set...');
      const deletedSet = await tx.questionSet.delete({
        where: { id: Number(id) }
      });
      console.log('Question set deleted successfully');
      
      return deletedSet;
    });

    return NextResponse.json({ 
      message: 'Question set deleted successfully',
      deletedSet: result 
    });
  } catch (error) {
    console.error('Error deleting question set:', error);
    return NextResponse.json(
      { error: `Failed to delete question set: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}