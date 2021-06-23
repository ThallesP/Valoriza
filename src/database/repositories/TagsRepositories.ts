import { EntityRepository, Repository } from "typeorm";
import Tag from "../entities/Tag";

@EntityRepository(Tag)
export default class TagsRepositories extends Repository<Tag> {}
