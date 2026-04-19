import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCourses() {

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await API.get("/teacher/courses");
    setCourses(res.data);
  };

  const approve = async (id) => {
    await API.put(`/admin/approve-course/${id}`);
    alert("Approved ✅");
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-4">

      <h2 className="text-xl mb-4">Course Approval</h2>

      {courses.map((c) => (
        <div key={c.id} className="p-3 border mb-2">

          <h3>{c.title}</h3>
          <p>{c.description}</p>

          <p>Status: {c.status}</p>

          {c.status === "PENDING" && (
            <button
              onClick={() => approve(c.id)}
              className="bg-green-500 text-white px-3 py-1"
            >
              Approve
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default AdminCourses;