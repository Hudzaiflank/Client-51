const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ValasTransfer {
    id: Int
    user_id: Int
    account_number: String
    recipient_bank: String
    currency: String
    exchange_rate: Float
    amount_idr: Float
    amount_valas: Float
    status: String
    created_at: String
  }

  type Query {
    valasTransfers: [ValasTransfer]
    valasTransfer(id: Int!): ValasTransfer
  }

  type Mutation {
    addValasTransfer(
      user_id: Int!
      account_number: String!
      recipient_bank: String!
      currency: String!
      exchange_rate: Float!
      amount_idr: Float!
    ): ValasTransfer

    updateValasRecipientBank(id: Int!, recipient_bank: String!): ValasTransfer

    deleteValasTransfer(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
