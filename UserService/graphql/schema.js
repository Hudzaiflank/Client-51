const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    account_number: String!
    balance: Float!
    created_at: String
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    addUser(
      name: String!
      email: String!
      password: String!
      balance: Float!
    ): User

    updateUser(
      id: Int!
      name: String!
      email: String!
      password: String!
      account_number: String!
      balance: Float!
    ): User

    deleteUser(id: Int!): String
  }
`;

module.exports = typeDefs;
