import React, { useEffect } from 'react';
import './SpecialtiesDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialties } from '../../Redux/SpecialtiesSlice';

export default function SpecialtiesDashboard() {
  const dispatch = useDispatch();
  const { list: specialties, status, error } = useSelector((state) => state.specialties);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, status]);

  return (
    <div className='specialties-dashboard container'>
      <div className='all-specialties'>
        <h4 style={{ marginBottom: '20px' }}>All Specialties</h4>

        {status === 'loading' ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : status === 'failed' ? (
          <div className="text-center p-5 text-danger">{error || 'Failed to load specialties.'}</div>
        ) : specialties.length === 0 ? (
          <p className='alert alert-warning text-center'>No specialties available.</p>
        ) : (
          <div className='specialties-table-wrapper'>
            <table className='specialties-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {specialties.map((specialty) => (
                  <tr key={specialty.specialtyId}>
                    <td>{specialty.specialtyId}</td>
                    <td>{specialty.name}</td>
                    <td>
                      {specialty.imageUrl && (
                        <img
                          src={specialty.imageUrl}
                          alt={specialty.name}
                          className="specialty-image-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.png'; // الصورة الاحتياطية
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
