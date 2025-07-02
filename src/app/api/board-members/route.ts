import { NextResponse } from "next/server";


import {prisma} from "@/lib/prisma"

export async function GET(){
    const boardMembers=await prisma.boardMembers.findMany()
    return NextResponse.json(boardMembers)
}

export async function POST(req:Request){
    const body=await req.json();
    const boardMembers=await prisma.boardMembers.create({
        data:body
    })
    return NextResponse.json({message:"board member added sucressfully"})
}