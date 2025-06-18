// // WorkingHoursManager.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';
// import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// export default function WorkingHoures() {
//   // States for working hours management
//     const [workingHours, setWorkingHours] = useState([]); // Fetched separately
//     const [tempWorkingHours, setTempWorkingHours] = useState([]);
//     const [newHour, setNewHour] = useState({ day: '', startTime: '', endTime: '' });
//     const [isEditingWorkingHours, setIsEditingWorkingHours] = useState(false);
//     const [workingHoursError, setWorkingHoursError] = useState(null);
//     const [isSavingWorkingHours, setIsSavingWorkingHours] = useState(false);
//     const [isLoadingWorkingHours, setIsLoadingWorkingHours] = useState(true);
//     const [addHoursError, setAddHoursError] = useState(null); 

//     // --- Mock API Fetch for Working Hours (replace with actual fetch) ---
//     useEffect(() => {
//     const fetchWorkingHours = async () => {
//         setIsLoadingWorkingHours(true);
//         setWorkingHoursError(null);
//         try {
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 800));
//         // Mock data from API - In a real app, this would be from your API endpoint
//         const fetchedHours = [
//             { day: 'Sunday', startTime: '09:00', endTime: '17:00' },
//             { day: 'Wednesday', startTime: '10:00', endTime: '18:00' }
//         ];
//         setWorkingHours(fetchedHours);
//         setTempWorkingHours(fetchedHours); // Initialize temp with fetched data
//         } catch (err) {
//         console.error("Error fetching working hours:", err);
//         setWorkingHoursError("Failed to load working hours.");
//         } finally {
//         setIsLoadingWorkingHours(false);
//         }
//     };
//     fetchWorkingHours();
//     }, []); // Run once on component mount

//     // --- Handlers for Working Hours ---
//     const handleNewHourChange = (e) => {
//         const { name, value } = e.target;
//         setNewHour(prev => ({ ...prev, [name]: value }));
//         setAddHoursError(null); 
//     };

//     const handleAddHour = () => {
//         if (newHour.day && newHour.startTime && newHour.endTime) {
//             // Optional: Add validation for time overlaps or valid time ranges
//             setTempWorkingHours(prev => [...prev, newHour]);
//             setNewHour({ day: '', startTime: '', endTime: '' });
//             setAddHoursError(null); 
//         } else {
//             setAddHoursError('Please select a day and enter both start and end times for the new working hour.');
//         }
//     };

//     const handleRemoveHour = (indexToRemove) => {
//         setTempWorkingHours(prev => prev.filter((_, index) => index !== indexToRemove));
//     };

//     const handleSaveWorkingHours = async () => {
//         setWorkingHoursError(null);
//         setIsSavingWorkingHours(true);
//         try {
//             // Simulate API call for saving working hours
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             // In a real app: call your API to save tempWorkingHours
//             // Example: await axios.put('/api/doctor/working-hours', tempWorkingHours);

//             setWorkingHours(tempWorkingHours); // For mock, just update local state
//             setIsEditingWorkingHours(false);
//             // NEW: مسح رسالة خطأ الإضافة عند الحفظ
//             setAddHoursError(null); 
//         } catch (apiError) {
//             console.error("Error saving working hours:", apiError);
//             setWorkingHoursError("An error occurred while saving working hours.");
//         } finally {
//             setIsSavingWorkingHours(false);
//         }
//     };
//     const handleCancelWorkingHours = () => {
//     setTempWorkingHours([...workingHours]); // Revert working hours to original
//     setNewHour({ day: '', startTime: '', endTime: '' }); // Clear new hour fields
//     setIsEditingWorkingHours(false);
//     setWorkingHoursError(null);
//     // NEW: مسح رسالة خطأ الإضافة عند الإلغاء
//     setAddHoursError(null); 
//     };

//     return (
//     <Card>
//         <Card.Header className="bg-light fs-5 d-flex justify-content-between align-items-center" style={{ color: 'var(--first-color)' }} >
//         <h5 className="mb-0">Working Hours</h5>
//             {!isEditingWorkingHours ? (
//                 <button className='btn' style={{background:'var(--first-color)',color:'white'}} onClick={() => {
//                     setIsEditingWorkingHours(true);
//                     setTempWorkingHours([...workingHours]); // Copy current to temp for editing
//                     setWorkingHoursError(null);
//                     setNewHour({ day: '', startTime: '', endTime: '' }); 
//                     setAddHoursError(null); 
//                 }}>
//                     Edit Hours
//                 </button>
//             ) : (
//                 <div>
//                     <button className="me-2 btn btn-outline-success" onClick={handleSaveWorkingHours} disabled={isSavingWorkingHours}>
//                         {isSavingWorkingHours ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'} 
//                     </button>
//                     <button className='btn btn-outline-secondary' onClick={handleCancelWorkingHours} disabled={isSavingWorkingHours}>
//                         Cancel
//                     </button>
//                 </div>
//             )}
//         </Card.Header>
//         <Card.Body className="p-4">
//             {workingHoursError && <Alert variant="danger">{workingHoursError}</Alert>}
//             {isLoadingWorkingHours ? (
//                 <div className="d-flex justify-content-center align-items-center py-3">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading Working Hours...</span>
//                     </Spinner>
//                 </div>
//             ) : (
//                 <ListGroup variant="flush">
//                     {/* Display Working Hours in View Mode */}
//                     {!isEditingWorkingHours && workingHours.length > 0 ? (
//                         workingHours.map((hour, index) => (
//                             <ListGroup.Item key={index}>
//                                 <span className='fw-bolder pe-1'>{hour.day}:</span>
//                                 {hour.startTime} - {hour.endTime}
//                             </ListGroup.Item>
//                         ))
//                     ) : !isEditingWorkingHours && workingHours.length === 0 ? ( 
//                         <ListGroup.Item className='text-center'>No working hours scheduled yet.</ListGroup.Item> 
//                     ) : null}
                    
//                     {/* Edit Working Hours in Edit Mode */}
//                     {isEditingWorkingHours && (
//                         <>
//                             {
//                                 tempWorkingHours.length === 0 && (
//                                     <ListGroup.Item>No working hours added yet. Add some below!</ListGroup.Item>
//                                 )
//                             }
//                             {
//                                 tempWorkingHours.map((hour, index) => (
//                                     <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
//                                         <div>
//                                             <span className='fw-bolder pe-1'>{hour.day}:</span>
//                                             {hour.startTime} - {hour.endTime}
//                                         </div>
//                                         <button
//                                             variant=""
//                                             className='btn btn-outline-danger'
//                                             size="sm"
//                                             onClick={() => handleRemoveHour(index)}
//                                         >
//                                             Remove
//                                         </button>
//                                     </ListGroup.Item>
//                                 ))
//                             }

//                             <ListGroup.Item className="d-flex flex-column">
//                                 <h6 className="mb-2 fw-bolder" style={{color:'var(--first-color)'}}>Add New Hour:</h6>
//                                 {addHoursError && <Alert variant='danger' className='mt-2'>{addHoursError}</Alert>}
//                                 <Form.Group className="mb-2">
//                                 <Form.Label className="fw-bolder">Day:</Form.Label>
//                                     <Form.Control
//                                         as="select"
//                                         name="day"
//                                         value={newHour.day}
//                                         onChange={handleNewHourChange}
//                                     >
//                                         <option value="">Select Day</option>
//                                         <option value="Sunday">Sunday</option>
//                                         <option value="Monday">Monday</option>
//                                         <option value="Tuesday">Tuesday</option>
//                                         <option value="Wednesday">Wednesday</option>
//                                         <option value="Thursday">Thursday</option>
//                                         <option value="Friday">Friday</option>
//                                         <option value="Saturday">Saturday</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                                 <Form.Group className="mb-2">
//                                     <Form.Label className="fw-bolder">Start Time:</Form.Label>
//                                     <Form.Control
//                                         type="time"
//                                         name="startTime"
//                                         value={newHour.startTime}
//                                         onChange={handleNewHourChange}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label className="fw-bolder">End Time:</Form.Label>
//                                     <Form.Control
//                                         type="time"
//                                         name="endTime"
//                                         value={newHour.endTime}
//                                         onChange={handleNewHourChange}
//                                     />
//                                 </Form.Group>
//                                 <button className='btn' style={{background:'var(--first-color)',color:'white'}} onClick={handleAddHour}>
//                                     Add Hour
//                                 </button>
//                             </ListGroup.Item>
//                         </>
//                     )}
//                 </ListGroup>
//             )}
//         </Card.Body>
//     </Card>
//     );
// };






import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Spinner, Alert, Row, Col, Badge } from 'react-bootstrap';

export default function DoctorAvailableSlots() {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [tempSlots, setTempSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ day: '', startTime: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchSlots = async () => {
        setIsLoading(true);
        await new Promise(res => setTimeout(res, 800));
        const mockData = [
            { id: 1, day: 'Sunday', startTime: '09:00' },
            { id: 2, day: 'Sunday', startTime: '09:30' },
            { id: 3, day: 'Wednesday', startTime: '11:00' },
        ];
        setAvailableSlots(mockData);
        setTempSlots(mockData);
        setIsLoading(false);
        };
        fetchSlots();
    }, []);

    const handleNewSlotChange = (e) => {
        const { name, value } = e.target;
        setNewSlot(prev => ({ ...prev, [name]: value }));
        setFormError(null);
    };

    const handleAddSlot = () => {
        const { day, startTime } = newSlot;
        if (!day || !startTime) {
        setFormError('Please select both day and time.');
        return;
        }

        const sameDayCount = tempSlots.filter(slot => slot.day === day).length;
        if (sameDayCount >= 5) {
        setFormError('You can only add up to 5 time slots per day.');
        return;
        }

        const isDuplicate = tempSlots.some(slot =>
        slot.day === day && slot.startTime === startTime
        );
        if (isDuplicate) {
        setFormError('This time slot already exists.');
        return;
        }

        const newId = Date.now();
        setTempSlots(prev => [...prev, { id: newId, day, startTime }]);
        setNewSlot({ day: '', startTime: '' });
    };

    const handleRemoveSlot = (id) => {
        setTempSlots(prev => prev.filter(slot => slot.id !== id));
    };

    const handleSaveSlots = async () => {
        setIsSaving(true);
        await new Promise(res => setTimeout(res, 1000));
        setAvailableSlots(tempSlots);
        setIsEditing(false);
        setFormError(null);
        setIsSaving(false);
    };

    const handleCancel = () => {
        setTempSlots([...availableSlots]);
        setNewSlot({ day: '', startTime: '' });
        setFormError(null);
        setIsEditing(false);
    };

    // Grouping helper
    const groupByDay = (slots) => {
        return slots.reduce((acc, slot) => {
        acc[slot.day] = acc[slot.day] ? [...acc[slot.day], slot] : [slot];
        return acc;
        }, {});
    };

    const sortedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Card>
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
            <div>
                <h5 className="mb-0" style={{ color: 'var(--first-color)' }}>Available Time Slots</h5>
                <small className="text-muted">Each appointment slot is <strong>30 minutes</strong> long.</small>
            </div>

            {!isEditing ? (
            <button className="btn" style={{ background: 'var(--first-color)', color: 'white' }} onClick={() => {
                setIsEditing(true);
                setFormError(null);
                setNewSlot({ day: '', startTime: '' });
            }}>
                Edit Slots
            </button>
            ) : (
            <div>
                <button className="btn btn-outline-success me-2" onClick={handleSaveSlots} disabled={isSaving}>
                {isSaving ? <Spinner size="sm" animation="border" /> : 'Save'}
                </button>
                <button className="btn btn-outline-secondary" onClick={handleCancel} disabled={isSaving}>
                Cancel
                </button>
            </div>
            )}
        </Card.Header>

        <Card.Body className="p-4">
            {isLoading ? (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" />
            </div>
            ) : (
            <>
                {isEditing && formError && <Alert variant="danger">{formError}</Alert>}

                {/* Display grouped slots */}
                {Object.entries(groupByDay(isEditing ? tempSlots : availableSlots))
                .sort((a, b) => sortedDays.indexOf(a[0]) - sortedDays.indexOf(b[0]))
                .map(([day, slots]) => (
                    <div key={day} className="mb-4">
                    <h6 className="fw-bold" style={{ color: 'var(--first-color)' }}>{day}</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {slots.map(slot => (
                        <div key={slot.id} className="d-flex align-items-center">
                            <Badge bg="primary" className="p-2">
                            {slot.startTime} - {add30Minutes(slot.startTime)}
                            </Badge>
                            {isEditing && (
                            <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveSlot(slot.id)}>x</Button>
                            )}
                        </div>
                        ))}
                    </div>
                    </div>
                ))}

                {/* Form for new slot */}
                {isEditing && (
                <div className="mt-4">
                    <h6 className="fw-bold mb-2" style={{ color: 'var(--first-color)' }}>Add New Slot:</h6>
                    <Form.Group className="mb-2">
                    <Form.Label>Day:</Form.Label>
                    <Form.Control as="select" name="day" value={newSlot.day} onChange={handleNewSlotChange}>
                        <option value="">Select Day</option>
                        {sortedDays.map(day => <option key={day} value={day}>{day}</option>)}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2">
                    <Form.Label>Start Time:</Form.Label>
                    <Form.Control
                        type="time"
                        name="startTime"
                        value={newSlot.startTime}
                        onChange={handleNewSlotChange}
                    />
                    </Form.Group>
                    <button className="btn" style={{ background: 'var(--first-color)', color: 'white' }} onClick={handleAddSlot}>
                    Add Slot
                    </button>
                </div>
                )}
            </>
            )}
        </Card.Body>
        </Card>
    );
}

    // ✅ Helper function to add 30 minutes to time string
function add30Minutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + 30);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}
