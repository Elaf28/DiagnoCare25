import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPot.css';
import Swal from 'sweetalert2';
export default function ChatPot() {
  const [symptoms, setSymptoms] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '⚠️ This tool provides AI-based predictions only. Please consult a real doctor before making any medical decisions.',
      },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing symptoms',
        text: 'Please enter your symptoms before submitting.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const userMessage = { sender: 'user', text: symptoms };
    setMessages((prev) => [...prev, userMessage]);
    setSymptoms('');
    setLoading(true);

    try {
      const response = await axios.post('https://66f9-41-46-31-47.ngrok-free.app/predict', {
        symptoms: symptoms,
        // timeout: 60000 
      });
      console.log("🔍 Full response:", response);
      const predictions = response.data.predictions || [];

      const aiMessage = {
        sender: 'bot',
        text: predictions.length
          ? `Predicted Diseases:\n${predictions
              .map((p, i) => `${i + 1}. ${p.disease} (Confidence: ${p.confidence}%)`)
              .join('\n')}`
          : 'No predictions found.',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Prediction error:", error.message);
      console.error('Prediction error:', error);
      const errorMessage = { sender: 'bot', text: 'Error predicting disease. Try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="chatpot-container container my-5">
      <h2 className="text-center mb-2 site-title">DiagnoCare</h2>
      <p className="text-center mb-4 text-secondary">
        We're here to help. Just type your symptoms and get a smart diagnosis.
      </p>

      {messages.length > 0 && (
        <div className="chat-box mb-3">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="message-content" style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
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
          style={{ maxHeight: '120px', overflowY: 'auto', minHeight: '50px' }}
        />
        <button className="chat-icon-send btn" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
