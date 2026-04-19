import { useState } from "react";
import Layout from "../components/Layout";

function AssignmentPage() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "HTML Basics Assignment",
      deadline: "10 April 2026",
      submitted: false,
      marks: null,
      feedback: "",
      file: null,
    },
    {
      id: 2,
      title: "Networking Concepts",
      deadline: "15 April 2026",
      submitted: true,
      marks: 8,
      feedback: "Good work, improve diagrams.",
      file: null,
    },
  ]);

  // 📂 File select
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, file } : a
      )
    );
  };

  // 🚀 Submit
  const handleSubmit = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              submitted: true,
              marks: 10,
              feedback: "Excellent work!",
            }
          : a
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6">

        {/* Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          📚 Assignments
        </h1>

        {/* Empty State */}
        {assignments.length === 0 && (
          <p className="text-center text-gray-500">
            No assignments available
          </p>
        )}

        <div className="grid gap-4">

          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-xl shadow border"
            >

              {/* Title + Deadline */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h2 className="font-bold text-gray-800 dark:text-white">
                  {a.title}
                </h2>

                <span className="text-xs sm:text-sm text-gray-500">
                  ⏳ {a.deadline}
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-2">
                {a.submitted ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                    ✅ Submitted
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-semibold">
                    ❌ Pending
                  </span>
                )}
              </div>

              {/* Upload Section */}
              {!a.submitted && (
                <div className="mt-3 flex flex-col sm:flex-row gap-3">

                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, a.id)}
                    className="text-sm"
                  />

                  {/* Show file name */}
                  {a.file && (
                    <p className="text-xs text-gray-500">
                      Selected: {a.file.name}
                    </p>
                  )}

                  <button
                    onClick={() => handleSubmit(a.id)}
                    disabled={!a.file}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      a.file
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Marks + Feedback */}
              {a.submitted && (
                <div className="mt-4 bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">

                  <p className="text-sm font-semibold text-gray-700 dark:text-white">
                    🎯 Marks: {a.marks}/10
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    💬 Feedback: {a.feedback}
                  </p>

                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}

export default AssignmentPage;