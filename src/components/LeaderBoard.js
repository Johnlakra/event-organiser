import React, { useState } from "react";
import "./LeaderBoard.css";
import "../SharedPageStyles.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const LeaderBoard = ({ data }) => {
  const [expandedDeanery, setExpandedDeanery] = useState(null);
  const [expandedParish, setExpandedParish] = useState(null);

  const toggleDeanery = (id) => {
    setExpandedDeanery(expandedDeanery === id ? null : id);
    setExpandedParish(null);
  };

  const toggleParish = (id) => {
    setExpandedParish(expandedParish === id ? null : id);
  };

  const calculateTotalPoints = (events) => {
    return events.reduce((total, event) => total + event.points, 0);
  };

  const sortedData = [...data].sort(
    (a, b) => calculateTotalPoints(b.events) - calculateTotalPoints(a.events)
  );

  return (
    <div className="leaderboard-container">
      {sortedData.map((deanery, deaneryIndex) => {
        const deaneryTotalPoints = calculateTotalPoints(deanery.events);
        const parishesData = deanery.events.reduce((acc, event) => {
          if (!acc[event.parish]) {
            acc[event.parish] = { events: [], totalPoints: 0 };
          }
          acc[event.parish].events.push(event);
          acc[event.parish].totalPoints += event.points;
          return acc;
        }, {});

        const sortedParishes = Object.entries(parishesData)
          .sort(([, a], [, b]) => b.totalPoints - a.totalPoints)
          .map(([parishName, parishData], index) => ({
            id: `${deanery.id}-${index}`,
            name: parishName,
            ...parishData,
          }));

        return (
          <div key={deanery.id} className="deanery-item">
            <button
              className="deanery-header"
              onClick={() => toggleDeanery(deanery.id)}
            >
                <div className="name-container">
                  <span>{`${deaneryIndex + 1}. ${deanery.name}`}</span>
                </div>
                <div>
                  <span>{deaneryTotalPoints} pts</span>
                </div>
                <div>
                  {expandedDeanery === deanery.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
            </button>
            {expandedDeanery === deanery.id && (
              <div className="deanery-details">
                {sortedParishes.map((parish, parishIndex) => (
                  <div key={parish.id} className="parish-item">
                    <button
                      className="parish-header"
                      onClick={() => toggleParish(parish.id)}
                    >
                      <div className='name-container'><span>{`${parishIndex + 1}. ${parish.name}`}</span></div>
                      <span>{parish.totalPoints} pts</span>
                      {expandedParish === parish.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {expandedParish === parish.id && (
                      <div className="parish-details">
                        <table>
                          <thead>
                            <tr>
                              <th>Event</th>
                              <th>Position</th>
                              <th>Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parish.events.map((event, index) => (
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
