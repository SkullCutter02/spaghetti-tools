import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import User from "./User";
import Source from "./Source";
import Notecard from "./Notecard";

@ObjectType()
@Entity("projects")
export default class Project extends ModelEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @Field(() => [Source])
  @OneToMany(() => Source, (source) => source.project, { onDelete: "CASCADE" })
  sources: Source[];

  @Field(() => [Notecard])
  @OneToMany(() => Notecard, (notecard) => notecard.project, { onDelete: "CASCADE" })
  notecards: Notecard[];
}
