import React from "react";
import { AlertCircle } from "lucide-react";
import "./LiveEvents.css";

const LiveEvents = ({ events }) => {
  return (
    <section className="live-events">
      <div className="container">
        <div className="event-grid">
          {events.map((event) => (
            <div
              key={event.id}
              className={`event-card ${event.onLive ? "live" : ""}`}
            >
              <div className="event-details">
                <h3>{event.currentEvent}</h3>
                <p className="next-event">Next: {event.nextEvent}</p>
                <p className="venue">{event.venue}</p>
                {event.onLive && (
                  <div className="live-indicator">
                    {/* <AlertCircle size={16} /> */}
                    <span>LIVE</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveEvents;
