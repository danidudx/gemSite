import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword"; // Import the ForgotPassword component
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import JewelryHomepage from "./pages/JewelryHomepage"; // or wherever you save it


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
       <Routes>
  <Route path="/" element={<ProtectedRoute><JewelryHomepage /></ProtectedRoute>} />
  <Route path="/home" element={<ProtectedRoute><JewelryHomepage /></ProtectedRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}