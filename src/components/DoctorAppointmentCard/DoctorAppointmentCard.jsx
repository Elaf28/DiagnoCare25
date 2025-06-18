// src/components/DoctorAppointmentCard/DoctorAppointmentCard.js
import React from 'react';
// لم نعد نحتاج useNavigate هنا
// import './DoctorAppointmentCard.css';
// import patientImage from '../../assets/patient.png';

// تم إضافة onViewPatientDetails مرة أخرى كـ prop
function DoctorAppointmentCard({ appointment, onApprove, onReject, onMarkCompleted, onViewPatientDetails }) {
  const { id, patientName, patientAge, patientGender, reason, dateTime, status } = appointment;
  // لم نعد نحتاج patientId بشكل منفصل هنا، لأننا سنمرر الـ appointment ID للـ handler

  let statusDisplay;
  if (status === 'pending') {
    statusDisplay = <span className="badge bg-warning text-dark appointment-status">Pending Approval</span>;
  } else if (status === 'confirmed') {
    statusDisplay = <span className="badge bg-success appointment-status">Confirmed</span>;
  } else if (status === 'completed') {
    statusDisplay = <span className="badge bg-info appointment-status">Completed</span>;
  } else if (status === 'cancelled') {
    statusDisplay = <span className="badge bg-secondary appointment-status">Cancelled</span>;
  } else {
    statusDisplay = <span className="badge bg-light text-dark appointment-status">Unknown</span>;
  }

  return (
    <div className="doctor-appointment-card d-flex flex-column flex-md-row align-items-center justify-content-between p-3 my-3">
      <div className="d-flex align-items-center mb-3 mb-md-0">
        
        <div className="appointment-details">
          <h5 className="patient-name mb-1">Patient: {patientName}</h5>
          <p className="patient-info mb-1">Age: {patientAge} | Gender: {patientGender}</p>
          <p className="reason mb-1">Reason: {reason}</p>
          <p className="date-time mb-0">Date & Time: {dateTime}</p>
        </div>
      </div>
      <div className="appointment-actions d-flex flex-column align-items-end">
        {statusDisplay}

        {/* زر "View Patient Details" - هنحطه دايما */}
        <button
          className="btn btn-outline-info btn-sm mt-2" // لون أزرق فاتح / معلوماتي
          onClick={() => onViewPatientDetails(id)} // هنمرر id الموعد عشان نجيب بيانات المريض
        >
          View Patient Details
        </button>

        {status === 'pending' && (
          <div className="mt-2 d-flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={() => onApprove(id)}
            >
              Approve
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onReject(id)}
            >
              Reject
            </button>
          </div>
        )}

        {status === 'confirmed' && (
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={() => onMarkCompleted(id)}
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointmentCard;