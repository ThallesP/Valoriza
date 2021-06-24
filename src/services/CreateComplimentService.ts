import { response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { Compliment } from "../database/entities/Compliment";
import { User } from "../database/entities/User";
import { ComplimentsRepositories } from "../database/repositories/ComplimentsRepositories";
import UsersRepositories from "../database/repositories/UsersRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  private complimentsRepositories: Repository<Compliment>;
  private usersRepository: Repository<User>;

  constructor() {
    this.complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    if (user_sender == user_receiver)
      throw new ApplicationException("Incorrect User Receiver", 400);

    const userReceiverExists = await this.usersRepository.findOne(
      user_receiver
    );

    if (!userReceiverExists)
      throw new ApplicationException("User Receiver not found.", 404);

    const compliment = this.complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await this.complimentsRepositories.save(compliment);

    return compliment;
  }
}
