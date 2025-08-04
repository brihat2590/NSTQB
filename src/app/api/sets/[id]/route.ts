import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){

    const id=await params;
    const body=await req.json();
    if(!body.title){
        return NextResponse.json({error:"title is required"},{status:400});
    }
    try{
        const updated=await prisma.questionSet.update({
            where:{id:Number(id)},
            data:{
                title:body.title
            }
        })
        return NextResponse.json(updated);
    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({error:"failed to update"},{status:500});
    }


}
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
    const id=await params;
    try{
        await prisma.questionSet.delete({
            where:{id:Number(id)}
        })
        return NextResponse.json({success:true});
    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({error:"failed to delete"},{status:500});
    }
}