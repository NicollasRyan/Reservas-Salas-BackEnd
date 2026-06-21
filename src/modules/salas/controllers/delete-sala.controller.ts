import { FastifyRequest, FastifyReply } from "fastify";
import { deleteSala } from "../services/delete-sala.service.js";

export async function deleteSalaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await deleteSala(id);

  return reply.status(204).send();
}
