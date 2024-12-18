import React from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; // If you're using React Router for navigation

const Logout = () => {
  const history = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
