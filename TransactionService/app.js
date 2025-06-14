const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
require("./db");

const app = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(
      `TransactionService GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
