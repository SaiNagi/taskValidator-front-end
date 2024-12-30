import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import './index.css'

const Profile = () => {
  const { token } = useContext(AuthContext); // Access the token from context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("No token available. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://taskvalidator-backend.onrender.com/user", {
          headers: { Authorization: `Bearer ${token}` }, // Send token in request headers
        });
        setUser(response.data); // Set user data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]); // Re-fetch if token changes

  if (loading) {
    return (
      <div className="profile-container">
        <Skeleton circle={true} height={100} width={100} />
        <div className="profile-details">
          <Skeleton height={20} width={200} />
          <Skeleton height={15} width={300} />
          <Skeleton height={15} width={150} />
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <img src={user?.image} alt={`${user?.name}'s profile`} className="profile-image" />
      <div className="profile-details">
        <h2 className="profile-name">Name: {user?.username}</h2>
        <p className="profile-email">email: {user?.email}</p>
        <p className="profile-score">Score: {user?.score}</p>
      </div>
    </div>
  );
};

export default Profile;
