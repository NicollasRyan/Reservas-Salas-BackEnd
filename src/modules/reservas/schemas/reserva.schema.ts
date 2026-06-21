import { z } from "zod";

export const createReservaSchema = z
  .object({
    titulo: z.string().min(1, "O título é obrigatório."),
    participantes: z
      .number()
      .int("O número de participantes deve ser inteiro.")
      .positive("O número de participantes deve ser positivo."),
    inicio: z.coerce.date(),
    fim: z.coerce.date(),
    salaId: z.string().uuid("ID da sala inválido."),
  })
  .refine((data) => data.fim > data.inicio, {
    message: "A data/hora de fim deve ser posterior à data/hora de início.",
    path: ["fim"],
  });

export const updateReservaSchema = createReservaSchema;

export type CreateReservaDTO = z.infer<typeof createReservaSchema>;
export type UpdateReservaDTO = z.infer<typeof updateReservaSchema>;
