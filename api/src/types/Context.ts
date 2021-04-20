import { Request, Response } from "express";
import { RelationMapper } from "typeorm-graphql-joiner";

export default interface Context {
  req: Request;
  res: Response & {
    locals: {
      userId: string;
    };
  };
  relationMapper: RelationMapper;
}
