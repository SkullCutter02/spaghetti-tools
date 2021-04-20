import { Field, InputType } from "type-graphql";
import { Matches } from "class-validator";

import passwordRegex from "../passwordRegex";

@InputType()
export default class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @Matches(passwordRegex)
  password: string;
}
