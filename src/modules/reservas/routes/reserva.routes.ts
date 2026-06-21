import { FastifyInstance } from "fastify";
import { createReservaController } from "../controllers/create-reserva.controller.js";
import { listReservasController } from "../controllers/list-reservas.controller.js";
import { getReservaController } from "../controllers/get-reserva.controller.js";
import { updateReservaController } from "../controllers/update-reserva.controller.js";
import { deleteReservaController } from "../controllers/delete-reserva.controller.js";

export async function reservaRoutes(app: FastifyInstance) {
  app.post("/reservas", createReservaController);
  app.get("/reservas", listReservasController);
  app.get("/reservas/:id", getReservaController);
  app.put("/reservas/:id", updateReservaController);
  app.delete("/reservas/:id", deleteReservaController);
}
