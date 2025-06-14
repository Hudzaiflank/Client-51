const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
    account_number: String
    balance: Float
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    updateUser(id: Int!, name: String, email: String, password: String): User
    deleteUser(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
