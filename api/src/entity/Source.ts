import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { IsUrl, Length } from "class-validator";

import ModelEntity from "../shared/ModelEntity";
import Project from "./Project";
import Media from "../types/Media";

registerEnumType(Media, {
  name: "Media",
});

@ObjectType()
@Entity("sources")
export default class Source extends ModelEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsUrl()
  url?: string;

  @Field()
  @Column()
  @Length(1, 765)
  citation: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  comments: string[];

  @Field(() => Media)
  @Column({ type: "enum", enum: Media })
  mediaType: Media;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.sources)
  project: Project;
}
