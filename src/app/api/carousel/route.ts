import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const images = await prisma.carouselImage.findMany();
  return NextResponse.json(images);
}

export async function POST(req: Request) {
    const body = await req.json();
    const image = await prisma.carouselImage.create({
      data: {
        url: body.url,
        title: body.title || '',
        description: body.description || '',
      },
    });
    return NextResponse.json(image);
  }
  