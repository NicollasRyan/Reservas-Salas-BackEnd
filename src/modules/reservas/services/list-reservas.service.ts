import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;

export interface ListReservasParams {
  salaId?: string;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

const reservaWithSala = Prisma.validator<Prisma.ReservaDefaultArgs>()({
  include: { sala: true },
});

export type ReservaWithSala = Prisma.ReservaGetPayload<typeof reservaWithSala>;

export interface PaginatedReservas {
  data: ReservaWithSala[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listReservas(params: ListReservasParams = {}): Promise<PaginatedReservas> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE));
  const orderBy = params.orderBy ?? "asc";
  const skip = (page - 1) * pageSize;

  const where = params.salaId ? { salaId: params.salaId } : {};

  const [total, data] = await prisma.$transaction([
    prisma.reserva.count({ where }),
    prisma.reserva.findMany({
      where,
      orderBy: { inicio: orderBy },
      include: { sala: true },
      skip,
      take: pageSize,
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
