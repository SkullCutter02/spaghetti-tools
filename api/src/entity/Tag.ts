import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import Notecard from "./Notecard";
import Project from "./Project";

@ObjectType()
@Entity("tags")
export default class Tag extends ModelEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [Notecard], { nullable: true })
  @OneToMany(() => Notecard, (notecard) => notecard.tag, { nullable: true, onDelete: "SET NULL" })
  notecards?: Notecard[];

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.tags, { onDelete: "CASCADE" })
  project: Project;
}
