import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "TEACHER") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl text-white">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          LMS Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <p
          className="text-sm mt-3 text-center cursor-pointer"
          onClick={() => navigate("/register")}
        >
          New user? Register
        </p>
        <p
  className="text-sm mt-2 text-center cursor-pointer text-blue-400"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>
      </div>
    </div>
  );
}

export default Login;