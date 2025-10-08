// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for password reset instructions");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-2">FORGOT PASSWORD?</h2>
        
        <p className="text-center text-gray-600 mb-8">
          To reset your password, please enter your email address
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handlePasswordReset}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-900 text-white p-3 rounded-lg hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? "SENDING..." : "CONTINUE"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}