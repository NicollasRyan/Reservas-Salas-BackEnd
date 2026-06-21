import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../lib/app-error.js";

const DURACAO_MINIMA_MS = 15 * 60 * 1000;       // 15 minutos
const DURACAO_MAXIMA_MS = 8 * 60 * 60 * 1000;   // 8 horas

export async function assertSalaExiste(salaId: string) {
  const sala = await prisma.sala.findUnique({ where: { id: salaId } });

  if (!sala) {
    throw new AppError("Sala não encontrada.", 404);
  }

  return sala;
}

export function assertCapacidadeAdequada(
  participantes: number,
  capacidadeSala: number,
) {
  if (participantes > capacidadeSala) {
    throw new AppError(
      `A sala comporta no máximo ${capacidadeSala} participante(s). Solicitado: ${participantes}.`,
      422,
    );
  }
}

export function assertDuracaoValida(inicio: Date, fim: Date) {
  const duracaoMs = fim.getTime() - inicio.getTime();

  if (duracaoMs < DURACAO_MINIMA_MS) {
    throw new AppError(
      "A reserva deve ter no mínimo 15 minutos de duração.",
      422,
    );
  }

  if (duracaoMs > DURACAO_MAXIMA_MS) {
    throw new AppError(
      "A reserva não pode ultrapassar 8 horas de duração.",
      422,
    );
  }
}

export function assertNaoNoPassado(inicio: Date) {
  if (inicio < new Date()) {
    throw new AppError(
      "Não é possível criar uma reserva com data/hora de início no passado.",
      422,
    );
  }
}

export async function assertSemConflito(
  salaId: string,
  inicio: Date,
  fim: Date,
  excluirReservaId?: string,
) {
  const conflito = await prisma.reserva.findFirst({
    where: {
      salaId,
      // Sobreposição: novo.inicio < existente.fim AND novo.fim > existente.inicio
      ...(excluirReservaId ? { id: { not: excluirReservaId } } : {}),
      AND: [
        { inicio: { lt: fim } },
        { fim: { gt: inicio } },
      ],
    },
    select: { titulo: true, inicio: true, fim: true },
  });

  if (conflito) {
    const fmt = (d: Date) =>
      d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    throw new AppError(
      `Conflito de horário: a sala já está reservada para "${conflito.titulo}" das ${fmt(conflito.inicio)} às ${fmt(conflito.fim)}.`,
      409,
    );
  }
}
