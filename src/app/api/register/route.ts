import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const registrations=await prisma.registration.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return NextResponse.json(registrations, {status: 200});

    }
    catch(error){
        console.log(`registrattions error: ${error}`);
        return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });

    }
}

export async function POST(req:Request){
    const {name,email,eventId,transactionId,paymentReference}=await req.json();
    if(!name ||!email||!eventId){
        return NextResponse.json({
            error: 'All fields are required'
        }, { status: 400 });
    }
    try{
        const registration=await prisma.registration.create({
            data:{
                name,
                email,
                eventId: Number(eventId),
                
            }
        })
        return NextResponse.json(registration, { status: 201 });

    }
    catch(error){
        console.log(`registration error: ${error}`);
        return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
    }
    

}