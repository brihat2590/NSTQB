import {prisma} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:Request,{params}:{params:Promise<{slug:string}>}){

    const{slug}=await params;
    const{name,phone,email}=await req.json();
    if(!name||!email||!phone){
        return NextResponse.json({message:"Name, Email and Phone are required"}, {status:400});
    }
    try{

        const event=await prisma.events.findUnique({
            where:{
                slug:slug
            }
        });
        if(!event){
            return new Response(JSON.stringify({message:"Event not found"}), {status:404});
            
        }
        if(!event.registrationOpen){
            return NextResponse.json({message:"Registration is closed for this event"}, {status:400});
        }
        if (
            event.registrationDeadline &&
            new Date() > event.registrationDeadline
          ) {
            return NextResponse.json(
              { message: "Registration deadline has passed" },
              { status: 400 }
            );
          }
        const registration=await prisma.registrationEvent.create({
            data:{
                name:name,
                email:email,
                phone:phone,
                eventId:event.id


            }
        })
        return NextResponse.json(
            { message: "Registration successful", registration },
            { status: 201 }
          );

    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify({message:"Internal Server Error"}), {status:500});
    }

}

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    const{slug}=await params;

    try{

        const event=await prisma.events.findUnique({
            where:{
                slug:slug
            },
            include:{
                registrations:true
            }
        })
        if(!event){
            return NextResponse.json({
                message:"Event not found"
            })
        }

    return NextResponse.json(event.registrations, { status: 200 });
        
        

    }
    catch(err){
        console.log(err);

        return NextResponse.json({
            message:"Internal Server Error"
        })
    }

}