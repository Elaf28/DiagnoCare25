import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axiosPublic from '../../api/axiosPublic';  
import axiosInstance from '../../api/axiosInstance';
import './DoctorDetails.css';
import axios from 'axios';
export default function Doctor() {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docInfo, setDocInfo] = useState(null);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/Doctors/${id}/overview`);
        setDocInfo(response.data);
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };

    const fetchSlots = async () => {
      try {
        const res = await axiosPublic.get(`/DoctorAvailabilities/by-doctor/${id}`);
        setSlots(res.data);
      } catch (err) {
        console.error('Error fetching slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
    fetchSlots();
  }, [id]);

  const getNextDateForDay = (dayOfWeek) => {
    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayOfWeek);
    const diff = (targetDay - todayDay + 7) % 7 || 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);
    return nextDate.toISOString().split('T')[0];
  };

  const groupedByDate = slots.reduce((acc, slot) => {
    const date = getNextDateForDay(slot.dayOfWeek);
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };
  const confirmBooking = async () => {
  const { id: slotId, startTime, dayOfWeek } = selectedSlot;
  const date = getNextDateForDay(dayOfWeek);
  const formattedTime = startTime.length === 5 ? `${startTime}:00` : startTime;

  const result = await Swal.fire({
    title: 'Confirm Booking',
    text: `You selected ${dayOfWeek} at ${startTime}. This will take you to the payment page.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Proceed to Payment'
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.post(
        'http://dcare.runasp.net/api/Appointments/book',
        {
          doctorId: id,
          availabilityId: slotId,
          date,
          time: formattedTime
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });

    } catch (err) {
      console.error('Booking failed:', err);
      Swal.fire('Error', 'Booking or payment failed. Try again.', 'error');
    }
  }
};

  return (
    <div className='container'>
      <div className='doctor-details-container py-5'>
        {docInfo && (
          <Card className="border border-dark-subtle shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center">
              <h4 style={{ color: 'var(--first-color)' }}>Dr. {docInfo.fullName}</h4>

              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item>
                  <h6 className='d-flex align-items-center'><FaCircle className='fa-check-circle icon me-2' /> About</h6>
                  <p className='ps-4 m-0'>{docInfo.aboutDoctor}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className='d-flex align-items-center'><FaCircle className='fa-check-circle icon me-2' /> Work place</h6>
                  <p className='ps-4 m-0'>{docInfo.workplace}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className='d-flex align-items-center'><FaLocationDot className='fs-5 icon me-1' /> Address</h6>
                  <p className='ps-4 m-0'>{docInfo.address1}, {docInfo.address2}</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                  <FaCircle className='fa-check-circle icon me-2' />
                  <span className='fw-semibold'>Consultation Fee:</span>
                  <span className='text-success fw-bolder ps-1'>$ {docInfo.fees}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        )}

        <Card className="border border-dark-subtle shadow-sm h-100">
          <div className="booking-container container h-100">
            <h3 className="my-3" style={{ color: 'var(--first-color)' }}>Choose an Appointment Slot</h3>
            <p className="text-muted">Each appointment is <strong>30 minutes</strong>.</p>

            {loading ? (
              <p>Loading slots...</p>
            ) : slots.length === 0 ? (
              <p className="text-muted">No available slots at the moment. Please check back later.</p>
            ) : (
              Object.entries(groupedByDate).map(([date, slots]) => (
                <div key={date} className="mb-4">
                  <h6 style={{ color: 'var(--first-color)' }}>
                    {new Date(date).toLocaleDateString(undefined, { weekday: 'long' })} ({date}) 
                  </h6>
                  <div className="slot-buttons">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        className={`slot-btn ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(slot)}
                      >
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}

            {selectedSlot && (
              <div className="text-center mt-4">
                <button className="btn btn-success px-4 py-2" onClick={confirmBooking}>
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
