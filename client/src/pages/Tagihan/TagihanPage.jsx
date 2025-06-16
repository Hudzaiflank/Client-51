// src/pages/Tagihan/TagihanPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import {
  fetchTagihans,
  createTagihanManual,
} from "../../graphql/tagihanService";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function TagihanPage() {
  const user = getUser();
  const [tagihans, setTagihans] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const loadData = async () => {
    try {
      const all = await fetchTagihans();
      const userTagihan = all.filter((t) => t.user_id === user.id);
      setTagihans(userTagihan);
    } catch {
      Swal.fire("Error", "Gagal memuat tagihan", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTagihanManual(user.id, parseInt(amount), description);
      Swal.fire("Sukses", "Tagihan berhasil dibuat", "success");
      setAmount("");
      setDescription("");
      loadData();
    } catch {
      Swal.fire("Error", "Gagal membuat tagihan", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Tagihan Saya</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Jumlah Tagihan</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Deskripsi</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Buat Tagihan
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Tagihan</h2>
      <div className="bg-white p-4 rounded shadow text-sm">
        {tagihans.length === 0 ? (
          <p className="text-gray-500">Belum ada tagihan.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">VA</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Status</th>
                <th className="p-2">Deskripsi</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {tagihans.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.va_number}</td>
                  <td className="p-2">Rp {t.amount}</td>
                  <td className="p-2">{t.status}</td>
                  <td className="p-2">{t.description}</td>
                  <td className="p-2">
                    {dayjs(Number(t.created_at)).format("DD MMMM YYYY ")}
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
