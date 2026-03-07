import { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 
    bg-indigo-600 dark:bg-slate-900 
    text-white px-6 flex items-center justify-between shadow-lg">

      {/* App Name */}
      <h1 className="text-2xl font-bold tracking-wide">
        Suhana Safar
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Logged in user */}
        <span className="text-sm bg-white/10 px-3 py-1 rounded-lg">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg 
          bg-purple-900 dark:bg-slate-700
          hover:bg-purple-950 dark:hover:bg-slate-600
          transition"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg 
          bg-red-600 hover:bg-red-700 
          transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Navbar;