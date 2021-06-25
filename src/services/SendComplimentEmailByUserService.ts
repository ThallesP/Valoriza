import { getCustomRepository, Repository } from "typeorm";
import { User } from "../database/entities/User";
import UsersRepositories from "../database/repositories/UsersRepositories";
import nodemailer, { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import TagsRepositories from "../database/repositories/TagsRepositories";
import Tag from "../database/entities/Tag";
import { classToPlain } from "class-transformer";

interface IComplimentEmail {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class SendComplimentEmailByUserService {
  private usersRepository: Repository<User>;
  private tagsRepositories: Repository<Tag>;
  private emailTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
    this.tagsRepositories = getCustomRepository(TagsRepositories);
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async execute({
    user_sender,
    user_receiver,
    message,
    tag_id,
  }: IComplimentEmail) {
    const userReceiver = await this.usersRepository.findOne(user_receiver);

    const userSender = await this.usersRepository.findOne(user_sender);

    const tag = await this.tagsRepositories.findOne(tag_id);
    const plainTag = classToPlain(tag);

    const emailInformation = await this.emailTransporter.sendMail({
      to: userReceiver.email,
      subject: "Você recebeu um novo elogio!",
      text:
      `
      O usuário ${userSender.name} lhe mandou um novo elogio!
      Tag: ${plainTag.name_custom}
      Mensagem: ${message}
      `,
    });

    return emailInformation;
  }
}
