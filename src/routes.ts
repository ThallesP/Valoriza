import { Router } from "express";
import CreateUserController from "./database/controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

router.post("/users", createUserController.handle);

export default router;
