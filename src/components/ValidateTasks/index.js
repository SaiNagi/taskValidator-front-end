import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ValidateTasks = () => {
  const { currentUser, token, setToken } = useContext(AuthContext);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState(null);
  const [error, setError] = useState(null); // Error handling state
  const navigate = useNavigate();

  // Ensure token is available
  useEffect(() => {
    if (!token) {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        navigate("/login");
      }
    }
  }, [token, setToken, navigate]);

  // Fetch assigned tasks
  useEffect(() => {
    const fetchAssignedTasks = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://taskvalidator-backend.onrender.com/tasks/validate`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAssignedTasks(response.data);
      } catch (error) {
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTasks();
  }, [currentUser, token]);

  // Validate task (Approve or Reject)
  const validateTask = async (taskId, status) => {
    try {
      await axios.post(
        `https://taskvalidator-backend.onrender.com/tasks/${taskId}/validate`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Task ${status.toLowerCase()} successfully!`);
      setAssignedTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status } : task
        )
      );
    } catch (error) {
      alert("Failed to validate task.");
    }
  };

  // View proof
  const handleViewProof = (proof) => {
    setSelectedProof(proof);
  };

  // Render proof
  const renderProof = () => {
    if (!selectedProof) return null;

    if (
      selectedProof.endsWith(".jpg") ||
      selectedProof.endsWith(".jpeg") ||
      selectedProof.endsWith(".png") ||
      selectedProof.endsWith(".gif")
    ) {
      return <img src={selectedProof} alt="Proof" className="proof-image" />;
    } else if (selectedProof.endsWith(".pdf")) {
      return (
        <iframe
          src={selectedProof}
          width="100%"
          height="500px"
          title="Task Proof"
          className="proof-iframe"
        />
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  if (loading) {
    return <p className="loading-text">Loading tasks...</p>;
  }

  return (
    <div className="validate-tasks-container">
      <h1 className="tasks-header">Assigned Tasks</h1>
      {error && <p className="error-text">{error}</p>}
      {assignedTasks.length === 0 ? (
        <p className="no-tasks-text">No tasks assigned.</p>
      ) : (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Creator</th>
              <th>Proof</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.creator}</td>
                <td>
                  {task.proof ? (
                    <button
                      className="view-proof-btn"
                      onClick={() => handleViewProof(task.proof)}
                    >
                      View Proof
                    </button>
                  ) : (
                    "No proof submitted"
                  )}
                </td>
                <td>{task.status}</td>
                <td>
                  {task.status === "Pending" && task.proof ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => validateTask(task.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => validateTask(task.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    "No action available"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProof && (
        <div className="proof-modal">
          <h3>Task Proof:</h3>
          <button
            className="close-proof-btn"
            onClick={() => setSelectedProof(null)}
          >
            Close Proof
          </button>
          {renderProof()}
        </div>
      )}
    </div>
  );
};

export default ValidateTasks;
