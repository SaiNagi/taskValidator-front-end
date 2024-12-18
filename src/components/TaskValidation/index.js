import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies

const TaskValidation = ({ task }) => {
  const [proof, setProof] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get('token'); // Get token from cookies on component mount
    setToken(savedToken); // Set token to state
  }, []); // Run this only once when the component mounts

  const handleProofUpload = async () => {
    if (!token) {
      alert('Token is missing');
      return;
    }

    const formData = new FormData();
    formData.append('proof', proof);

    try {
      await axios.post(
        `https://taskvalidator-backend-1.onrender.com/tasks/${task.id}/proof`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Proof submitted successfully!');
    } catch (error) {
      console.error('Error uploading proof:', error);
      alert('Failed to submit proof');
    }
  };

  return (
    <div>
      <h5>Submit Proof</h5>
      <input type="file" onChange={(e) => setProof(e.target.files[0])} />
      <button onClick={handleProofUpload}>Upload</button>
    </div>
  );
};

export default TaskValidation;
