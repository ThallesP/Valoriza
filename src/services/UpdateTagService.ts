import { classToPlain } from "class-transformer";
import { getCustomRepository, Repository } from "typeorm";
import Tag from "../database/entities/Tag";
import TagsRepositories from "../database/repositories/TagsRepositories";
import { ApplicationException } from "../exceptions/ApplicationException";

interface ITag {
  id: string;
  name: string;
}

export class UpdateTagService {
  private tagsRepositories: Repository<Tag>;

  constructor() {
    this.tagsRepositories = getCustomRepository(TagsRepositories);
  }

  async execute({ id, name }: ITag) {
    if (!name) throw new ApplicationException("Name is not provided.", 400);

    const tag = await this.tagsRepositories.findOne(id);

    if (!tag) throw new ApplicationException("Tag not found.", 404);

    tag.name = name;

    await this.tagsRepositories.save(tag);

    return classToPlain(tag);
  }
}
