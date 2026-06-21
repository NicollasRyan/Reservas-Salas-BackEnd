import { z } from "zod";

export const createSalaSchema = z.object({
  nome: z.string().min(1),
  capacidade: z.number().int().positive(),
});

export type CreateSalaDTO = z.infer<typeof createSalaSchema>;
