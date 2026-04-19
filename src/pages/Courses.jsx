import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // 🔥 COURSE CLICK
  const openCourse = (course) => {
    navigate("/course-detail", { state: { course } });
  };

  // 🔥 FETCH COURSES
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/teacher/courses");
      setCourses(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <Layout>
      <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          My Courses 📚
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 🔥 DYNAMIC COURSES */}
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses available</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => openCourse(course)}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-3">📘</div>

                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {course.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  {course.description}
                </p>

                <p className="text-xs text-blue-500 mt-2">
                  {course.category}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  ⏱ {course.duration}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Courses;