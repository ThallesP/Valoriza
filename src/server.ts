import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import "./database";
import router from "./routes";
import { ErrorHandling } from "./middlewares/ErrorHandling";

dotenv.config();
const app = express();

app.use(express.json());

app.use(router);

app.use(ErrorHandling);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is now running");
});
