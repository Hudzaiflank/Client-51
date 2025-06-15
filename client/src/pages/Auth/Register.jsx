// src/pages/Auth/Register.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const mutation = `
      mutation {
        addUser(name: "${name}", email: "${email}", password: "${password}") {
          id
          name
          email
          account_number
          balance
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:4001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      });

      const { data } = await response.json();

      if (data?.addUser) {
        Swal.fire("Success", "Registrasi berhasil! Silakan login", "success");
        navigate("/auth/login");
      } else {
        Swal.fire("Failed", "Registrasi gagal", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan saat registrasi", "error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
