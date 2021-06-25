import type { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { SendComplimentEmailByUserService } from "../services/SendComplimentEmailByUserService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const user_id = request.user.id;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    const sendComplimentEmailByUserService =
      new SendComplimentEmailByUserService();
    sendComplimentEmailByUserService.execute(compliment);

    return response.json(compliment);
  }
}
