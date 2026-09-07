import React, { useState, useEffect, useCallback } from "react";
import LiveEvents from "../components/LiveEvents";
import "./Home.css";
import "../SharedPageStyles.css";
import { useDispatch } from "react-redux";
import { getLiveOnStageItems } from "../redux/liveonstage/liveonstageSlice";

const Home = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const dispatch = useDispatch();

  const fetchLiveOnStage = useCallback(async () => {
    try {
      // Loader here
      const result = await dispatch(getLiveOnStageItems());
      if (result?.error) {
        // Show Error
      } else {
        setLiveEvents(result?.payload ?? []);
      }
    } catch (error) {
      // Show Error
    } finally {
      // Loader off
    }
  }, [dispatch]);

  useEffect(() => {
    // Fetch live events data
    fetchLiveOnStage();
  }, [fetchLiveOnStage]);

  return (
    <div className="home">
      <h1 className="welcome-title">Welcome to BSMCSM 2024</h1>
      <div className="mobile-section-header">
        <h2>Live Events</h2>
      </div>
      <div className="home-content">
        <LiveEvents events={liveEvents} />
      </div>
    </div>
  );
};

export default Home;
