// scripts/clearTesters.ts
import {prisma} from "@/lib/prisma"

async function clear() {
  await prisma.certifiedTesters.deleteMany();
  console.log("All certified testers removed");
}

clear();
