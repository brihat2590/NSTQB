import {prisma} from "@/lib/prisma";

import { NextRequest,NextResponse } from "next/server";


export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){

    const{id}=await params;
    const{name,phone}=await req.json();
    
    try{
        const registration=await prisma.registrationEvent.findUnique({
            where:{
                id:id
            }
        })
        if(!registration){
            return NextResponse.json({message:"Registration not found"}, {status:404});
        }

        const updated=await prisma.registrationEvent.update({
            where:{
                id:id
            },
            data:{
                name:name,
                
                
                phone:phone,
                

            }
        })
        return NextResponse.json({
            message:"Successfully updated the event",
            registration:updated
        })

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }

}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){

    const{id}=await params;

    try{
        const existing=await prisma.registrationEvent.findUnique({
            where:{
                id:id
            }
        })
        if(!existing){
            return NextResponse.json({
                message:"Registration not found"
            }, {status:404});
        }
        const deleted=await prisma.registrationEvent.delete({
            where:{
                id:id
            }
        })
        return NextResponse.json({
            message:"Successfully deleted the registration",
            registration:deleted
        })

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message:"Internal Server Error"
        })
    }

}