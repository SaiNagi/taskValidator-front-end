import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './index.css'

const Leaderboard = ({ leaderboard, loading }) => {
  if (loading) {
    return (
      <div className="leaderboard-container">
        <Skeleton count={5} height={60} />
      </div>
    );
  }

  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return "rank-1";
      case 2:
        return "rank-2";
      case 3:
        return "rank-3";
      default:
        return "";
    }
  };

  return (
    <div className="leaderboard-container">
      <h3>Leaderboard</h3>
      {leaderboard.length > 0 ? (
        leaderboard.map((entry, idx) => (
          <div
            key={idx}
            className={`leaderboard-entry ${getRankClass(idx + 1)}`}
          >
            <img
              src={entry.image}
              alt={entry.username}
              className="leaderboard-image"
            />
            <p>{entry.username}</p>
            <p>{entry.email}</p>
            <p>Score: {entry.score}</p>
            <p>Rank: {idx + 1}</p>
          </div>
        ))
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
