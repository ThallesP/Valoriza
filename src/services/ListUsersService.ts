import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import UsersRepositories from "../database/repositories/UsersRepositories";

import { classToPlain } from "class-transformer";

export class ListUsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute() {
    const users = this.usersRepository.find();

    return classToPlain(users);
  }
}
