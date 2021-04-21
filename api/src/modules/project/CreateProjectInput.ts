import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export default class CreateProjectInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(0, 3000)
  description: string;
}
