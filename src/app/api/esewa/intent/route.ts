import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function POST(req:Request){
    const {name,email,eventId,amount}=await req.json();
    if(!name||!email||!eventId){
        return NextResponse.json({
            error: 'All fields are required'
        }, { status: 400 });
    }
    try{
        const intent=await prisma.intent.create({
            data:{
                name:name,
                email:email,
                eventId: eventId,
                amount: Number(amount)
                
            }
        });
        return NextResponse.json(intent, { status: 201 });
    }
    catch(error){
        console.log(`registration error: ${error}`);
        return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
    }

}