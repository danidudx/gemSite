import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch {
      setError("Google login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">LOGIN</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm mb-1">Password</label>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-900 text-white p-3 rounded-lg hover:bg-indigo-800 transition"
          >
            LOGIN
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-4">
          <button className="p-3 border rounded-full hover:bg-gray-100">
            <FaFacebookF className="text-blue-600" size={20} />
          </button>
          <button
            onClick={handleGoogleLogin}
            className="p-3 border rounded-full hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" size={20} />
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
