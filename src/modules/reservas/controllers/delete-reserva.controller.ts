import { FastifyRequest, FastifyReply } from "fastify";
import { deleteReserva } from "../services/delete-reserva.service.js";

export async function deleteReservaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await deleteReserva(id);

  return reply.status(204).send();
}
