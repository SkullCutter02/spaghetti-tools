import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import ModelEntity from "../shared/ModelEntity";
import Project from "./Project";
import { IsEmail } from "class-validator";

@ObjectType()
@Entity("users")
export default class User extends ModelEntity {
  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  hash: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Field(() => [Project])
  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
