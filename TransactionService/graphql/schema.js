const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Transaction {
    id: Int
    sender_id: Int
    recipient_id: Int
    amount: Float
    note: String
    status: String
    created_at: String
  }

  type Query {
    transactions: [Transaction]
    transaction(id: Int!): Transaction
  }

  type Mutation {
    addTransaction(
      sender_account: String!
      recipient_account: String!
      amount: Float!
      note: String
    ): Transaction
    updateTransaction(id: Int!, note: String): Transaction
    deleteTransaction(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
