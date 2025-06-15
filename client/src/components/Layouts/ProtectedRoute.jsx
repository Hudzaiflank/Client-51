import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

export default function ProtectedRoute({ children }) {
  try {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      return <Navigate to="/auth/login" replace />;
    }
    return children;
  } catch (err) {
    console.error("Auth error:", err);
    return <Navigate to="/auth/login" replace />;
  }
}
