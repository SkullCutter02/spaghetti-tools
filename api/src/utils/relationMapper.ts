import { RelationMapper } from "typeorm-graphql-joiner";
import { getConnection } from "typeorm";

const relationMapper = new RelationMapper(getConnection());

export default relationMapper;
