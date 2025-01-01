import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../context/AuthContext'; // Import the context
import Cookies from 'js-cookie'; // Import js-cookie

import './index.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser, setToken, token } = useContext(AuthContext); // Access context values
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskvalidator-backend.onrender.com/login', { username, password });

      // Set user in context
      setCurrentUser(username);
      setToken(response.data.token);

      // Store the token and username in cookies for persistence
      Cookies.set('token', response.data.token, { expires: 1 }); // 1 day expiration
      Cookies.set('username', username, { expires: 1 });

      console.log('Login successful. Navigating to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  // Log the token whenever it changes
  useEffect(() => {
    if (token) {
      console.log('Token has been updated:', token);
      console.log('Token length:', token.length);
    }
  }, [token]); // Dependency array ensures this runs when `token` changes

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Task Validator</h1>
        <p>Boost your performance with our accurate and efficient task checker.</p>
      </header>

      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <div className="new-user-section">
        <p>New here? <Link to="/register" className="register-link">Register now</Link></p>
      </div>

      <footer className="login-footer">
        <p>Start validating your tasks and stay on track with Task Validator!</p>
      </footer>
    </div>
  );
};

export default Login;
