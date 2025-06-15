// src/pages/Donation/DonationPage.jsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { getUser } from "../../utils/auth";
import { fetchDonations, createDonation } from "../../graphql/donationService";
import Swal from "sweetalert2";

export default function DonationPage() {
  const user = getUser();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [donations, setDonations] = useState([]);

  const loadDonations = async () => {
    try {
      const all = await fetchDonations();
      const filtered = all.filter((d) => d.user_id === user.id);
      setDonations(filtered);
    } catch {
      Swal.fire("Error", "Gagal memuat donasi", "error");
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonation(user.id, parseInt(amount), description);
      Swal.fire("Sukses", "Donasi berhasil", "success");
      setAmount("");
      setDescription("");
      loadDonations();
    } catch {
      Swal.fire("Error", "Gagal melakukan donasi", "error");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Donasi</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Jumlah Donasi</label>
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
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Kirim Donasi
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Riwayat Donasi</h2>
      <div className="bg-white p-4 rounded shadow text-sm">
        {donations.length === 0 ? (
          <p className="text-gray-500">Belum ada donasi.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Deskripsi</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.donation_id} className="border-t">
                  <td className="p-2">{d.donation_id}</td>
                  <td className="p-2">Rp {d.amount}</td>
                  <td className="p-2">{d.description}</td>
                  <td className="p-2">
                    {new Date(d.created_at).toLocaleString()}
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
