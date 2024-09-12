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
              className={`event-card ${event.live ? "live" : ""}`}
            >
              <div className="event-details">
                <h3>{event.current_event}</h3>
                <p className="next-event">Next: {event.next_event}</p>
                <p className="venue">{event.stage_name}</p>
                {event.live ? (
                  <div className="live-indicator">
                    {/* <AlertCircle size={16} /> */}
                    <span>LIVE</span>
                  </div>
                ):null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveEvents;
