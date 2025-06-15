const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const topupRoutes = require("./routes/topupRoutes");
require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API routes
app.use("/api", topupRoutes);

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(
      `TopupService REST API running at http://localhost:${PORT}/api`
    );
    console.log(
      `TopupService GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
