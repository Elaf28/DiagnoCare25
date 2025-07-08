import React, { useState } from 'react';
import axios from 'axios';
import './HeartDisease.css'
import { FaHeart } from "react-icons/fa";
export default function HeartDisease() {
    const [heartData, setHeartData] = useState({
        Age: '',
        Sex: 'M',
        ChestPainType:'ATA',
        RestingBP: '',
        Cholesterol: '',
        FastingBS:'0',
        RestingECG:'Normal',
        MaxHR:'',
        ExerciseAngina:'N',
        Oldpeak:'',
        ST_Slope:'Up',
    });
    const [predictionResult, setPredictionResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleIncrement = (name,fixedNum) => {
        setHeartData((prevParameters) => ({
        ...prevParameters,
        [name]: prevParameters[name] === '' ? '1' : (parseFloat(prevParameters[name]) + 1).toFixed(fixedNum),
        }));
    };
    const handleDecrement = (name,fixedNum) => {
        setHeartData((prevParameters) => ({
        ...prevParameters,
        [name]: prevParameters[name] === '' ? '-1' : (parseFloat(prevParameters[name]) - 1).toFixed(fixedNum),
        }));
    };
    function getHeartData(eventInfo){
        let myDiabetesData={...heartData} ;
        myDiabetesData[eventInfo.target.name]=eventInfo.target.value;
        setHeartData(myDiabetesData);
        // console.log(myDiabetesData)
    }

    async function sendHeartDataToApi(){
        try {
            let {data}= await axios.post(`https://Mohamed411s-Health-Care-System.hf.space/predict/heart`,heartData); 
            // console.log(data)
            setPredictionResult(data.result);
            setLoading(false);
        } catch (error) {
            setError('Failed to get prediction. Please try again later.');
            console.error("Error calling API:", error);
            setLoading(false);
        }
    }
    function submitHeartForm(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPredictionResult('');
        sendHeartDataToApi();
        // console.log(heartData)
    }
    return (<>
        <div className='container heart-disease-container'>
            <h3 className='blood-title'><FaHeart className='heart-icon' /><p>Heart Disease Prediction</p></h3>
            <p className='text-center'>This Al tool predicts the likelihood of heart disease based on clinical parameters.</p>
            <form onSubmit={submitHeartForm}>
            <div className='row'>
                <div className='col-md-6'>
                    <label htmlFor="age" className='heart__label'>Age</label>
                    <div className="input-group diagnosis-input-group">
                        <input type="text"  required className='form-control' placeholder="Enter value" id="age" name="Age" value={heartData.Age} onChange={getHeartData} aria-label="Recipient's username with two button addons" />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('Age',0)}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('Age',0)}>-</button>
                    </div>
                </div>

                <div className='col-md-6'>
                    <label className='heart__label'>Gender</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="Sex" id='Male' value="M" checked={heartData.Sex === "M"} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='Male'>
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="Sex" id='Female' value="F" checked={heartData.Sex === "F"} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='Female'>
                            Female
                        </label>
                    </div>
                </div>

            <div className='col-md-6'>
                <label htmlFor="chestPainType" className='heart__label'>Chest Pain Type:</label>
                <div className='diagnosis-input-group'>
                <select id="chestPainType" style={{'padding':'11px'}} className="form-select" aria-label="Default select example" name="ChestPainType" value={heartData.ChestPainType} onChange={getHeartData}>
                    <option value="ATA">ATA</option>
                    <option value="NAP">NAP</option>
                    <option value="ASY">ASY</option>
                    <option value="TA">TA</option>
                </select>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="restingBP" className='heart__label'>Resting blood pressure</label>
                <div className="input-group diagnosis-input-group">
                        <input type="text"  required className='form-control' placeholder="Enter value" id="restingBP" name="RestingBP" value={heartData.RestingBP} onChange={getHeartData} aria-label="Recipient's username with two button addons" />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('RestingBP',0)}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('RestingBP',0)}>-</button>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="cholesterol" className='heart__label'>Serum cholesterol (mg/dL)</label>
                <div className="input-group diagnosis-input-group">
                        <input type="text"  required className='form-control' placeholder="Enter value" id="cholesterol" name="Cholesterol" value={heartData.Cholesterol} onChange={getHeartData} aria-label="Recipient's username with two button addons" />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('Cholesterol',0)}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('Cholesterol',0)}>-</button>
                </div>
            </div>

            <div className='col-md-6'>
                <label className='heart__label'>Fasting BS &gt; 120 mg/dl?</label>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="FastingBS" id='0' value="0" checked={heartData.FastingBS === "0"} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='0'>
                            No
                        </label>
                </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="FastingBS" id='1' value="1" checked={heartData.FastingBS === "1"} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='1'>
                            Yes
                        </label>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="RestingECG" className='heart__label'>Resting ECG:</label>
                <div className='diagnosis-input-group'>
                    <select id="RestingECG" style={{'padding':'11px'}} className="form-select " aria-label="Default select example" name="RestingECG" value={heartData.RestingECG} onChange={getHeartData}>
                    <option value="Normal">Normal</option>
                    <option value="ST">ST</option>
                    <option value="LVH">LVH</option>
                    </select>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="MaxHR" className='heart__label'>Max Heart Rate</label>
                <div className="input-group diagnosis-input-group">
                        <input type="text"  required className='form-control' placeholder="Enter value" id="MaxHR" name="MaxHR" value={heartData.MaxHR} onChange={getHeartData} aria-label="Recipient's username with two button addons" />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('MaxHR',0)}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('MaxHR',0)}>-</button>
                </div>
            </div>

            <div className='col-md-6'>
                <label className='heart__label'>Exercise-Induced Angina</label>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="ExerciseAngina" id='No' value="N" checked={heartData.ExerciseAngina === 'N'} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='No'>
                            No
                        </label>
                </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="ExerciseAngina" id='Yes' value="Y" checked={heartData.ExerciseAngina === 'Y'} onChange={getHeartData} />
                        <label className="form-check-label" htmlFor='Yes'>
                            Yes
                        </label>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="oldPeak" className='heart__label'>ST Depression (Oldpeak)</label>
                <div className="input-group diagnosis-input-group">
                        <input type="text"  required className='form-control' placeholder="Enter value" id="oldPeak" name="Oldpeak" value={heartData.Oldpeak} onChange={getHeartData} aria-label="Recipient's username with two button addons" />
                        <button className="incDec__button" type="button" onClick={() => handleIncrement('Oldpeak',2)}>+</button>
                        <button className="incDec__button" type="button" onClick={() => handleDecrement('Oldpeak',2)}>-</button>
                </div>
            </div>

            <div className='col-md-6'>
                <label htmlFor="stSlope" className='heart__label'>ST Slope</label>
                <div className='diagnosis-input-group'>
                    <select id="stSlope" className="form-select" style={{'padding':'11px'}} aria-label="Default select example" name="ST_Slope" value={heartData.ST_Slope} onChange={getHeartData}>
                    <option value="Up">Up</option>
                    <option value="Flat">Flat</option>
                    <option value="Down">Down</option>
                    </select>
                </div>
            </div>

            
                </div>
                {loading ? <button className="predict-button my-3" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
                </button> : <button type="submit" className="predict-button my-3" disabled={loading}>Predict Diagnosis</button>
            }

            {error && (<div className="alert alert-danger m-3" role="alert">
                    <h4>error</h4>
                    <p>{error}</p>
                    </div>
            )}
            {predictionResult && (
                <div className="alert alert-primary m-3 fs-5" role="alert">
                    <strong>Predicted Diagnosis is: </strong>
                    {predictionResult}
                </div>
            )}
            </form>
        </div>
    </>
    )
}
