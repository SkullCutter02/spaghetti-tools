import { Arg, Info, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { Inject, Service } from "typedi";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import HasProjectAccess from "../../middleware/HasProjectAccess";
import CreateNotecardInput from "./CreateNotecardInput";
import NotecardService from "./NotecardService";
import Notecard from "../../entity/Notecard";

@Service()
@Resolver()
export default class NotecardResolver {
  @Inject(() => NotecardService)
  private readonly notecardService: NotecardService;

  @Query(() => [Notecard])
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async notecards(@Arg("projectId") projectId: string, @Info() info: GraphQLResolveInfo) {
    return this.notecardService.findAll(projectId, info);
  }

  @Mutation(() => Notecard)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async createNotecard(@Arg("projectId") projectId: string, @Arg("input") input: CreateNotecardInput) {
    return this.notecardService.create(projectId, input);
  }
}
