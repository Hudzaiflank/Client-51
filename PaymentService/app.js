const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
require("./db");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(express.json());

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3006;
  app.listen(PORT, () => {
    console.log(
      `✅ PaymentService GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
