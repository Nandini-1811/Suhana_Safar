import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard fetch failed", error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-slate-700 dark:text-slate-200">
        Loading dashboard...
      </div>
    );
  }

  const platformCards = [
    { title: "Total Buses", value: stats.totalBuses },
    { title: "Active Buses", value: stats.activeBuses },
    { title: "Confirmed Bookings", value: stats.confirmedBookings },
    { title: "Cancelled Bookings", value: stats.cancelledBookings },
    { title: "Total Requests", value: stats.totalRequests },
  ];

  const myCards = [
    { title: "My Confirmed Bookings", value: stats.myConfirmedBookings },
    { title: "My Cancelled Bookings", value: stats.myCancelledBookings },
    { title: "My Total Requests", value: stats.myTotalRequests },
  ];

  return (
    <div className="space-y-10 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Overview of Suhana Safar transport operations.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {platformCards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
            >
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {card.title}
              </p>
              <p className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
            >
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {card.title}
              </p>
              <p className="text-4xl font-bold mt-4 text-indigo-600 dark:text-purple-400">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;