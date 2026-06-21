import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";
import { AppError } from "../../../lib/app-error.js";

interface CreateSalaRequest {
  nome: string;
  capacidade: number;
}

export async function createSala({ nome, capacidade }: CreateSalaRequest) {
  try {
    return await prisma.sala.create({
      data: { nome, capacidade },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new AppError(`Já existe uma sala com o nome "${nome}".`, 409);
    }
    throw err;
  }
}
