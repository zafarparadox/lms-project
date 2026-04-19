import { FaHome, FaBook, FaTasks, FaCheck } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

function TeacherSidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/teacher-dashboard" },
    { name: "Create Course", icon: <FaBook />, path: "/teacher-course" },
    { name: "Create Quiz", icon: <FaTasks />, path: "/teacher-quiz" },
    { name: "Assignments", icon: <FaTasks />, path: "/teacher-assignment" },
    { name: "Check Assignment", icon: <FaCheck />, path: "/check-assignment" },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-8 text-blue-400">
        Teacher Panel
      </h2>

      <ul className="space-y-2">
        {menu.map((item, i) => {
          const active = location.pathname === item.path;

          return (
            <Link to={item.path} key={i}>
              <li
                className={`flex gap-3 p-3 rounded-lg ${
                  active
                    ? "bg-blue-600"
                    : "hover:bg-white/10"
                }`}
              >
                {item.icon} {item.name}
              </li>
            </Link>
          );
        })}
      </ul>

    </div>
  );
}

export default TeacherSidebar;