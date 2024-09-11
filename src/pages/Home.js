import React, { useState, useEffect } from "react";
import LiveEvents from "../components/LiveEvents";
import "./Home.css";
import "../SharedPageStyles.css";

const Home = () => {
  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    // Fetch live events data
    const fetchLiveEvents = async () => {
      const dummyEvents = [
        { id: 1, venue: "Stage 1", currentEvent: "Group Song (Indian)", nextEvent: "Mono Act" },
        { id: 2, venue: "Stage 2", currentEvent: "Essay Writing", nextEvent: "Extempore" },
        { id: 3, venue: "Stage 3", currentEvent: "Fancy Dress", nextEvent: "Classical Solo Dance" },
        { id: 4, venue: "Stage 4", currentEvent: "Water Color Painting", nextEvent: "Pencil Drawing" },
        { id: 5, venue: "Main Ground", currentEvent: "100m Finals", nextEvent: "200m Heats" },
      ];
      setLiveEvents(dummyEvents);
    };

    fetchLiveEvents();
  }, []);

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
