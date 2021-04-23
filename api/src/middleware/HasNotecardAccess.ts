import { Service } from "typedi";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Context from "../types/Context";
import Notecard from "../entity/Notecard";

@Service()
export default class HasNotecardAccess implements MiddlewareInterface<Context> {
  @InjectRepository(Notecard)
  private readonly notecardRepository: Repository<Notecard>;

  async use({ context: { res }, args: { notecardId } }: ResolverData<Context>, next: NextFn) {
    const userId = res.locals.userId;

    const notecard = await this.notecardRepository.findOneOrFail(
      { id: notecardId },
      { relations: ["project", "project.user"] }
    );

    if (notecard.project.user.id === userId) return next();
    else throw new Error("Forbidden access");
  }
}
