// src/graphql/tagihanService.js
const API_URL = import.meta.env.VITE_TAGIHAN_SERVICE_GRAPHQL;

export async function fetchTagihans() {
  const query = `
    query {
      tagihans {
        id
        user_id
        va_number
        amount
        description
        status
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
  return data.tagihans;
}

export async function createTagihanManual(user_id, amount, description) {
  const mutation = `
    mutation {
      createTagihanManual(user_id: ${user_id}, amount: ${amount}, description: "${description}") {
        id
        va_number
        status
      }
    }
  `;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  const { data } = await res.json();
  return data.createTagihanManual;
}
