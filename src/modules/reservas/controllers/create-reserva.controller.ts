import { FastifyRequest, FastifyReply } from "fastify";
import { createReservaSchema } from "../schemas/reserva.schema.js";
import { createReserva } from "../services/create-reserva.service.js";

export async function createReservaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReservaSchema.parse(request.body);

  const reserva = await createReserva(body);

  return reply.status(201).send(reserva);
}
