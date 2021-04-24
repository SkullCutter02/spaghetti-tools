import { Field, InputType } from "type-graphql";
import { IsUUID, Length } from "class-validator";

@InputType()
export default class UpdateNotecardInput {
  @Field({ nullable: true })
  @Length(1, 755)
  title?: string;

  @Field({ nullable: true })
  originalText?: string;

  @Field({ nullable: true })
  paraphrasedText?: string;

  @Field({ nullable: true })
  @IsUUID()
  sourceId?: string;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ nullable: true })
  @IsUUID()
  tagId?: string;
}
