import { app } from "./app.js";

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

app.listen({ port: PORT, host: HOST }).then(() => {
  app.log.info(`Server running on ${HOST}:${PORT}`);
});