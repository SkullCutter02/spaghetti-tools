import { Field, InputType } from "type-graphql";
import { IsEnum, IsUrl, Length } from "class-validator";

import Media from "../../types/Media";

@InputType()
export default class UpdateSourceInput {
  @Field({ nullable: true })
  @IsUrl()
  url?: string;

  @Field({ nullable: true })
  @Length(1, 755)
  citation?: string;

  @Field(() => Media, { nullable: true })
  @IsEnum(Media)
  mediaType: Media;
}
