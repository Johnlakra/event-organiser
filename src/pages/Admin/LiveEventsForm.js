import React, { useState } from 'react';

const venues = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Basketball Court', 'Ground'];

const LiveEventsForm = () => {
  const [liveEvents, setLiveEvents] = useState(
    venues.reduce((acc, venue) => ({
      ...acc,
      [venue]: { currentEvent: '', nextEvent: '', isLive: false }
    }), {})
  );

  const handleInputChange = (venue, field, value) => {
    setLiveEvents(prev => ({
      ...prev,
      [venue]: { ...prev[venue], [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(liveEvents, null, 2));
    // Here you would typically send this data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="live-events-form">
      {venues.map(venue => (
        <div key={venue} className="venue-form">
          <h3>{venue}</h3>
          <input
            type="text"
            placeholder="Current Event"
            value={liveEvents[venue].currentEvent}
            onChange={(e) => handleInputChange(venue, 'currentEvent', e.target.value)}
          />
          <input
            type="text"
            placeholder="Next Event"
            value={liveEvents[venue].nextEvent}
            onChange={(e) => handleInputChange(venue, 'nextEvent', e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={liveEvents[venue].isLive}
              onChange={(e) => handleInputChange(venue, 'isLive', e.target.checked)}
            />
            Live
          </label>
        </div>
      ))}
      <button type="submit">Submit Live Events</button>
    </form>
  );
};

export default LiveEventsForm;