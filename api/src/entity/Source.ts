import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { IsUrl, Length } from "class-validator";

import ModelEntity from "../shared/ModelEntity";
import Project from "./Project";
import Media from "../types/Media";
import Notecard from "./Notecard";

registerEnumType(Media, {
  name: "Media",
});

@ObjectType()
class Comment {
  @Field()
  id: string;

  @Field()
  body: string;
}

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

  @Field(() => [Comment])
  @Column({ type: "jsonb", array: false, default: () => "'[]'" })
  comments: Array<{ id: string; body: string }>;

  @Field(() => Media)
  @Column({ type: "enum", enum: Media })
  mediaType: Media;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.sources, { onDelete: "CASCADE" })
  project: Project;

  @Field(() => [Notecard], { nullable: true })
  @OneToMany(() => Notecard, (notecard) => notecard.source, { onDelete: "SET NULL", nullable: true })
  notecards: Notecard[];
}
