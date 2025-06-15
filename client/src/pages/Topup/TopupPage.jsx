// src/pages/Topup/TopupPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import { fetchTopups, createTopup } from "../../graphql/topupService";
import Swal from "sweetalert2";

export default function TopupPage() {
  const [topups, setTopups] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("OVO");

  const user = getUser();

  const loadTopups = async () => {
    try {
      const data = await fetchTopups();
      const userTopups = data.filter((t) => t.user_id === user.id);
      setTopups(userTopups);
    } catch (err) {
      Swal.fire("Error", "Gagal memuat topup", "error");
    }
  };

  useEffect(() => {
    loadTopups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createTopup(
        user.id,
        parseInt(amount),
        paymentMethod
      );
      Swal.fire("Sukses", "Topup berhasil", "success");
      setAmount("");
      setPaymentMethod("OVO");
      loadTopups();
    } catch (err) {
      Swal.fire("Error", "Gagal melakukan topup", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Topup</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Jumlah Topup</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Metode Pembayaran</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="OVO">OVO</option>
            <option value="GOPAY">GOPAY</option>
            <option value="DANA">DANA</option>
            <option value="ShopeePay">ShopeePay</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Topup</h2>
      <div className="bg-white p-4 rounded shadow">
        {topups.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat topup.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Metode</th>
                <th className="p-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {topups.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">Rp {t.amount}</td>
                  <td className="p-2">{t.payment_method}</td>
                  <td className="p-2">
                    {new Date(t.created_at).toLocaleString()}
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
