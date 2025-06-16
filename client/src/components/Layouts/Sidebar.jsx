import { Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/auth";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Topup", path: "/topup" },
  { name: "Transaction", path: "/transaction" },
  { name: "Valas", path: "/valas" },
  { name: "Tagihan", path: "/tagihan" },
  { name: "Payment", path: "/payment" },
  { name: "Donation", path: "/donation" },
];

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Gogowallet
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive(item.path) ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => {
          logout();
          window.location.href = "/auth/login";
        }}
        className="m-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Logout
      </button>
    </div>
  );
}
