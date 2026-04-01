import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../utils/storage";
import Login from "../pages/Login";
import VaccineSearch from "../pages/VaccineSearch";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = getToken();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const token = getToken();

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/vaccines" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/vaccines"
        element={
          <ProtectedRoute>
            <VaccineSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vaccinesearch"
        element={<VaccineSearch />}
      />
    </Routes>
  );
}

export default AppRoutes;
