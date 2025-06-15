// src/pages/Transaction/TransactionPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import {
  fetchTransactions,
  addTransaction,
} from "../../graphql/transactionService";
import Swal from "sweetalert2";

export default function TransactionPage() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [transactions, setTransactions] = useState([]);

  const user = getUser();

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      const userTx = data.filter((tx) => tx.sender_id === user.id);
      setTransactions(userTx);
    } catch (err) {
      Swal.fire("Error", "Gagal memuat transaksi", "error");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(
        user.id,
        parseInt(recipientId),
        parseInt(amount),
        note
      );
      Swal.fire("Sukses", "Transaksi berhasil", "success");
      setRecipientId("");
      setAmount("");
      setNote("");
      loadTransactions();
    } catch (err) {
      Swal.fire("Error", "Gagal melakukan transaksi", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Transaksi</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Recipient ID</label>
          <input
            type="number"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Kirim Transaksi
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Transaksi</h2>
      <div className="bg-white p-4 rounded shadow">
        {transactions.length === 0 ? (
          <p className="text-gray-500">Belum ada transaksi.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">To</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Note</th>
                <th className="p-2">Status</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="p-2">{tx.id}</td>
                  <td className="p-2">{tx.recipient_id}</td>
                  <td className="p-2">Rp {tx.amount}</td>
                  <td className="p-2">{tx.note}</td>
                  <td className="p-2">{tx.status}</td>
                  <td className="p-2">
                    {new Date(tx.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
