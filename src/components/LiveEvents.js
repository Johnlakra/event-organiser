import React from 'react';
import './LiveEvents.css';

const LiveEvents = ({ events }) => {
  return (
    <section className="live-events">
      <div className="container">
        <div className="section-header">
          <h2>Live Events</h2>
        </div>
        <div className="event-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              {/* <img 
                src={`https://source.unsplash.com/random/350x250?${event.venue.replace(' ', '+')}`} 
                alt={event.venue} 
                className="event-image"
              /> */}
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