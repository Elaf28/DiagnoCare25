import React from 'react';
import './Labs.css';
import { useNavigate } from 'react-router-dom';

export default function Labs() {
    const navigate= useNavigate();
    const handleCardClick=(path)=>{
        navigate(path);
    }
    return (
        <div className='container lab-content'>
        <div className='row py-5 align-items-center '>
            <div className='col-md-5'>
            <img className='Labs-image' src="/images/5803206789716625860.jpg" alt="" />
            </div>
            <div className='col-md-7 d-flex flex-column gap-5'>
            <div className='Labs-card allCard' onClick={()=>handleCardClick('/examinations/bloodDiagnosis')}>Complete Blood Count (CBC) Test</div>
            <div className='Labs-card allCard' onClick={()=>handleCardClick('/examinations/heartDisease')}>Heart Disease Prediction</div>
            <div className='Labs-card allCard' onClick={()=>handleCardClick('/examinations/diabetesDiagnosis')}>Diabetes</div>
            </div>
        </div>
        </div>
    );
}