import { hash } from "bcryptjs";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import UsersRepositories from "../database/repositories/UsersRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
export default class CreateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ name, email, admin = false, password }: IUserRequest) {
    if (!email) throw new ApplicationException("Email is not provided.", 400);

    const userAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (userAlreadyExists)
      throw new ApplicationException("User already exists.", 400);

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
