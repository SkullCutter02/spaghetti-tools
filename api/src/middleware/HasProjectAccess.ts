import { Service } from "typedi";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import Context from "../types/Context";
import Project from "../entity/Project";

@Service()
export default class HasProjectAccess implements MiddlewareInterface<Context> {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  async use({ context: { res }, args: { id: projectId } }: ResolverData<Context>, next: NextFn) {
    const userId = res.locals.userId;

    const project = await this.projectRepository.findOneOrFail({ id: projectId }, { relations: ["user"] });

    if (project.user.id === userId) return next();
    else throw new Error("Forbidden access");
  }
}
