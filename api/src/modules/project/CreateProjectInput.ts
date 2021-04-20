import { Field, InputType } from "type-graphql";
import { Length, Matches } from "class-validator";

import COMMON_TEXT_REGEX from "../../constants/commonTextRegex";

@InputType()
export default class CreateProjectInput {
  @Field()
  @Matches(COMMON_TEXT_REGEX)
  @Length(1, 255)
  name: string;
}
