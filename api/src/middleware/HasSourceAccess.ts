import { Service } from "typedi";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Context from "../types/Context";
import Source from "../entity/Source";

@Service()
export default class HasSourceAccess implements MiddlewareInterface<Context> {
  @InjectRepository(Source)
  private readonly sourceRepository: Repository<Source>;

  async use({ context: { res }, args: { sourceId } }: ResolverData<Context>, next: NextFn) {
    const userId = res.locals.userId;

    const source = await this.sourceRepository.findOneOrFail(
      { id: sourceId },
      { relations: ["project", "project.user"] }
    );

    if (source.project.user.id === userId) return next();
    else throw new Error("Forbidden access");
  }
}
