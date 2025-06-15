import { getUser } from "../utils/auth";
import Layout from "../components/Layouts/Layout";
import SectionTitle from "../components/common/SectionTitle";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-4">
        <SectionTitle title="Dashboard" />
        <div className="bg-white shadow p-6 rounded-lg space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Account Number:</span>{" "}
            {user.account_number}
          </p>
          <p>
            <span className="font-semibold">Balance:</span> Rp {user.balance}
          </p>
        </div>
      </div>
    </Layout>
  );
}
