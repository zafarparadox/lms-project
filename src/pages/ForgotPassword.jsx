import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Enter email");
      return;
    }

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      await API.post(`/auth/forgot-password?email=${email}`);

      setMessage("OTP sent successfully ✅");

      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data || "Error sending OTP ❌");

      // 🔥 अगर OTP already sent है → redirect फिर भी कर दो
      if (
        err.response?.data?.toLowerCase().includes("otp") &&
        err.response?.data?.toLowerCase().includes("sent")
      ) {
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1000);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-white/10 p-6 rounded-xl w-80">

        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center mb-3 text-green-400">
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-3 rounded bg-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

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

export default ForgotPassword;