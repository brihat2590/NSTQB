import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";



export async function GET(){
    try{
        const registrars=await prisma.eventRegistration.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(registrars);

    }
    catch(e:any){
        console.log("Error fetching event registrations:", e.message);
        return NextResponse.json({ error: "Failed to fetch event registrations" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { name, email, eventId, amount, transaction_uuid } = body;
  
      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });
  
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
  
      if (event.isPaid) {
        if (!amount || !transaction_uuid) {
          return NextResponse.json(
            { error: "Paid event requires amount and transactionUuid" },
            { status: 400 }
          );
        }
  
        const registration = await prisma.eventRegistration.create({
          data: {
            name,
            email,
            eventId,
            amount,
            transaction_uuid,
            status: "PENDING",
          },
        });
  
        return NextResponse.json({
          message: "Paid registration created (pending)",
          registration,
        });
      }

      const existingRegistration=await prisma.eventRegistration.findFirst({
        where:{
            email,
            eventId
        }
      })
      if(existingRegistration){
        return NextResponse.json(
            { error: "You have already registered for this event with this email." },
            { status: 409 }
          );
      }
  
      // Free event registration
      const registration = await prisma.eventRegistration.create({
        data: {
          name,
          email,
          eventId,
          status: "COMPLETE",
        },
      });
  
      return NextResponse.json({
        message: "Free registration completed",
        registration,
      });
    } catch (error) {
      console.error("POST error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }