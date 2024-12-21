import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './index.css';
import Logout from '../Logout';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext); // Access the token from context
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchTasks = async () => {
      console.log('Checking Token in Dashboard:', token);
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const response = await axios.get('https://taskvalidator-backend.onrender.com/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleNavigateToValidateTasks = () => {
    navigate('/validateTasks'); // Navigate to the Validate Tasks page
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Dashboard</h2>
        <Logout />
      </div>
      <div className="task-form-container">
        <TaskForm />
      </div>
      <div className="tasks">
        <TaskList tasks={tasks} />
      </div>
      <div className="navigation-button">
        <button onClick={handleNavigateToValidateTasks}>Validate Tasks</button>
      </div>
    </div>
  );
};

export default Dashboard;
