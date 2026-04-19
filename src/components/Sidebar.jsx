import { FaHome, FaBook, FaTasks, FaUser, FaBrain } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Courses", icon: <FaBook />, path: "/courses" },
    { name: "Assignments", icon: <FaTasks />, path: "/assignments" },
    { name: "Quiz", icon: <FaBrain />, path: "/quiz" }, // ✅ added
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-5 flex flex-col">

      {/* LOGO */}
      <h2 className="text-2xl font-bold mb-8 text-blue-400 tracking-wide">
        LMS
      </h2>

      {/* MENU */}
      <ul className="space-y-2 flex-1">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={index}>
              <li
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>

      {/* FOOTER */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        © LMS 2026
      </div>

    </div>
  );
}

export default Sidebar;