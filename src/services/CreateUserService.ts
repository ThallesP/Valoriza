import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import UsersRepositories from "../database/repositories/UsersRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}
export default class CreateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ name, email, admin }: IUserRequest) {
    if (!email) throw new ApplicationException("Email is not provided.", 400);

    const userAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (userAlreadyExists)
      throw new ApplicationException("User already exists.", 400);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
