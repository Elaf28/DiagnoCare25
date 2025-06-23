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
import { Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';

export default function DoctorSlotsManager() {
    const [slots, setSlots] = useState([]);
    const [tempSlots, setTempSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ day: '', startTime: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [formError, setFormError] = useState(null);
    const doctorId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await axiosInstance.get(`/DoctorAvailabilities/by-doctor/${doctorId}`);
                setSlots(res.data);
                setTempSlots(res.data);
            } catch (err) {
                console.error('Error fetching slots:', err);
            }
        };
        fetchSlots();
    }, [doctorId]);

    const calculateEndTime = (startTime) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const end = new Date();
        end.setHours(hours);
        end.setMinutes(minutes + 30);
        return end.toTimeString().slice(0, 5);
    };

    const formatTime = (time) => {
        const [h, m] = time.split(':');
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:00`;
    };

    const handleAddSlot = () => {
        if (!newSlot.day || !newSlot.startTime) {
            setFormError('Please choose day and time.');
            return;
        }

        const sameDaySlots = tempSlots.filter(s => s.dayOfWeek === newSlot.day);
        if (sameDaySlots.length >= 5) {
            setFormError('You can only add up to 5 slots per day.');
            return;
        }

        const exists = tempSlots.some(s => s.dayOfWeek === newSlot.day && s.startTime === newSlot.startTime);
        if (exists) {
            setFormError('This slot already exists.');
            return;
        }

        const endTime = calculateEndTime(newSlot.startTime);

        // بناء كائن الموعد الجديد بنفس هيكل البيانات المتوقعة
        const newSlotObj = {
            id: `temp-${Date.now()}`, // id مؤقت فريد للعنصر المحلي (ليس من backend)
            doctorId: doctorId,
            dayOfWeek: newSlot.day,
            startTime: formatTime(newSlot.startTime),
            endTime: formatTime(endTime),
        };

        setTempSlots(prev => [...prev, newSlotObj]);
        setNewSlot({ day: '', startTime: '' });
        setFormError(null);
    };

    // حذف من الحالة المحلية فقط، لا يتصل بالbackend
    const handleDeleteSlot = (id) => {
        setTempSlots(prev => prev.filter(slot => slot.id !== id));
    };

    // عند الضغط على Save يتم مزامنة التغييرات مع السيرفر
    const handleSave = async () => {
        try {
            // slots الأصلية من backend
            // tempSlots التعديلات الحالية في الواجهة

            // 1. المواعيد الجديدة: في tempSlots ومش في slots (مقارنه بـ id)
            const newSlots = tempSlots.filter(ts => !slots.some(s => s.id === ts.id));

            // 2. المواعيد المحذوفة: في slots ومش في tempSlots
            const deletedSlots = slots.filter(s => !tempSlots.some(ts => ts.id === s.id));

            // إضافة المواعيد الجديدة للbackend
            for (const slot of newSlots) {
                // تجاهل المواعيد المؤقتة id يبدأ بـ "temp-"
                if (slot.id.startsWith('temp-')) {
                    const payload = {
                        doctorId: doctorId,
                        DayOfWeek: slot.dayOfWeek,
                        StartTime: slot.startTime,
                        EndTime: slot.endTime,
                    };
                    await axiosInstance.post('/DoctorAvailabilities', payload);
                }
            }

            // حذف المواعيد المحذوفة من backend
            for (const slot of deletedSlots) {
                await axiosInstance.delete(`/DoctorAvailabilities/${slot.id}`);
            }

            // إعادة جلب البيانات بعد التحديث
            const res = await axiosInstance.get(`/DoctorAvailabilities/by-doctor/${doctorId}`);
            setSlots(res.data);
            setTempSlots(res.data);
            setIsEditing(false);
            setFormError(null);
        } catch (error) {
            console.error('Error saving slots:', error);
            setFormError('Failed to save changes.');
        }
    };

    const handleCancel = () => {
        setTempSlots(slots);
        setNewSlot({ day: '', startTime: '' });
        setFormError(null);
        setIsEditing(false);
    };

    const groupByDay = (slotsArray) => {
        return slotsArray.reduce((acc, s) => {
            acc[s.dayOfWeek] = acc[s.dayOfWeek] ? [...acc[s.dayOfWeek], s] : [s];
            return acc;
        }, {});
    };

    const sortedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div>
                    <h5 className='mb-0' style={{ color: 'var(--first-color)' }}>Available Time Slots</h5>
                    <small className="text-muted">Each slot is 30 minutes.</small>
                </div>
                {!isEditing ? (
                    <button className='btn' style={{ color: 'var(--first-color)', border: '1px solid var(--first-color)' }} onClick={() => setIsEditing(true)}>Edit Slots</button>
                ) : (
                    <div className='text-end'>
                        <button className='btn btn-outline-success mb-1 mb-sm-0' onClick={handleSave}>Save</button>{' '}
                        <button className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </Card.Header>
            <Card.Body>
                {formError && <Alert variant='danger'>{formError}</Alert>}
                {Object.entries(groupByDay(isEditing ? tempSlots : slots))
                    .sort((a, b) => sortedDays.indexOf(a[0]) - sortedDays.indexOf(b[0]))
                    .map(([day, slotList]) => (
                        <div key={day} className='mb-3'>
                            <p style={{ color: 'var(--first-color)' }}><strong>{day}</strong></p>
                            <div className='d-flex flex-wrap gap-2'>
                                {slotList.map(slot => (
                                    <div key={slot.id} className='d-flex align-items-center'>
                                        <Badge bg='primary' className='p-2 fs-6'>{slot.startTime} - {slot.endTime}</Badge>
                                        {isEditing && (
                                            <Button variant='danger' size='sm' className='ms-2' onClick={() => handleDeleteSlot(slot.id)}>x</Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {isEditing && (
                    <div className='mt-4'>
                        <h6>Add New Slot</h6>
                        <Form.Group className='mb-2'>
                            <Form.Label>Day:</Form.Label>
                            <Form.Select name='day' value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}>
                                <option value=''>Select Day</option>
                                {sortedDays.map(day => <option key={day} value={day}>{day}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Start Time:</Form.Label>
                            <Form.Control
                                type='time'
                                value={newSlot.startTime}
                                onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                            />
                        </Form.Group>
                        <Button onClick={handleAddSlot} style={{ background: 'var(--first-color)', color: 'white' }}>Add Slot</Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
