import React, { useState } from 'react';
import TaskValidation from '../TaskValidation';
import './index.css';

const TaskList = ({ tasks, onSaveTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ ...task });
  };

  const handleSaveClick = (id) => {
    onSaveTask(id, editedTask);
    setEditingTaskId(null);
  };

  const handleCancelClick = () => {
    setEditingTaskId(null);
    setEditedTask({});
  };

  return (
    <div>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <div key={task.id} className="task-cont">
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                name="title"
                value={editedTask.title || ''}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editedTask.description || ''}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <input
                type="date"
                name="due_date"
                value={editedTask.due_date || ''}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="assignee"
                value={editedTask.assignee || ''}
                onChange={handleEditChange}
                placeholder="Assignee"
              />
              <button onClick={() => handleSaveClick(task.id)}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Assignee: {task.assignee}</p>
              <TaskValidation task={task} />
              <button onClick={() => handleEditClick(task)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
