import { Arg, Info, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import HasProjectAccess from "../../middleware/HasProjectAccess";
import TagService from "./TagService";
import Tag from "../../entity/Tag";

@Service()
@Resolver()
export default class TagResolver {
  @Inject(() => TagService)
  private readonly tagService: TagService;

  @Query(() => [Tag])
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async tags(@Arg("projectId") projectId: string, @Info() info: GraphQLResolveInfo) {
    return this.tagService.findAll(projectId, info);
  }

  @Mutation(() => Tag)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async createTag(@Arg("projectId") projectId: string, @Arg("name") name: string) {
    return this.tagService.create(projectId, name);
  }
}
