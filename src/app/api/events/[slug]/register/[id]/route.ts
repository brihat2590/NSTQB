import {prisma} from "@/lib/prisma";

import { NextResponse } from "next/server";


export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){

    const{id}=await params;
    const{name,email,phone,status,reference}=await req.json();
    
    try{
        const registration=await prisma.registrationEvent.findUnique({
            where:{
                id:id
            }
        })
        if(!registration){
            return NextResponse.json({message:"Registration not found"}, {status:404});
        }

        const nextStatus = typeof status === "string" && status.trim()
            ? status.trim().toUpperCase()
            : registration.status?.trim().toUpperCase() ?? "PENDING";
        const allowedStatus = ["PENDING", "COMPLETED", "FAILED"] as const;
        if (!(allowedStatus as readonly string[]).includes(nextStatus)) {
            return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
        }

        const nextReference = typeof reference === "string" ? reference.trim() : "";
        if (nextStatus !== registration.status && !nextReference) {
            return NextResponse.json(
                { message: "Reference is required when changing status" },
                { status: 400 }
            );
        }

        const updated=await prisma.registrationEvent.update({
            where:{
                id:id
            },
            data:{
                name: typeof name === "string" ? name : registration.name,
                email: typeof email === "string" ? email : registration.email,
                phone: typeof phone === "string" ? phone : registration.phone,
                status: nextStatus,
                transaction_uuid: nextReference || registration.transaction_uuid,

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
