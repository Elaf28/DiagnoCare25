import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './ScanImage.css';
import axios from 'axios';

export default function ScanImage() {
  const [selectedImage, setSelectedImage] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState('brain'); 
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [chestFindings, setChestFindings] = useState([]);

  const handleBrainTumorButton = () => {
    setActiveButton('brain');
    resetFields();
  };

  const handleChestButton = () => {
    setActiveButton('chest');
    resetFields();
  };

  const resetFields = () => {
    setDiagnosis('');
    setError(null);
    setUploadedImage(null);
    setSelectedImage('');
    setChestFindings([]);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        resetFields(); 
        setSelectedImage(file);
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      resetFields();
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please upload an image first.');
      return;
    }

    setLoading(true);
    setDiagnosis('');
    setChestFindings([]);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    const apiUrl = activeButton === 'brain'
      ? 'https://Mohamed411s-Health-Care-System.hf.space/predict/brain'
      : 'https://mohamed411s-x-ray.hf.space/predict';

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);

      if (activeButton === 'brain') {
        setDiagnosis(response.data.prediction || 'No diagnosis found.');
      } else {
        setChestFindings(response.data.predictions || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error during image scan:', error.message);
      if (error.message === "Request failed with status code 404" || error.message === "Network Error") {
        setError('Failed to scan image. Please try again later.');
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container text-center my-5 diagnosis'>
        <h3 className='text-center title__diagnosis'>
          Please choose the type of scan and upload your medical image for diagnosis.
        </h3>

        <div>
          <button className={`${activeButton === 'brain' ? 'active' : 'scanButton'}`} onClick={handleBrainTumorButton}>
            Brain Tumor
          </button>
          <button className={`${activeButton === 'chest' ? 'active' : 'scanButton'}`} onClick={handleChestButton}>
            Chest
          </button>
        </div>

        <div className="input-group mb-3 input__diagnosis w-50 mx-auto">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className='m-2 m-sm-0'>
          {uploadedImage && (
            <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '20px' }} />
          )}
        </div>

        {loading && (
          <Spinner animation="border" role="status" style={{ color: 'var(--first-color)', marginTop: '20px' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {error && (
          <div className="alert alert-danger m-3 text-start" role="alert">
            <h4>Error</h4>
            <p>{error}</p>
          </div>
        )}

        {diagnosis && activeButton === 'brain' && (
          <div className="output-scan alert alert-primary m-3 fs-5 text-start mx-auto px-5" role="alert">
            <p><strong>Predicted Conditions:</strong></p>
            <p> {diagnosis}</p>
          </div>
        )}

        {chestFindings.length > 0 && activeButton === 'chest' && (
          <div className="output-scan alert alert-primary m-3 fs-5 text-start mx-auto px-5" role="alert">
            <strong>Predicted Conditions:</strong>
            <ul className='mt-2 mb-0 ps-3' style={{ listStyleType: 'disc' }}>
              {chestFindings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>
        )}

        {selectedImage && !loading && !diagnosis && chestFindings.length === 0 && !error && (
          <button className="predict-button mt-3" onClick={handleSubmit}>
            Scan Image
          </button>
        )}
      </div>
    </>
  );
}
