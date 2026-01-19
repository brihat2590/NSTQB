import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* ---------------- GET EVENT BY SLUG ---------------- */
export async function GET(
  req: NextRequest,
  { params }: { params:Promise< { slug: string }> }
) {
    const{slug}=await params;
  try {
    const event = await prisma.events.findUnique({
      where: { slug: slug },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------- UPDATE EVENT ---------------- */
export async function PUT(
  req: NextRequest,
  { params }: { params:Promise< { slug: string }> }
) {
    const{slug}=await params;
  try {
    const body = await req.json();

    const event = await prisma.events.update({
      where: { slug: slug },
      data: {
        title: body.title,
        description: body.description,
        dateTime: body.dateTime ? new Date(body.dateTime) : undefined,
        venue: body.venue,
        eventType: body.eventType,
        ticketPrice: body.ticketPrice,
        registrationOpen: body.registrationOpen,
        registrationDeadline: body.registrationDeadline
          ? new Date(body.registrationDeadline)
          : undefined,
        bannerImage: body.bannerImage,
      },
    });

    return NextResponse.json(
      { message: "Event updated successfully", event },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE EVENT ---------------- */
export async function DELETE(
  req: NextRequest,
  { params }: { params:Promise< { slug: string }> }
) {
    const {slug}=await params;
  try {
    await prisma.events.delete({
      where: { slug: slug },
    });

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
