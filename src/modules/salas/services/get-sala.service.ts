import { prisma } from "../../../lib/prisma.js";

export async function getSalaById(id: string) {
  return prisma.sala.findUnique({
    where: { id },
  });
}
