import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import Notecard from "./Notecard";

@ObjectType()
@Entity("tags")
export default class Tag extends ModelEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [Notecard], { nullable: true })
  @OneToMany(() => Notecard, (notecard) => notecard.tag, { nullable: true, onDelete: "SET NULL" })
  notecards?: Notecard[];
}
