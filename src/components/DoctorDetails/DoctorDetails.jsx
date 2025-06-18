import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorDetails.css'
import { useNavigate, useParams} from 'react-router-dom';
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'; 
import { Card, Image, ListGroup,Form,Button, InputGroup } from 'react-bootstrap';
export default function Doctor() {
  const {id} = useParams();
  const navigate = useNavigate(); 
//-------------------------
  const [formData, setFormData] = useState({
    date: '',
    time:'',
    patientName: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    let myFormData={...formData};
    myFormData[e.target.name]=e.target.value;
    setFormData(myFormData);
    console.log(formData);
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    // انتقل إلى مسار جديد، مع تمرير formData كـ state
    navigate('/booking-confirmation', { state: { formData: formData, doctorInfo: docInfo } });
  };

  //--------------------------------
  const [docInfo]=useState({
      id:{id},
      image:'/images/doctor1.jpg',
      first_name: 'Vincent',
      last_name: 'Brinky',
      gender: 'male',
      phone_number: '',
      address_1: '34 Sandpiper Lane',
      address_2: 'Amaganset Caifornia 11930',
      specialization: 'Cardiology and Vascular Disease',
      years_of_experience: '5',
      workplace: 'hghgjjkjjljlklk jhm,k,n yugu g yiiyiyiyuyuy yiyiyiyi kjkjkhyyty trsresrddhg jhgjkh klhku yutuydt yufyfjf g ugjfg  fyf',
      Professional_Title: 'specialist',
      fees:'$50',
      about_doctor:'klklklklklkl kklklklklklklkl lklklklklklklk klklklklklklkl',
  });
  const [workingHours,setWorkingHours]=useState([
    {day_of_week:'Monday',
    start_time:'8:00 AM',
    end_time:'5:00 PM'
    },
    {day_of_week:'Tuesday',
    start_time:'8:00 AM',
    end_time:'2:00 PM'
    },
    {day_of_week:'Monday',
    start_time:'2:00 PM',
    end_time:'9:00 PM'
    },
  ]);

  useEffect(()=>{
        axios({
            method:"GET",
            url:`http://localhost:5173/doctor/${id}`,
        }).then((data)=>{
        // setDocInfo(data.data);
        // console.log(data.data);
        });
    },[id]);
  return (
    <div className='container'>
      <div className='doctor-details-container py-5'>
        <Card className="border border-dark-subtle shadow-sm ">
          <Card.Body className="d-flex flex-column align-items-center">
            <Image
              src={docInfo.image} 
              roundedCircle
              width={150}
              height={150}
              className="mb-3 p-1 "
              style={{border:'2px solid var(--first-color)'}}
            />
            <h4 style={{color:'var(--first-color)'}}>Dr. {docInfo.first_name} {docInfo.last_name}</h4>
            <p className="text-muted mb-4">{docInfo.Professional_Title} {docInfo.specialization}</p>

            <ListGroup variant="flush" className="w-100">
              <ListGroup.Item>
                <h6 className='d-flex align-items-center'><FaCircle className=' fa-check-circle icon me-2'/> About</h6>
                <p className='ps-4 m-0'>Board-certified cardiologist with over 21 years of experience. Fellowship-trained in interventional cardiology. Expertise in coronary angiography, angioplasty, and stent placement.</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className='d-flex align-items-center'><FaCircle className=' fa-check-circle icon me-2'/> Work place</h6>
                <p className='ps-4 m-0'>{docInfo.workplace}</p>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex align-items-center'>
                <FaLocationDot className='fs-5 icon me-1'/> {docInfo.address_1},{docInfo.address_2}
              </ListGroup.Item>
              <ListGroup.Item className='d-flex align-items-center'>
                <FaCircle className=' fa-check-circle icon me-2'/> <span className='fw-semibold'>Appointment:</span> <span className='text-success fw-bolder ps-1'>{docInfo.fees}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <div className=' d-flex flex-column gap-4 h-100 justify-content-around'>
          <div className='border border-dark-subtle rounded shadow-sm p-3'>
            <h5 className="working-hours">Working hours</h5>
            <div className='my-2'>
              {workingHours.map((element,index)=>(
                <div key={index} className='d-flex align-items-center '>
                  <FaCircle className=' fa-check-circle icon me-2'/> {element.day_of_week}: <span className="fw-bold ps-1">{element.start_time} <span className='line-icon '>-</span> {element.end_time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='border border-dark-subtle rounded shadow-sm p-3 '>
            <h5 className='book-an-appointment pb-2'>Book an appointment</h5>
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formDate">
              <InputGroup>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text><FaCalendarAlt style={{color:'var(--first-color)'}}/></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTime">
              <InputGroup>
                <Form.Control
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
                <InputGroup.Text><FaRegClock style={{color:'var(--first-color)'}}/></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPatientName">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="The patient's name that will detect"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text><FaUser style={{color:'var(--first-color)'}}/></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <InputGroup>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text><FaPhone style={{color:'var(--first-color)'}}/></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputGroup.Text><FaEnvelope style={{color:'var(--first-color)'}}/></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button style={{background:'var(--first-color)'}} type="submit" className="w-100">
              Booking confirmation
            </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
