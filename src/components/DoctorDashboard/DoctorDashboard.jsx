import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance';

export default function DoctorDashboard() {
  const [allDoctorsData, setAllDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/Doctors/approved-doctors');
        setAllDoctorsData(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch doctors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this doctor? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/Doctors/${id}`);
        setAllDoctorsData(prev => prev.filter(doc => doc.doctorId!== id));
        Swal.fire("Deleted!", "The doctor has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete doctor.", "error");
      }
    }
  };

  // فلترة الدكاترة بناءً على البحث
  const filteredDoctors = allDoctorsData.filter((doctor) => {
    const fullName = `${doctor.fullName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className='doctor-dashboard container'>
      <div className='row d-flex align-items-center justify-content-between'>
        <h3 className='col-md-3 col-5'>All Doctors Data</h3>
        <div className='mb-2 col-md-4 col-5'>
          <input
            type='text'
            placeholder='Search by Doctor Name...'
            className='form-control doctor-search-input'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='alert alert-danger'>{error}</p>
      ) : (
        <div className='doctor-dashboard-table-wrapper'>
          <table className='doctor-dashboard-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Workplace</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.doctorId}>
                  <td>Dr. {doctor.fullName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.address1}</td>
                  <td>{doctor.workplace}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => handleDeleteDoctor(doctor.doctorId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
