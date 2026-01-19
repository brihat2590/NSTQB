import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";



export async function GET(){
    const events=await prisma.event.findMany({
        orderBy:{
            date:'desc'
        }
    })
    return NextResponse.json(events)
}

export async function POST(req:Request){
    const {title,description,date,imageUrl,price,isPaid,slug}=await req.json();
    const event=await prisma.event.create({
        data:{
            title,
            description,
            date:new Date(date),
            imageUrl,
            price,
            isPaid,
            slug
        }
    })
    return NextResponse.json(event,{status:201})


}