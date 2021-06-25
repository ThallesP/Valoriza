import { getCustomRepository, Repository } from "typeorm";
import { Compliment } from "../database/entities/Compliment";
import { ComplimentsRepositories } from "../database/repositories/ComplimentsRepositories";

export class ListUserSendComplimentsService {
  private complimentsRepositories: Repository<Compliment>;

  constructor() {
    this.complimentsRepositories = getCustomRepository(ComplimentsRepositories);
  }

  async execute(user_id: string) {
    const compliments = await this.complimentsRepositories.find({
      where: { user_sender: user_id },
      relations: ["userSender", "userReceiver", "tag"],
    });

    return compliments;
  }
}
