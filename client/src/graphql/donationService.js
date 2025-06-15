// src/graphql/donationService.js
const API_URL = import.meta.env.VITE_DONATION_SERVICE_GRAPHQL;

export async function fetchDonations() {
  const query = `
    query {
      donations {
        donation_id
        user_id
        amount
        description
        created_at
      }
    }
  `;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();
  return data.donations;
}

export async function createDonation(user_id, amount, description) {
  const mutation = `
    mutation {
      createDonation(user_id: ${user_id}, amount: ${amount}, description: "${description}") {
        message
        donation_id
      }
    }
  `;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  const { data } = await res.json();
  return data.createDonation;
}
