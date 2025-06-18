// import React from 'react'
// import './SpecialtiesDashboard.css'
// export default function SpecialtiesDashboard() {
//     const allSpecialties = [
//         { id: '1', name:'Dentistry', imageUrl: '../../../images/ADHD.png', },
//         { id: '1', name:'Dentistry', imageUrl: '../../../images/ADHD.png', },
//         { id: '1', name:'Dentistry', imageUrl: '../../../images/ADHD.png', },
//         { id: '1', name:'Dentistry', imageUrl: '../../../images/ADHD.png', },
//     ];
//     return (
//         <div>
//             <div className="recent-appointment dashboard-panel mb-5 p-4">
//                 <h3>All Specialties</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>id</th>
//                             <th>name</th>
//                             <th>image</th>
//                             <th>action</th>
//                         </tr>
//                         </thead>
//                     <tbody>
//                         {allSpecialties.map((specialties,index) => (
//                             <tr key={index}>
//                                 <td>{specialties.id}</td>
//                                 <td>{specialties.name}</td>
//                                 <td>{<img src={specialties.imageUrl} alt={specialties.name} className="doctor-dashboard-image" />}</td>
//                                 <td><button className='btn btn-outline-danger'>delete</button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }




import React, { useState, useEffect } from 'react';
import './SpecialtiesDashboard.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function SpecialtiesDashboard() {
    const [specialties, setSpecialties] = useState([]);
    const [newSpecialtyName, setNewSpecialtyName] = useState('');
    const [newSpecialtyImageFile, setNewSpecialtyImageFile] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch specialties from API
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('https://f3e0-41-232-91-48.ngrok-free.app/api/specialties');
                setSpecialties(response.data);
            } catch (err) {
                setError('Failed to fetch specialties. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialties();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewSpecialtyImageFile(file);
        } else {
            setNewSpecialtyImageFile(null);
        }
    };

    const handleAddSpecialty = async (e) => {
        e.preventDefault();

        if (!newSpecialtyName.trim() || !newSpecialtyImageFile) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter specialty name and select an image file!',
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', newSpecialtyName.trim());
            formData.append('image', newSpecialtyImageFile);

            const response = await axios.post('https://f3e0-41-232-91-48.ngrok-free.app/api/specialties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const newSpecialty = response.data;
            setSpecialties(prev => [...prev, newSpecialty]);

            // Reset form
            setNewSpecialtyName('');
            setNewSpecialtyImageFile(null);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Specialty added successfully!',
            });
        } catch (err) {
            setError('Failed to add specialty. Please try again.');
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add specialty!',
            });
        }
    };

    return (
        <div className='specialties-dashboard container'>
            <div className='add-specialty-section'>
                <h4>Add New Specialty</h4>
                <form onSubmit={handleAddSpecialty} className='add-specialty-form'>
                    <div className='form-group'>
                        <label htmlFor='specialtyName'>Specialty Name:</label>
                        <input
                            type='text'
                            id='specialtyName'
                            className='form-control specialty-input'
                            value={newSpecialtyName}
                            onChange={(e) => setNewSpecialtyName(e.target.value)}
                            placeholder='Enter specialty name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='specialtyImageFile'>Upload Image:</label>
                        <input
                            type='file'
                            id='specialtyImageFile'
                            className='form-control specialty-input'
                            accept='image/*'
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button type='submit' className='add-specialty-btn'>Add Specialty</button>
                </form>
            </div>

            <div className='all-specialties'> 
                <h4 style={{ marginTop: '40px', marginBottom: '20px' }}>All Specialties</h4>
                {loading ? (
                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center p-5 text-danger">{error}</div>
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
                                    <tr key={specialty.id}>
                                        <td>{specialty.id}</td>
                                        <td>{specialty.name}</td>
                                        <td>
                                            {specialty.imageUrl && (
                                                <img
                                                    src={specialty.imageUrl}
                                                    alt={specialty.name}
                                                    className="specialty-image-thumbnail"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/images/placeholder.png';
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
