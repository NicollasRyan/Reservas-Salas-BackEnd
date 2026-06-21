import { prisma } from "../../../lib/prisma.js";
import { AppError } from "../../../lib/app-error.js";
import {
  assertSalaExiste,
  assertCapacidadeAdequada,
  assertDuracaoValida,
  assertNaoNoPassado,
  assertSemConflito,
} from "../reserva.validators.js";

interface UpdateReservaRequest {
  id: string;
  titulo: string;
  participantes: number;
  inicio: Date;
  fim: Date;
  salaId: string;
}

export async function updateReserva(data: UpdateReservaRequest) {
  const { id, titulo, participantes, inicio, fim, salaId } = data;

  const reservaExistente = await prisma.reserva.findUnique({ where: { id } });

  if (!reservaExistente) {
    throw new AppError("Reserva não encontrada.", 404);
  }

  assertNaoNoPassado(inicio);
  assertDuracaoValida(inicio, fim);

  const sala = await assertSalaExiste(salaId);
  assertCapacidadeAdequada(participantes, sala.capacidade);

  // Exclui a própria reserva da verificação de conflito
  await assertSemConflito(salaId, inicio, fim, id);

  return prisma.reserva.update({
    where: { id },
    data: { titulo, participantes, inicio, fim, salaId },
    include: { sala: true },
  });
}
