import Layout from "../components/Layout";
import { FaBook, FaTasks, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Dashboard() {
  const navigate = useNavigate();

  const user = {
    name: "Zafrullah",
    image: "https://via.placeholder.com/40",
  };

  return (
    <Layout>
      <div className="px-3 sm:px-4 md:px-6 py-4 max-w-7xl mx-auto">

        {/* HEADER (FIXED) */}
        <div className="flex justify-between items-center mb-4">

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Track your learning progress
            </p>
          </div>

          
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Courses</p>
              <h2 className="text-xl font-bold text-blue-600">12</h2>
            </div>
            <FaBook className="text-2xl text-blue-600" />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Assignments</p>
              <h2 className="text-xl font-bold text-green-600">5</h2>
            </div>
            <FaTasks className="text-2xl text-green-600" />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Progress</p>
              <h2 className="text-xl font-bold text-purple-600">75%</h2>
            </div>
            <FaChartLine className="text-2xl text-purple-600" />
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">

            {/* CONTINUE WATCHING */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border">
              <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
                Continue Watching
              </h2>

              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  HTML Course
                </h3>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-blue-600 h-2 rounded w-[60%]"></div>
                </div>

                <p className="text-xs mt-2 text-gray-500">
                  60% completed
                </p>

                <button
                  onClick={() =>
                    navigate("/course-detail", {
                      state: { course: "html" },
                    })
                  }
                  className="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Resume
                </button>
              </div>
            </div>

            {/* WEEKLY PROGRESS (UPPER & CLEAN) */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border">
              <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
                Weekly Progress
              </h2>

              <div className="space-y-3">

                {["Mon", "Tue", "Wed"].map((day, i) => (
                  <div key={i}>
                    <p className="text-sm text-gray-500">{day}</p>
                    <div className="h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-blue-500 rounded w-[60%]"></div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border">
            <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
              Recent Activity
            </h2>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✔ Completed React Basics</li>
              <li>📄 Submitted Assignment</li>
              <li>🎯 Scored 80% in Quiz</li>
            </ul>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;