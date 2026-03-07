import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Schedule() {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const res = await API.get("/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
      toast.error("Failed to fetch schedules");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold">Bus Schedule</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          View route timings and schedule details for available buses.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4">Bus</th>
              <th className="p-4">Route</th>
              <th className="p-4">Date</th>
              <th className="p-4">Departure</th>
              <th className="p-4">Arrival</th>
            </tr>
          </thead>

          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr
                  key={schedule._id}
                  className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
                >
                  <td className="p-4 font-medium">
                    {schedule.busId?.busNumber || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {schedule.busId?.route || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {schedule.date
                      ? new Date(schedule.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {schedule.departureTime || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {schedule.arrivalTime || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-slate-500 dark:text-slate-400"
                >
                  No schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;