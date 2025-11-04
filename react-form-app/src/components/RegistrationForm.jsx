import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Server response:', result);
        setStatus('success');
      } else {
        console.error('❌ Server error:', response.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>

      {status === 'success' ? (
        <div className="success-message">
          <h3>🎉 Registration Successful!</h3>
          <p>Welcome, {formData.name}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            {status === 'sending' ? 'Submitting…' : 'Register'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          Error sending data. Please check your backend connection.
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
