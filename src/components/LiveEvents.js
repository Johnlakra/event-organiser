import React from "react";
import "./LiveEvents.css";

const LiveEvents = ({ events }) => {
  return (
    <section className="live-events">
      <div className="container">
        <div className="event-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-details">
                <h3>{event.currentEvent}</h3>
                <p className="next-event">Next: {event.nextEvent}</p>
                <p className="venue">{event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveEvents;
