'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function markAsComplete(id: number) {
  await prisma.examRegistration.update({
    where: { id },
    data: { status: 'COMPLETE' },
  })

  revalidatePath('/registration-admin') // Refresh UI
}

export async function getRegisrations(){
  const registrations = await prisma.examRegistration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return registrations;
}
export async function rejectRegistration(id:number,remarks:string){
  await prisma.examRegistration.update({
    where: { id },
    data: { status: 'REJECTED',remarks:remarks },
  })

  revalidatePath('/registration-admin') // Refresh UI
  return { message: 'Registration rejected successfully',
    remarks:remarks
   }
}