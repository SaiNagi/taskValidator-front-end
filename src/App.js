import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ValidateTasks from './components/ValidateTasks';
import Cookies from 'js-cookie'; // Import js-cookie

const App = () => {
  const { currentUser, setCurrentUser, token, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Loading state to delay route rendering

  // Retrieve user data and token from cookies on app load
  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedUsername = Cookies.get('username');

    console.log('saved Token: ', savedToken);
    console.log('saved user name: ', savedUsername);

    if (savedToken && savedUsername) {
      setCurrentUser(savedUsername); // Set user from cookies
      setToken(savedToken); // Set token from cookies
    }
    setLoading(false); // Set loading to false after checking cookies
  }, [setCurrentUser, setToken]);

  // Guarded Route: Redirects to login if the user is not logged in
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <p>Loading...</p>; // Prevent rendering routes before checking cookies
    }

    return currentUser && token ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/validatetasks"
          element={
            <ProtectedRoute>
              <ValidateTasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
