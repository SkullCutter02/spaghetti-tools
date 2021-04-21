import { Arg, Info, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Inject, Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import HasProjectAccess from "../../middleware/HasProjectAccess";
import Source from "../../entity/Source";
import CreateSourceInput from "./CreateSourceInput";
import SourceService from "./SourceService";
import HasSourceAccess from "../../middleware/HasSourceAccess";
import UpdateSourceInput from "./UpdateSourceInput";

@Service()
@Resolver()
export default class SourceResolver {
  @Inject(() => SourceService)
  private readonly sourceService: SourceService;

  @Query(() => Source)
  @UseMiddleware(AuthMiddleware, HasSourceAccess)
  async source(@Arg("sourceId") sourceId: string, @Info() info: GraphQLResolveInfo) {
    return this.sourceService.find(sourceId, info);
  }

  @Query(() => [Source])
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async sources(@Arg("projectId") projectId: string, @Info() info: GraphQLResolveInfo) {
    return this.sourceService.findAll(projectId, info);
  }

  @Mutation(() => Source)
  @UseMiddleware(AuthMiddleware, HasProjectAccess)
  async createSource(@Arg("projectId") projectId: string, @Arg("input") input: CreateSourceInput) {
    return this.sourceService.create(projectId, input);
  }

  @Mutation(() => Source)
  @UseMiddleware(AuthMiddleware, HasSourceAccess)
  async updateSource(@Arg("sourceId") sourceId: string, @Arg("input") input: UpdateSourceInput) {
    return this.sourceService.update(sourceId, input);
  }

  @Mutation(() => Source)
  @UseMiddleware(AuthMiddleware, HasSourceAccess)
  async addComment(@Arg("sourceId") sourceId: string, @Arg("comment") comment: string) {
    return this.sourceService.addComment(sourceId, comment);
  }

  @Mutation(() => Source)
  @UseMiddleware(AuthMiddleware, HasSourceAccess)
  async editComment(
    @Arg("sourceId") sourceId: string,
    @Arg("commentId") commentId: string,
    @Arg("updatedComment") updatedComment: string
  ) {
    return this.sourceService.editComment(sourceId, commentId, updatedComment);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AuthMiddleware, HasSourceAccess)
  async deleteComment(@Arg("sourceId") sourceId: string, @Arg("commentId") commentId: string) {
    return this.sourceService.deleteComment(sourceId, commentId);
  }
}
