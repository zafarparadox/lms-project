import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const courses = {
    html: {
      title: "HTML Course 🎥",
      pdfFile: "/HTML_Notes.pdf",
      pptFile: "/HTML_Slides.pptx",
      lectures: [
        { title: "Intro", id: "1x6GImXjnSg" },
        { title: "Structure", id: "-hhmjnjUwnU" },
      ],
    },
    networking: {
      title: "Networking Course 🌐",
      pdfFile: "/Networking_Notes.pdf",
      pptFile: "/Networking_Slides.pptx",
      lectures: [
        { title: "Networking Basics", id: "FoLouGsi6H4" },
      ],
    },
  };

  const activeKey = location.state?.course || "html";

  const [activeCourse, setActiveCourse] = useState(activeKey);
  const [currentVideo, setCurrentVideo] = useState(
    courses[activeKey].lectures[0].id
  );

  const handleCourseChange = (courseKey) => {
    setActiveCourse(courseKey);
    setCurrentVideo(courses[courseKey].lectures[0].id);
  };

  return (
    <Layout>
      <div className="px-3 sm:px-4 md:px-6 py-3 max-w-7xl mx-auto w-full">

        {/* 🔥 HEADER FIX (INLINE + COMPACT) */}
        <div className="flex items-center gap-3 mb-3">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-gray-700"
          >
            ← Back
          </button>

          <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            {courses[activeCourse].title}
          </h1>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col w-full">

            {/* VIDEO */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow">
              <iframe
                key={currentVideo}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            </div>

            {/* FILE BUTTONS */}
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <a
                href={courses[activeCourse].pdfFile}
                download
                className="w-full sm:w-auto text-center bg-red-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-700"
              >
                📄 PDF
              </a>

              <a
                href={courses[activeCourse].pptFile}
                download
                className="w-full sm:w-auto text-center bg-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-orange-700"
              >
                📊 PPT
              </a>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">

            {/* LECTURES */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border">
              <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
                Lectures
              </h2>

              <div className="flex flex-col gap-2">
                {courses[activeCourse].lectures.map((lec) => (
                  <button
                    key={lec.id}
                    onClick={() => setCurrentVideo(lec.id)}
                    className={`p-3 text-left rounded-lg text-sm transition ${
                      currentVideo === lec.id
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:text-white"
                    }`}
                  >
                    {currentVideo === lec.id ? "▶ " : "📁 "}
                    {lec.title}
                  </button>
                ))}
              </div>
            </div>

            {/* COURSES */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border">
              <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
                More Courses
              </h2>

              <div className="flex flex-col gap-2">
                {Object.keys(courses).map((courseKey) => {
                  if (courseKey === activeCourse) return null;

                  return (
                    <button
                      key={courseKey}
                      onClick={() => handleCourseChange(courseKey)}
                      className={`p-3 text-left rounded-lg text-sm ${
                        activeCourse === courseKey
                          ? "bg-indigo-600 text-white font-bold"
                          : "bg-gray-100 dark:bg-slate-700 hover:bg-indigo-500 hover:text-white dark:text-white"
                      }`}
                    >
                      🚀 {courses[courseKey].title}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default CourseDetail;