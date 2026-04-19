import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function TeacherCourse() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: ""
  });

  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 CREATE OR UPDATE
  const handleSubmit = async () => {
    if (!form.title) {
      alert("Enter title");
      return;
    }

    try {
      if (editId) {
        // 🔥 UPDATE
        await API.put(`/teacher/course/${editId}`, form);
        alert("Update request sent to admin ✅");
      } else {
        // 🔥 CREATE
        await API.post("/teacher/course", form);
        alert("Course created ✅");
      }

      resetForm();
      fetchCourses();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // 🔥 FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await API.get("/teacher/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 EDIT CLICK
  const handleEdit = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration
    });

    setEditId(course.id);
  };

  // 🔥 RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      duration: ""
    });
    setEditId(null);
  };

  return (
    <Layout>
      <div className="px-4 py-6 max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          📚 {editId ? "Edit Course" : "Create Course"}
        </h1>

        {/* FORM */}
        <div className="bg-white p-5 rounded shadow mb-6">

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Course" : "Create Course"}
          </button>

        </div>

        {/* COURSE LIST */}
        <div className="grid gap-4">

          {courses.map((c) => (
            <div key={c.id} className="p-4 bg-white rounded shadow">

              <h2 className="font-bold">{c.title}</h2>
              <p>{c.description}</p>

              <p className="text-sm text-gray-500">
                {c.status}
              </p>

              <button
                onClick={() => handleEdit(c)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

            </div>
          ))}

        </div>

      </div>
    </Layout>
  );
}

export default TeacherCourse;