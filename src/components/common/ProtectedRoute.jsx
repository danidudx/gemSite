import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/helpers";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
