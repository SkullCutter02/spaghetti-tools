import { buildSchema } from "type-graphql";
import { Container } from "typedi";

const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../modules/**/*.resolver.ts"],
    container: Container,
  });
};

export default createSchema;
