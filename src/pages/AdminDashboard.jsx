import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await API.get("/admin/count");
      setTotalUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          🛠 Admin Dashboard
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow">
            <h2>Total Users</h2>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default AdminDashboard;