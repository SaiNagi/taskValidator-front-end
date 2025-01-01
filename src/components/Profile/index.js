import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import Leaderboard from "../LeaderBoard"; // Leaderboard component import
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './index.css'

const Profile = () => {
  const { token } = useContext(AuthContext); // Access the token from context
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]); // Add leaderboard state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation hook

  const handleNavigateDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("No token available. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const userResponse = await axios.get("https://taskvalidator-backend.onrender.com/user", {
          headers: { Authorization: `Bearer ${token}` }, // Send token in request headers
        });
        setUser(userResponse.data); // Set user data

        // Fetch leaderboard data after the user data is fetched
        const leaderboardResponse = await axios.get("https://taskvalidator-backend.onrender.com/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaderboard(leaderboardResponse.data); // Set leaderboard data

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
      <>
        <div className="profile-container">
          <Skeleton circle={true} height={100} width={100} />
          <div className="profile-details">
            <Skeleton height={20} width={200} />
            <Skeleton height={15} width={300} />
            <Skeleton height={15} width={150} />
          </div>
        </div>
        <Leaderboard loading={loading} /> {/* Pass loading to Leaderboard */}
      </>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-section">
        <img src={user?.image} alt={`${user?.username}'s profile`} className="profile-image" />
        <div className="profile-details">
          <h2 className="profile-name">Name: {user?.username}</h2>
          <p className="profile-email">Email: {user?.email}</p>
          <p className="profile-score">Score: {user?.score}</p>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard-section">
        <Leaderboard leaderboard={leaderboard} loading={loading} />
      </div>

      <div className="navigate-dashboard">
        <button onClick={handleNavigateDashboard}>Back To Dash Board</button>
      </div>

    </div>
  );
};

export default Profile;
