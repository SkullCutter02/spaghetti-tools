import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import Context from "../../types/Context";
import ProjectService from "./ProjectService";
import CreateProjectInput from "./CreateProjectInput";
import Project from "../../entity/Project";

@Service()
@Resolver(Project)
export default class ProjectResolver {
  @Inject(() => ProjectService)
  private readonly projectService: ProjectService;

  @Mutation(() => Project)
  @UseMiddleware(AuthMiddleware)
  async createProject(@Ctx() { res }: Context, @Arg("input") { name }: CreateProjectInput) {
    return this.projectService.create(res.locals.userId, name);
  }
}
