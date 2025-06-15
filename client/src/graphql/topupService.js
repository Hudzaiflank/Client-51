// src/graphql/topupService.js
const API_URL = import.meta.env.VITE_TOPUP_SERVICE_GRAPHQL;

export async function fetchTopups() {
  const query = `
    query {
      topups {
        id
        user_id
        amount
        payment_method
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
  return data.topups;
}

export async function createTopup(user_id, amount, payment_method) {
  const mutation = `
    mutation {
      addTopup(user_id: ${user_id}, amount: ${amount}, payment_method: "${payment_method}") {
        id
        user_id
        amount
        payment_method
        created_at
      }
    }
  `;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  const { data } = await res.json();
  return data.addTopup;
}
