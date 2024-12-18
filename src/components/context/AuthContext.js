import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  // Define shared state
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // On component mount, retrieve the token and user from cookies
  useEffect(() => {
    const storedToken = Cookies.get('token');  // Get token from cookies (cookie key = 'token')
    const storedUser = Cookies.get('currentUser'); // Get user from cookies

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(storedUser);
    }
  }, []);

  // Save token and user to cookies when they change
  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7 });  // Token expires in 7 days
      Cookies.set('currentUser', currentUser, { expires: 7 });
    } else {
      Cookies.remove('token');
      Cookies.remove('currentUser');
    }
  }, [token, currentUser]);

  // Ensure the `value` prop is passed with the required data
  const value = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
