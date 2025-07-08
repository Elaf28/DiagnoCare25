import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';

export default function DoctorSlotsManager() {
    const [slots, setSlots] = useState([]);
    const [tempSlots, setTempSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ day: '', startTime: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await axiosInstance.get(`/DoctorAvailabilities/my-available`);
                setSlots(res.data);
                setTempSlots(res.data);
            } catch (err) {
                console.error('Error fetching slots:', err);
            }
        };
        fetchSlots();
    }, []);

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
        const newSlotObj = {
            id: `temp-${Date.now()}`,
            dayOfWeek: newSlot.day,
            startTime: formatTime(newSlot.startTime),
            endTime: formatTime(endTime),
        };

        setTempSlots(prev => [...prev, newSlotObj]);
        setNewSlot({ day: '', startTime: '' });
        setFormError(null);
    };

    const handleDeleteSlot = (id) => {
        setTempSlots(prev => prev.filter(slot => slot.id !== id));
    };

    const handleSave = async () => {
    try {
        const newSlots = tempSlots.filter(ts => !slots.some(s => s.id === ts.id));
        const deletedSlots = slots.filter(s => !tempSlots.some(ts => ts.id === s.id));

        for (const slot of newSlots) {
            if (slot.id.startsWith('temp-')) {
                const payload = {
                    doctorId: localStorage.getItem('userId'), 
                    DayOfWeek: slot.dayOfWeek,
                    StartTime: slot.startTime,
                    EndTime: slot.endTime,
                };
                await axiosInstance.post('/DoctorAvailabilities', payload);
            }
        }

        for (const slot of deletedSlots) {
            await axiosInstance.delete(`/DoctorAvailabilities/${slot.id}`);
        }

        const res = await axiosInstance.get(`/DoctorAvailabilities/my-available`);
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
                    <small className="text-muted">Each slot is <strong>30 minutes</strong> .</small>
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
