import { Field, InputType } from "type-graphql";
import { IsUUID, Length } from "class-validator";

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
  @IsUUID()
  sourceId?: string;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ nullable: true })
  @IsUUID()
  tagId?: string;
}
