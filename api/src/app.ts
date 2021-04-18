import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import createSchema from "./utils/createSchema";

const PORT = 4000;

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().then();
