import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(){
    const registrars=await prisma.examRegistration.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    return NextResponse.json(registrars);
}