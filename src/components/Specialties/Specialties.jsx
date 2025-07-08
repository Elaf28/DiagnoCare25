import React, { useEffect, useMemo, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import './Specialties.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialties } from '../../Redux/SpecialtiesSlice';

export default function Specialties() {
  const dispatch = useDispatch();

  const { list: specialties, status, error } = useSelector((state) => state.specialties);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, status]);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return specialties;
    return specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, specialties]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-center m-5">
        <div className="w-100 d-flex align-items-center justify-content-center">
          <input
            style={{ border: '3px solid var(--first-color)' }}
            className="form-control form-control-lg w-50"
            type="text"
            placeholder="Search for specialty . . ."
            value={searchTerm}
            onChange={handleChange}
          />
          <IoMdSearch className="search" />
        </div>
      </div>

      {status === 'loading' ? (
        <p className="text-center fs-4 text-muted">Loading specialties...</p>
      ) : status === 'failed' ? (
        <p className="text-center fs-4 text-danger">Error: {error}</p>
      ) : (
        <div className="specialty-grid">
          {filteredResults.length > 0 ? (
            filteredResults.map((specialty) => (
              <Link
                key={specialty.specialtyId}
                to={`/doctors/${specialty.name.toLowerCase().replace(/ /g, '-')}`}
                className="specialty-card link allCard"
              >
                <img src={`http://dcare.runasp.net/api/${specialty.imageUrl}`} alt={specialty.name} className="specialty-image" />
                <span className="specialty-name fs-5">{specialty.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center fs-4 text-muted">No specialties found.</p>
          )}
        </div>
      )}
    </div>
  );
}
