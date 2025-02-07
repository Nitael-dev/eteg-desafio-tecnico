import pg from "pg";

const db = new pg.Pool({
  host: process.env.DB_HOST ?? process.env.DB_LOCAL_HOST,
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default db;
