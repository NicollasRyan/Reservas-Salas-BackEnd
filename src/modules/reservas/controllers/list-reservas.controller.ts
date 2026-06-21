import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { listReservas, type ListReservasParams } from "../services/list-reservas.service.js";

const querySchema = z.object({
  salaId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional(),
  orderBy: z.enum(["asc", "desc"]).optional(),
});

export async function listReservasController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = querySchema.parse(request.query);

  const params: ListReservasParams = {};
  if (query.salaId !== undefined) params.salaId = query.salaId;
  if (query.page !== undefined) params.page = query.page;
  if (query.pageSize !== undefined) params.pageSize = query.pageSize;
  if (query.orderBy !== undefined) params.orderBy = query.orderBy;

  const result = await listReservas(params);
  return reply.send(result);
}
