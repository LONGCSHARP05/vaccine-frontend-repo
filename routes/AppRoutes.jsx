import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Appointments from "../pages/Appointments";

// Các component của Staff
import PatientManagement from "../pages/staff/PatientManagement";
import PatientForm from "../pages/staff/PatientForm";
import VaccineHistory from "../pages/staff/VaccineHistory";

// Giả sử nhóm bạn có một layout riêng cho nhân viên
// import StaffLayout from "../layouts/StaffLayout"; 

// MainLayout chứa Sidebar và Outlet cho các trang chính
import MainLayout from "../layouts/MainLayout";

// Trang placeholder tạm thời cho các route chưa có nội dung
function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>{title}</h2>
      <p>Nội dung đang được phát triển...</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Route Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* CÁC ROUTE DÀNH CHO NHÂN VIÊN */}
      {/* Bọc trong StaffLayout nếu nhóm bạn đã tạo, nếu chưa thì tạm thời để trống */}
      <Route path="/staff/patients" element={<PatientManagement />} />
      <Route path="/staff/patients/new" element={<PatientForm />} />
      <Route path="/staff/patients/edit/:id" element={<PatientForm />} />
      <Route path="/staff/patients/:id/history" element={<VaccineHistory />} />
      
      {/* Các Route cần đăng nhập (Được bọc trong MainLayout chứa Sidebar) */}
      <Route element={<MainLayout />}>
        {/* Chuyển hướng mặc định từ '/' sang '/dashboard' */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<PlaceholderPage title="Tổng quan hệ thống" />} />
        <Route path="/vaccines" element={<PlaceholderPage title="Quản lý danh mục vaccine" />} />
        <Route path="/records" element={<PlaceholderPage title="Quản lý sổ tiêm chủng" />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/facilities" element={<PlaceholderPage title="Đơn vị và nhân sự" />} />
        <Route path="/ai-insights" element={<PlaceholderPage title="Thống kê và dự báo AI" />} />
        <Route path="/profile" element={<PlaceholderPage title="Thông tin tài khoản" />} />
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;