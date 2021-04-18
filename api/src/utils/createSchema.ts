import { buildSchema } from "type-graphql";

const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../modules/**/resolvers/*.ts"],
  });
};

export default createSchema;
