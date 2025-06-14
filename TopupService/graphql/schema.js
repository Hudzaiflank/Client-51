const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Topup {
    id: Int!
    user_id: Int!
    amount: Float!
    payment_method: String!
    status: String!
    created_at: String
  }

  type Query {
    topups: [Topup]
    topup(id: Int!): Topup
  }

  type Mutation {
    addTopup(
      user_id: Int!
      amount: Float!
      payment_method: String!
      status: String
    ): Topup

    updateTopup(
      id: Int!
      user_id: Int!
      amount: Float!
      payment_method: String!
      status: String!
    ): Topup

    deleteTopup(id: Int!): String
  }
`;

module.exports = typeDefs;
