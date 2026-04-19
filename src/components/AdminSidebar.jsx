import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-5">

      <h2 className="text-xl font-bold mb-8 text-blue-400">
        Admin Panel
      </h2>

      <ul className="space-y-2 text-sm">

        <Link to="/admin-dashboard">
          <li className="p-3 rounded-lg hover:bg-white/10 cursor-pointer">
            🏠 Dashboard
          </li>
        </Link>

        <Link to="/admin-users">   {/* 🔥 FIXED ROUTE */}
          <li className="p-3 rounded-lg hover:bg-white/10 cursor-pointer">
            👥 Manage Users
          </li>
        </Link>

        <li className="p-3 rounded-lg hover:bg-white/10 cursor-pointer">
          📚 Courses
        </li>

      </ul>

    </div>
  );
}

export default AdminSidebar;