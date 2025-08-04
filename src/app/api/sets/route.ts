import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    const sets=await prisma.questionSet.findMany({
        orderBy:{
            createdAt:"desc"
        },
        include:{questions:true}
    });
    return NextResponse.json(sets);
}

export async function POST(req:Request){
    const body=await req.json();
    if(!body.title){
        return NextResponse.json({error:"title is required"},{status:400});
    }

    const set=await prisma.questionSet.create({
        data:{
            title:body.title,
        }
    })
    return NextResponse.json(set);
}