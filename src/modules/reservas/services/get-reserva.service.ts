import { prisma } from "../../../lib/prisma.js";

export async function getReservaById(id: string) {
  return prisma.reserva.findUnique({
    where: { id },
    include: { sala: true },
  });
}
