import { FastifyRequest, FastifyReply } from "fastify";
import { listSalas } from "../services/list-salas.service.js";

export async function listSalasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const salas = await listSalas();

  return reply.send(salas);
}
