import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import Source from "./Source";
import Project from "./Project";
import Tag from "./Tag";

@ObjectType()
@Entity("notecards")
export default class Notecard extends ModelEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  originalText: string;

  @Field()
  @Column()
  paraphrasedText: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  remarks?: string;

  @Field(() => Source, { nullable: true })
  @ManyToOne(() => Source, (source) => source.notecards, { onDelete: "SET NULL", nullable: true })
  source?: Source;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.notecards, { onDelete: "CASCADE" })
  project: Project;

  @Field(() => Tag, { nullable: true })
  @ManyToOne(() => Tag, (tag) => tag.notecards, { nullable: true, onDelete: "SET NULL" })
  tag?: Tag;
}
