import { Field, InputType } from "type-graphql";
import { Matches } from "class-validator";

import PASSWORD_REGEX from "../passwordRegex";

@InputType()
export default class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @Matches(PASSWORD_REGEX)
  password: string;
}
