import {prisma} from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest,{params}:{params:Promise<{slug:string}>}){

    const{name,bio,photo}=await req.json();
    const {slug}=await params;

    if(!name || !bio ){
        return NextResponse.json({message:"Name, Bio and slug are required"}, {status:400});
    }
    try{

        const event=await prisma.events.findUnique({
            where:{
                slug:slug
            }
        })
        if(!event){
            return NextResponse.json({
                message:"Event not found"
            },
        {status:404});
        }

        const speaker=await prisma.speaker.create({
            data:{
                name:name,
                bio:bio,
                eventId:event.id,
                photo
            
            }
           
        })
        return NextResponse.json({
            messsage:"the speaker has been created successfully",
            speaker:speaker
        })

    }
    catch(error){
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}
//kun speaker ho yo event ma

export async function GET(req:Request,{params}:{params:Promise<{
slug:string
}>}){

    const {slug}=await params;
    try{
        const event=await prisma.events.findUnique({
            where:{
                slug:slug
            },
            include:{
                speakers:true
            }
        })
        if(!event){
            return NextResponse.json({
                message:"Event not found"
            })
        }
        return NextResponse.json({
            speakers:event.speakers
        })

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }

}