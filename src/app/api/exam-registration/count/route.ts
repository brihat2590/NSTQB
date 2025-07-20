import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(){
    const total=await prisma.examRegistration.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
    return NextResponse.json({
        total
    })
}