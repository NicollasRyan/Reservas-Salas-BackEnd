import { prisma } from "../../../lib/prisma.js";

export async function listSalas() {
  return prisma.sala.findMany({
    orderBy: { nome: "asc" },
  });
}
