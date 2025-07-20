import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export  async function GET(){
    const headlines=await prisma.flowingHeadlines.findMany({
       
    })
    return NextResponse.json(headlines, { status: 200 });
};

export  async function POST(req:Request){
    const{text,icon,href,type}=await req.json();
    if(!text || !icon || !href || !type){
        return NextResponse.json({
            error: 'All fields are required'
        }, { status: 400 });
    }
    try{
        const data=await prisma.flowingHeadlines.create({
            data:{
                text,
                icon,
                href,
                type}})
        return NextResponse.json(data, { status: 201 });

    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({ error: 'Failed to create headline' }, { status: 500 });
    }
}