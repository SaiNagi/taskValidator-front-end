import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './index.css';
import Logout  from '../Logout';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext); // Access the token from context

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
    </div>
  );
};

export default Dashboard;
