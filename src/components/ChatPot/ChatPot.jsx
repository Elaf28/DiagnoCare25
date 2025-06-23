// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ChatPot() {
//   const [symptoms, setSymptoms] = useState('');
//   const [result, setResult] = useState('');

//   const handleSubmit = async () => {
//     if (!symptoms) return alert('Please enter symptoms first.');

//     try {
//       const response = await axios.post('https://1c45-154-178-253-131.ngrok-free.app/predict', {
//         symptoms: symptoms,
//       });
//       setResult(response.data.predicted_disease);
//     } catch (error) {
//       console.error('Prediction error:', error);
//       alert('Error predicting disease. Try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Disease Prediction</h2>
//       <textarea
//         className="form-control"
//         rows="4"
//         placeholder="Enter symptoms..."
//         value={symptoms}
//         onChange={(e) => setSymptoms(e.target.value)}
//       />
//       <button className="btn btn-primary mt-3" onClick={handleSubmit}>
//         Predict Disease
//       </button>

//       {result && (
//         <div className="alert alert-info mt-4">
//           <h4>Predicted Disease:</h4>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPot.css';

export default function ChatPot() {
  const [symptoms, setSymptoms] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ أول ما يدخل المستخدم الصفحة، أضف رسالة تحذيرية ثابتة
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '⚠️ This tool provides AI-based predictions only. Please consult a real doctor before making any medical decisions.',
      },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!symptoms.trim()) return alert('Please enter symptoms first.');

    const userMessage = { sender: 'user', text: symptoms };
    setMessages((prev) => [...prev, userMessage]);
    setSymptoms('');
    setLoading(true);

    try {
      const response = await axios.post('https://your-api-url/predict', {
        symptoms: symptoms,
      });

      const aiMessage = {
        sender: 'bot',
        text: `Predicted Disease: ${response.data.predicted_disease}`,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Prediction error:', error);
      const errorMessage = { sender: 'bot', text: 'Error predicting disease. Try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatpot-container container mt-4">
      <h2 className="text-center mb-2 site-title">DiagnoCare</h2>
      <p className="text-center mb-4 text-secondary">
        We're here to help. Just type your symptoms and get a smart diagnosis.
      </p>

      {messages.length > 0 && (
        <div className="chat-box mb-3">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <div className="message-content">Thinking...</div>
            </div>
          )}
        </div>
      )}

      <div className="input-group">
        <input
          className="form-control"
          placeholder="Describe your symptoms..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          style={{ maxHeight: '120px', overflowY: 'auto',minHeight: '50px' }}
        />
        <button className="chat-icon-send btn" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
