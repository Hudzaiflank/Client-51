// src/graphql/paymentService.js
const API_URL = import.meta.env.VITE_PAYMENT_SERVICE_GRAPHQL;

export async function fetchPayments() {
  const query = `
    query {
      payments {
        id
        user_id
        va_number
        amount
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
  return data.payments;
}

export async function createPayment(user_id, va_number) {
  const mutation = `
    mutation {
      createPayment(user_id: ${user_id}, va_number: "${va_number}") {
        result
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
  return data.createPayment;
}
