import { Mutation, Resolver } from "type-graphql";

@Resolver()
export default class NotecardResolver {
  @Mutation()
  async createTag() {}
}
