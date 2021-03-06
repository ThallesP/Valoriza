import type { Request, Response, NextFunction } from "express";
import { ApplicationException } from "../exceptions/ApplicationException";

export function ErrorHandling(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof ApplicationException)
    return response.status(err.statusCode).json({ message: err.message });

  console.log(err);
  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
}
