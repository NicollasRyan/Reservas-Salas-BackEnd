import { FastifyRequest, FastifyReply } from "fastify";
import { createSalaSchema } from "../schemas/sala.schema.js";
import { updateSala } from "../services/update-sala.service.js";

export async function updateSalaController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const body = createSalaSchema.parse(request.body);

  const sala = await updateSala({ id, ...body });

  return reply.send(sala);
}
