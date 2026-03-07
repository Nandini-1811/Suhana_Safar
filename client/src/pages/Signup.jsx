import { useState } from "react";
import { useNavigate, Link } from "react-router";
import API from "../services/api";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/register", formData);

      toast.success(res.data.message || "Signup successful");

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
          Sign up to start using Suhana Safar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-purple-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-purple-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-lg outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-purple-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        <p className="text-slate-500 dark:text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-600 dark:text-purple-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;