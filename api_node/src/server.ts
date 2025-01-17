import "dotenv/config";
import express from "express";
import { router } from "./router";
import runDbMigrations from "./db/migrations";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(router);

async function init() {
  const port = process.env.PORT || 5000;

  await runDbMigrations();

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!!`);
  });
}

init();
