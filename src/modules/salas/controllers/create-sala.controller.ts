import { FastifyRequest, FastifyReply } from "fastify";
import { createSalaSchema } from "../schemas/sala.schema.js";
import { createSala } from "../services/create-sala.service.js";

export async function createSalaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createSalaSchema.parse(request.body);

  const sala = await createSala(body);

  return reply.status(201).send(sala);
}
