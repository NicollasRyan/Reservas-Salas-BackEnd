import { FastifyRequest, FastifyReply } from "fastify";
import { getReservaById } from "../services/get-reserva.service.js";

export async function getReservaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const reserva = await getReservaById(id);

  if (!reserva) {
    return reply.status(404).send({ message: "Reserva não encontrada" });
  }

  return reply.send(reserva);
}
