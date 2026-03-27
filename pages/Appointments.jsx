// File: pages/Appointments.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "../components/AppointmentModal";
import { getAppointments } from "../services/appointmentService";
import "../assets/appointments.css"; 

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await getAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddNew = () => {
    setSelectedAppt(null); 
    setIsModalOpen(true);
  };

  const handleViewDetail = (appt) => {
    setSelectedAppt(appt);
    setIsModalOpen(true);
  };

  const handleSave = (savedAppt) => {
    if (selectedAppt) {
      setAppointments(appointments.map(a => a.id === savedAppt.id ? savedAppt : a));
    } else {
      const newAppt = { ...savedAppt, id: `AP-00${appointments.length + 1}` };
      setAppointments([...appointments, newAppt]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch tiêm chủng này?")) {
      setAppointments(appointments.filter(a => a.id !== id));
      setIsModalOpen(false); 
    }
  };

  const filteredAppointments = appointments.filter(appt => 
    appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.phone.includes(searchTerm)
  );

  return (
    <div className="dashboard-page">
      {/* 1. Header tách biệt, kéo dài 100% màn hình */}
      <div className="header-top">
        <div style={{ width: '100px' }}></div> 
        <h1 className="page-title">Quản lý Lịch Tiêm Chủng</h1>
        <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>
      </div>

      {/* 2. Phần nội dung chính được BÓP LẠI VÀ CĂN GIỮA */}
      <div className="main-content">
        
        {/* 3. Khung search có viền trắng rộng xung quanh */}
        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Tìm kiếm theo tên bệnh nhân, vắc xin hoặc SĐT..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="info-bar">
          <span>Tìm thấy {filteredAppointments.length} lịch tiêm chủng</span>
          <button style={{ backgroundColor: '#ff6b6b', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleAddNew}>
            + Đặt lịch mới
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải dữ liệu...</div>
        ) : (
          <div className="card-grid">
            {filteredAppointments.map((item) => (
              <div className="appt-card" key={item.id}>
                
                <div className="card-header-color">
                  <h3>{item.patientName}</h3>
                  <span className={`status-badge ${item.status === 'completed' ? 'status-active' : 'status-pending'}`}>
                    {item.status === 'completed' ? 'ĐÃ TIÊM' : 'CHỜ TIÊM'}
                  </span>
                </div>
                
                <div className="card-body-white">
                  <div className="info-row"><span className="info-label">Mã:</span><span className="info-value">{item.id}</span></div>
                  <div className="info-row"><span className="info-label">SĐT:</span><span className="info-value">{item.phone}</span></div>
                  <div className="info-row"><span className="info-label">Vắc xin:</span><span className="info-value">{item.vaccine}</span></div>
                  <div className="info-row"><span className="info-label">Lịch:</span><span className="info-value">{item.date} {item.time}</span></div>
                  
                  <div className="card-desc">
                    Vui lòng đối chiếu thông tin bệnh nhân trên hệ thống trước khi thực hiện quy trình tiêm.
                  </div>
                  
                  <button className="btn-detail" onClick={() => handleViewDetail(item)}>Xem chi tiết</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        appointment={selectedAppt}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Appointments;