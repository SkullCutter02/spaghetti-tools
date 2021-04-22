import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import HasProjectAccess from "../../middleware/HasProjectAccess";
import TagService from "./TagService";
import Tag from "../../entity/Tag";

@Service()
@Resolver()
export default class TagResolver {
  @Inject(() => TagService)
  private readonly tagService: TagService;

  @Mutation(() => Tag)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async createTag(@Arg("projectId") projectId: string, @Arg("name") name: string) {
    return this.tagService.create(projectId, name);
  }
}
