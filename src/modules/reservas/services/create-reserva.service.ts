import { prisma } from "../../../lib/prisma.js";
import {
  assertSalaExiste,
  assertCapacidadeAdequada,
  assertDuracaoValida,
  assertNaoNoPassado,
  assertSemConflito,
} from "../reserva.validators.js";

interface CreateReservaRequest {
  titulo: string;
  participantes: number;
  inicio: Date;
  fim: Date;
  salaId: string;
}

export async function createReserva(data: CreateReservaRequest) {
  const { titulo, participantes, inicio, fim, salaId } = data;

  assertNaoNoPassado(inicio);
  assertDuracaoValida(inicio, fim);

  const sala = await assertSalaExiste(salaId);
  assertCapacidadeAdequada(participantes, sala.capacidade);

  await assertSemConflito(salaId, inicio, fim);

  return prisma.reserva.create({
    data: { titulo, participantes, inicio, fim, salaId },
    include: { sala: true },
  });
}
