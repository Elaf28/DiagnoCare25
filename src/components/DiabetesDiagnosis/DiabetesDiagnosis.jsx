import React, { useState } from 'react';
import axios from 'axios';
import './DiabetesDiagnosis.css'
export default function DiabetesDiagnosis() {
    const [diabetesData, setDiabetesData] = useState({
        gender:'Male',
        age:'',
        hypertension:'0',
        heart_disease:'0',
        bmi: '',
        HbA1c_level: '',
        blood_glucose_level:'',
    });
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleIncrement = (name) => {
        setDiabetesData((prevParameters) => ({
        ...prevParameters,
        [name]: prevParameters[name] === '' ? '1' : (parseFloat(prevParameters[name]) + 1),
        }));
    };

    const handleDecrement = (name) => {
        setDiabetesData((prevParameters) => ({
        ...prevParameters,
        [name]: prevParameters[name] === '' ? '-1' : (parseFloat(prevParameters[name]) - 1),
        }));
    };
    function getDiabetesData(eventInfo){
        let myDiabetesData={...diabetesData} ;
        myDiabetesData[eventInfo.target.name]=eventInfo.target.value;
        setDiabetesData(myDiabetesData);
        console.log(myDiabetesData)
    }
    async function sendDiabetesDataToApi(){
        try {
            let {data}= await axios.post(`https://91eb-2c0f-fc89-8032-61c5-9f-b9b4-27f0-45a3.ngrok-free.app/predict`,diabetesData); 
            console.log(data)
                setDiagnosis(data.result);
                setLoading(false);
        } catch (error) {
            setError('An error occurred while communicating with the API.');
            console.error("Error calling API:", error);
            setLoading(false);
        }
    }
    function submitDiabetesForm(e){
        e.preventDefault();
        setLoading(true);
        setError('');
        setDiagnosis('');
        sendDiabetesDataToApi();
        console.log(diabetesData)
    }
    return (
        <>
        <div className='container py-5'>
            <h3 className='diabetes-title mb-3'>Diabetes Diagnosis</h3>
            <p className='text-center'>Enter Patient Data for Diabetes Diagnosis</p>
            <form onSubmit={submitDiabetesForm}>
            <div className='row'>
                <div className='col-md-6'>
                    <label className='diabetes-label' htmlFor="gender">Gender</label>
                    <div className="form-check my-2">
                            <input className="form-check-input" type="radio" name="gender" id='Male' value="Male"  checked={diabetesData.gender === "Male"} onChange={getDiabetesData} />
                            <label className="form-check-label" htmlFor='Male'>
                                Male
                            </label>
                    </div>
                    <div className="form-check my-2">
                            <input className="form-check-input" type="radio" name="gender" id='Female' value="Female" checked={diabetesData.gender === "Female"} onChange={getDiabetesData} />
                            <label className="form-check-label" htmlFor='Female'>
                                Female
                            </label>
                    </div>
                </div>


                <div className='col-md-6'>
                    <label className='diabetes-label'>Hypertension</label>
                    <div className="form-check my-2">
                        <input className="form-check-input" type="radio" name="hypertension" id='0' value="0" checked={diabetesData.hypertension === "0"} onChange={getDiabetesData} />
                        <label className="form-check-label " htmlFor='0'>
                            No
                        </label>
                    </div>
                    <div className="form-check my-2">
                            <input className="form-check-input" type="radio" name="hypertension" id='1' value="1" checked={diabetesData.hypertension === "1"} onChange={getDiabetesData} />
                            <label className="form-check-label" htmlFor='1'>
                                Yes
                            </label>
                    </div>
                </div>

                
                <div className='col-md-6'>
                <label className='diabetes-label'>Heart Disease</label>
                <div className="form-check my-2">
                        <input className="form-check-input" type="radio" name="heart_disease" id='no' value="0" checked={diabetesData.heart_disease === "0"} onChange={getDiabetesData} />
                        <label className="form-check-label " htmlFor='no'>
                            No
                        </label>
                    </div>
                    <div className="form-check my-2">
                        <input className="form-check-input" type="radio" name="heart_disease" id='yes' value="1" checked={diabetesData.heart_disease === "1"} onChange={getDiabetesData} />
                        <label className="form-check-label" htmlFor='yes'>
                            Yes
                        </label>
                    </div>
                </div>

                <div className='col-md-6'>
                    <label className='diabetes-label' htmlFor="age">Age</label>
                    <div className="input-group diagnosis-input-group">
                        <input type="text" id="age" name="age" className=' form-control' placeholder="Enter your age" aria-label="Recipient's username with two button addons" required value={diabetesData.age} onChange={getDiabetesData} />
                            <button className="incDec__button" type="button" onClick={() => handleIncrement('age')}>+</button>
                            <button className="incDec__button" type="button" onClick={() => handleDecrement('age')}>-</button>
                    </div>
                </div> 
                <div className='col-md-6'>
                    <label className='diabetes-label' htmlFor="bmi">BMI(Body Mass index)</label>
                    <div className="input-group diagnosis-input-group">
                    <input type="text" id="bmi" name="bmi" className=' form-control' placeholder="Enter value" aria-label="Recipient's username with two button addons" required value={diabetesData.bmi} onChange={getDiabetesData} />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('bmi')}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('bmi')}>-</button>
                    </div>
                </div>

                <div className='col-md-6'>
                    <label className='diabetes-label' htmlFor="HbA1c_level">Hemoglobin A1c level</label>
                    <div className="input-group diagnosis-input-group">
                            <input type="text" id="HbA1c_level" name="HbA1c_level" className=' form-control' placeholder="Enter value" aria-label="Recipient's username with two button addons" required value={diabetesData.HbA1c_level} onChange={getDiabetesData}/>
                            <button className="incDec__button" type="button" onClick={() => handleIncrement('HbA1c_level')}>+</button>
                            <button className="incDec__button" type="button" onClick={() => handleDecrement('HbA1c_level')}>-</button>
                    </div>
                </div>

                <div className='col-md-6'>
                    <label className='diabetes-label' htmlFor="blood_glucose_level">Blood glucose level</label>
                    <div className="input-group diagnosis-input-group">
                        <input type="text" id="blood_glucose_level" name="blood_glucose_level" className=' form-control' placeholder="Enter value" aria-label="Recipient's username with two button addons" required value={diabetesData.blood_glucose_level} onChange={getDiabetesData} />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('blood_glucose_level')}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('blood_glucose_level')}>-</button>
                    </div>
                    
                </div>
            </div>

            {loading ? <button class="predict-button " type="button" disabled>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                    </button> : <button type="submit" className="predict-button" disabled={loading}>Predict Diagnosis</button>
            }
                
            </form>
            {error && (<div class="alert alert-danger m-3" role="alert">
                    <h4>error</h4>
                    <p>{error}</p>
                    </div>

            )}
            {diagnosis && (
                <div class="alert alert-primary m-3 fs-5" role="alert">
                    <strong>Predicted Diagnosis is: </strong>
                    {diagnosis}
                </div>
            )}
            
        </div>
        </>
    )
}

