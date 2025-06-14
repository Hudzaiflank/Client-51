const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Payment {
    id: Int
    user_id: Int
    va_number: String
    amount: Float
    description: String
    status: String
    created_at: String
  }

  type Query {
    payments: [Payment]
    payment(id: Int!): Payment
  }

  type Mutation {
    createPayment(user_id: Int!, va_number: String!): PaymentResult
    updatePayment(id: Int!, description: String!): Payment
    deletePayment(id: Int!): Boolean
  }

  type PaymentResult {
    result: String
    status: String
  }
`;

module.exports = typeDefs;
