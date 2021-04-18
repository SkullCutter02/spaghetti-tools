import { Column, Entity } from "typeorm";

import ModelEntity from "../../shared/ModelEntity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("users")
export default class User extends ModelEntity {
  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  hash: string;
}
