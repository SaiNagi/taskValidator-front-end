import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./index.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedData = { ...formData, [name]: name === "image" ? files[0] : value };

    // Calculate progress
    const filledFields = Object.values(updatedData).filter(
      (field) => field && (typeof field === "string" ? field.trim() !== "" : true)
    ).length;

    setProgress((filledFields / 4) * 100);
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
  
    // Create FormData object to handle the form submission with a file
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("image", formData.image); // Add image file
  
    try {
      const response = await fetch("https://taskvalidator-backend.onrender.com/register", {
        method: "POST",
        body: formDataToSend, // Send FormData object
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Optional: Display success message
        navigate("/login"); // Redirect to login page
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <header className="login-header">
        <h1>Task Validator</h1>
        <p>Boost your performance with our accurate and efficient task checker.</p>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-heading">Register</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      <p className="login-redirect">
        Already registered?{" "}
        <span onClick={() => navigate("/login")} className="login-link">
          Go to Login
        </span>
      </p>
    </div>
  );
};

export default Register;
