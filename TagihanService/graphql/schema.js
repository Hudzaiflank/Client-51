const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Tagihan {
    id: Int
    user_id: Int
    va_number: String
    amount: Float
    description: String
    status: String
    created_at: String
  }

  type Query {
    tagihans: [Tagihan]
    tagihan(id: Int!): Tagihan
  }

  type Mutation {
    createTagihanManual(
      user_id: Int!
      amount: Float!
      description: String!
    ): Tagihan
    createTagihanRecurring(amount: Float!, description: String!): String
    updateTagihan(id: Int!, amount: Float, description: String): Tagihan
    deleteTagihan(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
