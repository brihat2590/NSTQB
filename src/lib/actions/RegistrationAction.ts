'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { sendExamRegistrationSuccessEmail, sendExamRejectionEmail } from '@/lib/mailer'

export async function markAsComplete(id: number) {
  const updated = await prisma.examRegistration.update({
    where: { id },
    data: { status: 'COMPLETE' },
    select: {
      email: true,
      firstName: true,
      lastName: true

    }

  })
  try { await sendExamRegistrationSuccessEmail(updated.email, updated.firstName, updated.lastName) }
  catch (err: any) {
    console.log(err);
    console.log("failed to send success email")
  }


  revalidatePath('/registration-admin') // Refresh UI
}

export async function getRegisrations() {
  const registrations = await prisma.examRegistration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return registrations;
}
export async function rejectRegistration(id: number, remarks: string) {
  const updated = await prisma.examRegistration.update({
    where: { id },
    data: { status: 'REJECTED', remarks: remarks },
    select: {
      email: true,
      firstName: true,
      lastName: true
    }
  })

  try { await sendExamRejectionEmail(updated.email, updated.firstName, updated.lastName, remarks) }
  catch (err: any) {
    console.log(err);
    console.log("failed to send rejection email")
  }

  revalidatePath('/registration-admin') // Refresh UI
  return {
    message: 'Registration rejected successfully',
    remarks: remarks
  }
}