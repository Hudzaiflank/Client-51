const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json());

// OPTIONAL: tetap aktifkan REST route kalau masih diperlukan
const routes = require("./routes/tagihanRoutes");
app.use("/api", routes);

// Import schema & resolvers
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    console.log(
      `✅ TagihanService GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🌐 REST API (optional) ready at http://localhost:${PORT}/api/tagihans`
    );
  });
}

startServer();
