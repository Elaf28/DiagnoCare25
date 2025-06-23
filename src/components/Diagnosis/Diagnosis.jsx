import React from 'react'
import { Link } from 'react-router-dom';
import scan from '../../assets/images/scan.jpg';
import lab from '../../assets/images/lab.jpg';
import chat from '../../assets/images/chat.jpg';
import './Diagnosis.css'
export default function Diagnosis() {
  return (<>
    <div className='container '>
      <div className="cards_Diagnosis row d-flex align-items-center justify-content-around  ">
        <div className='col-md-4' >
          <Link className='link' to={`specialties`}>
            <div className="cards__cardDiagnosis allCard">
                <div className="card__img_diagnosis w-100"><img className='image__CardDiagnosis' src={chat} alt="" /></div>
                <div className='card-body-diagnosis card__description_diagnosis px-1 pt-2  d-flex align-items-center justify-content-center'>
                    <p className='card__description_diagnosis fs-4 '>Do you want a diagnosis based on symptoms?</p>
                </div>

            </div>
          </Link>
        </div>
        <div className='col-md-4'>
            <Link className='link ' to={`/diagnosis/ScanImage`}>
                <div className="cards__cardDiagnosis allCard">
                    <div className="card__img_diagnosis w-100"><img className='image__CardDiagnosis' src={scan} alt=""  /></div>
                    <div className='card-body-diagnosis card__description_diagnosis px-1 pt-2  d-flex align-items-center justify-content-center'>
                        <p className='card__description_diagnosis fs-4'>Do you want a diagnosis based on an ( MRI , X-ray  )?</p>
                    </div>
                </div>
            </Link>
        </div>
        <div className='col-md-4'>
            <Link className='link ' to={`/examinations`}>
                <div className="cards__cardDiagnosis allCard">
                    <div className="card__img_diagnosis w-100"><img className='image__CardDiagnosis' src={lab} alt=""  /></div>
                    <div className='card-body-diagnosis card__description_diagnosis px-1 pt-2  d-flex align-items-center justify-content-center'>
                        <p className='card__description_diagnosis fs-4'>Do you want an initial assessment for Diabetes, CBC and Heart Disease?
                        </p>
                    </div>
                </div>
            </Link>
        </div>
      </div>
    </div>
  </>
  )
}
