import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { FaBook, FaVideo, FaTasks, FaCheckCircle } from "react-icons/fa";

function TeacherDashboard() {
  const navigate = useNavigate();

  const cards = [
    { title: "Create Course", icon: <FaBook />, path: "/teacher-course" },
    { title: "Upload Video", icon: <FaVideo />, path: "/teacher-video" },
    { title: "Create Quiz", icon: <FaTasks />, path: "/teacher-quiz" },
    { title: "Upload Assignment", icon: <FaTasks />, path: "/teacher-assignment" },
    { title: "Check Assignment", icon: <FaCheckCircle />, path: "/check-assignment" },
  ];

  return (
    <Layout>
      <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          👨‍🏫 Teacher Dashboard
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className="cursor-pointer bg-white dark:bg-slate-800 p-5 rounded-xl shadow border hover:shadow-lg transition"
            >
              <div className="text-2xl mb-2 text-blue-600">{card.icon}</div>
              <h2 className="font-semibold">{card.title}</h2>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default TeacherDashboard;