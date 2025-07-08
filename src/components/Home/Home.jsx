import React from 'react';
import './Home.css';
import home2 from '../../assets/images/home2.png';
import doctor from '../../assets/images/doctor 2.png';
import robot from '../../assets/images/robot2.png';
import about from '../../assets/images/about.png';
import { Link } from 'react-router-dom';
export default function Home() {
    return (<>
        <div className='container my-5'> 
            <div className='home'>
                <div className='home__info'>
                    <h2 className='home__title fs-1'>Your health <br /> is always <br /> in the first place.</h2>
                    <p className='home__description '>We combine the latest technology with medical expertise. Get an accurate diagnosis for your health condition in record time.</p>
                </div>
                <div className='image1 '><img className='image2' src={home2} alt="" /></div>
            </div>
            <div id='our-services' className="services">
                <hr className='w-50'/>
                <h3 className="services__title fs-2 fw-bold">OUR SERVICES</h3>
                <div className="cards row d-flex align-items-center my-5 justify-content-around gap-3">
                    <div className='col-md-5 ' >
                        <Link className='link' to={`specialties`}>
                            <div className="cards__cardHome allCard">
                                <div className="card__img "><img className='image__CardHome' src={doctor} alt="" /></div>
                                <div className='card-body card__description px-1 pt-2'>
                                    <p className='card__description  fs-5'>Do you want to contact a doctor to diagnose your condition?</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-5 '>
                        <Link className='link' to={`diagnosis`}>
                            <div className="cards__cardHome allCard">
                                <div className="card__img "><img className='image__CardHome' src={robot} alt="" /></div>
                                <div className='card-body card__description px-1 pt-2'>
                                    <p className='card__description fs-5'>Do you want to diagnose your condition through the site?</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    {/* About us */}
    <section id='about-us' className="about-us py-4">
    <div className="container">
        <div className="text-center mb-5">
            <h3 className="about__title fs-2 fw-bold ">ABOUT US</h3>
        </div>

        <div className="row d-flex align-items-center justify-content-around gap-4">
            <div className='about-image col-md-5'>
                <img src={about} alt="DiagnoCare Medical Platform" className="img-fluid" />
            </div>
            <div className='about__description-container col-md-5'>
                <p className='about__description fs-5 lh-base'>
                    DiagnoCare is an integrated medical platform aiming to simplify the patient's journey and provide comprehensive healthcare.
                    <br/><br/>
                    We offer you the ability to perform all required medical tests, such as blood sugar and other diverse blood analyses. We also provide advanced imaging services like brain scans for tumors, chest scans, and more.
                    <br/><br/>
                    We make it easy for you to find the right doctor; we suggest specialized physicians across all medical specialties, and you can book an appointment with your preferred doctor or specialist in any field with complete ease.
                    <br/><br/>
                    To provide a quick and reliable preliminary diagnosis, the website also includes a diagnostic chatbot for instant assessment.
                </p>
            </div>
        </div>
    </div>
    </section>
    {/* Why choose us */}
    <section className="why-choose-us py-5">
        <div className="container">
            <h3 className='fs-2 why-choose-us-title mb-4'>WHY CHOOSE US</h3>
            <ul className="list-group list-group-horizontal-md row why-choose-us-list ">
                <li className="list-group-item col-md-4 d-flex flex-column justify-content-between">
                    <h5 className="">Integrated Diagnostic Excellence</h5>
                    <p className="">We offer diverse and accurate tests and imaging services, complemented by a smart chatbot for comprehensive and rapid health assessments.</p>
                </li>
                <li className="list-group-item col-md-4 d-flex flex-column justify-content-between">
                    <h5 className="">Seamless Doctor & Appointment Management</h5>
                    <p className="">We provide easy access to specialized doctors and quick, convenient appointment booking across all medical specialties.</p>
                </li>
                <li className="list-group-item col-md-4 d-flex flex-column justify-content-between">
                    <h5 className="">Secure & Private Healthcare</h5>
                    <p className="">We adhere to the highest security and confidentiality standards to fully protect your medical and personal data.</p>
                </li>
            </ul>
        </div>
    </section>
    
    </>
    )
}









