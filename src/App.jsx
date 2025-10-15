import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";
import Dashboard from "./pages/customer/Dashboard";
import Profile from "./pages/customer/Profile";
import SavedItems from "./pages/customer/SavedItems";
import Blogs from "./pages/customer/Blogs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import InquiryManagement from "./pages/admin/InquiryManagement";
import HomepageManagement from "./pages/admin/HomepageManagement";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedItems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs"
                element={
                  <ProtectedRoute>
                    <Blogs />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ThemeProvider>
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  </ThemeProvider>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ThemeProvider>
                    <ProtectedRoute requireAdmin={true}>
                      <ProductManagement />
                    </ProtectedRoute>
                  </ThemeProvider>
                }
              />
              <Route
                path="/admin/blogs"
                element={
                  <ThemeProvider>
                    <ProtectedRoute requireAdmin={true}>
                      <BlogManagement />
                    </ProtectedRoute>
                  </ThemeProvider>
                }
              />
              <Route
                path="/admin/inquiries"
                element={
                  <ThemeProvider>
                    <ProtectedRoute requireAdmin={true}>
                      <InquiryManagement />
                    </ProtectedRoute>
                  </ThemeProvider>
                }
              />
              <Route
                path="/admin/homepage"
                element={
                  <ThemeProvider>
                    <ProtectedRoute requireAdmin={true}>
                      <HomepageManagement />
                    </ProtectedRoute>
                  </ThemeProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
