import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";



export async function GET(req:Request){

    try{
        const url=new URL(req.url);
        const transaction_uuid=url.searchParams.get("transaction_uuid");
        if(!transaction_uuid){
            return NextResponse.json({error:"Transaction UUID is required"}, {status:400});
        }
        const registration=await prisma.examRegistration.findUnique({
            where:{
                transaction_uuid:transaction_uuid},
            select:{
                name:true,
                email:true,
                amount:true,
                status:true,}})

    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"}, {status:500})
    }


}