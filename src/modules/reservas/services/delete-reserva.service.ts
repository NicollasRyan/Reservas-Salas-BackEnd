import { prisma } from "../../../lib/prisma.js";
import { AppError } from "../../../lib/app-error.js";

export async function deleteReserva(id: string) {
  const reserva = await prisma.reserva.findUnique({ where: { id } });

  if (!reserva) {
    throw new AppError("Reserva não encontrada.", 404);
  }

  await prisma.reserva.delete({ where: { id } });
}
