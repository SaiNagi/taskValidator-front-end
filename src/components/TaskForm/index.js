import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies
import './index.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  
  // Get the token from cookies
  const token = Cookies.get('token'); // Retrieve the token from cookies

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/tasks',
        { title, description, due_date: dueDate, assignee },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Task created successfully!');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <input type="text" placeholder="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
