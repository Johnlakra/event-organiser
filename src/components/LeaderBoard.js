import React, { useState } from 'react';
import './LeaderBoard.css';

const LeaderBoard = ({ data }) => {
  const [expandedDeanery, setExpandedDeanery] = useState(null);

  const calculateTotalPoints = (events) => {
    return events.reduce((total, event) => total + event.points, 0);
  };

  return (
    <section className="leaderboard">
      <div className="container">
        <div className="leaderboard-content">
          {data.map((deanery) => (
            <div key={deanery.id} className="deanery-item">
              <button
                onClick={() => setExpandedDeanery(expandedDeanery === deanery.id ? null : deanery.id)}
                className="deanery-button"
              >
                <span>{deanery.name}</span>
                <span>{calculateTotalPoints(deanery.events)} pts</span>
              </button>
              {expandedDeanery === deanery.id && (
                <div className="deanery-details">
                  <table>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Position</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deanery.events.map((event, index) => (
                        <tr key={index}>
                          <td>{event.name}</td>
                          <td>{event.position}</td>
                          <td>{event.points}</td>
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
  );
};

export default LeaderBoard;