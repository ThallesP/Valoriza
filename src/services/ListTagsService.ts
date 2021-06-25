import { getCustomRepository, Repository } from "typeorm";
import Tag from "../database/entities/Tag";
import TagsRepositories from "../database/repositories/TagsRepositories";

import { classToPlain } from "class-transformer";

export class ListTagsService {
  private tagsRepositories: Repository<Tag>;

  constructor() {
    this.tagsRepositories = getCustomRepository(TagsRepositories);
  }

  async execute() {
    const tags = await this.tagsRepositories.find();

    return classToPlain(tags);
  }
}
