import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { syncUserToBackend } from "../services/authService";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const idToken = await user.getIdToken();
      
      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: phone
      };
      
      await syncUserToBackend(userData, idToken);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">SIGN UP</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister}>
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1234567890"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              className="mt-1 mr-2 w-4 h-4 border rounded"
            />
            <p className="text-sm text-gray-600">
              Sign me up for product updates and promotions. You can unsubscribe
              at any time.
            </p>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 mb-4">
            See{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            for additional information.
          </p>

          {/* Captcha Placeholder */}
          <div className="border rounded-md p-4 mb-6 flex items-center justify-between text-sm text-gray-600">
            <span>I'm not a robot</span>
            <span className="text-xs text-gray-400">[reCAPTCHA]</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white p-3 rounded-lg hover:bg-indigo-800 transition"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-4">
          <button className="p-3 border rounded-full hover:bg-gray-100">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12" />
            </svg>
          </button>
          <button className="p-3 border rounded-full hover:bg-gray-100">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1-.7 1.9-1.4 2.6v2.2h2.3c1.4-1.3 2.3-3.2 2.3-5.5z" />
              <path d="M12 22c3 0 5.6-1 7.4-2.9l-2.3-2.2c-1 .7-2.3 1.2-3.7 1.2a6.5 6.5 0 0 1-6.2-4.5H4.8v2.3A10 10 0 0 0 12 22z" />
              <path d="M5.8 13.6A6.5 6.5 0 0 1 5.5 12c0-.6.1-1.2.3-1.6V8H4.8a10 10 0 0 0 0 8l1-2.4z" />
              <path d="M12 5.5c1.6 0 3 .6 4 1.6l2-2C16.6 3.2 14.6 2.2 12 2.2A10 10 0 0 0 4.8 8l1.5 2.3A6.5 6.5 0 0 1 12 5.5z" />
            </svg>
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
