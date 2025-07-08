import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { FaLocationDot } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import './Doctors.css';

export default function Doctors() {
  const { specialtyName } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function formatSpecialtyName(name) {
    return name
      .split('-')
      .map(word => {
        if (word.toLowerCase() === 'and') return 'and';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!specialtyName) return;

      setLoading(true);
      setError(null);

      try {
        const formattedName = formatSpecialtyName(specialtyName);
        const encodedName = encodeURIComponent(formattedName);
        console.log('Fetching doctors for specialty:', formattedName);

        const res = await axiosInstance.get(`/Doctors/by-specialization/${encodedName}`);
        setDoctors(res.data);

        if (res.data.length === 0) {
          console.log('No doctors found for this specialty:', formattedName);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setDoctors([]);
          setError('No doctors found in this specialty.');
          console.log('No doctors found for this specialty (404).');
        } else {
          setError('Failed to load doctors');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialtyName]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-center my-5'>
        <div className='w-100 d-flex align-items-center justify-content-center'>
          <input
            style={{ border: '3px solid var(--first-color)' }}
            className="form-control form-control-lg w-50"
            type="text"
            placeholder="Search for doctor . . ."
            aria-label="Search for doctor"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IoMdSearch className='search' />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='alert alert-danger' >{error}</p>}
      {!loading && filteredDoctors.length === 0 && !error && <p>No doctors found.</p>}

      <div className="doctors-grid my-5 align-items-center justify-content-center row gap-2">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.doctorId} className="doctor-card col-md-2 col-5">
            <div className="doctor-image">
              <img
                src={doctor.doctorImgUrl || '/images/default-doctor.jpg'}
                alt={doctor.fullName}
                className='dr-image'
              />
            </div>
            <div className="doctor-details">
              <p className="doctor-name">Dr. {doctor.fullName}</p>
              <p className="doctor-position">{doctor.specialtyName}</p>
              <div className="doctor-address">
                <FaLocationDot className='fs-4 icon' /> {doctor.address1}
              </div>
              <button
                onClick={() => navigate(`/doctor/${doctor.doctorId}`)}
                className="see-more-button"
              >
                <MdAdd className='fs-4 icon' /> See more details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
