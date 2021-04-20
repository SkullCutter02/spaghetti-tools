import { Column, Entity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import User from "./User";

@ObjectType()
@Entity("projects")
export default class Project extends ModelEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
