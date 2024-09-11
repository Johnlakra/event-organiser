import React, { useState } from 'react';

const sectionStyle = {
  padding: '20px 0',
};

const containerStyle = {
  maxWidth: '1140px',
  margin: '0 auto',
  padding: '0 15px',
};

const sectionHeaderStyle = {
  marginBottom: '20px',
  textAlign: 'center',
};

const h2Style = {
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: '10px',
  color: '#0e1b4d',
};

const eventCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  marginBottom: '20px',
};

const eventImgStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const eventDetailsStyle = {
  padding: '15px',
};

const MainContent = ({ events, leaderboardData }) => {
  const [expandedDeanery, setExpandedDeanery] = useState(null);

  // Function to calculate total points for a deanery
  const calculateTotalPoints = (events) => {
    return events.reduce((total, event) => total + event.points, 0);
  };

  return (
    <main style={{ paddingTop: '60px' }}>
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={h2Style}>Live Events</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {events.map((event) => (
              <div key={event.id} style={eventCardStyle}>
                <img 
                  src={`https://source.unsplash.com/random/350x250?${event.venue.replace(' ', '+')}`} 
                  alt={event.venue} 
                  style={eventImgStyle}
                />
                <div style={eventDetailsStyle}>
                  <h3 style={{ fontWeight: 600, fontSize: '18px', marginBottom: '5px' }}>{event.currentEvent}</h3>
                  <p style={{ fontSize: '14px', color: '#112363' }}>Next: {event.nextEvent}</p>
                  <p style={{ fontSize: '14px', color: '#f82249', marginTop: '5px' }}>{event.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: '#f6f7fd' }}>
        <div style={containerStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={h2Style}>Leaderboard</h2>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            {leaderboardData.map((deanery) => (
              <div key={deanery.id} style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>
                <button
                  onClick={() => setExpandedDeanery(expandedDeanery === deanery.id ? null : deanery.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f82249',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  <span>{deanery.name}</span>
                  <span>{calculateTotalPoints(deanery.events)} pts</span>
                </button>
                {expandedDeanery === deanery.id && (
                  <div style={{ marginTop: '10px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f6f7fd' }}>
                          <th style={{ padding: '10px', textAlign: 'left' }}>Event</th>
                          <th style={{ padding: '10px', textAlign: 'center' }}>Position</th>
                          <th style={{ padding: '10px', textAlign: 'right' }}>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deanery.events.map((event, index) => (
                          <tr key={index} style={{ borderTop: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{event.name}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{event.position}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>{event.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;