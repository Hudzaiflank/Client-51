const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

app.use(express.json());

// Jalankan server GraphQL
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`✅ REST (optional) at http://localhost:${PORT}/api`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
