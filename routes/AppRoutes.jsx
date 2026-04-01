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

// Các component của Staff
import PatientManagement from "../pages/staff/PatientManagement";
import PatientForm from "../pages/staff/PatientForm";
import VaccineHistory from "../pages/staff/VaccineHistory";

// Giả sử nhóm bạn có một layout riêng cho nhân viên
// import StaffLayout from "../layouts/StaffLayout"; 

function AppRoutes() {
  const token = getToken();

  return (
    <Routes>
      {/* Route Public & Điều hướng mặc định */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/vaccines" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />

      {/* CÁC ROUTE DÀNH CHO VACCINE (từ nhánh feature/toggle-view) */}
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

      {/* CÁC ROUTE DÀNH CHO NHÂN VIÊN (từ nhánh main) */}
      {/* Bọc trong StaffLayout nếu nhóm bạn đã tạo, nếu chưa thì tạm thời để trống */}
      <Route path="/staff/patients" element={<PatientManagement />} />
      <Route path="/staff/patients/new" element={<PatientForm />} />
      <Route path="/staff/patients/edit/:id" element={<PatientForm />} />
      <Route path="/staff/patients/:id/history" element={<VaccineHistory />} />
      
    </Routes>
  );
}

export default AppRoutes;