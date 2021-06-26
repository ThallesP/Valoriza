import { createConnection } from "typeorm";

if (process.env.DATABASE_URL) {
  process.env.TYPEORM_URL = process.env.DATABASE_URL;
} // Heroku

createConnection();
