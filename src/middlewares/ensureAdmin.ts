import type { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../database/repositories/UsersRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user_id = request.user.id;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id);

  if (admin) return next();

  return response.status(403).json({
    message: "You're not authorized to create a Tag.",
  });
}
