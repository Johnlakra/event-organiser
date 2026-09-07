import React, { useState, useEffect, useCallback } from "react";
import LeaderBoard from "../components/LeaderBoard";
import "./Leaderboard.css";
import "../SharedPageStyles.css";
import { useDispatch } from "react-redux";
import { getLeaderBoardItems } from "../redux/leaderBoard/leaderBoardSlice";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  // const { data } = useSelector(leaderBoardState);
  const dispatch = useDispatch();

  const fetchList = useCallback(async () => {
    try {
      // Loader here
      const result = await dispatch(getLeaderBoardItems());
      if (result?.error) {
        // Show Error
      } else {
        const grouped = (result?.payload ?? []).reduce((acc, item) => {
          if (!acc[item.deanery]) acc[item.deanery] = [];
          acc[item.deanery].push(item);
          return acc;
        }, {});
        const data = Object.entries(grouped).map(([key, value], index) => {
          const events = value.map((item) => ({
            id: item.id,
            name: item.event,
            position: item.position,
            points: item.point,
            parish: item.parish
          }));
          return { events, name: key, id: index + 1 };
        });
        setLeaderboardData(data);
      }
    } catch (error) {
      // Show Error
    } finally {
      // Loader off
    }
  }, [dispatch]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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
