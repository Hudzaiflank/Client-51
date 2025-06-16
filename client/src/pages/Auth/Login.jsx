// src/pages/Auth/Login.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const query = `
    query {
      loginUser(email: "${email}", password: "${password}") {
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
        body: JSON.stringify({ query }),
      });

      const resJson = await response.json();
      console.log("Login response:", resJson);

      if (resJson.data?.loginUser) {
        setUser(resJson.data.loginUser);
        Swal.fire("Success", "Login berhasil!", "success");
        navigate("/dashboard");
      } else {
        Swal.fire("Failed", "Login gagal. Periksa email dan password", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan saat login", "error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Belum punya akun?{" "}
          <Link to="/auth/register" className="text-green-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
