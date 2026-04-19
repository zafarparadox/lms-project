import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNo: "",
    address: "",
    course: "",
    semester: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // 🔥 BASIC VALIDATION
    if (!form.fullName || !form.email || !form.password) {
      alert("Full Name, Email & Password required");
      return;
    }

    // 🔥 ROLE BASED VALIDATION
    if (form.role === "STUDENT" && (!form.course || !form.semester)) {
      alert("Course & Semester required for students");
      return;
    }

    if (form.role === "TEACHER" && !form.course) {
      alert("Subject/Expertise required for teacher");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);

      alert("Registered successfully!\nWait for admin verification.");
      navigate("/");

    } catch (err) {
  console.log("REGISTER ERROR:", err.response);

  const errorMessage =
    err.response?.data?.message ||   // अगर object में message है
    err.response?.data ||            // अगर plain string है
    "Registration failed";

  alert(errorMessage);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white">

        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

        {/* FULL NAME */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        {/* MOBILE */}
        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        {/* ADDRESS */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white/20 text-black"
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* 🔥 DYNAMIC FIELDS */}

        {form.role === "STUDENT" && (
          <>
            <input
              type="text"
              name="course"
              placeholder="Course"
              onChange={handleChange}
              className="w-full p-2 mb-3 rounded bg-white/20"
            />

            <input
              type="number"
              name="semester"
              placeholder="Semester"
              onChange={handleChange}
              className="w-full p-2 mb-3 rounded bg-white/20"
            />
          </>
        )}

        {form.role === "TEACHER" && (
          <input
            type="text"
            name="course"
            placeholder="Subject / Expertise"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-white/20"
          />
        )}

        {/* ADMIN → no extra fields */}

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 p-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p
          className="mt-3 text-sm text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have account? Login
        </p>

      </div>
    </div>
  );
}

export default Register;