// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './DoctorDetails.css'
// import { useNavigate, useParams} from 'react-router-dom';
// import { FaLocationDot, FaRegClock } from "react-icons/fa6";
// import { FaCircle } from "react-icons/fa";
// import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'; 
// import { Card, Image, ListGroup,Form,Button, InputGroup } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// export default function DoctorDetails() {
//   const {id} = useParams();
//   const navigate = useNavigate();
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const res = await axios.get(`http://your-api-url.com/api/doctors/${id}/slots`);
//         setSlots(res.data);
//       } catch (err) {
//         console.error('Error fetching slots:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [id]);

//   // حساب التاريخ القادم لكل يوم
//   const getNextDateForDay = (dayOfWeek) => {
//     const today = new Date();
//     const todayDay = today.getDay();
//     const targetDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(dayOfWeek);
//     const diff = (targetDay - todayDay + 7) % 7 || 7;
//     const nextDate = new Date(today);
//     nextDate.setDate(today.getDate() + diff);
//     return nextDate.toISOString().split('T')[0];
//   };

//   // تجميع المواعيد حسب اليوم
//   const groupedByDate = slots.reduce((acc, slot) => {
//     const date = getNextDateForDay(slot.dayOfWeek);
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(slot);
//     return acc;
//   }, {});

//   const handleSelect = (slot) => {
//     setSelectedSlot(slot);
//   };

//   const confirmBooking = async () => {
//     const { id: slotId, startTime, dayOfWeek } = selectedSlot;
//     const date = getNextDateForDay(dayOfWeek);

//     const result = await Swal.fire({
//       title: 'Proceed to Payment',
//       text: `Are you sure you want to book on ${dayOfWeek} at ${startTime}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Book it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.post(`http://your-api-url.com/api/bookings`, {
//           patientId: patientId,
//           doctorId: id,
//           slotId: slotId,   
//           date: date,       
//           time: startTime   
//         });

//         // ✅ رسالة نجاح
//         Swal.fire({
//           title: 'Success',
//           text: 'Your appointment is reserved. Please proceed to payment to confirm it.',
//           icon: 'success',
//           confirmButtonText: 'Go to Payment'
//         }).then(() => {
//           // ✅ التنقل إلى صفحة الدفع
//           navigate('/payment');
//         });

//       } catch (err) {
//         console.error('Booking failed:', err);
//         Swal.fire('Error', 'Booking failed. Try again.', 'error');
//       }
//     }

//   //--------------------------------
//   const [docInfo]=useState({
//       id:{id},
//       image:'/images/doctor1.jpg',
//       first_name: 'Vincent',
//       last_name: 'Brinky',
//       gender: 'male',
//       phone_number: '',
//       address_1: '34 Sandpiper Lane',
//       address_2: 'Amaganset Caifornia 11930',
//       specialization: 'Cardiology and Vascular Disease',
//       years_of_experience: '5',
//       workplace: 'hghgjjkjjljlklk jhm,k,n yugu g yiiyiyiyuyuy yiyiyiyi kjkjkhyyty trsresrddhg jhgjkh klhku yutuydt yufyfjf g ugjfg  fyf',
//       Professional_Title: 'specialist',
//       fees:'$50',
//       about_doctor:'klklklklklkl kklklklklklklkl lklklklklklklk klklklklklklkl',
//   });

//   useEffect(()=>{
//         axios({
//             method:"GET",
//             url:`http://localhost:5173/doctor/${id}`,
//         }).then((data)=>{
//         // setDocInfo(data.data);
//         // console.log(data.data);
//         });
//     },[id]);
//   return (
//     <div className='container'>
//       <div className='doctor-details-container py-5'>
//         <Card className="border border-dark-subtle shadow-sm ">
//           <Card.Body className="d-flex flex-column align-items-center">
//             <Image
//               src={docInfo.image} 
//               roundedCircle
//               width={150}
//               height={150}
//               className="mb-3 p-1 "
//               style={{border:'2px solid var(--first-color)'}}
//             />
//             <h4 style={{color:'var(--first-color)'}}>Dr. {docInfo.first_name} {docInfo.last_name}</h4>
//             <p className="text-muted mb-4">{docInfo.Professional_Title} {docInfo.specialization}</p>

//             <ListGroup variant="flush" className="w-100">
//               <ListGroup.Item>
//                 <h6 className='d-flex align-items-center'><FaCircle className=' fa-check-circle icon me-2'/> About</h6>
//                 <p className='ps-4 m-0'>Board-certified cardiologist with over 21 years of experience. Fellowship-trained in interventional cardiology. Expertise in coronary angiography, angioplasty, and stent placement.</p>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <h6 className='d-flex align-items-center'><FaCircle className=' fa-check-circle icon me-2'/> Work place</h6>
//                 <p className='ps-4 m-0'>{docInfo.workplace}</p>
//               </ListGroup.Item>
//               <ListGroup.Item className='d-flex align-items-center'>
//                 <FaLocationDot className='fs-5 icon me-1'/> {docInfo.address_1},{docInfo.address_2}
//               </ListGroup.Item>
//               <ListGroup.Item className='d-flex align-items-center'>
//                 <FaCircle className=' fa-check-circle icon me-2'/> <span className='fw-semibold'>Appointment:</span> <span className='text-success fw-bolder ps-1'>{docInfo.fees}</span>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

        

// {/* ************************************************* */}
// <Card className="border border-dark-subtle shadow-sm h-100 ">
//  <div className="booking-container container h-100">
//       <h3 className="my-3" style={{ color: 'var(--first-color)' }}>Choose an Appointment Slot</h3>
//       <p className="text-muted">Each appointment is <strong>30 minutes</strong>.</p>

//       {loading ? (
//         <p>Loading slots...</p>
//       ) : (
//         Object.entries(groupedByDate).map(([date, slots]) => (
//           <div key={date} className="mb-4">
//             <h6 style={{ color: 'var(--first-color)' }}>{date}</h6>
//             <div className="slot-buttons">
//               {slots.map((slot) => (
//                 <button
//                   key={slot.id}
//                   className={`slot-btn ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
//                   onClick={() => handleSelect(slot)}
//                 >
//                   {slot.startTime}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))
//       )}

//       {selectedSlot && (
//         <div className="text-center mt-4">
//           <button className="btn btn-success px-4 py-2" onClick={confirmBooking}>Proceed to Payment</button>
//         </div>
//       )}
//     </div>
//     </Card>
// {/* ************************************************* */}

//       </div>
//     </div>
//   )
//   }}


















import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Card, Image, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axiosPublic from '../../api/axiosPublic';  
import axiosInstance from '../../api/axiosInstance';
import './DoctorDetails.css';

export default function Doctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docInfo, setDocInfo] = useState(null);
  const patientId = useSelector((state) => state.auth.user?.id);

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

    const result = await Swal.fire({
      title: 'Confirm Booking',
      text: `You selected ${dayOfWeek} at ${startTime}. This will take you to the payment page.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.post(`/api/bookings`, {
          patientId: patientId,
          doctorId: id,
          slotId: slotId,
          date: date,
          time: startTime
        });

        Swal.fire({
          title: 'Booking Reserved',
          text: 'Your appointment has been reserved. Please complete the payment to confirm it.',
          icon: 'success',
          confirmButtonText: 'Go to Payment'
        }).then(() => {
          navigate('/payment');
        });

      } catch (err) {
        console.error('Booking failed:', err);
        Swal.fire('Error', 'Booking failed. Try again.', 'error');
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
              <p className="text-muted mb-4">{docInfo.Professional_Title} {docInfo.specialization}</p>

              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item>
                  <h6 className='d-flex align-items-center'><FaCircle className='fa-check-circle icon me-2' /> About</h6>
                  <p className='ps-4 m-0'>{docInfo.aboutDoctor}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className='d-flex align-items-center'><FaCircle className='fa-check-circle icon me-2' /> Work place</h6>
                  <p className='ps-4 m-0'>{docInfo.workplace}</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                  <FaLocationDot className='fs-5 icon me-1' /> {docInfo.address1}, {docInfo.address2}
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                  <FaCircle className='fa-check-circle icon me-2' /> <span className='fw-semibold'>Consultation Fee:</span> <span className='text-success fw-bolder ps-1'>$ {docInfo.fees}</span>
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
                  <h6 style={{ color: 'var(--first-color)' }}>{date}</h6>
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






