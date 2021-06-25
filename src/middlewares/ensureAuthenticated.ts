import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken)
    return response.status(401).json({
      message: "You're not logged in.",
    });

  const [, token] = authToken.split(" ");

  if (!token)
    return response.status(401).json({
      message: "You're not logged in.",
    });

  try {
    const { sub } = verify(token, process.env.APP_KEY) as IPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    return response.status(401).json({ message: "You're not logged in." });
  }
}
