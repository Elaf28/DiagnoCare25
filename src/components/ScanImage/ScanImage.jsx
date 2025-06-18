import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './ScanImage.css';
import axios from 'axios';
export default function ScanImage() {
    const [selectedImage, setSelectedImage] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState('brain'); 
    const [uploadedImage, setUploadedImage] = useState(null); 
    const handleBrainTumorButton=()=>{
      setActiveButton('brain');
      setDiagnosis('');
      setUploadedImage(null);
      setSelectedImage('');
      setError(null);
    }
    const handleChestButton = () => {
      setActiveButton('chest');
      setDiagnosis(''); 
      setUploadedImage(null);
      setSelectedImage('');
      setError(null);
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(file); // تخزين الملف نفسه لإرساله للـ API
            setUploadedImage(reader.result); // عرض الصورة على الشاشة
        };
        reader.readAsDataURL(file);
    } else {
        setSelectedImage('');
        setUploadedImage(null);
    }
    setDiagnosis(''); 
    setError(null); 
};
const handleSubmit = async () => {
  if (!selectedImage) {
      setError('Please upload an image first.');
      return;
  }

  setLoading(true);
  setDiagnosis('');
  setError(null);

  const formData = new FormData();
  formData.append('image', selectedImage); // إرسال الملف تحت اسم 'image'

  const apiUrl = activeButton === 'brain'
      ? 'https://ee0c-2c0f-fc89-802d-d37c-a3-15eb-db5e-bb5.ngrok-free.app/predict' // ضع هنا رابط الـ API الخاص بفحص أورام الدماغ
      : 'YOUR_CHEST_API_ENDPOINT'; // ضع هنا رابط الـ API الخاص بفحص الصدر

  try {
      const response = await axios.post(apiUrl, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      console.log(response.data)
      // هنا يجب عليك تعديل طريقة استخراج التشخيص بناءً على هيكل استجابة الـ API الخاص بك
      setDiagnosis(response.data.prediction || 'No diagnosis found.');
      setConfidence(response.data.confidence || null); // إذا كان الـ API يرجع قيمة للثقة
      setLoading(false);
  } catch (error) {
      console.error('Error during image scan:', error.message);
      if(error.message==="Request failed with status code 404" || error.message==="Network Error" ){
        setError('Failed to scan image. Please try again later.');
      }else{
        setError(error.message);
      }
      setLoading(false);
      setDiagnosis('');
      setConfidence(null);
  }
};

    return (
    <>
    <div className='container text-center my-5 diagnosis' >
        <h3 className='text-center title__diagnosis' >Please choose the type of scan and upload your medical image for diagnosis.</h3>
        <div>
          <button className={` ${activeButton ==='brain'?'active':'scanButton'}`}  onClick={handleBrainTumorButton}>Brain Tumor</button>
          <button className={`${activeButton ==='chest'?'active':'scanButton'}`} onClick={handleChestButton}>Chest</button>
        </div>
        <div className="input-group mb-3 input__diagnosis w-50 mx-auto">
          <input type="file" className="form-control" id="inputGroupFile02" onChange={handleImageChange} accept="image/*" />
        </div>
        <div>
          {uploadedImage && (
              <img src={uploadedImage} alt="Uploaded Image" style={{ maxWidth: '300px', marginTop: '20px' }} />
          )}
          </div>
          {loading && (
              <Spinner animation="border" role="status" style={{ color: 'var(--first-color)', marginTop: '20px' }}>
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
          )}

          {error && (<div className="alert alert-danger m-3 text-start" role="alert">
              <h4>error</h4>
              <p>{error}</p>
              </div>
            )}
          {diagnosis && (
              // <div className='description__diagnosis mt-3'>
                <div className="alert alert-primary m-3 fs-5 text-start" role="alert">
                  <strong>Diagnosis:</strong> {diagnosis}
                  {confidence !== null && <p><strong>Confidence:</strong> {confidence}</p>}
                </div>
              // </div>
          )}
          {selectedImage && !loading && !diagnosis && !error &&(
              <button className="predict-button mt-3" onClick={handleSubmit}>
                  Scan Image
              </button>
          )}
        </div>
        </>
    );
}