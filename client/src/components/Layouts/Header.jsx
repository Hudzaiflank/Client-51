import { getUser } from "../../utils/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  if (!user) return null;

  return (
    <header className="bg-white shadow px-6 py-4">
      <div className="text-sm text-gray-600">
        Welcome, <span className="font-semibold">{user.name}</span>
      </div>
    </header>
  );
}
