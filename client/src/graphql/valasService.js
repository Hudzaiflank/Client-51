// src/graphql/valasService.js
const API_URL = import.meta.env.VITE_VALAS_SERVICE_GRAPHQL;

export async function fetchValasTransfers() {
  const query = `
    query {
      valasTransfers {
        id
        user_id
        account_number
        recipient_bank
        currency
        exchange_rate
        amount_idr
        amount_valas
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
  return data.valasTransfers;
}

export async function addValasTransfer(payload) {
  const {
    user_id,
    account_number,
    recipient_bank,
    currency,
    exchange_rate,
    amount_idr,
  } = payload;

  const mutation = `
    mutation {
      addValasTransfer(
        user_id: ${user_id}
        account_number: "${account_number}"
        recipient_bank: "${recipient_bank}"
        currency: "${currency}"
        exchange_rate: ${exchange_rate}
        amount_idr: ${amount_idr}
      ) {
        id
        status
        amount_valas
      }
    }
  `;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });
  const { data } = await res.json();
  return data.addValasTransfer;
}
