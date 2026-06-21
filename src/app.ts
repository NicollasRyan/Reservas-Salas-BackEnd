import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { z, ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "./lib/app-error.js";
import { salaRoutes } from "./modules/salas/routes/sala.routes.js";
import { reservaRoutes } from "./modules/reservas/routes/reserva.routes.js";

const isDev = process.env.NODE_ENV !== "production";

export const app = Fastify({
  logger: isDev
    ? { transport: { target: "pino-pretty", options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname" } } }
    : true,
});

app.register(cors, {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

app.register(salaRoutes);
app.register(reservaRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Dados inválidos.",
      errors: z.flattenError(error).fieldErrors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return reply.status(404).send({ message: "Registro não encontrado." });
    }
    if (error.code === "P2002") {
      return reply.status(409).send({ message: "Já existe um registro com esses dados." });
    }
    if (error.code === "P2003") {
      return reply
        .status(422)
        .send({ message: "Referência inválida: recurso relacionado não existe." });
    }
  }

  app.log.error(error);
  return reply.status(500).send({ message: "Erro interno do servidor." });
});

app.get("/", async () => ({ message: "API funcionando!" }));
