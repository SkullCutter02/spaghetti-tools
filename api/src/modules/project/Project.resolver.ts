import { Arg, Ctx, Info, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import Context from "../../types/Context";
import ProjectService from "./ProjectService";
import CreateProjectInput from "./CreateProjectInput";
import Project from "../../entity/Project";
import HasProjectAccess from "../../middleware/HasProjectAccess";

@Service()
@Resolver(Project)
export default class ProjectResolver {
  @Inject(() => ProjectService)
  private readonly projectService: ProjectService;

  @Query(() => Project)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async project(@Arg("projectId") projectId: string, @Info() info: GraphQLResolveInfo) {
    return this.projectService.find(projectId, info);
  }

  @Query(() => [Project])
  @UseMiddleware(AuthMiddleware)
  async projects(@Ctx() { res }: Context, @Info() info: GraphQLResolveInfo) {
    return this.projectService.findAll(res.locals.userId, info);
  }

  @Mutation(() => Project)
  @UseMiddleware(AuthMiddleware)
  async createProject(@Ctx() { res }: Context, @Arg("input") { name, description }: CreateProjectInput) {
    return this.projectService.create(res.locals.userId, name, description);
  }

  @Mutation(() => Project)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async updateProject(
    @Arg("projectId") projectId: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("description", { nullable: true }) description: string
  ) {
    return this.projectService.update(projectId, name, description);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async deleteProject(@Arg("projectId") projectId: string) {
    return this.projectService.delete(projectId);
  }
}
