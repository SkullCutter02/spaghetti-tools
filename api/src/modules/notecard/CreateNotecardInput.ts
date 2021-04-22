import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export default class CreateNotecardInput {
  @Field()
  @Length(1, 755)
  title: string;

  @Field()
  originalText: string;

  @Field()
  paraphrasedText: string;

  @Field({ nullable: true })
  sourceId: string;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ nullable: true })
  tagId?: string;
}
