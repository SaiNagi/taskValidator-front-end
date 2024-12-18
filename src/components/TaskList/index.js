import React from 'react';
import TaskValidation from '../TaskValidation';
import './index.css'

const TaskList = ({ tasks }) => (
  <div>
    <h3>Task List</h3>
    {tasks.map((task) => (
      <div key={task.id} className='task-cont'>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Due Date: {task.due_date}</p>
        <p>Status: {task.status}</p>
        <TaskValidation task={task} />
      </div>
    ))}
  </div>
);

export default TaskList;
