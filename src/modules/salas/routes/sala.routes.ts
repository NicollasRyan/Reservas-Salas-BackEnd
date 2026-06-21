import { FastifyInstance } from "fastify";
import { createSalaController } from "../controllers/create-sala.controller.js";
import { listSalasController } from "../controllers/list-salas.controller.js";
import { getSalaController } from "../controllers/get-sala.controller.js";
import { updateSalaController } from "../controllers/update-sala.controller.js";
import { deleteSalaController } from "../controllers/delete-sala.controller.js";

export async function salaRoutes(app: FastifyInstance) {
  app.post("/salas", createSalaController);
  app.get("/salas", listSalasController);
  app.get("/salas/:id", getSalaController);
  app.put("/salas/:id", updateSalaController);
  app.delete("/salas/:id", deleteSalaController);
}
