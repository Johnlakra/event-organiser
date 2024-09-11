import React, { useState } from "react";
import "./LeaderBoard.css";
import "../SharedPageStyles.css";

const LeaderBoard = ({ data }) => {
  const [expandedDeanery, setExpandedDeanery] = useState(null);

  const toggleDeanery = (id) => {
    setExpandedDeanery(expandedDeanery === id ? null : id);
  };

  const calculateTotalPoints = (events) => {
    return events.reduce((total, event) => total + event.points, 0);
  };

  return (
    <div className="leaderboard-container">
      {data.map((deanery) => (
        <div key={deanery.id} className="deanery-item">
          <button
            className="deanery-header"
            onClick={() => toggleDeanery(deanery.id)}
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
  );
};

export default LeaderBoard;
