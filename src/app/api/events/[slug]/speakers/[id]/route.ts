import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
    const{id}=await params;
    const body=await req.json();

    try{
        
            const existing=await prisma.speaker.findUnique({
                where:{
                    id:id
                }
            })
            if(!existing){
                return NextResponse.json({
                    message:"Speaker not found"
                }, {status:404});
            }
            const speaker=await prisma.speaker.update({
                where:{
                    id:id
                },
                data:{
                    name:body.name,
                    bio:body.bio,
                    photo:body.photo,
                    
                }
            })
            return NextResponse.json({
                message:"Speaker updated successfully",
                speaker
            },{status:200});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
    const{id}=await params;

    try{

        const existing=await prisma.speaker.findUnique({
            where:{
                id:id
            }
        })
        if(!existing){
            return NextResponse.json({
                message:"Speaker not found"
            }, {status:404});
        }
        const speaker=await prisma.speaker.delete({
            where:{
                id:id
            }
        })
        return NextResponse.json({
            message:"Speaker deleted successfully",
            speaker
        },{status:200});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}