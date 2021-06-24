import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import UsersRepositories from "../database/repositories/UsersRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
export class AuthenticateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ email, password }: IAuthenticateRequest) {
    const user = await this.usersRepository.findOne({
      email,
    });

    if (!user) throw new ApplicationException("Email/Password incorrect.", 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new ApplicationException("Email/Password incorrect.", 401);

    const token = sign(
      {
        email: user.email,
      },
      process.env.APP_KEY,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
