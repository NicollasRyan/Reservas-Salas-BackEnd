import { FastifyRequest, FastifyReply } from "fastify";
import { updateReservaSchema } from "../schemas/reserva.schema.js";
import { updateReserva } from "../services/update-reserva.service.js";

export async function updateReservaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const body = updateReservaSchema.parse(request.body);

  const reserva = await updateReserva({ id, ...body });

  return reply.send(reserva);
}
