// src/pages/Payment/PaymentPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import { fetchPayments, createPayment } from "../../graphql/paymentService";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function PaymentPage() {
  const user = getUser();
  const [vaNumber, setVaNumber] = useState("");
  const [payments, setPayments] = useState([]);

  const loadData = async () => {
    try {
      const all = await fetchPayments();
      const filtered = all.filter((p) => p.user_id === user.id);
      setPayments(filtered);
    } catch {
      Swal.fire("Error", "Gagal memuat data pembayaran", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPayment(user.id, vaNumber);
      if (result.status === "success") {
        Swal.fire("Sukses", result.result, "success");
      } else {
        Swal.fire("Gagal", result.result, "error");
      }
      setVaNumber("");
      loadData();
    } catch {
      Swal.fire("Error", "Terjadi kesalahan saat membayar", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Nomor VA</label>
          <input
            type="text"
            value={vaNumber}
            onChange={(e) => setVaNumber(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Masukkan nomor virtual account"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Bayar
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Pembayaran</h2>
      <div className="bg-white p-4 rounded shadow text-sm">
        {payments.length === 0 ? (
          <p className="text-gray-500">Belum ada pembayaran.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">VA</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Status</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.va_number}</td>
                  <td className="p-2">Rp {p.amount}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2">
                    {dayjs(Number(p.created_at)).format("DD MMMM YYYY ")}
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
