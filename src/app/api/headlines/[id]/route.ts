import {prisma} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}){

    const{text,icon,href,type}=await req.json();
    const {id}=await params;
    if(!text || !icon || !href || !type){
        return NextResponse.json({
            error: 'All fields are required'
        }, { status: 400 });
    }
    try{

        const updated=await prisma.flowingHeadlines.update({
            where:{id:id},
            data:{
                text,
                icon,
                href,
                type
            }
        })

        return NextResponse.json(updated, { status: 200 });
        

    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({ error: 'Failed to update headline' }, { status: 500 });
    }

}
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
    const {id}=await params;
    try{
        await prisma.flowingHeadlines.delete({
            where:{id:id}
        })

    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({ error: 'Failed to delete headline' }, { status: 500 });
    }
}