import { Service } from "typedi";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import Context from "../types/Context";
import Tag from "../entity/Tag";

@Service()
export default class HasTagAccess implements MiddlewareInterface<Context> {
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async use({ context: { res }, args: { tagId } }: ResolverData<Context>, next: NextFn) {
    const userId = res.locals.userId;

    const tag = await this.tagRepository.findOneOrFail(
      { id: tagId },
      { relations: ["project", "project.user"] }
    );

    if (tag.project.user.id === userId) return next();
    else throw new Error("Forbidden Access");
  }
}
