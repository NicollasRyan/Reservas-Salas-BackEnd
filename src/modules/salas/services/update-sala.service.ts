import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";
import { AppError } from "../../../lib/app-error.js";

interface UpdateSalaRequest {
  id: string;
  nome: string;
  capacidade: number;
}

export async function updateSala({ id, nome, capacidade }: UpdateSalaRequest) {
  const existe = await prisma.sala.findUnique({ where: { id } });
  if (!existe) {
    throw new AppError("Sala não encontrada.", 404);
  }

  try {
    return await prisma.sala.update({
      where: { id },
      data: { nome, capacidade },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new AppError(`Já existe uma sala com o nome "${nome}".`, 409);
    }
    throw err;
  }
}
