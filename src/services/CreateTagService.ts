import { getCustomRepository, Repository } from "typeorm";
import Tag from "../database/entities/Tag";
import TagsRepositories from "../database/repositories/TagsRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface ITag {
  name: string;
}

export default class CreateTagService {
  private tagsRepositories: Repository<Tag>;

  constructor() {
    this.tagsRepositories = getCustomRepository(TagsRepositories);
  }

  async execute({ name }: ITag) {
    if (!name) throw new ApplicationException("Name is not provided.", 400);

    const tagAlreadyExists = await this.tagsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists)
      throw new ApplicationException("Tag already exists.", 400);

    const tag = this.tagsRepositories.create({
      name,
    });

    await this.tagsRepositories.save(tag);

    return tag;
  }
}
