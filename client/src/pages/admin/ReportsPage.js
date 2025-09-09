import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ReportsPage() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };
    if (user?.token) fetchStats();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{stats.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl">${stats.totalRevenue || 0}</p>
        </div>
      </div>
    </div>
  );
}
