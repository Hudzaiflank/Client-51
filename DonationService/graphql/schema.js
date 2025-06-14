const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Donation {
    donation_id: Int
    user_id: Int
    amount: Int
    description: String
    created_at: String
  }

  type Query {
    donations: [Donation]
    donation(id: Int!): Donation
  }

  type Mutation {
    createDonation(
      user_id: Int!
      amount: Int!
      description: String!
    ): DonationResponse
    updateDonation(id: Int!, description: String!): Donation
    deleteDonation(id: Int!): Boolean
  }

  type DonationResponse {
    message: String
    donation_id: Int
  }
`;

module.exports = typeDefs;
