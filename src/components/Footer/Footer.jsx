import React from 'react'
import { CiMail } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
export default function Footer() {
    const navigate = useNavigate();
    return (
        <div className='footer py-3'style={{backgroundColor: 'var(--third-color)',color:'white'}}>
            <div className='container'>
                <div className=' d-flex row  justify-content-around'>
                <div className='col-md-5 py-0'>
                    <h4 className='logo' style={{fontSize: '1.5rem'}}>DiagnoCare</h4>
                    <p className='fs-6 fw-light' style={{fontSize: '14px'}} >Your comprehensive platform for smart healthcare. Easily book your tests, scans, and connect with top doctors from anywhere.</p>
                </div>
                <div className='col-md-3 py-0'>
                    <p>Main Links</p>
                    <ul className='m-0 p-0 fw-light'style={{fontSize: '14px'}}>
                        <li className='pb-1'style={{cursor:'pointer'}} onClick={()=>navigate('/')}>Home</li>
                        <li className='pb-1'onClick={()=>navigate('/#about-us')} style={{cursor:'pointer'}}>About</li>
                        <li className='pb-1' onClick={()=>navigate('/#our-services')} style={{cursor:'pointer'}}>Services</li>
                    </ul>
                </div>
                <div className='col-md-3 py-0'>
                    <p>Contact Us</p>
                    <a href="mailto:diagnocaree@gmail.com" style={{fontSize: '14px',textDecoration:'none',color:'white'}}><CiMail style={{fontSize: '16px',fontWeight:'bold'}}/> Diagnocaree@gmail.com</a>
                </div>
            </div>
            </div>
        </div>
    )
}
