'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendExamRegistrationSuccessEmail } from '@/lib/mailer'

export async function markAsComplete(id: number) {
  const updated=await prisma.examRegistration.update({
    where: { id },
    data: { status: 'COMPLETE' },
    select:{
      email:true,
      firstName:true,
      lastName:true
      
    }

  })
  await sendExamRegistrationSuccessEmail(updated.email, updated.firstName, updated.lastName)

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