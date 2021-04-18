import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { Inject, Service } from "typedi";

import RegisterInput from "../RegisterInput";
import User from "../../entities/User";
import RegisterService from "../RegisterService";
import Context from "../../../../types/Context";
import JwtService from "../../JwtService";

@Service()
@Resolver(User)
export default class RegisterResolver {
  @Inject(() => RegisterService)
  registerService: RegisterService;

  @Inject(() => JwtService)
  jwtService: JwtService;

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput, @Ctx() { res }: Context): Promise<User> {
    const user = await this.registerService.register(input);
    res.cookie("token", this.jwtService.signToken(user.id));
    return user;
  }
}
