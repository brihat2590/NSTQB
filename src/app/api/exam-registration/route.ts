import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const examScheduleId = searchParams.get("examScheduleId");

    const registrars=await prisma.examRegistration.findMany({
        where: examScheduleId ? { examScheduleId } : undefined,
        include: {
            examSchedule: true,
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return NextResponse.json(registrars);
}
