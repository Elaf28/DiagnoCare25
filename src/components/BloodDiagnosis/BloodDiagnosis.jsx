import React, { useState } from 'react';
import axios from 'axios';
import './BloodDiagnosis.css'; 
import { MdOutlineBloodtype } from "react-icons/md";
export default function BloodDiagnosis(){
    const [bloodData, setBloodData] = useState({
        WBC: '',
        LYMp: '',
        NEUTp: '',
        LYMn: '',
        NEUTn: '',
        RBC: '',
        HGB: '',
        HCT: '',
        MCV: '',
        MCH: '',
        MCHC: '',
        PLT: '',
        PDW: '',
        PCT: '',
    });
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleIncrement = (name) => {
        setBloodData((prevBloodData) => ({
        ...prevBloodData,
        [name]: prevBloodData[name] === '' ? '1.00' : (parseFloat(prevBloodData[name]) + 1).toFixed(2),
        }));
    };

    const handleDecrement = (name) => {
        setBloodData((prevBloodData) => ({
        ...prevBloodData,
        [name]: prevBloodData[name] === '' ? '-1' : (parseFloat(prevBloodData[name]) - 1).toFixed(2),
        }));
    };

    
    const handleClearDiagnosis = () => {
        setDiagnosis(null);
        setError(null);
        setBloodData({
            WBC: '',
            LYMp: '',
            NEUTp: '',
            LYMn: '',
            NEUTn: '',
            RBC: '',
            HGB: '',
            HCT: '',
            MCV: '',
            MCH: '',
            MCHC: '',
            PLT: '',
            PDW: '',
            PCT: '',
        })
    };

    function getBloodData(eventInfo){
        let myBloodData={...bloodData} ;
        myBloodData[eventInfo.target.name]=eventInfo.target.value;
        setBloodData(myBloodData);
        console.log(bloodData);
    };

    async function sendBloodDataToApi(){
        try {
            let {data}= await axios.post(`https://f2d8-2c0f-fc89-8032-61c5-9f-b9b4-27f0-45a3.ngrok-free.app/predict`,bloodData); 
            console.log(data)
            setDiagnosis(data.Diagnosis);
            setLoading(false);
        } catch (error) {
            setError('An error occurred while predicting the diagnosis. Please try again later.');
            console.error("Error calling API:", error);
            setLoading(false);
        }
    }
    function submitBloodForm(e){
        e.preventDefault();
        setLoading(true);
        setError('');
        setDiagnosis('');
        sendBloodDataToApi();
        console.log(bloodData);
    }

return (
    <div className="blood-test-container container ">
        <h3 className='blood-title'><MdOutlineBloodtype className='blood__icon' /><p>Blood Test Diagnosis</p></h3>
        <p className='text-center'>Enter your blood test bloodData below to check for possible conditions.</p>
        <form onSubmit={submitBloodForm}>
        <div className='row '>
            <div className="col-md-6 ">
                <label className='blood__label' htmlFor="WBC">WBC (White Blood Cells)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="WBC" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="WBC" value={bloodData.WBC} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('WBC')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('WBC')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="LYMp">LYMp (Lymphocyte %)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="LYMp" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="LYMp" value={bloodData.LYMp} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('LYMp')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('LYMp')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="NEUTp">NEUTp (Neutrophil %)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="NEUTp" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="NEUTp" value={bloodData.NEUTp} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('NEUTp')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('NEUTp')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="LYMn">LYMn (Lymphocyte #)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="LYMn" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="LYMn" value={bloodData.LYMn} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('LYMn')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('LYMn')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="NEUTn">NEUTn (Neutrophil #)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="NEUTn" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="NEUTn" value={bloodData.NEUTn} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('NEUTn')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('NEUTn')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="RBC">RBC (Red Blood Cells)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" required id="RBC" className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="RBC" value={bloodData.RBC} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('RBC')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('RBC')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="HGB">HGB (Hemoglobin)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="HGB" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="HGB" value={bloodData.HGB} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('HGB')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('HGB')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="HCT">HCT (Hematocrit)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="HCT" required className=' form-control ' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="HCT" value={bloodData.HCT} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('HCT')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('HCT')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="MCV">MCV (Mean Corpuscular Volume)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="MCV" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="MCV" value={bloodData.MCV} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('MCV')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('MCV')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="MCH">MCH (Mean Corpuscular Hemoglobin)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="MCH" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="MCH" value={bloodData.MCH} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('MCH')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('MCH')}>-</button>
                </div>
            </div>
            
            <div className="col-md-6">
                <label className='blood__label' htmlFor="PLT">PLT (Platelets)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="PLT" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="PLT" value={bloodData.PLT} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('PLT')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('PLT')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="PDW">PDW (Platelet Distribution Width)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="PDW" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="PDW" value={bloodData.PDW} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('PDW')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('PDW')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label'  htmlFor="PCT">PCT (Plateletcrit)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="PCT" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="PCT" value={bloodData.PCT} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('PCT')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('PCT')}>-</button>
                </div>
            </div>
            <div className="col-md-6">
                <label className='blood__label' htmlFor="MCHC">MCHC (Mean Corpuscular Hemoglobin Concentration)</label>
                <div className="input-group diagnosis-input-group">
                    <input  type="text" id="MCHC" required className=' form-control blood__input' placeholder="Enter value" aria-label="Recipient's username with two button addons" name="MCHC" value={bloodData.MCHC} onChange={getBloodData}/>
                    <button className="incDec__button" type="button" onClick={() => handleIncrement('MCHC')}>+</button>
                    <button className="incDec__button" type="button" onClick={() => handleDecrement('MCHC')}>-</button>
                </div>
            </div>
        </div>
        <div>
            <button type='submit' disabled={loading} className="predict-button">
                {loading ?   <div ><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></div> : 'Predict Diagnosis'}
            </button>
            <button onClick={handleClearDiagnosis} className="clear-button">clear</button>
        </div>
        </form>
        {diagnosis && (
            <div className="alert alert-primary m-3 fs-5" role="alert">
                <p> <strong>Predicted Diagnosis is :</strong> {diagnosis}</p>
            </div>
        )}
        
            {error && (<div className="alert alert-danger m-3" role="alert">
                <h4>error</h4>
                <p>{error}</p>
                </div>

            )}
        
    </div>
    );
};