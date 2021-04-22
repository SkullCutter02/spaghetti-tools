import { Field, InputType } from "type-graphql";
import { IsEnum, IsUrl, Length } from "class-validator";

import Media from "../../types/Media";

@InputType()
export default class CreateSourceInput {
  @Field({ nullable: true })
  @IsUrl()
  url?: string;

  @Field()
  @Length(1, 765)
  citation: string;

  @Field(() => Media)
  @IsEnum(Media)
  mediaType: Media;
}
