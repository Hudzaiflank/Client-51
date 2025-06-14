const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const db = require("./db");
require("dotenv").config();

// GraphQL
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Middleware
app.use(express.json());

// RESTful route (optional, masih dipertahankan)
app.use("/api", userRoutes);

// Jalankan server Apollo dan Express
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`REST API running at http://localhost:${PORT}/api`);
    console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
