import { useState, useEffect } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);

  // 🔥 अगर direct open किया → redirect
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // 🔥 TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleReset = async () => {
    if (!otp || !password) {
      alert("Enter OTP & password");
      return;
    }

    try {
      const res = await API.post(
        `/auth/reset-password?email=${email}&otp=${otp}&newPassword=${password}`
      );

      alert(res.data);
      navigate("/");

    } catch (err) {
      alert(err.response?.data || "Reset failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-white/10 p-6 rounded-xl w-80">

        <h2 className="text-xl mb-3 text-center">Reset Password</h2>

        {/* TIMER */}
        <p className="text-sm text-center text-yellow-400 mb-3">
          OTP expires in: {formatTime()}
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-3 rounded bg-white/20"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-3 rounded bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={timeLeft <= 0}
          className={`w-full p-2 rounded ${
            timeLeft <= 0 ? "bg-gray-500" : "bg-green-600"
          }`}
        >
          Reset Password
        </button>

        {timeLeft <= 0 && (
          <p className="text-red-400 text-xs mt-2 text-center">
            OTP expired. Please request again.
          </p>
        )}

        {/* 🔥 BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 p-2 rounded bg-gray-600 hover:bg-gray-700"
        >
          ← Back to Login
        </button>

      </div>

    </div>
  );
}

export default ResetPassword;