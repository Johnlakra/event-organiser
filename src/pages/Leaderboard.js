import React, { useState, useEffect } from "react";
import LeaderBoard from "../components/LeaderBoard";
import "./Leaderboard.css";
import "../SharedPageStyles.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboardData = async () => {
      const dummyData = [
        {
          id: 1,
          name: "Deanery 1",
          events: [
            { name: "100m", position: "I", points: 15 },
            { name: "Basketball", position: "II", points: 10 },
            { name: "Group Song", position: "III", points: 5 },
          ],
        },
        {
          id: 2,
          name: "Deanery 2",
          events: [
            { name: "100m", position: "I", points: 15 },
            { name: "Basketball", position: "II", points: 10 },
            { name: "Group Song", position: "III", points: 5 },
          ],
        },
        {
          id: 3,
          name: "Deanery 3",
          events: [
            { name: "100m", position: "I", points: 15 },
            { name: "Basketball", position: "II", points: 10 },
            { name: "Group Song", position: "III", points: 5 },
          ],
        },
        // ... add more deaneries up to 16
      ];
      setLeaderboardData(dummyData);
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="page-container leaderboard-page">
      <h1 className="page-title">Leaderboard</h1>
      <div className="page-content">
        <LeaderBoard data={leaderboardData} />
      </div>
    </div>
  );
};

export default Leaderboard;
