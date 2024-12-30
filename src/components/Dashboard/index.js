import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import Header from '../Header'
import { AuthContext } from '../context/AuthContext'; 
import './index.css';
import Logout from '../Logout';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const { token } = useContext(AuthContext); // Access the token from context
  const navigate = useNavigate(); // Initialize navigation hook

  // Fetch tasks on component mount or token update
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const response = await axios.get('https://taskvalidator-backend.onrender.com/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data); // Set fetched tasks
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);

  // Handle saving an edited task
  const handleSaveTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `https://taskvalidator-backend.onrender.com/tasks/${id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the task in local state with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://taskvalidator-backend.onrender.com/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the task from local state after deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Navigation to Validate Tasks page
  const handleNavigateToValidateTasks = () => {
    navigate('/validateTasks');
  };

  return (
    <div className="dashboard">
      <div>
        <Header/>
      </div>
      <div className="task-form-container">
        <TaskForm />
      </div>
      <div className="tasks">
        <TaskList tasks={tasks} onSaveTask={handleSaveTask} onDeleteTask={handleDeleteTask} />
      </div>
      <div className="navigation-button">
        <button onClick={handleNavigateToValidateTasks}>Validate Tasks</button>
      </div>
    </div>
  );
};

export default Dashboard;
