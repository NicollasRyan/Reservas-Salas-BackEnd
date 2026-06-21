import { prisma } from "../../../lib/prisma.js";

export async function deleteSala(id: string) {
  await prisma.sala.delete({
    where: { id },
  });
}
