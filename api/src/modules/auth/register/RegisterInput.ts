import { Field, InputType } from "type-graphql";
import { IsEmail, Length, Matches } from "class-validator";

import passwordRegex from "../passwordRegex";

@InputType()
export default class RegisterInput {
  @Length(1, 255)
  @Field()
  username: string;

  @Length(1, 255)
  @IsEmail()
  @Field()
  email: string;

  @Matches(passwordRegex, { message: "Password must contain at least one number and one letter" })
  @Length(8, 255)
  @Field()
  password: string;
}
