import { FastifyRequest, FastifyReply } from "fastify";
import { getSalaById } from "../services/get-sala.service.js";

export async function getSalaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const sala = await getSalaById(id);

  if (!sala) {
    return reply.status(404).send({ message: "Sala não encontrada" });
  }

  return reply.send(sala);
}
