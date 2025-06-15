import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Topup from "./pages/Topup/TopupPage";
import Transaction from "./pages/Transaction/TransactionPage";
import Valas from "./pages/Valas/ValasPage";
import Tagihan from "./pages/Tagihan/TagihanPage";
import Payment from "./pages/Payment/PaymentPage";
import Donation from "./pages/Donation/DonationPage";

// Route Protection
import ProtectedRoute from "./components/Layouts/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topup"
          element={
            <ProtectedRoute>
              <Topup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/valas"
          element={
            <ProtectedRoute>
              <Valas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tagihan"
          element={
            <ProtectedRoute>
              <Tagihan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch-All 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </Router>
  );
}
