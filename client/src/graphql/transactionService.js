// src/graphql/transactionService.js
const API_URL = import.meta.env.VITE_TRANSACTION_SERVICE_GRAPHQL;

export async function fetchTransactions() {
  const query = `
    query {
      transactions {
        id
        sender_id
        recipient_id
        amount
        note
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
  return data.transactions;
}

export async function addTransaction(sender_id, recipient_id, amount, note) {
  const mutation = `
    mutation {
      addTransaction(sender_id: ${sender_id}, recipient_id: ${recipient_id}, amount: ${amount}, note: "${note}") {
        id
        status
        note
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
  return data.addTransaction;
}
