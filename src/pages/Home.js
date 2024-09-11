import React, { useState, useEffect } from 'react';
import LiveEvents from '../components/LiveEvents';

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
    <div>
      <h1>Welcome to BSMCSM 2024</h1>
      <LiveEvents events={liveEvents} />
    </div>
  );
};

export default Home;