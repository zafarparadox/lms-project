import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/user.png";

function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const user = {
    name: "Zafrullah",
    image: userImg,
  };

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.clear(); // cleaner
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-white dark:bg-slate-900 border-b shadow">

      {/* LEFT */}
      <div className="text-center sm:text-left">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-300">
          Welcome back, {user.name} 👋
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">

        {/* DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="px-2 py-1 text-sm bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
        >
          {dark ? "Light" : "Dark"}
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-slate-700 focus:outline-none"
        />

        {/* PROFILE */}
        <img
          src={user.image}
          alt="user"
          className="w-9 h-9 rounded-full object-cover border"
        />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;