import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,res:NextResponse){
    const{title,slug,description,dateTime,venue,eventType,ticketPrice,registrationOpen,bannerImage,registrationDeadline}=await req.json();
    try{

        const event=await prisma.events.create({
            data:{
                title,
                slug,
                description,
                dateTime:new Date(dateTime),
                venue,
                eventType,
                ticketPrice,
                registrationOpen,
                registrationDeadline,
                bannerImage

            }
        })
        return NextResponse.json({
            message:"Event created successfully",
            event
        },{status:201
        })

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }



}

export async function GET(){
    try{

        const events=await prisma.events.findMany({
            orderBy:{
                dateTime:'asc'
            }
        })
        return NextResponse.json(events,{status:200});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}