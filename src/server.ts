import "reflect-metadata";
import express from "express";
import "express-async-errors";

import "./database";
import router from "./routes";
import { ErrorHandling } from "./middlewares/ErrorHandling";

const app = express();

app.use(express.json());

app.use(router);

app.use(ErrorHandling);

app.listen(3333, () => {
  console.log("Server running on :3333");
});
