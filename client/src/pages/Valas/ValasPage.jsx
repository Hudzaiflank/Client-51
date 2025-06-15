// src/pages/Valas/ValasPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import {
  fetchValasTransfers,
  addValasTransfer,
} from "../../graphql/valasService";
import Swal from "sweetalert2";

export default function ValasPage() {
  const user = getUser();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    account_number: "",
    recipient_bank: "",
    currency: "USD",
    exchange_rate: "",
    amount_idr: "",
  });

  const loadData = async () => {
    try {
      const result = await fetchValasTransfers();
      const filtered = result.filter((tx) => tx.user_id === user.id);
      setData(filtered);
    } catch {
      Swal.fire("Error", "Gagal memuat data valas", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      user_id: user.id,
      exchange_rate: parseFloat(form.exchange_rate),
      amount_idr: parseInt(form.amount_idr),
    };

    try {
      await addValasTransfer(payload);
      Swal.fire("Sukses", "Transfer valas berhasil", "success");
      setForm({
        account_number: "",
        recipient_bank: "",
        currency: "USD",
        exchange_rate: "",
        amount_idr: "",
      });
      loadData();
    } catch {
      Swal.fire("Error", "Gagal transfer valas", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Transfer Valas</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <input
          type="text"
          name="account_number"
          placeholder="Account Number"
          value={form.account_number}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="recipient_bank"
          placeholder="Recipient Bank"
          value={form.recipient_bank}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="USD">USD</option>
          <option value="SGD">SGD</option>
          <option value="JPY">JPY</option>
        </select>
        <input
          type="number"
          name="exchange_rate"
          placeholder="Exchange Rate"
          value={form.exchange_rate}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="amount_idr"
          placeholder="Amount (IDR)"
          value={form.amount_idr}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Transfer Valas</h2>
      <div className="bg-white p-4 rounded shadow text-sm">
        {data.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat transfer.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Bank</th>
                <th className="p-2">Valas</th>
                <th className="p-2">IDR</th>
                <th className="p-2">Status</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="p-2">{v.id}</td>
                  <td className="p-2">{v.recipient_bank}</td>
                  <td className="p-2">
                    {v.amount_valas} {v.currency}
                  </td>
                  <td className="p-2">Rp {v.amount_idr}</td>
                  <td className="p-2">{v.status}</td>
                  <td className="p-2">
                    {new Date(v.created_at).toLocaleString()}
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
