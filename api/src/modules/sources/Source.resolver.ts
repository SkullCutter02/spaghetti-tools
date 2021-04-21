import { Arg, Info, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import HasProjectAccess from "../../middleware/HasProjectAccess";
import Source from "../../entity/Source";
import CreateSourceInput from "./CreateSourceInput";
import SourceService from "./SourceService";

@Service()
@Resolver()
export default class SourceResolver {
  @Inject(() => SourceService)
  private readonly sourceService: SourceService;

  @Query(() => [Source])
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async sources(@Arg("id") projectId: string, @Info() info: GraphQLResolveInfo) {
    return this.sourceService.findAll(projectId, info);
  }

  @Mutation(() => Source)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async createSource(@Arg("id") projectId: string, @Arg("input") input: CreateSourceInput) {
    return this.sourceService.create(projectId, input);
  }
}
