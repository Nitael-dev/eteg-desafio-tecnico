import db from "../index";
import createRegisterTable from "./create_register";

const runDbMigrations = async () => {
  console.log("Começo da Migraçao");

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(createRegisterTable);

    await client.query("COMMIT");

    console.log("Fim da migração");
  } catch (e) {
    await client.query("ROLLBACK");

    console.log("Falha na migração");

    throw e;
  } finally {
    client.release();
  }
};

export default runDbMigrations;
