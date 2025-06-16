// src/pages/Valas/ValasPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import {
  fetchValasTransfers,
  addValasTransfer,
} from "../../graphql/valasService";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function ValasPage() {
  const user = getUser();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    account_number: "",
    recipient_bank: "",
    currency: "USD",
    amount_idr: "",
  });

  // Definisikan exchange rate untuk masing-masing mata uang
  const exchangeRates = {
    USD: 15500,
    SGD: 11700,
    JPY: 110,
  };

  // Exchange rate otomatis berdasarkan currency yang dipilih
  const currentExchangeRate = exchangeRates[form.currency] || 15500;

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
      exchange_rate: currentExchangeRate,
      amount_idr: parseInt(form.amount_idr),
    };

    try {
      const result = await addValasTransfer(payload);
      if (result.status === "success") {
        Swal.fire("Sukses", "Transfer valas berhasil", "success");
      } else {
        Swal.fire("Gagal", "Saldo tidak mencukupi", "error");
      }
      setForm({
        account_number: "",
        recipient_bank: "",
        currency: "USD",
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
        <div className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-700">
          Exchange Rate: {currentExchangeRate} IDR/{form.currency}
        </div>
        <input
          type="number"
          name="amount_idr"
          placeholder="Amount (IDR)"
          value={form.amount_idr}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        {form.amount_idr && (
          <div className="w-full border px-4 py-2 rounded bg-blue-50 text-blue-700">
            Jumlah dalam {form.currency}:{" "}
            {(form.amount_idr / currentExchangeRate).toFixed(2)} {form.currency}
          </div>
        )}
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
                    {dayjs(Number(v.created_at)).format("DD MMMM YYYY ")}
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
