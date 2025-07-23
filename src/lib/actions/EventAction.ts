import { prisma } from "@/lib/prisma";

export async function getRegistrationByTransactionUUID(transaction_uuid: string) {
  const registration = await prisma.eventRegistration.findFirst({
    where: {
      transaction_uuid: transaction_uuid,
    },
    select: {
      name: true,
      email: true,
      transaction_uuid:true
      // add any other fields you want to return here
    },
  });

  if (!registration) {
    return { error: "No registration found for this transaction UUID" };
  }

  return registration;
}
